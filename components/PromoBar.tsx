'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function PromoBar() {
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

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transition-all duration-300 ${
        isClosing ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Ícone de urgência */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-lg">🔥 MATRÍCULAS ÚLTIMAS HORAS</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          
          {/* Texto promocional */}
          <span className="hidden md:inline text-sm">
            Não perca a oportunidade! Vagas limitadas para a formação completa.
          </span>
        </div>
        
        {/* Botão de ação */}
        <div className="flex items-center space-x-3">
          <a
            href="https://lp.cienciadosdados.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
          >
            GARANTIR VAGA
          </a>
          
          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Versão mobile simplificada */}
      <div className="md:hidden px-4 pb-2">
        <p className="text-xs text-center">
          Não perca a oportunidade! Vagas limitadas para a formação completa.
        </p>
      </div>
    </div>
  );
}
