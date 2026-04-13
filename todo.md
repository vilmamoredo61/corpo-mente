# Corpo & Mente — TODO

## Redesign Completo (Novo Posicionamento)

- [x] Reescrever Home.tsx com todas as secções novas (Hero, Áreas, Problema, Solução, Programa, Preço, Autoridade, Depoimentos, CTA Final)
- [x] Criar server/products.ts com produtos Stripe (680€ e 480€)
- [x] Adicionar rota de checkout no servidor (tRPC ou REST)
- [x] Adicionar webhook Stripe em /api/stripe/webhook
- [x] Criar página /success para confirmação de pagamento
- [x] Criar página /cancel para cancelamento
- [x] Adicionar rotas no App.tsx (/success, /cancel)
- [x] Actualizar CSS (index.css) com paleta bege/rosa/dourado/cinza
- [x] Escrever testes vitest para checkout

## Actualização Estratégica (Prompt 3)

- [x] Adicionar segundo botão CTA "Agendar consulta gratuita" no Hero e nas secções de preço e CTA final
- [x] Adicionar botão WhatsApp flutuante e secção de contacto (email + WhatsApp)
- [x] Actualizar secção de preço com opção parcelamento até 5x
- [x] Actualizar checkout Stripe para suportar parcelamento (payment_method_types com card + link)
- [x] Refinar Hero com dois botões lado a lado
- [x] Adicionar texto de apoio na secção de contacto

## Foto Profissional (Secção Sobre)

- [x] Extrair foto do DOCX e fazer upload para CDN
- [x] Substituir placeholder circular pela foto real na secção Sobre

## Correção de Bug

- [x] Corrigir botão "Agendar consulta gratuita" no Hero que não está a funcionar

## Correcções SEO

- [x] Corrigir título da página (30-60 caracteres)
- [x] Adicionar meta description (50-160 caracteres)
- [x] Adicionar meta keywords com palavras-chave relevantes
- [x] Adicionar meta Open Graph para partilha em redes sociais

## SEO — Palavras-chave de Conversão

- [x] Actualizar meta keywords com termos de intenção de compra
- [x] Adicionar dados estruturados JSON-LD (Schema.org) para profissional de saúde
