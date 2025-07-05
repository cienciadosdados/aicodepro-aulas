'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackAulaNavigation, getSessionId, getAllUtmParams } from '@/lib/tracking-service';

interface AulaNavigationProps {
  currentAula: number;
  totalAulas: number;
}

export function AulaNavigation({ currentAula, totalAulas }: AulaNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Inicializar o ID de sessão quando o componente é montado
  useEffect(() => {
    // Apenas inicializa o ID de sessão, sem rastrear nada ainda
    getSessionId();
    setIsClient(true);
  }, []);
  
  // Preservar parâmetros UTM ao navegar entre aulas e adicionar utm_content para rastreamento
  const getUrlWithUtm = (aulaNumber: number) => {
    // Retornar URL simples durante a renderização no servidor ou na primeira renderização no cliente
    if (!isClient) return `/aula${aulaNumber}`;
    
    try {
      const currentUrl = new URL(window.location.href);
      const utmParams = new URLSearchParams();
      
      // Coletar parâmetros UTM da URL atual
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term'].forEach(param => {
        if (currentUrl.searchParams.has(param)) {
          utmParams.append(param, currentUrl.searchParams.get(param)!);
        }
      });
      
      // Adicionar ou atualizar utm_content para indicar a navegação entre aulas
      utmParams.append('utm_content', `navegacao_aula${currentAula}_para_aula${aulaNumber}`);
      
      const utmString = utmParams.toString();
      return `/aula${aulaNumber}${utmString ? `?${utmString}` : ''}`;
    } catch (error) {
      // Fallback seguro em caso de erro
      console.error('Erro ao construir URL com UTM:', error);
      return `/aula${aulaNumber}`;
    }
  };

  // Função para rastrear a navegação entre aulas
  const handleAulaNavigation = (toAula: number) => {
    // Não rastrear se for a mesma aula
    if (toAula === currentAula) return;
    
    // Rastrear a navegação no Supabase
    trackAulaNavigation(currentAula, toAula).catch(error => {
      console.error('Erro ao rastrear navegação:', error);
    });
  };

  // Aulas temporariamente desabilitadas (2, 3, 4)
  const disabledAulas = [2, 3, 4];
  const isAulaDisabled = (aulaNum: number) => disabledAulas.includes(aulaNum);

  return (
    <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-3 justify-center">
      {Array.from({ length: totalAulas }, (_, i) => i + 1).map((aulaNum) => (
        <div key={aulaNum} className="relative group">
          {/* Efeito de borda luminosa para botão ativo - muito mais intenso */}
          {aulaNum === currentAula && (
            <>
              {/* Camada interna mais intensa */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-lg blur-md opacity-90 group-hover:opacity-100 animate-pulse-slow"></div>
              {/* Camada externa mais suave */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0c83fe]/50 via-[#00ff88]/30 to-[#0c83fe]/50 rounded-lg blur-lg opacity-70 animate-pulse-slow"></div>
            </>
          )}
          
          {/* Efeito de borda luminosa para botões inativos (mais intenso ao hover) */}
          {aulaNum !== currentAula && (
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0c83fe]/60 via-[#00ff88]/40 to-[#0c83fe]/60 rounded-lg blur-md opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
          )}
          
          {isAulaDisabled(aulaNum) ? (
            <div
              onClick={() => handleAulaNavigation(aulaNum)}
              className="relative px-3 py-2 rounded-lg text-center transition-all duration-200 text-sm block z-10 bg-gray-600/50 border border-gray-500/30 text-gray-400 cursor-not-allowed opacity-60"
              title="Aula será liberada em breve"
            >
              Aula {aulaNum}
              <div className="text-xs mt-1 text-gray-500">Em breve</div>
            </div>
          ) : (
            <Link
              href={getUrlWithUtm(aulaNum)}
              onClick={() => handleAulaNavigation(aulaNum)}
              className={`relative px-3 py-2 rounded-lg text-center transition-all duration-200 text-sm block z-10 ${
                aulaNum === currentAula
                  ? 'bg-[#0c83fe] text-white font-medium shadow-[0_0_10px_rgba(12,131,254,0.7)]'
                  : 'bg-black/80 border border-white/20 text-white hover:bg-black/90 hover:border-[#0c83fe]/50'
              }`}
            >
              Aula {aulaNum}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
