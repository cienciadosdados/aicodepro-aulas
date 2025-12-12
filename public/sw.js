// Service Worker para AI Code Pro
const CACHE_NAME = 'ai-code-pro-cache-v2025-10-19-3';

// Recursos para pré-cache (críticos para o LCP)
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          console.log('Eliminando cache antigo:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache para recursos estáticos
const staticCacheStrategy = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Salvar no cache apenas se for uma resposta válida
    if (networkResponse.ok) {
      // Clone a resposta antes de colocá-la no cache
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Falha ao buscar recurso:', error);
    // Retornar resposta de fallback ou null
    return new Response('Erro de rede', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Estratégia de cache para imagens
const imagesCacheStrategy = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Buscar atualização em segundo plano
    fetch(request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse);
        }
      })
      .catch(error => console.error('Erro ao atualizar cache de imagem:', error));
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Falha ao buscar imagem:', error);
    return new Response('Erro ao carregar imagem', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Ignorar requisições de análise e rastreamento
  if (url.hostname.includes('google-analytics.com') || 
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('facebook.com')) {
    return;
  }
  
  // Aplicar estratégia baseada no tipo de recurso
  if (event.request.method === 'GET') {
    // Estratégia para imagens
    if (event.request.destination === 'image') {
      event.respondWith(imagesCacheStrategy(event.request));
    } 
    // Estratégia para recursos estáticos
    else if (
      event.request.destination === 'style' || 
      event.request.destination === 'script' || 
      event.request.destination === 'font' ||
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.js') || 
      url.pathname.endsWith('.woff2')
    ) {
      event.respondWith(staticCacheStrategy(event.request));
    }
    // Estratégia para HTML (navegação)
    else if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .catch(() => caches.match('/'))
      );
    }
  }
});

// Pré-buscar recursos quando online
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PREFETCH_RESOURCES') {
    const urls = event.data.urls;
    if (urls && Array.isArray(urls)) {
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll(urls).then(() => {
          console.log('Recursos pré-buscados com sucesso');
        });
      });
    }
  }
});
