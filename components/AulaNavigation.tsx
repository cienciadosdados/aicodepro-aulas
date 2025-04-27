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

  return (
    <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-3 justify-center">
      {Array.from({ length: totalAulas }, (_, i) => i + 1).map((aulaNum) => (
        <Link
          key={aulaNum}
          href={getUrlWithUtm(aulaNum)}
          onClick={() => handleAulaNavigation(aulaNum)}
          className={`px-3 py-2 rounded-lg text-center transition-all duration-200 text-sm ${
            aulaNum === currentAula
              ? 'bg-[#0c83fe] text-white font-medium'
              : 'bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:border-white/20'
          }`}
        >
          Aula {aulaNum}
        </Link>
      ))}
    </div>
  );
}
