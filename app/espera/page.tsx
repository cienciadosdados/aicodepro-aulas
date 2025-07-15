'use client';

import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';

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
        // Use existing tracking infrastructure
        const sessionId = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_session_id') : null;
        console.log('Espera page CTA clicked', { sessionId });
      } catch (error) {
        console.error('Error tracking espera CTA:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex items-center justify-center p-4">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-white/20 rounded-full top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-white/10 rounded-full top-3/4 right-1/4 animate-bounce"></div>
        <div className="absolute w-1 h-1 bg-white/30 rounded-full top-1/2 left-3/4 animate-ping"></div>
      </div>

      <div className="max-w-2xl w-full text-center">
        {/* Main container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          {/* Logo */}
          <div className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            AI Code Pro
          </div>
          <div className="text-lg text-white/80 mb-8">Ciência dos Dados</div>
          
          {/* Main message */}
          <div className="text-2xl md:text-3xl font-bold text-white mb-6">
            🎓 Evento Finalizado com Sucesso!
          </div>
          
          {/* Description */}
          <div className="text-lg text-white/90 mb-8 leading-relaxed">
            O <strong>AI Code Pro</strong> chegou ao fim, mas sua jornada em IA e Ciência de Dados está apenas começando!
            <br /><br />
            Não perca a oportunidade de se tornar um especialista com nossa <strong>Formação Completa</strong>.
          </div>
          
          {/* CTA Button */}
          <a 
            href="https://lp.cienciadosdados.com" 
            onClick={handleCTAClick}
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            🚀 Quero me Matricular na Formação
          </a>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🤖</div>
              <div className="font-semibold text-white mb-2">IA Avançada</div>
              <div className="text-white/70 text-sm">LLMs, RAG e Agentes</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">📊</div>
              <div className="font-semibold text-white mb-2">Ciência de Dados</div>
              <div className="text-white/70 text-sm">Análise e Machine Learning</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">💼</div>
              <div className="font-semibold text-white mb-2">Carreira</div>
              <div className="text-white/70 text-sm">Projetos Reais</div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/20 text-white/60 text-sm">
            © 2025 Ciência dos Dados - Transformando dados em conhecimento
          </div>
        </div>
      </div>
    </div>
  );
}
