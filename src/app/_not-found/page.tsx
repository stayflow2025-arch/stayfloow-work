export const dynamic = "force-static";

export default function NotFound() {
  return (
    <html>
      <body>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Page non trouvée</h1>
          <p>La page que vous cherchez n'existe pas.</p>
        </div>
      </body>
    </html>
  );
}
