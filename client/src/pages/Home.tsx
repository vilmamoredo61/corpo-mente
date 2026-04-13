/**
 * SISTEMA INTEGRADO CORPO & MENTE
 * Versão estratégica de conversão — dois CTAs, WhatsApp, parcelamento, contacto
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/* ══════════════════════════════════════════════════════════
   CONSTANTES
══════════════════════════════════════════════════════════ */
const WHATSAPP_NUMBER = "351937461843";
const WHATSAPP_MSG = encodeURIComponent("Olá Vilma, gostaria de agendar uma consulta gratuita.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const EMAIL = "vilmamoredo61@gmail.com";

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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function GoldLine({ center = true }: { center?: boolean }) {
  return (
    <div style={{
      width: 56, height: 2,
      background: `linear-gradient(to right, ${S.blushMid}, ${S.gold}, ${S.blushMid})`,
      margin: center ? "1.25rem auto" : "1.25rem 0",
    }} />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.68rem", letterSpacing: "0.38em", textTransform: "uppercase", color: S.gold, marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

/* Botão dourado primário */
function BtnGold({ href, onClick, children, full = false }: { href?: string; onClick?: () => void; children: React.ReactNode; full?: boolean }) {
  const style: React.CSSProperties = {
    display: "inline-block",
    background: S.gold, color: S.white,
    padding: "0.95rem 2.25rem",
    fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
    textDecoration: "none", border: "none", cursor: "pointer",
    transition: "all 0.25s",
    boxShadow: "0 4px 18px rgba(201,168,76,0.28)",
    width: full ? "100%" : "auto",
    textAlign: "center" as const,
  };
  if (href) return (
    <a href={href} style={style}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#b8963e"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = S.gold; }}>
      {children}
    </a>
  );
  return (
    <button style={style} onClick={onClick}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#b8963e"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = S.gold; }}>
      {children}
    </button>
  );
}

/* Botão contorno */
function BtnOutline({ href, children, full = false }: { href: string; children: React.ReactNode; full?: boolean }) {
  return (
    <a href={href} style={{
      display: "inline-block",
      background: "transparent", color: S.dark,
      padding: "0.9rem 2.25rem",
      fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
      textDecoration: "none",
      border: `1.5px solid ${S.gold}`,
      transition: "all 0.25s",
      width: full ? "100%" : "auto",
      textAlign: "center" as const,
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = S.blush; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}>
      {children}
    </a>
  );
}

/* Checkout button com Stripe */
function CheckoutButton({ productKey, label, full = false }: { productKey: "PROGRAMA_NORMAL" | "PROGRAMA_PROMO"; label: string; full?: boolean }) {
  const createSession = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.success("A redirecionar para o pagamento seguro...");
        window.open(data.url, "_blank");
      }
    },
    onError: () => toast.error("Erro ao iniciar o pagamento. Por favor tente novamente."),
  });

  return (
    <button
      onClick={() => createSession.mutate({ productKey, origin: window.location.origin })}
      disabled={createSession.isPending}
      style={{
        background: S.gold, color: S.white,
        border: "none", padding: "0.95rem 2.25rem",
        fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
        cursor: createSession.isPending ? "not-allowed" : "pointer",
        opacity: createSession.isPending ? 0.7 : 1,
        transition: "all 0.25s",
        width: full ? "100%" : "auto",
        boxShadow: "0 4px 18px rgba(201,168,76,0.28)",
        textAlign: "center" as const,
      }}
      onMouseEnter={e => { if (!createSession.isPending) (e.currentTarget as HTMLButtonElement).style.background = "#b8963e"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = S.gold; }}
    >
      {createSession.isPending ? "A processar..." : label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   WHATSAPP FLUTUANTE
══════════════════════════════════════════════════════════ */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Falar no WhatsApp"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 56, height: 56, borderRadius: "50%",
        background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

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
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(247,242,234,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? `1px solid ${S.blushMid}` : "none",
      transition: "all 0.4s ease",
      padding: "0.9rem 2.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 600, color: S.dark, letterSpacing: "0.05em" }}>
        Corpo &amp; Mente
      </span>
      <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: S.gray, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = S.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = S.gray)}>
            {l.label}
          </a>
        ))}
        <a href="#preco" style={{
          fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
          background: S.gold, color: S.white, padding: "0.5rem 1.2rem",
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
   1. HERO
══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg, ${S.beige} 0%, ${S.blush} 55%, ${S.beige} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", position: "relative", overflow: "hidden", paddingTop: 80,
    }}>
      <div style={sidebar} />
      <div style={{ position: "absolute", top: -120, left: -120, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${S.blushMid} 0%, transparent 70%)`, opacity: 0.45 }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, ${S.goldLight} 0%, transparent 70%)`, opacity: 0.35 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, padding: "0 2rem" }}>
        <div style={{ animation: "fadeUp 0.9s ease forwards" }}>
          <Label>Sistema Integrado</Label>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            fontWeight: 700, color: S.dark, lineHeight: 1.1, marginBottom: "1.5rem",
          }}>
            Regular o corpo para<br />
            <em style={{ color: S.gold, fontStyle: "italic" }}>estabilizar a mente</em>
          </h1>
          <GoldLine />
          <p style={{ marginTop: "1.5rem", fontSize: "1.05rem", fontWeight: 300, color: S.gray, lineHeight: 1.8, maxWidth: 540, margin: "1.5rem auto 2.5rem" }}>
            Nutrição integrativa aplicada à saúde hormonal, intestinal, metabólica e emocional
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <BtnGold href="#preco">Quero iniciar o programa</BtnGold>
            <BtnOutline href={WHATSAPP_URL}>Agendar consulta gratuita</BtnOutline>
          </div>
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
    num: "01", area: "Saúde Hormonal e Metabólica",
    protocolo: "Protocolo Hormonal Metabólico",
    desc: "SOP, resistência à insulina e regulação do ciclo hormonal através de nutrição de precisão.",
  },
  {
    num: "02", area: "Saúde Intestinal e Inflamatória",
    protocolo: "Protocolo Intestinal Anti-inflamatório",
    desc: "Reequilíbrio da microbiota, redução da inflamação sistémica e suporte nutricional na endometriose.",
  },
  {
    num: "03", area: "Emagrecimento",
    protocolo: "Protocolo Metabólico Estratégico",
    desc: "Emagrecimento sustentável com regulação metabólica e abordagem do comportamento alimentar.",
  },
  {
    num: "04", area: "Saúde Mental",
    protocolo: "Método Mente Leve",
    desc: "Mente leve, corpo em equilíbrio. Nutrição aplicada à ansiedade, compulsão alimentar, fadiga e desregulação emocional.",
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
          <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", fontWeight: 300, color: S.gray }}>
            Cada área é uma porta de entrada para o mesmo método integrado
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
          {areas.map((a, i) => (
            <Reveal key={a.num} delay={0.1 + i * 0.12}>
              <div style={{
                background: S.beige, borderTop: `3px solid ${S.gold}`,
                padding: "2.25rem 2rem", height: "100%",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 40px rgba(201,168,76,0.14)`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: S.blushMid }}>{a.num}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: S.dark, margin: "0.75rem 0 0.35rem" }}>{a.area}</h3>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginBottom: "1rem" }}>{a.protocolo}</p>
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
   3. PROBLEMA
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
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem", color: S.dark, lineHeight: 1.6, marginBottom: "0.5rem" }}>
              O problema não é falta de disciplina.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem", color: S.gold, lineHeight: 1.6 }}>
              É desregulação do corpo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   4. SOLUÇÃO
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
            {["Acompanhamento individual", "Plano alimentar estratégico", "Regulação metabólica e hormonal", "Suporte comportamental"].map((item, i) => (
              <Reveal key={item} delay={0.1 + i * 0.1}>
                <div style={{ background: S.white, borderTop: `3px solid ${S.gold}`, padding: "1.75rem 1.5rem", textAlign: "center" }}>
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
   6. PREÇO
══════════════════════════════════════════════════════════ */
function Preco() {
  const { ref, inView } = useInView();
  return (
    <section id="preco" style={{ background: `linear-gradient(155deg, ${S.beige} 0%, ${S.blush} 60%, ${S.beige} 100%)`, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Investimento</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.dark }}>
            Programa Completo
          </h2>
          <GoldLine />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Normal */}
          <Reveal delay={0.1}>
            <div style={{ background: S.white, borderTop: `3px solid ${S.blushMid}`, padding: "3rem 2.5rem", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: S.gray, marginBottom: "1.5rem" }}>Programa Completo</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: S.dark, lineHeight: 1 }}>680<span style={{ fontSize: "1.5rem" }}>€</span></p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: S.gray, margin: "0.75rem 0 0.5rem" }}>8 a 10 semanas de acompanhamento individual</p>
                <p style={{ fontSize: "0.78rem", color: S.gold, marginBottom: "2rem" }}>ou até 5x de 136€</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <CheckoutButton productKey="PROGRAMA_NORMAL" label="Entrar no programa" full />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", textAlign: "center",
                  border: `1.5px solid ${S.gold}`, color: S.dark,
                  padding: "0.85rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = S.blush)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  Agendar consulta gratuita
                </a>
              </div>
            </div>
          </Reveal>

          {/* Promo */}
          <Reveal delay={0.25}>
            <div style={{ background: S.dark, borderTop: `3px solid ${S.gold}`, padding: "3rem 2.5rem", textAlign: "center", position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: S.gold, color: S.white, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0.35rem 1.25rem", whiteSpace: "nowrap" }}>
                Vagas Limitadas
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: S.goldLight, marginBottom: "1.5rem" }}>Condição Especial</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: S.white, lineHeight: 1 }}>480<span style={{ fontSize: "1.5rem" }}>€</span></p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: S.goldLight, margin: "0.75rem 0 0.5rem" }}>8 a 10 semanas de acompanhamento individual</p>
                <p style={{ fontSize: "0.78rem", color: S.blushMid, marginBottom: "2rem" }}>ou até 5x de 96€</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <CheckoutButton productKey="PROGRAMA_PROMO" label="Entrar no programa" full />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", textAlign: "center",
                  border: `1.5px solid ${S.blushMid}`, color: S.goldLight,
                  padding: "0.85rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(242,218,218,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  Agendar consulta gratuita
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.8rem", fontWeight: 300, color: S.gray }}>
            Pagamento seguro via Stripe. Cartão de crédito ou débito. Parcelamento disponível até 5x.
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
                width: 220, height: 268,
                margin: "0 auto",
                border: `3px solid ${S.gold}`,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(201,168,76,0.18)",
              }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416366521/oCwLaTitfD3Xe63bsbB7L4/vilma-foto_09b6b495.png"
                  alt="Vilma Moredo — Nutricionista Clínica"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: S.dark, marginTop: "1.25rem" }}>Vilma Moredo</p>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginTop: "0.25rem" }}>Nutricionista Clínica</p>
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
   8. DEPOIMENTOS
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
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: S.gold, marginTop: "0.2rem" }}>{d.area}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   9. CONTACTO
══════════════════════════════════════════════════════════ */
function Contacto() {
  const { ref, inView } = useInView();
  return (
    <section id="contacto" style={{ background: S.grayLight, padding: "7rem 0", position: "relative" }}>
      <div style={sidebar} />
      <div className="container" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.7s ease" }}>
          <Label>Contacto</Label>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: S.dark, marginBottom: "0.5rem" }}>
            Para dúvidas ou agendamento direto
          </h2>
          <GoldLine />
          <p style={{ marginTop: "1.25rem", fontSize: "1rem", fontWeight: 300, color: S.gray, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Entre em contacto para esclarecer dúvidas sobre o programa ou agendar a sua consulta gratuita de avaliação.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "#25D366", color: S.white,
              padding: "0.95rem 2rem", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              border: `1.5px solid ${S.gold}`, color: S.dark,
              padding: "0.9rem 2rem", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = S.blush)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   10. CTA FINAL
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
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <CheckoutButton productKey="PROGRAMA_PROMO" label="Quero começar agora" />
            <BtnOutline href={WHATSAPP_URL}>Agendar consulta gratuita</BtnOutline>
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
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: S.gray, marginTop: "0.5rem", textTransform: "uppercase" }}>
        Nutrição Integrativa · Saúde Feminina
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
        <a href={`mailto:${EMAIL}`} style={{ fontSize: "0.78rem", color: S.gray, textDecoration: "none" }}>{EMAIL}</a>
        <span style={{ color: S.gray }}>·</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: S.gray, textDecoration: "none" }}>937 461 843</a>
      </div>
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
      <WhatsAppFloat />
      <Navbar />
      <Hero />
      <Areas />
      <Problema />
      <Solucao />
      <Programa />
      <Preco />
      <Sobre />
      <Depoimentos />
      <Contacto />
      <CtaFinal />
      <Footer />
    </div>
  );
}
