import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Code Pro - Aulas",
  description: "Aprenda na prática a desenvolver soluções avançadas com LLM, RAG e Agentes de IA",
  keywords: "IA, inteligência artificial, programação, LLM, RAG, agentes de IA, curso, aulas",
  authors: [{ name: "Ciência dos Dados" }],
  openGraph: {
    title: "AI Code Pro - Aulas",
    description: "Aprenda na prática a desenvolver soluções avançadas com LLM, RAG e Agentes de IA",
    url: "https://ai-code-pro.cienciadosdados.com",
    siteName: "AI Code Pro",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
