'use client';

import { useState, useEffect, useRef } from 'react';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Carregar o iframe apenas quando o chat for aberto pela primeira vez
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  const toggleChat = () => {
    if (!isOpen && !shouldLoadIframe) {
      setShouldLoadIframe(true);
    }
    setIsOpen(!isOpen);
  };
  
  // Aplicar CSS personalizado ao iframe quando ele for carregado
  useEffect(() => {
    if (isOpen && shouldLoadIframe && iframeRef.current) {
      // Dar tempo para o iframe carregar
      const timer = setTimeout(() => {
        try {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            // Tentar injetar CSS para ocultar elementos indesejados
            const style = document.createElement('style');
            style.textContent = `
              .chatbase-bubble-header { display: none !important; }
              .chatbase-bubble-conversation-header { display: none !important; }
            `;
            iframeRef.current.contentWindow.document.head.appendChild(style);
          }
        } catch (e) {
          console.log('Não foi possível modificar o iframe devido a restrições de segurança');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldLoadIframe, iframeLoaded]);

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ zIndex: 9999 }}>
      {/* Botão do WhatsApp */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Abrir chat"
      >
        {/* Ícone do WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-8 h-8 fill-current"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </button>

      {/* Container do Chatbot */}
      <div 
        className={`absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100' : 'scale-0'}`}
        style={{ transformOrigin: 'bottom right', maxHeight: '70vh' }}
      >
        {/* Cabeçalho do chat */}
        <div className="bg-green-500 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6 fill-green-500"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z" />
              </svg>
            </div>
            <div className="ml-3 text-white">
              <div className="font-bold">Agente AI Code Pro</div>
              <div className="text-xs">Online</div>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200"
            aria-label="Fechar chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Iframe do chatbot */}
        {shouldLoadIframe && (
          <iframe
            ref={iframeRef}
            src="https://www.chatbase.co/chatbot-iframe/x6KwsnirDBy-dwFccyKzb"
            width="100%"
            height="calc(100% - 64px)"
            frameBorder="0"
            className="bg-white"
            title="Agente AI Code Pro"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            onLoad={() => setIframeLoaded(true)}
            style={{ border: 'none', overflow: 'hidden' }}
          />
        )}
      </div>
    </div>
  );
}
