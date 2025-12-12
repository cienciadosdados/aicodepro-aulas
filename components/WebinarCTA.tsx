'use client';

import { useEffect } from 'react';
import { trackScriptDownload, getSessionId } from '@/lib/tracking-service';

interface WebinarCTAProps {
  ctaUrl: string;
  aulaNumber: number;
}

export function WebinarCTA({ ctaUrl, aulaNumber }: WebinarCTAProps) {
  // Inicializar o ID de sessão quando o componente é montado
  useEffect(() => {
    getSessionId();
  }, []);

  const handleCTAClick = () => {
    // Rastrear o clique no CTA (usando a mesma tabela de script_downloads para manter consistência)
    trackScriptDownload(aulaNumber).catch(error => {
      console.error('Erro ao rastrear clique no CTA:', error);
    });
    
    // Abrir o link em nova aba
    window.open(ctaUrl, '_blank');
  };

  return (
    <div className="relative">
      {/* Efeito de borda luminosa para o container principal */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#0c83fe]/60 via-[#00ff88]/40 to-[#0c83fe]/60 rounded-xl blur-2xl opacity-80 animate-pulse-slow"></div>
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-xl blur-md opacity-90 animate-pulse-slower"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm rounded-xl border-2 border-[#0c83fe]/70 p-6 z-10 shadow-glow-blue">
        <h3 className="text-xl font-bold mb-4 text-center">Quer se tornar um especialista em Agentes de IA?</h3>
        
        <div className="space-y-4">
          <p className="text-gray-300 text-center">
            Conheça a formação AI PRO EXPERT e domine a criação de agentes de IA do zero ao avançado.
          </p>
          
          {/* Container para o botão CTA com efeito de borda intensificado */}
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#0c83fe]/70 via-[#00ff88]/50 to-[#0c83fe]/70 rounded-xl blur-xl opacity-80 group-hover:opacity-90 animate-pulse-slow"></div>
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-xl blur-md opacity-90 group-hover:opacity-100 animate-pulse-slower"></div>
            
            <button
              onClick={handleCTAClick}
              className="relative w-full px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 z-10 bg-[#0c83fe] hover:bg-[#0c83fe]/90 text-white cursor-pointer text-lg font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Scripts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
