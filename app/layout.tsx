import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { PwaTracker } from '@/components/PwaTracker';
import { PwaInstallButton } from '@/components/PwaInstallButton';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { BlackFridayBar } from '@/components/BlackFridayBar';
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
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0c83fe" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-black min-h-screen`}
      >
        <ServiceWorkerRegistration />
        <PwaTracker />
        <PwaInstallButton />
        <BlackFridayBar />
        {children}
      </body>
    </html>
  );
}
