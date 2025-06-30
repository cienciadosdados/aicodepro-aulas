'use client';

import { useEffect } from 'react';

export function ChatbotWidget() {
  // Injetar o script do Chatbase quando o componente for montado
  useEffect(() => {
    // Verificar se o script já existe para evitar duplicação
    if (!document.getElementById('x6KwsnirDBy-dwFccyKzb')) {
      // Criar e adicionar o script do Chatbase
      const script = document.createElement('script');
      script.innerHTML = `
        (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="x6KwsnirDBy-dwFccyKzb";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
      `;
      document.body.appendChild(script);
      
      // Configurar o chatbot com a chave secreta
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.chatbaseConfig = {
          chatbotId: "x6KwsnirDBy-dwFccyKzb",
          domain: "www.chatbase.co",
          secretKey: "nujl2m8ify005s912mnylcrpimwp97ua",
          title: "Agente AI Code Pro",
          iconUrl: "https://www.chatbase.co/images/chatbot-icon.svg",
          primaryColor: "#25D366",
          welcomeMessage: "Olá! Sou o Agente AI Code Pro. Como posso ajudar você hoje?",
          bubbleButtonIconUrl: "https://cdn-icons-png.flaticon.com/512/134/134937.png",
          position: "right",
          alignment: "bottom",
          theme: "dark",
          zIndex: 9999
        };
      `;
      document.body.appendChild(configScript);
    }
    
    // Limpar ao desmontar o componente
    return () => {
      // Não é necessário remover o script, pois ele deve persistir entre navegações
    };
  }, []);

  // Este componente não renderiza nada visualmente, apenas injeta o script
  return null;
}
