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
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            O <span className="text-[#0c83fe] font-semibold">AI Code Pro</span> chegou ao fim, mas sua jornada para se tornar um 
            <span className="text-[#00ff88] font-semibold">Especialista em IA</span> está apenas começando!
          </p>

          {/* Description */}
          <div className="bg-black/40 backdrop-blur-sm border border-[#0c83fe]/20 rounded-2xl p-8 mb-12">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">💡 O que você vai aprender:</h3>
              <div className="text-left space-y-2 text-gray-300">
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-2">✅</span>
                  <span>LLMs, Agentes Autônomos, Automação com APIs</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-2">✅</span>
                  <span>LangChain, CrewAI, Claude, OpenAI, Whisper</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-2">✅</span>
                  <span>RAG com MCP, integração com bancos relacionais e vetoriais</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-2">✅</span>
                  <span>Deploy de aplicações reais e uso de frameworks modernos</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#00ff88] mr-2">✅</span>
                  <span>Projetos prontos para o mercado e portfólio técnico</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#0c83fe] mb-4">🎓 Você recebe:</h3>
              <div className="text-left space-y-2 text-gray-300">
                <div className="flex items-start">
                  <span className="text-[#0c83fe] mr-2">📜</span>
                  <span>Certificado com reconhecimento MEC</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#0c83fe] mr-2">💎</span>
                  <span>Acesso vitalício + atualizações quinzenais</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#0c83fe] mr-2">📲</span>
                  <span>Mentoria com meu time direto no WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">🔥 Matriculando-se hoje, você ainda leva:</h3>
              <div className="text-left space-y-2 text-gray-300">
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✔</span>
                  <span>Formação CDPRO – Cientista de Dados Profissional</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✔</span>
                  <span>Formação Mestre do SAS</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✔</span>
                  <span>Curso Python para IA</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✔</span>
                  <span>Suporte técnico direto no grupo fechado</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0c83fe]/20 via-[#00ff88]/20 to-[#0c83fe]/20 rounded-3xl blur-xl opacity-60"></div>
            
            <div className="relative bg-gradient-to-r from-[#0c83fe]/10 to-[#00ff88]/10 border border-[#0c83fe]/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#00ff88]">
                AI Pro Expert - Formação Especialista em IA
              </h2>
              
              <p className="text-gray-300 mb-6">
                Transforme seu conhecimento em uma carreira sólida como <strong>Especialista em IA</strong>
              </p>
              
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
