'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';

export default function Aula4() {
  const AULA_NUMBER = 4;
  
  // Redirecionamento para lp.cienciadosdados.com
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://lp.cienciadosdados.com';
    }
  }, []);
  
  const videoData = {
    url: 'https://www.youtube.com/watch?v=m10_pFKS-fQ',
    title: 'Projeto Agents Full Stack',
    description: 'Na aula final, integramos todos os conceitos aprendidos para construir aplicações completas com IA, incluindo front-end, back-end e implantação em produção.'
  };

  const downloadData = {
    scriptUrl: '/scripts/Project-four.zip',
    fileName: 'Project-four.zip',
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
