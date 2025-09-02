'use client';

import { useEffect } from 'react';

export function ChatbotWidget() {
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
    }
  }, []);

  return null;
}
