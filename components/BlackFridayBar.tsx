'use client';

import { useState, useEffect } from 'react';
import { trackPromoBannerClick } from '@/lib/tracking-service';

export function BlackFridayBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Mostrar a tarja após 5 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBannerClick = async () => {
    try {
      await trackPromoBannerClick();
    } catch (error) {
      console.error('Erro ao rastrear clique no banner:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9999] bg-gradient-to-r from-black via-yellow-600 to-black text-white shadow-lg transition-all duration-300 border-t-2 border-yellow-500 ${
        isClosing ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Ícone de urgência */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-lg">🔥 BLACK FRIDAY</span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Texto promocional */}
          <span className="hidden md:inline text-sm">
            Use o cupom <strong className="text-yellow-400">BLACK25</strong> - Oferta exclusiva por tempo limitado!
          </span>
        </div>
        
        {/* Botão de ação */}
        <div className="flex items-center space-x-3">
          <a
            href="https://lp.cienciadosdados.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBannerClick}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition-colors shadow-md"
          >
            CUPOM: BLACK25
          </a>
          
          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors p-1 text-xl font-bold"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Versão mobile simplificada */}
      <div className="md:hidden px-4 pb-2">
        <p className="text-xs text-center">
          Use o cupom <strong className="text-yellow-400">BLACK25</strong> - Oferta exclusiva!
        </p>
      </div>
    </div>
  );
}
