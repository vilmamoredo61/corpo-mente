/**
 * Produtos Stripe — Sistema Integrado Corpo & Mente
 * Preço normal: 680€
 * Preço promocional (condição especial): 480€
 */

export const PRODUCTS = {
  PROGRAMA_NORMAL: {
    name: "Sistema Integrado Corpo & Mente",
    description:
      "Regulação metabólica, hormonal e emocional através da nutrição integrativa. Acompanhamento individual de 12 semanas.",
    priceEur: 68000, // em cêntimos
    label: "Programa Completo",
    badge: null,
  },
  PROGRAMA_PROMO: {
    name: "Sistema Integrado Corpo & Mente — Condição Especial",
    description:
      "Regulação metabólica, hormonal e emocional através da nutrição integrativa. Acompanhamento individual de 12 semanas. Condição especial.",
    priceEur: 48000, // em cêntimos
    label: "Condição Especial",
    badge: null,
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
