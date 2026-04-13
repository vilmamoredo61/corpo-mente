import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock Stripe to avoid real API calls in tests
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({
            id: "cs_test_mock_session_id",
            url: "https://checkout.stripe.com/pay/cs_test_mock",
          }),
        },
      },
    })),
  };
});

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
  });

  it("creates a Stripe checkout session for PROGRAMA_NORMAL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.createSession({
      productKey: "PROGRAMA_NORMAL",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("creates a Stripe checkout session for PROGRAMA_PROMO", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.createSession({
      productKey: "PROGRAMA_PROMO",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
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
