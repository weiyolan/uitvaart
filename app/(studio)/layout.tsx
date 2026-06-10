/* Second root layout (route group) — deliberately bare: no globals.css, so
   the site's Tailwind preflight/tokens never touch the Studio. */
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
