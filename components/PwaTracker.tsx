'use client';

import { useEffect } from 'react';

export function PwaTracker() {
  useEffect(() => {
    // Detectar se foi instalado como PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('📱 [PWA] App rodando como PWA instalado');
      trackPwaInstall('standalone');
    }
    
    // Listener para evento de instalação
    window.addEventListener('appinstalled', (e) => {
      console.log('📱 [PWA] App foi instalado!');
      trackPwaInstall('installed');
    });
    
    // Listener para beforeinstallprompt (quando PWA pode ser instalado)
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('📱 [PWA] PWA pode ser instalado');
    });
  }, []);

  const trackPwaInstall = async (source: string) => {
    console.log('📱 [PWA] Rastreando instalação:', source);
    try {
      // Tentar capturar email do localStorage
      let userEmail = null;
      try {
        const leadData = localStorage.getItem('aicodepro_identified_email');
        if (leadData) {
          userEmail = leadData;
        }
        console.log('📱 [PWA] Email encontrado:', userEmail);
      } catch (e) {
        console.log('📱 [PWA] Email não encontrado');
      }
      
      const payload = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        source,
        email: userEmail
      };
      
      console.log('📱 [PWA] Enviando para API /api/track-pwa-install...', payload);
      
      const response = await fetch('/api/track-pwa-install', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('📱 [PWA] Resposta da API:', result);
      
      if (response.ok) {
        console.log('✅ [PWA] Instalação rastreada com sucesso!');
      } else {
        console.error('❌ [PWA] Erro ao rastrear instalação:', result);
      }
    } catch (error) {
      console.error('❌ [PWA] Erro ao rastrear instalação PWA:', error);
    }
  };

  return null; // Componente invisível
}
