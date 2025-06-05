'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';
import { trackAulaViewGA4 } from '@/lib/analytics';

export default function Aula1() {
  const AULA_NUMBER = 1;
  
  // Redirecionamento removido
  
  const videoData = {
    url: 'https://www.youtube.com/watch?v=DgmohQblw2I',
    title: 'RAG Profissional com VectorDB',
    description: 'Nesta primeira aula, você vai aprender os conceitos fundamentais de Large Language Models (LLMs) e Retrieval Augmented Generation (RAG), as tecnologias que estão revolucionando a forma como construímos aplicações de IA.'
  };

  const downloadData = {
    scriptUrl: '/scripts/project-one.zip',
    fileName: 'project-one.zip',
    instagramUrl: 'https://instagram.com/cienciadosdados',
    youtubeUrl: 'https://youtube.com/c/cienciadosdados'
  };

  // Rastrear visualização da aula quando a página é carregada
  useEffect(() => {
    // Rastrear visualização no Supabase
    trackAulaView(AULA_NUMBER).catch(error => {
      console.error('Erro ao rastrear visualização da aula:', error);
    });
    
    // Rastrear visualização no Google Analytics 4
    trackAulaViewGA4(AULA_NUMBER, videoData.title);
  }, []);

  return (
    <AulaLayout 
      currentAula={AULA_NUMBER}
      downloadData={downloadData}
    >
      <VideoPlayer 
        videoUrl={videoData.url}
        title={videoData.title}
        description={videoData.description}
        aulaNumber={AULA_NUMBER}
      />
      
      {/* Botão do WhatsApp temporariamente desabilitado */}
    </AulaLayout>
  );
}
