export default function Success() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(155deg, #F7F2EA 0%, #F2DADA 55%, #F7F2EA 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "2rem",
    }}>
      <div style={{ maxWidth: 560 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
          <div style={{ width: 24, height: 12, borderLeft: "2px solid #C9A84C", borderBottom: "2px solid #C9A84C", transform: "rotate(-45deg) translateY(-3px)" }} />
        </div>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>Pagamento Confirmado</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#3A3028", marginBottom: "1rem" }}>
          Bem-vinda ao programa
        </h1>
        <div style={{ width: 56, height: 2, background: "linear-gradient(to right, #EBC9C9, #C9A84C, #EBC9C9)", margin: "0 auto 1.5rem" }} />
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "#8A7E72", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          O seu pagamento foi processado com sucesso. Receberá um email de confirmação em breve com os próximos passos para iniciar o seu programa.
        </p>
        <a href="/" style={{
          display: "inline-block", background: "#C9A84C", color: "#fff",
          padding: "0.9rem 2.25rem", fontSize: "0.75rem", letterSpacing: "0.2em",
          textTransform: "uppercase", textDecoration: "none",
        }}>
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
