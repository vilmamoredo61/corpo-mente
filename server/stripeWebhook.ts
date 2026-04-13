import Stripe from "stripe";
import express, { type Express } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-03-25.dahlia",
});

export function registerStripeWebhook(app: Express) {
  // Must use raw body for Stripe signature verification
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event: Stripe.Event;

      try {
        if (!sig || !webhookSecret) {
          console.warn("[Webhook] Missing signature or secret");
          return res.status(400).json({ error: "Missing signature" });
        }
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[Webhook] Signature verification failed:", message);
        return res.status(400).json({ error: `Webhook error: ${message}` });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(
            `[Webhook] Payment completed — session: ${session.id}, customer: ${session.customer_email}, amount: ${session.amount_total}`
          );
          // Future: save purchase record to DB, send confirmation email, etc.
          break;
        }
        case "payment_intent.succeeded": {
          const pi = event.data.object as Stripe.PaymentIntent;
          console.log(`[Webhook] PaymentIntent succeeded: ${pi.id}`);
          break;
        }
        default:
          console.log(`[Webhook] Unhandled event type: ${event.type}`);
      }

      return res.json({ received: true });
    }
  );
}
