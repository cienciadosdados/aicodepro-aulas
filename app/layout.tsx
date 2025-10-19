import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { PwaTracker } from '@/components/PwaTracker';
import { PwaInstallButton } from '@/components/PwaInstallButton';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
      <head>
        {/* Configuração do Google Analytics 4 */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PLACEHOLDER'} />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-black min-h-screen`}
      >
        <PwaTracker />
        <PwaInstallButton />
        {children}
      </body>
    </html>
  );
}
