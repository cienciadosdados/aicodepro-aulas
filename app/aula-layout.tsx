'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AulaNavigation } from '@/components/AulaNavigation';
import { FloatingGrid } from '@/components/FloatingGrid';
import { ConditionalDownload } from '@/components/ConditionalDownload';
import { LeadIdentifier } from '@/components/LeadIdentifier';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { PromoBar } from '@/components/PromoBar';
import Link from 'next/link';

interface AulaLayoutProps {
  children: React.ReactNode;
  currentAula: number;
  downloadData?: {
    scriptUrl: string;
    fileName: string;
    instagramUrl: string;
    youtubeUrl: string;
  };
}

export function AulaLayout({ children, currentAula, downloadData }: AulaLayoutProps) {
  // Estado para verificar se o usuário é administrador
  const [isAdmin, setIsAdmin] = useState(false);
  // Estado para controlar se o usuário já foi identificado
  const [isIdentified, setIsIdentified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Verificar se há um parâmetro secreto na URL para acesso ao dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const adminKey = urlParams.get('admin_key');
      
      // Chave secreta para acesso ao dashboard - você pode alterar para qualquer valor
      const SECRET_KEY = 'cienciadosdados2025';
      
      if (adminKey === SECRET_KEY) {
        setIsAdmin(true);
        // Opcional: salvar em localStorage para manter acesso entre páginas
        localStorage.setItem('aicodepro_admin', 'true');
      } else if (localStorage.getItem('aicodepro_admin') === 'true') {
        // Manter acesso se já autenticado anteriormente
        setIsAdmin(true);
      }
      
      // Verificar se o usuário já foi identificado anteriormente
      const storedEmail = localStorage.getItem('aicodepro_identified_email');
      if (storedEmail) {
        setIsIdentified(true);
        setUserEmail(storedEmail);
      }
    }
  }, []);
  
  return (
    <>
      {/* <PromoBar /> */}
      <FloatingGrid />
      <Header />
      
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Navegação vertical à esquerda */}
            <div className="w-full md:w-24 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <div className="md:sticky md:top-24 md:pt-48">
                <AulaNavigation currentAula={currentAula} totalAulas={5} />
              </div>
            </div>
            
            {/* Conteúdo principal centralizado com largura aumentada */}
            <div className="w-full md:flex-1 max-w-4xl mx-auto">
                {/* O componente LeadIdentifier agora é um modal que aparece automaticamente */}
              <LeadIdentifier 
                onIdentified={(email) => {
                  setIsIdentified(true);
                  setUserEmail(email);
                }} 
              />
              
              {children}
              
              {/* Área para o componente de download abaixo do vídeo */}
              {downloadData && (
                <div className="mt-8">
                  <ConditionalDownload 
                    scriptUrl={downloadData.scriptUrl}
                    fileName={downloadData.fileName}
                    instagramUrl={downloadData.instagramUrl}
                    youtubeUrl={downloadData.youtubeUrl}
                    aulaNumber={currentAula}
                  />
                </div>
              )}
              
              {/* Dashboard link apenas para administradores */}
              {isAdmin && (
                <div className="text-center mt-6">
                  <Link 
                    href="/dashboard" 
                    className="inline-block px-3 py-1 bg-[#0c83fe]/20 hover:bg-[#0c83fe]/30 border border-[#0c83fe]/30 rounded-lg text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </>
  );
}
