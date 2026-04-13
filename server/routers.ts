import Stripe from "stripe";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { PRODUCTS, type ProductKey } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-03-25.dahlia",
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  checkout: router({
    createSession: publicProcedure
      .input(
        z.object({
          productKey: z.enum(["PROGRAMA_NORMAL", "PROGRAMA_PROMO"]),
          origin: z.string().url(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const product = PRODUCTS[input.productKey as ProductKey];
        const user = ctx.user;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          allow_promotion_codes: true,
          payment_method_options: {
            card: {
              installments: {
                enabled: true,
              },
            },
          },
          line_items: [
            {
              price_data: {
                currency: "eur",
                unit_amount: product.priceEur,
                product_data: {
                  name: product.name,
                  description: product.description,
                },
              },
              quantity: 1,
            },
          ],
          customer_email: user?.email ?? undefined,
          client_reference_id: user?.id?.toString() ?? undefined,
          metadata: {
            user_id: user?.id?.toString() ?? "",
            customer_email: user?.email ?? "",
            customer_name: user?.name ?? "",
            product_key: input.productKey,
          },
          success_url: `${input.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${input.origin}/cancel`,
        });

        return { url: session.url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
