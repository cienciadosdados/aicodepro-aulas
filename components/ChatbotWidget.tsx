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
    // Criar container para o widget
    const container = document.createElement('div');
    container.id = 'ai-agent-widget-83';
    document.body.appendChild(container);

    // Criar iframe do Eduardo AI
    const widget = document.createElement('iframe');
    widget.src = 'https://aihubpro.aiproexpert.workers.dev/widget?agentId=83&theme=dark&position=bottom-right&primaryColor=8b5cf6&size=small&showName=true&showAvatar=true&welcome=Opa%2C+Eduardo+AI+aqui...&placeholder=Digite+sua+mensagem...&height=400px&width=350px';
    widget.style.border = 'none';
    widget.style.position = 'fixed';
    widget.style.zIndex = '9999';
    widget.style.borderRadius = '12px';
    widget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
    
    // Position
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    
    // Size
    widget.style.width = '350px';
    widget.style.height = '400px';
    
    // Mobile responsive
    if (window.innerWidth < 768) {
      widget.style.width = '90vw';
      widget.style.height = '70vh';
      widget.style.bottom = '10px';
      widget.style.right = '5vw';
      widget.style.left = '5vw';
    }
    
    container.appendChild(widget);

    // Tracking - rastrear quando o widget é carregado
    setTimeout(() => {
      trackChatbotInteraction('chatbot_loaded');
    }, 2000);

    // Cleanup ao desmontar
    return () => {
      const existingContainer = document.getElementById('ai-agent-widget-83');
      if (existingContainer) {
        existingContainer.remove();
      }
    };
  }, []);

  return null;
}
