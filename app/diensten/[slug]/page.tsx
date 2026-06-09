import Link from "next/link";

/* Placeholder for the dedicated service pages. The landing's service CTAs and
   footer link here; the full per-service pages are a follow-up (the prototype
   bundle includes Uitvaartfotografie / Karakterportretten / Analoge huwelijken). */
const NAMES: Record<string, string> = {
  uitvaart: "Uitvaartfotografie",
  portret: "Karakterportretten",
  huwelijk: "Analoge huwelijken",
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = NAMES[slug] ?? "Dienst";
  return (
    <main
      className="wrap"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
        paddingTop: 120,
        paddingBottom: 120,
      }}
    >
      <div className="overline">In opbouw</div>
      <h1 className="display" style={{ fontSize: "clamp(40px, 7vw, 96px)", margin: 0 }}>
        {name}
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: "46ch", lineHeight: 1.66 }}>
        Deze dienstpagina wordt binnenkort uitgewerkt — met de volledige filosofie, werkwijze en het
        eindproduct van A tot Z. Keer voorlopig terug naar de landingspagina voor een blik op het werk en
        om kennis te maken.
      </p>
      <Link className="btn" href="/" style={{ alignSelf: "flex-start" }}>
        ← Terug naar home
      </Link>
    </main>
  );
}
