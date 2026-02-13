export const metadata = {
  title: "Stayfloow",
  description: "Next.js + Firebase + Builder.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
