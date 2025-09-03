'use client';

import { useState, useEffect } from 'react';
import { checkSurveyCompleted, trackSurveyPopupShown, trackSurveyPopupClick } from '../lib/tracking-service';

interface SurveyPopupProps {
  userEmail?: string;
  onClose?: () => void;
}

export default function SurveyPopup({ userEmail, onClose }: SurveyPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = async () => {
      try {
        // Verificar se o usuário tem email identificado
        const identifiedEmail = userEmail || localStorage.getItem('aicodepro_identified_email');
        
        if (!identifiedEmail) {
          setIsLoading(false);
          return;
        }

        // Verificar se já foi dispensado nesta sessão
        const sessionDismissed = sessionStorage.getItem('survey_popup_dismissed');
        if (sessionDismissed === 'true') {
          setIsLoading(false);
          return;
        }

        // Verificar se já preencheu a pesquisa
        const hasCompleted = await checkSurveyCompleted(identifiedEmail);
        
        if (!hasCompleted) {
          setIsVisible(true);
          // Rastrear exibição do popup
          await trackSurveyPopupShown();
        }
      } catch (error) {
        console.error('Erro ao verificar status da pesquisa:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Aguardar um pouco antes de verificar para não ser muito invasivo
    const timer = setTimeout(checkAndShowPopup, 3000);
    return () => clearTimeout(timer);
  }, [userEmail]);

  const handleSurveyClick = async () => {
    await trackSurveyPopupClick('click_survey');
    
    // Recuperar dados de identificação do localStorage
    const email = localStorage.getItem('aicodepro_identified_email') || '';
    const phone = localStorage.getItem('aicodepro_identified_phone') || '';
    const isProgrammer = localStorage.getItem('aicodepro_identified_isprogrammer') || '';
    
    // Construir URL com parâmetros de identificação
    const params = new URLSearchParams({
      email: email,
      phone: phone,
      isProgrammer: isProgrammer === 'sim' ? 'true' : 'false'
    });
    
    window.location.href = `https://ai-code-pro.cienciadosdados.com/pesquisa?${params.toString()}`;
  };

  const handleLaterClick = async () => {
    await trackSurveyPopupClick('later');
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('survey_popup_dismissed', 'true');
    onClose?.();
  };

  const handleDismiss = async () => {
    await trackSurveyPopupClick('dismiss');
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('survey_popup_dismissed', 'true');
    onClose?.();
  };

  if (isLoading || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl p-6 max-w-md w-full border border-white/20 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Botão de fechar */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ícone */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">
            🎯 Opa!
          </h3>
          <p className="text-gray-300 mb-4">
            Vi que ainda não preencheu a pesquisa. Clique para concorrer a um <strong className="text-yellow-400">treinamento de RAG</strong>!
          </p>
          <div className="bg-white/10 rounded-lg p-3 mb-4 border border-white/20">
            <p className="text-sm text-gray-300">
              ⏱️ Leva apenas <strong className="text-white">2 minutos</strong><br/>
              🎁 Concorra ao treinamento gratuito<br/>
              📚 Ajude-nos a melhorar o conteúdo
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={handleSurveyClick}
            className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            🚀 Fazer Pesquisa Agora
          </button>
          
          <button
            onClick={handleLaterClick}
            className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
          >
            Mais Tarde
          </button>
        </div>

        {/* Nota pequena */}
        <p className="text-xs text-gray-400 text-center mt-3">
          Não mostraremos novamente nesta sessão
        </p>
      </div>
    </div>
  );
}
