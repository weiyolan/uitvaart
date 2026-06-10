import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <p className="display" style={{ fontSize: "clamp(40px,8vw,96px)", margin: 0 }}>
          404
        </p>
        <p style={{ margin: "12px 0 24px" }}>Deze pagina bestaat niet (meer).</p>
        <Link className="btn" href="/nl">
          Naar de homepagina
        </Link>
      </div>
    </main>
  );
}
