'use client';

import { useEffect, useState } from 'react';
import { trackWhatsAppAction } from '@/lib/tracking-service';
import { HiOutlineChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Função para obter a aula atual da URL
  const getCurrentAulaFromUrl = (): number => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const aulaMatch = path.match(/\/aula(\d+)/);
      return aulaMatch ? parseInt(aulaMatch[1], 10) : 0;
    }
    return 0;
  };

  // Função para rastrear interações do chatbot
  const trackChatbotInteraction = async (action: string) => {
    try {
      const currentAula = getCurrentAulaFromUrl();
      await trackWhatsAppAction(action, currentAula);
    } catch (error) {
      console.error('Erro ao rastrear interação do chatbot:', error);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      trackChatbotInteraction('chatbot_opened');
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão flutuante de chat */}
      <button
        onClick={handleToggle}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <HiXMark className="w-7 h-7" />
        ) : (
          <HiOutlineChatBubbleLeftRight className="w-7 h-7" />
        )}
      </button>

      {/* Widget do chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[9998]">
          <iframe
            src="https://aihubpro.aiproexpert.workers.dev/widget?agentId=83&theme=dark&position=bottom-right&primaryColor=8b5cf6&size=small&showName=true&showAvatar=true&welcome=Eduardo+AI.+aqui..como+te+ajudo%3F&placeholder=Digite+sua+msg...&height=400px&width=350px"
            style={{
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              width: '350px',
              height: '450px',
            }}
            className="md:w-[350px] md:h-[450px] w-[90vw] h-[60vh]"
          />
        </div>
      )}
    </>
  );
}
