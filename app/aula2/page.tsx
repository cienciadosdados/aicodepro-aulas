'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';

export default function Aula2() {
  const AULA_NUMBER = 2;
  
  // Redirecionamento para lp.cienciadosdados.com
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://lp.cienciadosdados.com';
    }
  }, []);
  
  const videoData = {
    url: 'https://www.youtube.com/watch?v=TwDtwfkSd58',
    title: 'Agentes de Voz - Gravação no Mongo por comando de Voz',
    description: 'Na segunda aula, vamos aprofundar na implementação prática de sistemas RAG (Retrieval Augmented Generation) para criar aplicações de IA que podem acessar e utilizar conhecimento específico.'
  };

  const downloadData = {
    scriptUrl: '/scripts/project-two.zip',
    fileName: 'project-two.zip',
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
