'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';

export default function Aula2() {
  // Redirecionar para página de espera
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/espera';
    }
  }, []);

  const AULA_NUMBER = 2;
  
  const videoData = {
    url: 'https://www.youtube.com/watch?v=6k5DDJriqx8',
    title: 'WhatsApp + MCP Supabase + Multi Agentes',
    description: 'Na segunda aula, exploramos a integração do WhatsApp com MCP (Model Context Protocol) e Supabase para criar sistemas de multi-agentes que podem interagir através de mensagens e gerenciar dados de forma inteligente.'
  };

  const downloadData = {
    scriptUrl: '/scripts/Aula2-MCP-Supabase-Multiagents.zip',
    fileName: 'Aula2-MCP-Supabase-Multiagents.zip',
    instagramUrl: 'https://instagram.com/cienciadosdados',
    youtubeUrl: 'https://youtube.com/c/cienciadosdados'
  };

  // Rastrear visualização da aula quando a página é carregada
  useEffect(() => {
    // Rastrear visualização no Supabase
    trackAulaView(AULA_NUMBER).catch(error => {
      console.error('Erro ao rastrear visualização da aula:', error);
    });
  }, []);

  return (
    <AulaLayout currentAula={AULA_NUMBER}>
      <VideoPlayer 
        videoUrl={videoData.url}
        title={videoData.title}
        description={videoData.description}
        aulaNumber={AULA_NUMBER}
      />
      
      <ConditionalDownload 
        scriptUrl={downloadData.scriptUrl}
        fileName={downloadData.fileName}
        instagramUrl={downloadData.instagramUrl}
        youtubeUrl={downloadData.youtubeUrl}
        aulaNumber={AULA_NUMBER}
      />
      
      {/* Botão do WhatsApp temporariamente desabilitado */}
    </AulaLayout>
  );
}
