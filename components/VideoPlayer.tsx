'use client';

import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  aulaNumber: number;
}

export function VideoPlayer({ videoUrl, title, description, aulaNumber }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);

  // Função para extrair o ID do vídeo do YouTube da URL
  const getYouTubeEmbedUrl = (url: string) => {
    // Padrão para URLs de live do YouTube
    const liveRegex = /youtube\.com\/live\/([\w-]+)(\?|$)/;
    const liveMatch = url.match(liveRegex);
    
    // Padrão para URLs normais do YouTube
    const normalRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\?|$)/;
    const normalMatch = url.match(normalRegex);
    
    const videoId = liveMatch ? liveMatch[1] : normalMatch ? normalMatch[1] : '';
    
    if (!videoId) {
      console.error('URL de vídeo inválida:', url);
      return 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Fallback para URL inválida
    }
    
    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full aspect-video bg-black/40 rounded-xl flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg font-medium">Carregando vídeo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-1 flex flex-col items-center">
      <div className="mb-1 text-center w-full">
        <h2 className="text-2xl font-bold text-white">Aula {aulaNumber}: {title}</h2>
        {/* Descrição removida conforme solicitado */}
      </div>
      
      {/* Container externo com o efeito de borda luminosa intensificado */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Efeito de borda luminosa pulsante - camada externa mais suave e ampla */}
        <div className="absolute -inset-3 bg-gradient-to-r from-[#0c83fe]/50 via-[#00ff88]/40 to-[#0c83fe]/50 rounded-xl blur-2xl opacity-70 animate-pulse-slow"></div>
        
        {/* Efeito de borda luminosa pulsante - camada interna mais intensa */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-xl blur-md opacity-90 animate-pulse-slow"></div>
        
        {/* Container do vídeo */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#0c83fe]/70 shadow-lg shadow-[#0c83fe]/50 z-10 bg-black">
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title={`Aula ${aulaNumber}: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
