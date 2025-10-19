'use client';

import { useEffect, useState } from 'react';

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Delay de 3 segundos antes de mostrar o botão
    const showTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    // Capturar evento de instalação PWA
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('📱 PWA pode ser instalado!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPwa = async () => {
    if (!deferredPrompt) {
      alert('⚠️ Instalação não disponível neste momento');
      return;
    }

    console.log('📱 [PWA] Iniciando instalação...');
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`📱 [PWA] Escolha do usuário: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('✅ [PWA] Usuário aceitou instalar');
    } else {
      console.log('❌ [PWA] Usuário recusou instalar');
    }

    setDeferredPrompt(null);
  };

  // Não mostrar se já está instalado
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return null;
  }

  // Só mostrar se o PWA pode ser instalado
  if (!showButton || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-[#0c83fe] to-[#0a6fd9] p-5 rounded-2xl shadow-2xl max-w-[300px] animate-in slide-in-from-bottom-5 duration-500 border-2 border-white/20">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">📱</div>
          <p className="text-sm text-white font-bold mb-1">
            Instale o App AI CODE PRO
          </p>
          <p className="text-xs text-white/90">
            Acesso rápido direto do seu celular
          </p>
        </div>
        <button
          onClick={installPwa}
          className="w-full px-5 py-3 rounded-xl text-base font-bold bg-white text-[#0c83fe] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          ⬇️ Instalar Agora
        </button>
      </div>
    </div>
  );
}
