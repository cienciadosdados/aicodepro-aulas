'use client';

import { useEffect } from 'react';

export function ChatbotWidget() {
  useEffect(() => {
    // Script padrão do Chatbase - método mais simples
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
  }, []);

  return null;
}
