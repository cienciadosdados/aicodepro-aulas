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
            <div className="relative inline-block">
              <div className="px-3 py-1 rounded-lg bg-black/40 border border-[#0c83fe]">
                <h1 className="text-xl font-bold text-[#0c83fe]">
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
