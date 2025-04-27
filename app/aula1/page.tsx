'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Aula1() {
  const AULA_NUMBER = 1;
  
  const videoData = {
    url: 'https://youtube.com/live/SCmFHeJC2f0?feature=share',
    title: 'Fundamentos de LLMs e RAG',
    description: 'Nesta primeira aula, você vai aprender os conceitos fundamentais de Large Language Models (LLMs) e Retrieval Augmented Generation (RAG), as tecnologias que estão revolucionando a forma como construímos aplicações de IA.'
  };

  const downloadData = {
    scriptUrl: '/scripts/aula1-script.zip',
    fileName: 'aicodepro-aula1-script.zip',
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
      
      <div className="mt-8 flex justify-center">
        <WhatsAppButton 
          aulaNumber={AULA_NUMBER}
          phoneNumber="+5561999722142"
          message={`Olá! Estou assistindo a Aula ${AULA_NUMBER} do AI Code Pro e tenho uma dúvida.`}
          className="text-lg py-3 px-6"
        />
      </div>
    </AulaLayout>
  );
}
