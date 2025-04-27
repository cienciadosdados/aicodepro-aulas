'use client';

import { useEffect, useState } from 'react';

export function FloatingGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c83fe]/10 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(12,131,254,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(12,131,254,0.1)_1px,transparent_1px)]" 
        style={{ 
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Glow effect */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#0c83fe]/20 rounded-full blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[#0c83fe]/10 rounded-full blur-[100px]" />
    </div>
  );
}
