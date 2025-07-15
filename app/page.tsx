'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingGrid } from '@/components/FloatingGrid';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para lp.cienciadosdados.com
    if (typeof window !== 'undefined') {
      window.location.href = 'https://lp.cienciadosdados.com';
    }
  }, []);

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
