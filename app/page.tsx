'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingGrid } from '@/components/FloatingGrid';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Preservar parâmetros UTM ao redirecionar
    const currentUrl = typeof window !== 'undefined' ? new URL(window.location.href) : null;
    const utmParams = new URLSearchParams();
    
    if (currentUrl) {
      // Coletar parâmetros UTM da URL atual
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        if (currentUrl.searchParams.has(param)) {
          utmParams.append(param, currentUrl.searchParams.get(param)!);
        }
      });
      
      const utmString = utmParams.toString();
      // Redirecionar para o novo domínio lp.cienciadosdados.com
      const redirectUrl = `https://lp.cienciadosdados.com${utmString ? `?${utmString}` : ''}`;
      
      // Redirecionar para a página de vendas
      if (typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <FloatingGrid />
      
      <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 p-8 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-white mb-4">AI Code Pro - Aulas</h1>
        <p className="text-gray-300 mb-6">Redirecionando para as aulas...</p>
        <div className="relative w-full h-2 bg-black/40 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#0c83fe] animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    </main>
  );
}
