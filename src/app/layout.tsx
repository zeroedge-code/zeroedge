
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Fund Manager",
  description: "Simple portfolio dashboard for a fund manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
