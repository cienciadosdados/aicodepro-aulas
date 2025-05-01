'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full py-4 bg-black/60 backdrop-blur-md border-b border-[#0c83fe]/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <div className="relative inline-block group">
              {/* Efeito de borda luminosa para o título - muito mais intenso */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-lg blur-md opacity-90 group-hover:opacity-100 animate-pulse-slow"></div>
              <div className="absolute -inset-2.5 bg-gradient-to-r from-[#0c83fe]/50 via-[#00ff88]/30 to-[#0c83fe]/50 rounded-lg blur-xl opacity-70 animate-pulse-slow animation-delay-1000"></div>
              
              {/* Container do título com z-index para ficar acima do efeito */}
              <div className="relative px-4 py-1.5 rounded-lg bg-black/90 border-2 border-[#0c83fe] z-10 shadow-[0_0_10px_rgba(12,131,254,0.7)]">
                <h1 className="text-xl font-bold text-[#0c83fe] drop-shadow-[0_0_3px_rgba(12,131,254,0.8)]">
                  AI Code Pro
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
