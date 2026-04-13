/**
 * CORPO & MENTE — Home Page
 * Design: Editorial Clínico Sofisticado
 * Paleta: Bege (#F7F2EA) · Rosa (#F2DADA) · Dourado (#C9A84C) · Escuro (#3A3028)
 * Tipografia: Playfair Display (títulos) + Lato (corpo)
 */

import { useEffect, useRef, useState } from "react";

/* ── Intersection Observer hook para animações de scroll ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Componente de secção animada ── */
function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ── Divisor dourado ── */
function GoldDivider({ center = true }: { center?: boolean }) {
  return (
    <div
      style={{
        width: 64,
        height: 2,
        background: "linear-gradient(to right, #EBC9C9, #C9A84C, #EBC9C9)",
        margin: center ? "1.25rem auto" : "1.25rem 0",
      }}
    />
  );
}

/* ── Número decorativo ── */
function SectionNum({ n }: { n: string }) {
  return (
    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.7rem", letterSpacing: "0.35em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "0.5rem" }}>
      {n}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Conceito", href: "#conceito" },
    { label: "Problema", href: "#problema" },
    { label: "Solução", href: "#solucao" },
    { label: "Programa", href: "#programa" },
    { label: "Parceria", href: "#parceria" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(247,242,234,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid #EDE4D3" : "none",
        transition: "all 0.4s ease",
        padding: "1rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "#3A3028", letterSpacing: "0.05em" }}>
        Corpo &amp; Mente
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7E72", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A7E72")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO / CAPA
══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #F7F2EA 0%, #F2DADA 50%, #F7F2EA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Ornamentos de fundo */}
      <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #EBC9C9 0%, transparent 70%)", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #E8D5A3 0%, transparent 70%)", opacity: 0.4 }} />
      {/* Barra lateral dourada */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, padding: "0 2rem" }} className="fade-up">
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>
          Proposta de Parceria
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 700, color: "#3A3028", lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
          Programa<br />Corpo &amp; Mente
        </h1>
        <GoldDivider />
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#8A7E72", marginTop: "1.5rem" }}>
          Nutrição e Saúde Mental Integrativa
        </p>
      </div>

      {/* Seta de scroll */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #C9A84C)" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C" }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CONCEITO
══════════════════════════════════════════════════════════ */
function Conceito() {
  const { ref, inView } = useInView();
  return (
    <section id="conceito" style={{ background: "#FFFFFF", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <SectionNum n="02 — O Conceito" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028", marginBottom: "0.5rem" }}>
            Corpo e mente são um sistema único
          </h2>
          <GoldDivider />

          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#3A3028", lineHeight: 1.7 }}>
              A saúde mental não é apenas emocional.
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#3A3028", lineHeight: 1.7 }}>
              E a alimentação não é apenas física.
            </p>
          </div>

          <div style={{ marginTop: "3rem", background: "#FFFFFF", borderLeft: "4px solid #C9A84C", padding: "2rem 2.5rem", textAlign: "left", boxShadow: "0 4px 30px rgba(58,48,40,0.06)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.4rem", color: "#C9A84C", lineHeight: 1.6 }}>
              "Não faz sentido tratar ansiedade só com terapia.<br />
              Nem compulsão só com alimentação."
            </p>
          </div>

          <p style={{ marginTop: "2.5rem", fontSize: "1rem", fontWeight: 300, color: "#8A7E72", lineHeight: 1.8 }}>
            Existe uma ligação direta entre intestino, cérebro e comportamento.<br />
            Quando tratamos apenas uma parte, o sistema continua desequilibrado.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   O PROBLEMA
══════════════════════════════════════════════════════════ */
const problemas = [
  { n: "01", text: "O paciente vive em tentativa constante." },
  { n: "02", text: "Faz dieta e não sustenta." },
  { n: "03", text: "Faz terapia e não regula o corpo." },
  { n: "04", text: "Melhora e volta ao padrão." },
];

function Problema() {
  const { ref, inView } = useInView();
  return (
    <section id="problema" style={{ background: "#F2DADA", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionNum n="03 — O Problema" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028" }}>
              O tratamento está fragmentado
            </h2>
            <GoldDivider />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {problemas.map((p, i) => (
              <div
                key={p.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom: i < problemas.length - 1 ? "1px solid #EBC9C9" : "none",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.1 + i * 0.12}s`,
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#EBC9C9", minWidth: 56 }}>{p.n}</span>
                <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "#3A3028", lineHeight: 1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem", background: "white", borderLeft: "4px solid #C9A84C", padding: "1.5rem 2rem" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem", color: "#3A3028" }}>
              Conclusão: o tratamento está fragmentado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   A SOLUÇÃO
══════════════════════════════════════════════════════════ */
const niveis = [
  { title: "Fisiológico", desc: "Regulação do corpo, energia, sintomas físicos e microbiota intestinal." },
  { title: "Comportamental", desc: "Padrões de conduta alimentar, rotinas e sustentabilidade do processo." },
  { title: "Emocional", desc: "Relação com a comida, regulação emocional e padrões psicológicos." },
];

function Solucao() {
  const { ref, inView } = useInView();
  return (
    <section id="solucao" style={{ background: "#F7F2EA", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionNum n="04 — A Solução" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028", marginBottom: "0.5rem" }}>
              Programa integrado de Nutrição e Saúde Mental
            </h2>
            <GoldDivider />
            <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A7E72" }}>
              Atuação em três níveis
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {niveis.map((n, i) => (
              <div
                key={n.title}
                style={{
                  background: "white",
                  borderTop: "3px solid #C9A84C",
                  padding: "2.25rem 2rem",
                  boxShadow: "0 4px 24px rgba(58,48,40,0.05)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.65s ease ${0.1 + i * 0.15}s`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 40px rgba(201,168,76,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(58,48,40,0.05)")}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#C9A84C", marginBottom: "1rem" }}>{n.title}</h3>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "#8A7E72", lineHeight: 1.7 }}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ESTRUTURA DO PROGRAMA
══════════════════════════════════════════════════════════ */
const nutricao = ["Plano alimentar estratégico", "Regulação de sintomas físicos", "Ajuste de energia e fome"];
const psicologia = ["Padrões emocionais", "Relação com a comida", "Regulação emocional"];

function Programa() {
  const { ref, inView } = useInView();
  return (
    <section id="programa" style={{ background: "white", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionNum n="05 — Estrutura do Programa" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028" }}>
              Como funciona
            </h2>
            <GoldDivider />
            <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A7E72" }}>
              Duração de 8 a 12 semanas
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[{ title: "Nutrição", items: nutricao }, { title: "Psicologia", items: psicologia }].map((col, i) => (
              <div
                key={col.title}
                style={{
                  background: "#F7F2EA",
                  borderTop: "3px solid #C9A84C",
                  padding: "2.5rem 2.25rem",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.65s ease ${0.1 + i * 0.2}s`,
                }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#C9A84C", marginBottom: "1.5rem" }}>{col.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.items.map((item, j) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 0",
                        borderBottom: j < col.items.length - 1 ? "1px solid #EDE4D3" : "none",
                        fontSize: "1rem",
                        fontWeight: 300,
                        color: "#3A3028",
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   O DIFERENCIAL
══════════════════════════════════════════════════════════ */
function Diferencial() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: "#F2DADA", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionNum n="06 — O Diferencial" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028" }}>
              O mercado trata separado.<br />Nós tratamos integrado.
            </h2>
            <GoldDivider />
          </div>

          <div style={{ background: "white", borderLeft: "4px solid #C9A84C", padding: "2.5rem 3rem", boxShadow: "0 4px 30px rgba(58,48,40,0.06)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.35rem", color: "#C9A84C", lineHeight: 1.7, marginBottom: "1rem" }}>
              Enquanto o corpo não regula, a mente não estabiliza.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.35rem", color: "#C9A84C", lineHeight: 1.7 }}>
              Enquanto a mente não regula, o comportamento não sustenta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   POSICIONAMENTO
══════════════════════════════════════════════════════════ */
function Posicionamento() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: "#F7F2EA", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <SectionNum n="07 — Posicionamento" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028", marginBottom: "0.5rem" }}>
            Posicionamento
          </h2>
          <GoldDivider center={false} />

          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#8A7E72", marginBottom: "0.75rem" }}>Não é acompanhamento.</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#8A7E72", marginBottom: "2.5rem" }}>Não é consulta.</p>
            <div style={{ borderLeft: "5px solid #C9A84C", paddingLeft: "2rem", background: "white", padding: "1.75rem 2rem" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.6rem", color: "#3A3028", lineHeight: 1.4 }}>
                É um processo de reequilíbrio completo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PROPOSTA DE PARCERIA
══════════════════════════════════════════════════════════ */
const parceria = [
  { n: "01", text: "Construção de um programa conjunto" },
  { n: "02", text: "Atuação integrada entre Nutrição e Psicologia" },
  { n: "03", text: "Posicionamento diferenciado no mercado" },
];

function Parceria() {
  const { ref, inView } = useInView();
  return (
    <section id="parceria" style={{ background: "white", padding: "7rem 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionNum n="08 — Proposta de Parceria" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3A3028" }}>
              Proposta de Parceria
            </h2>
            <GoldDivider />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {parceria.map((p, i) => (
              <div
                key={p.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.75rem 0",
                  borderBottom: i < parceria.length - 1 ? "1px solid #EDE4D3" : "none",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.1 + i * 0.12}s`,
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#EBC9C9", minWidth: 56 }}>{p.n}</span>
                <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#3A3028", lineHeight: 1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FECHAMENTO
══════════════════════════════════════════════════════════ */
function Fechamento() {
  const { ref, inView } = useInView();
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #F7F2EA 0%, #F2DADA 50%, #F7F2EA 100%)",
        padding: "9rem 0",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Ornamentos circulares */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", border: "1px solid #E8D5A3", opacity: 0.4 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: 360, borderRadius: "50%", border: "1px solid #E8D5A3", opacity: 0.3 }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9A84C, #EBC9C9, #C9A84C)" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.75s ease" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "2rem" }}>Fechamento</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#3A3028", lineHeight: 1.5, maxWidth: 700, margin: "0 auto 2.5rem" }}>
            Ou tratamos o sistema completo...<br />
            Ou continuamos a rodar em círculos.
          </p>
          <GoldDivider />
          <p style={{ marginTop: "2rem", fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8A7E72" }}>
            Vamos construir isto juntas?
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   RODAPÉ
══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: "#3A3028", padding: "2.5rem 0", textAlign: "center" }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#E8D5A3", letterSpacing: "0.1em" }}>
        Programa Corpo &amp; Mente
      </p>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "#8A7E72", marginTop: "0.5rem", textTransform: "uppercase" }}>
        Nutrição e Saúde Mental Integrativa
      </p>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif" }}>
      <Navbar />
      <Hero />
      <Conceito />
      <Problema />
      <Solucao />
      <Programa />
      <Diferencial />
      <Posicionamento />
      <Parceria />
      <Fechamento />
      <Footer />
    </div>
  );
}
