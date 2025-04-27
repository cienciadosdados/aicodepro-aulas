'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { AulaLayout } from '@/app/aula-layout';
import { useEffect } from 'react';
import { trackAulaView } from '@/lib/tracking-service';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Aula3() {
  const AULA_NUMBER = 3;
  
  const videoData = {
    url: 'https://youtube.com/live/Zwmr1Gn8_K8?feature=share',
    title: 'Agentes de IA e Automação',
    description: 'Na terceira aula, exploramos como criar agentes de IA autônomos capazes de executar tarefas complexas, tomar decisões e interagir com APIs e sistemas externos.'
  };

  const downloadData = {
    scriptUrl: '/scripts/aula3-script.zip',
    fileName: 'aicodepro-aula3-script.zip',
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
