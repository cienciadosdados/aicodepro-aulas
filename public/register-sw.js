// Registrar o service worker para melhorar o cache e performance offline
if ('serviceWorker' in navigator) {
  // Esperar até que a página esteja totalmente carregada para não competir por recursos
  window.addEventListener('load', function() {
    // Registrar o service worker com um pequeno atraso para priorizar o carregamento da página
    setTimeout(() => {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Pré-cachear páginas principais quando o usuário está online
          if (navigator.onLine && registration.active) {
            const pagesToCache = [
              '/',
              '/obrigado/'
            ];
            
            // Enviar mensagem para o service worker pré-cachear páginas
            registration.active.postMessage({
              type: 'CACHE_PAGES',
              payload: {
                urls: pagesToCache
              }
            });
          }
        })
        .catch(function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
    }, 3000); // Atraso de 3 segundos para priorizar renderização
  });
  
  // Detectar conexão lenta e desativar recursos pesados
  if ('connection' in navigator) {
    if (navigator.connection.saveData || 
        navigator.connection.effectiveType === 'slow-2g' || 
        navigator.connection.effectiveType === '2g') {
      // Adicionar classe para indicar conexão lenta
      document.documentElement.classList.add('slow-connection');
      
      // Desativar pré-carregamento de recursos não essenciais
      const nonCriticalPreloads = document.querySelectorAll('link[rel="preload"][as="image"]:not([fetchpriority="high"])');
      nonCriticalPreloads.forEach(link => {
        link.setAttribute('rel', 'prefetch');
      });
    }
  }
}
