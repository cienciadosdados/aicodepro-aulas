'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registrado com sucesso:', registration.scope);
          })
          .catch((error) => {
            console.error('❌ Erro ao registrar Service Worker:', error);
          });
      });
    }
  }, []);

  return null;
}
