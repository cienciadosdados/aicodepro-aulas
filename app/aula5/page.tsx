'use client';

import { useEffect } from 'react';
import { AulaLayout } from '@/app/aula-layout';
import { VideoPlayer } from '@/components/VideoPlayer';
import supabase from '@/lib/supabase-client';
import { useSearchParams } from 'next/navigation';

export default function Aula5() {
  const searchParams = useSearchParams();
  const AULA_NUMBER = 5;
  
  const videoData = {
    url: 'https://www.youtube.com/live/3FIEwO2UPR4',
    title: 'Agentes que criam agentes',
    description: ''
  };

  const downloadData = {
    scriptUrl: '/scripts/Aula5-Live-Session.zip',
    fileName: 'Aula5-Live-Session.zip',
    instagramUrl: 'https://instagram.com/cienciadosdados',
    youtubeUrl: 'https://youtube.com/c/cienciadosdados'
  };

  // Rastrear visualização da aula quando a página é carregada
  useEffect(() => {
    const trackAulaView = async () => {
      try {
        // Capturar parâmetros UTM
        const utmSource = searchParams.get('utm_source') || '';
        const utmMedium = searchParams.get('utm_medium') || '';
        const utmCampaign = searchParams.get('utm_campaign') || '';
        const utmTerm = searchParams.get('utm_term') || '';
        const utmContent = searchParams.get('utm_content') || '';

        // Inserir evento de visualização da aula
        const { error } = await supabase
          .from('aula_views')
          .insert({
            aula_number: AULA_NUMBER,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent,
            user_agent: navigator.userAgent,
            referrer: document.referrer || '',
            timestamp: new Date().toISOString()
          });

        if (error) {
          console.error('Erro ao rastrear visualização da aula:', error);
        }
      } catch (error) {
        console.error('Erro ao rastrear visualização da aula:', error);
      }
    };

    trackAulaView();
  }, [searchParams]);

  return (
    <AulaLayout currentAula={AULA_NUMBER} downloadData={downloadData}>
      <VideoPlayer 
        videoUrl={videoData.url}
        title={videoData.title}
        description={videoData.description}
        aulaNumber={AULA_NUMBER}
      />
    </AulaLayout>
  );
}
