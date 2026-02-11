import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Jessica Rose — Segurança do Trabalho",
  description:
    "Consultoria especializada em SST. PGR, PCMSO, LTCAT, PPP, treinamentos NR e laudos técnicos em Vitória-ES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={lato.variable}>{children}</body>
    </html>
  );
}
