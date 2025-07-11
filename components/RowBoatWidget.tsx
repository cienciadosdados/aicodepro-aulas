'use client';

import { useEffect } from 'react';

export function RowBoatWidget() {
  useEffect(() => {
    // Configuração do RowBoat
    (window as any).ROWBOAT_CONFIG = {
      clientId: '59_ypmEi07KzUzgRR4kGiw'
    };

    // Criar e adicionar o script
    const script = document.createElement('script');
    script.src = 'http://localhost:3006/api/bootstrap.js';
    script.async = true;
    
    // Adicionar ao head
    document.getElementsByTagName('head')[0].appendChild(script);

    // Cleanup function para remover o script quando o componente for desmontado
    return () => {
      const existingScript = document.querySelector('script[src="http://localhost:3006/api/bootstrap.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      // Limpar configuração global
      delete (window as any).ROWBOAT_CONFIG;
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
}
