/**
 * SISTEMA INTEGRADO CORPO & MENTE
 * Redesign completo — posicionamento premium, orientado para conversão
 * Paleta: Rosa suave · Bege · Dourado · Cinza claro
 * Tipografia: Playfair Display (títulos) + Lato (corpo)
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/* ══════════════════════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function GoldLine({ center = true }: { center?: boolean }) {
  return (
    <div style={{
      width: 56,
      height: 2,
      background: "linear-gradient(to right, #EBC9C9, #C9A84C, #EBC9C9)",
      margin: center ? "1.25rem auto" : "1.25rem 0",
    }} />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.68rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

const S = {
  beige: "#F7F2EA",
  blush: "#F2DADA",
  blushMid: "#EBC9C9",
  gold: "#C9A84C",
  goldLight: "#E8D5A3",
  dark: "#3A3028",
  gray: "#8A7E72",
  white: "#FFFFFF",
  grayLight: "#F4F4F4",
};

const sidebar = {
  position: "absolute" as const,
  left: 0, top: 0, bottom: 0,
  width: 5,
  background: `linear-gradient(to bottom, ${S.gold}, ${S.blushMid}, ${S.gold})`,
};

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Áreas", href: "#areas" },
    { label: "Método", href: "#metodo" },
    { label: "Programa", href: "#programa" },
    { label: "Investimento", href: "#preco" },
    { label: "Sobre", href: "#sobre" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(247,242,234,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? `1px solid ${S.blushMid}` : "none",
      transition: "all 0.4s ease",
      padding: "1rem 2.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 600, color: S.dark, letterSpacing: "0.05em" }}>
        Corpo &amp; Mente
      </span>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: S.gray, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = S.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = S.gray)}>
            {l.label}
          </a>
        ))}
        <a href="#preco" style={{
          fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
          background: S.gold, color: S.white, padding: "0.55rem 1.25rem",
          textDecoration: "none", transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          Iniciar Programa
        </a>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════
   1. HERO — PROMESSA PRINCIPAL
══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg, ${S.beige} 0%, ${S.blush} 55%, ${S.beige} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", position: "relative", overflow: "hidden", paddingTop: 80,
    }}>
      <div style={{ ...sidebar }} />
      <div style={{ position: "absolute", top: -120, left: -120, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${S.blushMid} 0%, transparent 70%)`, opacity: 0.45 }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, ${S.goldLight} 0%, transparent 70%)`, opacity: 0.35 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, padding: "0 2rem" }}>
        <div style={{ opacity: 1, animation: "fadeUp 0.9s ease forwards" }}>
          <Label>Sistema Integrado</Label>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 700, color: S.dark, lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Regular o corpo para<br />
            <em style={{ color: S.gold, fontStyle: "italic" }}>estabilizar a mente</em>
          </h1>
          <GoldLine />
          <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", fontWeight: 300, color: S.gray, lineHeight: 1.75, maxWidth: 560, margin: "1.5rem auto 2.5rem" }}>
            Nutrição integrativa aplicada à saúde hormonal, intestinal, metabólica e emocional
          </p>
          <a href="#preco" style={{
            display: "inline-block",
            background: S.gold, color: S.white,
            padding: "1rem 2.5rem",
            fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase",
            textDecoration: "none", transition: "all 0.25s",
            boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#b8963e"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(201,168,76,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = S.gold; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.3)"; }}>
            Quero iniciar o programa
          </a>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, transparent, ${S.gold})` }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: S.gold }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   2. ÁREAS DE ATUAÇÃO
══════════════════════════════════════════════════════════ */
const areas = [
  {
    num: "01",
    area: "Saúde Hormonal e Metabólica",
    protocolo: "Protocolo Hormonal Metabólico",
    desc: "Regulação do ciclo hormonal, síndrome do ovário policístico e resistência à insulina através de nutrição de precisão.",
  },
  {
    num: "02",
    area: "Saúde Intestinal e Inflamatória",
    protocolo: "Protocolo Intestinal Anti-inflamatório",
    desc: "Reequilíbrio da microbiota, redução da inflamação sistémica e suporte nutricional na endometriose.",
  },
  {
    num: "03",
    area: "Emagrecimento",
    protocolo: "Protocolo Metabólico Estratégico",
    desc: "Emagrecimento sustentável com regulação metabólica e abordagem do comportamento alimentar.",
  },
  {
    num: "04",
    area: "Saúde Mental",
    protocolo: "Método Mente Leve",
    desc: "Mente leve, corpo em equilíbrio. Abordagem nutricional da ansiedade, compulsão alimentar, fadiga e desregulação emocional.",
  },
];

