/**
 * Produtos Stripe — Sistema Integrado Corpo & Mente
 * Preço normal: 680€
 * Preço promocional (vagas limitadas): 480€
 */

export const PRODUCTS = {
  PROGRAMA_NORMAL: {
    name: "Sistema Integrado Corpo & Mente",
    description:
      "Regulação metabólica, hormonal e emocional através da nutrição integrativa. Acompanhamento individual de 8 a 10 semanas.",
    priceEur: 68000, // em cêntimos
    label: "Programa Completo",
    badge: null,
  },
  PROGRAMA_PROMO: {
    name: "Sistema Integrado Corpo & Mente — Vagas Limitadas",
    description:
      "Regulação metabólica, hormonal e emocional através da nutrição integrativa. Acompanhamento individual de 8 a 10 semanas. Condição especial para vagas limitadas.",
    priceEur: 48000, // em cêntimos
    label: "Condição Especial",
    badge: "Vagas Limitadas",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
