'use client';

import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';
import { FloatingGrid } from '@/components/FloatingGrid';

export default function EsperaPage() {
  useEffect(() => {
    // Track page view - usando 0 como número da página de espera
    trackAulaView(0);
  }, []);

  const handleCTAClick = () => {
    // Track CTA click
    if (typeof window !== 'undefined') {
      console.log('CTA clicked - Redirecting to formation page');
      
      // Track with existing tracking service
      try {
        const sessionId = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_session_id') : null;
        console.log('Espera page CTA clicked', { sessionId });
      } catch (error) {
        console.error('Error tracking espera CTA:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* FloatingGrid background - igual ao site original */}
      <FloatingGrid />
      
      {/* Header com mesmo estilo do site */}
      <header className="w-full py-4 bg-black/60 backdrop-blur-md border-b border-[#0c83fe]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="relative inline-block group">
              {/* Efeito de borda luminosa - igual ao header original */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-lg blur-md opacity-90 group-hover:opacity-100 animate-pulse-slow"></div>
              <div className="absolute -inset-2.5 bg-gradient-to-r from-[#0c83fe]/50 via-[#00ff88]/30 to-[#0c83fe]/50 rounded-lg blur-xl opacity-70 animate-pulse-slow animation-delay-1000"></div>
              
              <div className="relative px-4 py-1.5 rounded-lg bg-black/90 border-2 border-[#0c83fe] z-10 shadow-[0_0_10px_rgba(12,131,254,0.7)]">
                <h1 className="text-xl font-bold text-[#0c83fe] drop-shadow-[0_0_3px_rgba(12,131,254,0.8)]">
                  AI Code Pro
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status message */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-green-400 font-semibold">Evento Finalizado com Sucesso</span>
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0c83fe] via-[#00ff88] to-[#0c83fe] bg-clip-text text-transparent">
            Obrigado por Participar!
          </h1>
          
          {/* Subtitle */}
          <div className="bg-gradient-to-r from-[#0c83fe]/10 to-[#00ff88]/10 border border-[#0c83fe]/30 rounded-xl p-6 mb-8">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              🎯 <strong className="text-[#00ff88]">Estão oficialmente abertas as matrículas</strong> para a formação 
              <span className="text-[#0c83fe] font-bold">AI PRO EXPERT – Especialista em Inteligência Artificial Aplicada</span>.
            </p>
            <p className="text-gray-300 mt-4">
              Essa formação foi criada pra quem <strong>já programa</strong> e agora quer <strong className="text-[#00ff88]">dominar o jogo com IA</strong> — 
              aplicando os conceitos em soluções reais, automações, produtos e até SaaS.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 mb-12">
            {/* Learning Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-[#0c83fe]/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-white">O que você vai aprender:</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#00ff88] mr-3 text-lg">✅</span>
                  <span className="text-gray-200">LLMs, Agentes Autônomos e Automação de Processos</span>
                </div>
                <div className="flex items-start p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#00ff88] mr-3 text-lg">✅</span>
                  <span className="text-gray-200">MCP, RAG com LangChain, CrewAI, Anthropic, OpenAI</span>
                </div>
                <div className="flex items-start p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#00ff88] mr-3 text-lg">✅</span>
                  <span className="text-gray-200">Deploy de aplicações reais com IA</span>
                </div>
                <div className="flex items-start p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#00ff88] mr-3 text-lg">✅</span>
                  <span className="text-gray-200">Banco de Dados Vetorial e Integrações com APIs</span>
                </div>
                <div className="flex items-start p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20 md:col-span-2">
                  <span className="text-[#00ff88] mr-3 text-lg">✅</span>
                  <span className="text-gray-200">Projetos prontos para mercado e portfólio</span>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-[#0c83fe]/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-white">O que você recebe:</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#0c83fe] mr-4 text-2xl">📜</span>
                  <span className="text-gray-200 text-lg">Certificado reconhecido pelo MEC</span>
                </div>
                <div className="flex items-center p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#0c83fe] mr-4 text-2xl">💎</span>
                  <span className="text-gray-200 text-lg">Acesso vitalício com atualizações quinzenais</span>
                </div>
                <div className="flex items-center p-4 bg-black/30 rounded-lg border border-[#0c83fe]/20">
                  <span className="text-[#0c83fe] mr-4 text-2xl">📲</span>
                  <span className="text-gray-200 text-lg">Mentoria e suporte direto comigo via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Bonus Section */}
            <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-sm border border-red-500/40 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-red-400">Bônus exclusivos ao se matricular hoje:</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-black/40 rounded-lg border border-red-500/30">
                  <span className="text-red-400 mr-4 text-xl">✔</span>
                  <span className="text-gray-200 text-lg">Formação CDPRO – Cientista de Dados Profissional</span>
                </div>
                <div className="flex items-center p-4 bg-black/40 rounded-lg border border-red-500/30">
                  <span className="text-red-400 mr-4 text-xl">✔</span>
                  <span className="text-gray-200 text-lg">Formação Mestre do SAS</span>
                </div>
                <div className="flex items-center p-4 bg-black/40 rounded-lg border border-red-500/30">
                  <span className="text-red-400 mr-4 text-xl">✔</span>
                  <span className="text-gray-200 text-lg">Python para Aplicações de IA</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0c83fe]/20 via-[#00ff88]/20 to-[#0c83fe]/20 rounded-3xl blur-xl opacity-60"></div>
            
            <div className="relative bg-gradient-to-r from-[#0c83fe]/10 to-[#00ff88]/10 border border-[#0c83fe]/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] bg-clip-text text-transparent">
                  AI PRO EXPERT
                </h2>
                <p className="text-xl text-[#00ff88] font-semibold mb-4">
                  Especialista em Inteligência Artificial Aplicada
                </p>
                <p className="text-gray-300">
                  Para desenvolvedores que querem <strong>dominar o jogo com IA</strong>
                </p>
              </div>
              
              <a 
                href="https://lp.cienciadosdados.com" 
                onClick={handleCTAClick}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] hover:from-[#00ff88] hover:to-[#0c83fe] text-black font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(12,131,254,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
              >
                <span className="mr-2">🚀</span>
                Quero me Tornar Especialista em IA
              </a>
            </div>
          </div>

          {/* Footer message */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Ciência dos Dados - Transformando dados em conhecimento
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