function Areas() {
  const { ref, inView } = useInView();
  return (
    <section id="areas" style={{ background: S.white, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Áreas de Atuação</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
            Identifique o seu ponto de entrada
          </h2>
          <GoldLine />
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", fontWeight: 300, color: S.gray }}>
            Cada área é uma porta de entrada para o mesmo método integrado
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
          {areas.map((a, i) => (
            <Reveal key={a.num} delay={0.1 + i * 0.12}>
              <div style={{
                background: S.beige,
                borderTop: `3px solid ${S.gold}`,
                padding: "2.25rem 2rem",
                height: "100%",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 40px rgba(201,168,76,0.14)`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: S.blushMid }}>{a.num}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: S.dark, margin: "0.75rem 0 0.35rem" }}>{a.area}</h3>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginBottom: "1rem" }}>{a.protocolo}</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 300, color: S.gray, lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   3. O PROBLEMA
══════════════════════════════════════════════════════════ */
function Problema() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: S.blush, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>O Problema</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark, marginBottom: "0.5rem" }}>
            Reconhece-se aqui?
          </h2>
          <GoldLine center={false} />

          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column" }}>
            {[
              "Se já tentou dieta e não conseguiu manter",
              "Se tem sintomas hormonais, intestinais ou emocionais constantes",
              "Se sente cansaço, ansiedade ou falta de controlo alimentar",
            ].map((text, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "1.25rem",
                padding: "1.25rem 0",
                borderBottom: i < 2 ? `1px solid ${S.blushMid}` : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.55s ease ${0.15 + i * 0.12}s`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: S.gold, marginTop: 9, flexShrink: 0 }} />
                <p style={{ fontSize: "1.1rem", fontWeight: 300, color: S.dark, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem", background: S.white, borderLeft: `4px solid ${S.gold}`, padding: "2rem 2.5rem", boxShadow: "0 4px 24px rgba(58,48,40,0.06)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.35rem", color: S.dark, lineHeight: 1.6, marginBottom: "0.5rem" }}>
              O problema não é falta de disciplina.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.35rem", color: S.gold, lineHeight: 1.6 }}>
              É desregulação do corpo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   4. A SOLUÇÃO — MÉTODO INTEGRADO
══════════════════════════════════════════════════════════ */
function Solucao() {
  const { ref, inView } = useInView();
  return (
    <section id="metodo" style={{ background: S.white, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Label>A Solução</Label>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
              Corpo e mente funcionam juntos
            </h2>
            <GoldLine />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { title: "O intestino e o cérebro comunicam-se constantemente", desc: "O eixo intestino-cérebro regula o humor, a energia, a inflamação e o comportamento alimentar. Tratar o intestino é tratar a mente." },
              { title: "O metabolismo influencia emoções e comportamento", desc: "Desequilíbrios metabólicos e hormonais geram ansiedade, compulsão e fadiga. Regular o metabolismo estabiliza as emoções." },
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 + i * 0.15}>
                <div style={{ background: S.beige, borderTop: `3px solid ${S.gold}`, padding: "2.25rem 2rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: S.dark, marginBottom: "1rem", lineHeight: 1.4 }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9rem", fontWeight: 300, color: S.gray, lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   5. ESTRUTURA DO PROGRAMA
══════════════════════════════════════════════════════════ */
const includes = [
  "Acompanhamento individual",
  "Plano alimentar estratégico",
  "Regulação metabólica e hormonal",
  "Suporte comportamental",
];

function Programa() {
  const { ref, inView } = useInView();
  return (
    <section id="programa" style={{ background: S.grayLight, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Label>Estrutura</Label>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
              Sistema Integrado Corpo &amp; Mente
            </h2>
            <GoldLine />
            <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: S.gray }}>
              Duração de 8 a 10 semanas
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
            {includes.map((item, i) => (
              <Reveal key={item} delay={0.1 + i * 0.1}>
                <div style={{
                  background: S.white,
                  borderTop: `3px solid ${S.gold}`,
                  padding: "1.75rem 1.5rem",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: S.dark, lineHeight: 1.5 }}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   6. PREÇO — SECÇÃO DE CONVERSÃO
══════════════════════════════════════════════════════════ */
function CheckoutButton({ productKey, label, style }: { productKey: "PROGRAMA_NORMAL" | "PROGRAMA_PROMO"; label: string; style?: React.CSSProperties }) {
  const createSession = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.success("A redirecionar para o pagamento seguro...");
        window.open(data.url, "_blank");
      }
    },
    onError: (err) => {
      toast.error("Erro ao iniciar o pagamento. Por favor tente novamente.");
      console.error(err);
    },
  });

  return (
    <button
      onClick={() => createSession.mutate({ productKey, origin: window.location.origin })}
      disabled={createSession.isPending}
      style={{
        background: S.gold, color: S.white,
        border: "none", padding: "1rem 2.5rem",
        fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase",
        cursor: createSession.isPending ? "not-allowed" : "pointer",
        opacity: createSession.isPending ? 0.7 : 1,
        transition: "all 0.25s",
        width: "100%",
        ...style,
      }}
      onMouseEnter={e => { if (!createSession.isPending) (e.currentTarget as HTMLButtonElement).style.background = "#b8963e"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = S.gold; }}
    >
      {createSession.isPending ? "A processar..." : label}
    </button>
  );
}

function Preco() {
  const { ref, inView } = useInView();
  return (
    <section id="preco" style={{ background: `linear-gradient(155deg, ${S.beige} 0%, ${S.blush} 60%, ${S.beige} 100%)`, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Investimento</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
            Programa Completo
          </h2>
          <GoldLine />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Preço normal */}
          <Reveal delay={0.1}>
            <div style={{ background: S.white, borderTop: `3px solid ${S.blushMid}`, padding: "3rem 2.5rem", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: S.gray, marginBottom: "1.5rem" }}>Programa Completo</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: S.dark, lineHeight: 1 }}>680<span style={{ fontSize: "1.5rem" }}>€</span></p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: S.gray, margin: "1rem 0 2rem" }}>8 a 10 semanas de acompanhamento individual</p>
              </div>
              <CheckoutButton productKey="PROGRAMA_NORMAL" label="Entrar no programa" />
            </div>
          </Reveal>

          {/* Preço promocional */}
          <Reveal delay={0.25}>
            <div style={{ background: S.dark, borderTop: `3px solid ${S.gold}`, padding: "3rem 2.5rem", textAlign: "center", position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: S.gold, color: S.white, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0.35rem 1.25rem" }}>
                Vagas Limitadas
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: S.goldLight, marginBottom: "1.5rem" }}>Condição Especial</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: S.white, lineHeight: 1 }}>480<span style={{ fontSize: "1.5rem" }}>€</span></p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: S.goldLight, margin: "1rem 0 0.5rem" }}>8 a 10 semanas de acompanhamento individual</p>
                <p style={{ fontSize: "0.78rem", color: S.blushMid, marginBottom: "2rem" }}>Vagas limitadas — condição especial de lançamento</p>
              </div>
              <CheckoutButton productKey="PROGRAMA_PROMO" label="Entrar no programa" style={{ background: S.gold }} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.8rem", fontWeight: 300, color: S.gray }}>
            Pagamento seguro via Stripe. Cartão de crédito ou débito.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   7. AUTORIDADE
══════════════════════════════════════════════════════════ */
function Sobre() {
  const { ref, inView } = useInView();
  return (
    <section id="sobre" style={{ background: S.white, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 180, height: 180, borderRadius: "50%",
                background: `linear-gradient(135deg, ${S.blush}, ${S.beige})`,
                margin: "0 auto",
                border: `3px solid ${S.gold}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: S.gold, fontStyle: "italic" }}>V</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: S.dark, marginTop: "1.25rem" }}>Vilma Moredo</p>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginTop: "0.25rem" }}>Nutricionista Clínica</p>
            </div>
            <div>
              <Label>Sobre</Label>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: S.dark, marginBottom: "0.5rem" }}>
                Abordagem integrativa e individualizada
              </h2>
              <GoldLine center={false} />
              <p style={{ marginTop: "1.5rem", fontSize: "1rem", fontWeight: 300, color: S.gray, lineHeight: 1.85 }}>
                Com formação em Nutrição Clínica, Nutrição Funcional, Saúde Intestinal e Nutrição Estética, desenvolvi um método que trata o organismo como um sistema integrado — onde intestino, metabolismo, hormonas e mente funcionam em conjunto.
              </p>
              <p style={{ marginTop: "1rem", fontSize: "1rem", fontWeight: 300, color: S.gray, lineHeight: 1.85 }}>
                A minha abordagem é sempre individualizada, baseada na fisiologia de cada pessoa, com foco em resultados sustentáveis e duradouros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   8. DEPOIMENTOS (estrutura)
══════════════════════════════════════════════════════════ */
const depoimentos = [
  { texto: "Depois de anos a tentar dietas sem resultado, percebi que o problema era hormonal. Com o protocolo da Vilma, regulei o ciclo e perdi peso de forma natural.", nome: "Sofia M.", area: "Saúde Hormonal" },
  { texto: "Tinha ansiedade e compulsão alimentar constantes. Nunca imaginei que a alimentação pudesse ter tanto impacto no meu estado emocional.", nome: "Catarina R.", area: "Saúde Mental" },
  { texto: "O meu intestino estava completamente desregulado. Em 8 semanas senti uma diferença enorme na energia e no bem-estar geral.", nome: "Ana P.", area: "Saúde Intestinal" },
];

function Depoimentos() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: S.beige, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Resultados</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
            O que dizem as clientes
          </h2>
          <GoldLine />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {depoimentos.map((d, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <div style={{ background: S.white, borderLeft: `4px solid ${S.gold}`, padding: "2.25rem 2rem", height: "100%" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: S.dark, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  "{d.texto}"
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: S.dark }}>{d.nome}</p>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginTop: "0.2rem" }}>{d.area}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   9. CTA FINAL
══════════════════════════════════════════════════════════ */
function CtaFinal() {
  const { ref, inView } = useInView();
  return (
    <section style={{
      background: `linear-gradient(155deg, ${S.beige} 0%, ${S.blush} 55%, ${S.beige} 100%)`,
      padding: "9rem 0", position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 520, height: 520, borderRadius: "50%", border: `1px solid ${S.goldLight}`, opacity: 0.4 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: 360, borderRadius: "50%", border: `1px solid ${S.goldLight}`, opacity: 0.3 }} />
      <div style={sidebar} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Decisão</Label>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontStyle: "italic",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: S.dark,
            lineHeight: 1.5, maxWidth: 680, margin: "0 auto 2.5rem",
          }}>
            Ou trata o sistema completo<br />
            ou continua a rodar em círculos.
          </p>
          <GoldLine />
          <div style={{ marginTop: "2.5rem" }}>
            <CheckoutButton productKey="PROGRAMA_PROMO" label="Quero começar agora" style={{ width: "auto", padding: "1.1rem 3rem", fontSize: "0.85rem", boxShadow: "0 4px 24px rgba(201,168,76,0.3)" }} />
          </div>
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
    <footer style={{ background: S.dark, padding: "3rem 0", textAlign: "center" }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: S.goldLight, letterSpacing: "0.08em" }}>
        Sistema Integrado Corpo &amp; Mente
      </p>
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", color: S.gray, marginTop: "0.5rem", textTransform: "uppercase" }}>
        Nutrição Integrativa · Saúde Feminina
      </p>
      <p style={{ fontSize: "0.75rem", color: S.gray, marginTop: "1.5rem" }}>
        vilmamoredo61@gmail.com · 937 461 843
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
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <Areas />
      <Problema />
      <Solucao />
      <Programa />
      <Preco />
      <Sobre />
      <Depoimentos />
      <CtaFinal />
      <Footer />
    </div>
  );
}
