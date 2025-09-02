'use client';

import { useEffect } from 'react';
import { trackWhatsAppAction } from '@/lib/tracking-service';

export function ChatbotWidget() {
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

  useEffect(() => {
    // Script padrão do Chatbase
    const script = document.createElement('script');
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "x6KwsnirDBy-dwFccyKzb",
        domain: "www.chatbase.co"
      }
    `;
    document.head.appendChild(script);

    const embedScript = document.createElement('script');
    embedScript.src = "https://www.chatbase.co/embed.min.js";
    embedScript.setAttribute('chatbotId', 'x6KwsnirDBy-dwFccyKzb');
    embedScript.setAttribute('domain', 'www.chatbase.co');
    embedScript.defer = true;
    document.body.appendChild(embedScript);

    // Tracking simples - aguardar o chatbot carregar
    setTimeout(() => {
      // Rastrear quando o chatbot é carregado na página
      trackChatbotInteraction('chatbot_loaded');

      // Observar cliques no botão do chatbot (método mais simples)
      const interval = setInterval(() => {
        const chatbotButton = document.querySelector('[data-chatbase-open], .chatbase-bubble, iframe[src*="chatbase"]');
        if (chatbotButton && !chatbotButton.hasAttribute('data-tracked')) {
          chatbotButton.setAttribute('data-tracked', 'true');
          chatbotButton.addEventListener('click', () => {
            trackChatbotInteraction('chatbot_opened');
          });
          clearInterval(interval);
        }
      }, 1000);

      // Limpar interval após 10 segundos
      setTimeout(() => clearInterval(interval), 10000);
    }, 2000);
  }, []);

  return null;
}
