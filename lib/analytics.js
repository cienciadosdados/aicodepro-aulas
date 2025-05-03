// lib/analytics.js
// Funções auxiliares para trabalhar com Google Analytics 4

// Função para enviar um evento personalizado para o GA4
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`[GA4] Evento rastreado: ${eventName}`, eventParams);
  } else {
    console.warn(`[GA4] Não foi possível rastrear o evento: ${eventName}. gtag não está disponível.`);
  }
};

// Função para rastrear visualização de página
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
    console.log(`[GA4] Visualização de página rastreada: ${url}`);
  } else {
    console.warn(`[GA4] Não foi possível rastrear visualização de página: ${url}. gtag não está disponível.`);
  }
};

// Função para rastrear visualização de aula no GA4
export const trackAulaViewGA4 = (aulaNumber, title) => {
  trackEvent('view_aula', {
    aula_number: aulaNumber,
    aula_title: title
  });
};

// Função para rastrear identificação de lead no GA4
export const trackLeadIdentificationGA4 = (email) => {
  // Não enviamos o email completo para o GA4 por questões de privacidade
  // Enviamos apenas o domínio do email
  const emailDomain = email.split('@')[1];
  
  trackEvent('lead_identification', {
    email_domain: emailDomain
  });
};

// Função para rastrear download de script no GA4
export const trackScriptDownloadGA4 = (aulaNumber, fileName) => {
  trackEvent('download_script', {
    aula_number: aulaNumber,
    file_name: fileName
  });
};

// Função para rastrear ação social no GA4
export const trackSocialActionGA4 = (platform, aulaNumber) => {
  trackEvent('social_action', {
    platform: platform,
    aula_number: aulaNumber
  });
};
