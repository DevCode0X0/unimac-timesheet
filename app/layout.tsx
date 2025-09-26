// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Time App",
  description: "Aplikasi Absensi Pengawas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
