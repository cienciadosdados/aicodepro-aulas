'use client';

import { useState, useEffect } from 'react';
import { trackScriptDownload, getSessionId } from '@/lib/tracking-service';

interface ConditionalDownloadProps {
  scriptUrl: string;
  fileName: string;
  instagramUrl: string;
  youtubeUrl: string;
  aulaNumber: number; // Adicionado para rastreamento
}

export function ConditionalDownload({ 
  scriptUrl, 
  fileName, 
  instagramUrl = 'https://www.instagram.com/cienciadosdados/', 
  youtubeUrl = 'https://youtube.com/channel/UCd3ThZLzVDDnKSZMsbK0icg?sub_confirmation=1',
  aulaNumber
}: ConditionalDownloadProps) {
  const [followedInstagram, setFollowedInstagram] = useState(false);
  const [followedYoutube, setFollowedYoutube] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Download habilitado para todas as aulas
  const isDownloadTemporarilyDisabled = false;

  // Inicializar o ID de sessão quando o componente é montado
  useEffect(() => {
    getSessionId();
  }, []);

  // Verificar se o usuário já completou as ações anteriormente
  useEffect(() => {
    const savedState = localStorage.getItem('aicodepro_social_follow');
    if (savedState) {
      try {
        const { instagram, youtube } = JSON.parse(savedState);
        setFollowedInstagram(instagram);
        setFollowedYoutube(youtube);
      } catch (error) {
        console.error('Erro ao recuperar estado de redes sociais:', error);
      }
    }
  }, []);

  // Atualizar estado de download quando ambas as redes sociais forem seguidas
  useEffect(() => {
    setDownloadEnabled(followedInstagram && followedYoutube);
    
    // Salvar estado no localStorage
    if (followedInstagram || followedYoutube) {
      localStorage.setItem('aicodepro_social_follow', JSON.stringify({
        instagram: followedInstagram,
        youtube: followedYoutube
      }));
    }
  }, [followedInstagram, followedYoutube]);

  const handleInstagramClick = () => {
    // Abrir Instagram em nova aba
    window.open(instagramUrl, '_blank');
    
    // Rastrear a ação social
    import('@/lib/tracking-service').then((module) => {
      if (typeof module.trackSocialAction === 'function') {
        module.trackSocialAction('instagram', aulaNumber).catch((error: Error) => {
          console.error('Erro ao rastrear ação social (Instagram):', error);
        });
      }
    });
    
    // Marcar como seguido após um breve delay
    setTimeout(() => {
      setFollowedInstagram(true);
    }, 2000);
  };

  const handleYoutubeClick = () => {
    // Abrir YouTube em nova aba
    window.open(youtubeUrl, '_blank');
    
    // Rastrear a ação social
    import('@/lib/tracking-service').then((module) => {
      if (typeof module.trackSocialAction === 'function') {
        module.trackSocialAction('youtube', aulaNumber).catch((error: Error) => {
          console.error('Erro ao rastrear ação social (YouTube):', error);
        });
      }
    });
    
    // Marcar como seguido após um breve delay
    setTimeout(() => {
      setFollowedYoutube(true);
    }, 2000);
  };

  // Função para rastrear o clique (SEM fazer download)
  const handleDownloadClick = () => {
    // Sempre permitir o clique para tracking
    console.log(`Clique no botão de download da Aula ${aulaNumber} rastreado`);
    
    // Rastrear o clique no Supabase
    trackScriptDownload(aulaNumber).catch(error => {
      console.error('Erro ao rastrear clique de download:', error);
    });
    
    // NÃO fazer download - apenas rastrear
    // Mostrar popup customizado
    setShowSuccessPopup(true);
    
    // Fechar popup automaticamente após 3 segundos
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Efeito de borda luminosa para o container principal - muito mais intenso */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#0c83fe]/60 via-[#00ff88]/40 to-[#0c83fe]/60 rounded-xl blur-2xl opacity-80 animate-pulse-slow"></div>
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-xl blur-md opacity-90 animate-pulse-slower"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm rounded-xl border-2 border-[#0c83fe]/70 p-6 mt-8 z-10 shadow-glow-blue">
        <h3 className="text-xl font-bold mb-4 text-center">Download do Script da Aula {aulaNumber}</h3>
        
        <div className="space-y-4">
          <p className="text-gray-300 text-center">
            Para baixar o script desta aula, siga nossos perfis nas redes sociais:
          </p>
          
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="bg-purple-600/30 text-white px-3 py-1 rounded-full text-sm font-medium">Passo 1</span>
              </div>
              
              {/* Container para o botão do Instagram sem efeito de borda luminosa */}
              <div className="relative w-full group">
                
                <button
                  onClick={handleInstagramClick}
                  disabled={followedInstagram}
                  className={`relative w-full px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 z-10 ${
                    followedInstagram 
                      ? 'bg-green-600/20 border border-green-500/50 text-green-400 cursor-default'
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  {followedInstagram ? 'Seguindo no Instagram' : 'Seguir no Instagram'}
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="bg-red-600/30 text-white px-3 py-1 rounded-full text-sm font-medium">Passo 2</span>
              </div>
              
              {/* Container para o botão do YouTube sem efeito de borda luminosa */}
              <div className="relative w-full group">
                
                <button
                  onClick={handleYoutubeClick}
                  disabled={followedYoutube}
                  className={`relative w-full px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 z-10 ${
                    followedYoutube 
                      ? 'bg-green-600/20 border border-green-500/50 text-green-400 cursor-default'
                      : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                  {followedYoutube ? 'Inscrito no YouTube' : 'Inscrever no YouTube'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-center">
                <span className="bg-blue-600/30 text-white px-3 py-1 rounded-full text-sm font-medium">Passo 3</span>
              </div>
            </div>
            
            {/* Container para o botão de download com efeito de borda intensificado */}
            <div className="relative group">
              {downloadEnabled && (
                <>
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#0c83fe]/70 via-[#00ff88]/50 to-[#0c83fe]/70 rounded-xl blur-xl opacity-80 group-hover:opacity-90 animate-pulse-slow"></div>
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0c83fe] via-[#00ff88]/80 to-[#0c83fe] rounded-xl blur-md opacity-90 group-hover:opacity-100 animate-pulse-slower"></div>
                </>
              )}
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Sempre fazer tracking, mas só se completou os passos
                  if (downloadEnabled) {
                    handleDownloadClick();
                  }
                }}
                disabled={!downloadEnabled}
                className={`relative w-full px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 z-10 ${
                  downloadEnabled
                    ? 'bg-[#0c83fe] hover:bg-[#0c83fe]/90 text-white cursor-pointer'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed opacity-60'
                }`}
                title={downloadEnabled ? 'Clique para registrar interesse no material' : 'Complete os passos acima para habilitar o download'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Baixar Script
              </button>
            </div>
            
            {isDownloadTemporarilyDisabled ? (
              <p className="text-sm text-gray-400 mt-2">
                Download será liberado em breve
              </p>
            ) : (
              !downloadEnabled && (
                <p className="text-sm text-gray-400 mt-2">
                  Você precisa seguir ambos os perfis para liberar o download
                </p>
              )
            )}
          </div>
        </div>
      </div>
      
      {/* Popup de Sucesso */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-green-600/90 to-green-700/90 backdrop-blur-md rounded-2xl border-2 border-green-400/50 p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-50"></div>
            
            <div className="relative text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                ✅ Interesse Registrado!
              </h3>
              
              <p className="text-white/90 text-lg">
                Em breve os materiais estarão disponíveis.
              </p>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
