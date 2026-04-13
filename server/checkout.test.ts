import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";
import type Stripe from "stripe";

// Use vi.hoisted so mockCreate is available before vi.mock is hoisted
const { mockCreate } = vi.hoisted(() => {
  const mockCreate = vi.fn().mockResolvedValue({
    id: "cs_test_mock_session_id",
    url: "https://checkout.stripe.com/pay/cs_test_mock",
  });
  return { mockCreate };
});

vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: mockCreate,
        },
      },
    })),
  };
});

// Import after mocks are set up
const { appRouter } = await import("./routers");

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("checkout.createSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreate.mockResolvedValue({
      id: "cs_test_mock_session_id",
      url: "https://checkout.stripe.com/pay/cs_test_mock",
    });
  });

  it("creates a Stripe checkout session for PROGRAMA_NORMAL (680€)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.createSession({
      productKey: "PROGRAMA_NORMAL",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("PROGRAMA_NORMAL (680€) sends installments enabled to Stripe", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.checkout.createSession({
      productKey: "PROGRAMA_NORMAL",
      origin: "https://example.com",
    });

    expect(mockCreate).toHaveBeenCalledOnce();
    const callArg = mockCreate.mock.calls[0][0] as Stripe.Checkout.SessionCreateParams;
    expect(callArg.payment_method_options?.card?.installments?.enabled).toBe(true);
  });

  it("creates a Stripe checkout session for PROGRAMA_PROMO (480€)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.createSession({
      productKey: "PROGRAMA_PROMO",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("PROGRAMA_PROMO (480€) does NOT send installments to Stripe (à vista only)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.checkout.createSession({
      productKey: "PROGRAMA_PROMO",
      origin: "https://example.com",
    });

    expect(mockCreate).toHaveBeenCalledOnce();
    const callArg = mockCreate.mock.calls[0][0] as Stripe.Checkout.SessionCreateParams;
    const installmentsEnabled = callArg.payment_method_options?.card?.installments?.enabled;
    expect(installmentsEnabled).toBeFalsy();
  });

  it("rejects invalid product keys", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.checkout.createSession({
        productKey: "INVALID_KEY" as "PROGRAMA_NORMAL",
        origin: "https://example.com",
      })
    ).rejects.toThrow();
  });

  it("rejects invalid origin URLs", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.checkout.createSession({
        productKey: "PROGRAMA_NORMAL",
        origin: "not-a-url",
      })
    ).rejects.toThrow();
  });
});
