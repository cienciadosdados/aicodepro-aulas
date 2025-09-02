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
    // Verificar se o script já existe para evitar duplicação
    if (!document.getElementById('chatbase-script')) {
      // Script básico do Chatbase
      const script = document.createElement('script');
      script.id = 'chatbase-script';
      script.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "x6KwsnirDBy-dwFccyKzb",
          domain: "www.chatbase.co"
        };
      `;
      document.head.appendChild(script);

      // Script de carregamento do Chatbase
      const embedScript = document.createElement('script');
      embedScript.src = "https://www.chatbase.co/embed.min.js";
      embedScript.setAttribute('chatbotId', 'x6KwsnirDBy-dwFccyKzb');
      embedScript.setAttribute('domain', 'www.chatbase.co');
      embedScript.defer = true;
      document.body.appendChild(embedScript);

      // Aguardar o chatbot carregar e configurar tracking simples
      setTimeout(() => {
        // Observar cliques no botão do chatbot
        const observeChatbotClicks = () => {
          const observer = new MutationObserver(() => {
            // Procurar pelo botão do chatbot
            const chatbotButton = document.querySelector('[data-chatbase-button], .chatbase-bubble, iframe[src*="chatbase"]');
            if (chatbotButton && !chatbotButton.hasAttribute('data-tracked')) {
              chatbotButton.setAttribute('data-tracked', 'true');
              chatbotButton.addEventListener('click', () => {
                trackChatbotInteraction('chatbot_opened');
              });
            }

            // Procurar pelo iframe do chatbot para detectar quando está aberto
            const chatbotIframe = document.querySelector('iframe[src*="chatbase.co"]');
            if (chatbotIframe && !chatbotIframe.hasAttribute('data-tracked')) {
              chatbotIframe.setAttribute('data-tracked', 'true');
              trackChatbotInteraction('chatbot_loaded');
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          // Parar de observar após 30 segundos para não sobrecarregar
          setTimeout(() => observer.disconnect(), 30000);
        };

        observeChatbotClicks();
      }, 3000);
    }
  }, []);

  return null;
}
