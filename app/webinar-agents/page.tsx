'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingGrid } from '@/components/FloatingGrid';
import { LeadIdentifier } from '@/components/LeadIdentifier';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { BlackFridayBar } from '@/components/BlackFridayBar';
import { VideoPlayer } from '@/components/VideoPlayer';
import { WebinarCTA } from '@/components/WebinarCTA';
import { trackAulaView, getSessionId } from '@/lib/tracking-service';
import { trackAulaViewGA4 } from '@/lib/analytics';

export default function WebinarAgents() {
  const AULA_NUMBER = 6;
  const [isIdentified, setIsIdentified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const videoData = {
    url: 'https://youtube.com/live/_A_JefaV3WI?feature=share',
    title: 'Webinar Agents',
    description: 'Aprenda a criar agentes de IA poderosos neste webinar exclusivo'
  };

  // Rastrear visualização da aula quando a página é carregada
  useEffect(() => {
    // Inicializar sessão
    getSessionId();
    
    // Rastrear visualização no Supabase
    trackAulaView(AULA_NUMBER).catch(error => {
      console.error('Erro ao rastrear visualização da aula:', error);
    });
    
    // Rastrear visualização no Google Analytics 4
    trackAulaViewGA4(AULA_NUMBER, videoData.title);
    
    // Verificar se o usuário já foi identificado anteriormente
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('aicodepro_identified_email');
      if (storedEmail) {
        setIsIdentified(true);
        setUserEmail(storedEmail);
      }
    }
  }, []);

  return (
    <>
      <BlackFridayBar />
      <FloatingGrid />
      <Header />
      
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* O componente LeadIdentifier agora é um modal que aparece automaticamente */}
          <LeadIdentifier 
            onIdentified={(email) => {
              setIsIdentified(true);
              setUserEmail(email);
            }} 
          />
          
          <VideoPlayer 
            videoUrl={videoData.url}
            title={videoData.title}
            description={videoData.description}
            aulaNumber={AULA_NUMBER}
          />
          
          {/* CTA para a landing page */}
          <div className="mt-8">
            <WebinarCTA 
              ctaUrl="https://lp.cienciadosdados.com/"
              aulaNumber={AULA_NUMBER}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </>
  );
}
