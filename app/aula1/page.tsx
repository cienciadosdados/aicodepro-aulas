'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';
import { trackAulaViewGA4 } from '@/lib/analytics';

export default function Aula1() {
  const AULA_NUMBER = 1;
  
  const videoData = {
    url: 'https://www.youtube.com/watch?v=9YT8NG9iycU',
    title: 'SaaS Agents AI (MVP)',
    description: 'Vamos criar um MVP de um SAAS de desenvolvimentos de Agentes de IA embedáveis em Sites, Apps e Whatsapp'
  };

  // Dados de download para o script da aula 1
  const downloadData = {
    scriptUrl: '/scripts/Project 1 - SaaS MVP.zip',
    fileName: 'Project 1 - SaaS MVP.zip',
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
