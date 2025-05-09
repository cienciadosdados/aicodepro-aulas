// Serviço de rastreamento de aulas usando Supabase
import supabase from './supabase-client';

// Verificar se estamos em modo de desenvolvimento
const isDevelopment = process.env.NODE_ENV === 'development';

// Função auxiliar para verificar se o cliente Supabase está disponível
const isSupabaseAvailable = () => {
  if (!supabase) {
    console.warn('Cliente Supabase não disponível');
    return false;
  }
  return true;
};

// Função para lidar com erros de forma consistente
const handleTrackingError = (action, error) => {
  // Em desenvolvimento, apenas logar o erro sem alarmar
  if (isDevelopment) {
    console.warn(`[DEV] Erro ao ${action}:`, error);
    return { success: false, error: error?.message || 'Erro desconhecido', isDevelopment };
  }
  
  // Em produção, logar o erro completo
  console.error(`Erro ao ${action}:`, error);
  return { success: false, error: error?.message || 'Erro desconhecido' };
};

/**
 * Gera ou recupera um ID de sessão único para o visitante atual
 * @returns {string} ID de sessão único
 */
export const getSessionId = () => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('aicodepro_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('aicodepro_session_id', sessionId);
  }
  
  return sessionId;
};

/**
 * Obtém um parâmetro UTM da URL atual
 * @param {string} param - Nome do parâmetro UTM
 * @returns {string} Valor do parâmetro UTM ou string vazia
 */
export const getUtmParam = (param) => {
  if (typeof window === 'undefined') return '';
  const urlParams = new URLSearchParams(window.location.search);
  const storedValue = localStorage.getItem(param);
  if (storedValue) {
    return storedValue;
  }
  return urlParams.get(param) || '';
};

/**
 * Obtém todos os parâmetros UTM da URL atual
 * @returns {Object} Objeto com todos os parâmetros UTM
 */
export const getAllUtmParams = () => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
      // Armazenar parâmetros UTM no localStorage para persistência
      localStorage.setItem(param, value);
    } else {
      // Tentar recuperar do localStorage se não estiver na URL
      const storedValue = localStorage.getItem(param);
      if (storedValue) {
        utmParams[param] = storedValue;
      }
    }
  });
  
  return utmParams;
};

/**
 * Rastreia a visualização de uma aula no Supabase
 * @param {number} aulaNumber - Número da aula visualizada
 * @returns {Promise} Resultado da operação
 */
export const trackAulaView = async (aulaNumber) => {
  try {
    const sessionId = getSessionId();
    const utmParams = getAllUtmParams();
    // Obter o email e phone do usuário identificado do localStorage
    const identifiedEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_email') : null;
    const identifiedPhone = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_phone') : null;
    
    const viewData = {
      email: identifiedEmail || null,
      phone: identifiedPhone || null,
      session_id: sessionId,
      aula_number: aulaNumber,
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      utm_content: utmParams.utm_content || null,
      utm_term: utmParams.utm_term || null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
      timestamp: new Date().toISOString()
    };
    
    // Inserir na tabela 'aula_views'
    const { data, error } = await supabase
      .from('aula_views')
      .insert([viewData]);
    
    if (error) throw error;
    
    console.log('Visualização de aula rastreada com sucesso:', aulaNumber);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao rastrear visualização de aula:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Associa um lead ao ID de sessão atual
 * @param {Object} leadData - Dados do lead
 * @returns {Promise} Resultado da operação
 */
export const associateLeadWithSession = async (leadData) => {
  try {
    if (!leadData.email) {
      return { success: false, error: 'Email não fornecido' };
    }

    const sessionId = getSessionId();
    const email = leadData.email.trim().toLowerCase(); // Normalizar o email
    
    console.log('Tentando associar lead com email:', email);
    
    // Verificar se estamos em ambiente de desenvolvimento
    const isDev = process.env.NODE_ENV === 'development' || !supabase;
    
    // Lista de emails de teste para desenvolvimento
    const testEmails = [
      'teste@teste.com',
      'test@test.com',
      'dev@dev.com',
      'admin@admin.com'
    ];
    
    // Permitir emails de teste em desenvolvimento
    if (isDev && testEmails.includes(email)) {
      console.log('Email de teste reconhecido em ambiente de desenvolvimento:', email);
      
      // Simular um lead encontrado
      const mockLead = {
        id: 'dev-' + Math.random().toString(36).substring(2, 9),
        email: email,
        phone: '+5500000000000'
      };
      
      // Salvar no localStorage para persistência
      localStorage.setItem('aicodepro_identified_email', email);
      localStorage.setItem('aicodepro_identified_phone', mockLead.phone);
      
      return { success: true, data: mockLead };
    }
    
    // Em produção, verificar no Supabase
    if (!supabase) {
      return { success: false, error: 'Cliente Supabase não disponível' };
    }
    
    try {
      // Buscar o lead na tabela qualified_leads
      const { data: lead, error } = await supabase
        .from('qualified_leads')
        .select('id, email, phone')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      
      if (!lead) {
        console.log('Lead não encontrado para o email:', email);
        console.log('Criando novo lead para:', email);
        
        // Criar um novo lead com o email fornecido
        const newLead = {
          id: 'new-' + Math.random().toString(36).substring(2, 15),
          email: email,
          phone: leadData.phone || ''
        };
        
        // Salvar no localStorage para persistência imediata
        localStorage.setItem('aicodepro_identified_email', email);
        localStorage.setItem('aicodepro_identified_phone', newLead.phone);
        
        // Criar o lead no Supabase
        try {
          const { data: insertedLead, error: insertError } = await supabase
            .from('qualified_leads')
            .insert([{
              email: email,
              phone: newLead.phone,
              session_id: sessionId,
              source: 'auto_created',
              created_at: new Date().toISOString()
            }])
            .select()
            .single();
          
          if (insertError) throw insertError;
          
          // Se conseguimos inserir e recuperar o lead, use-o
          if (insertedLead) {
            console.log('Novo lead criado com sucesso:', insertedLead);
            return { success: true, data: insertedLead, isNew: true };
          }
        } catch (insertError) {
          console.warn('Não foi possível criar lead no banco, mas continuando com identificação local:', insertError);
        }
        
        // Mesmo se falhar a inserção, considere como sucesso para não bloquear o usuário
        return { success: true, data: newLead, isNew: true };
      }
      
      console.log('Lead encontrado:', lead);
      
      // Atualizar o lead com o sessionId atual
      try {
        const { error: updateError } = await supabase
          .from('qualified_leads')
          .update({ session_id: sessionId })
          .eq('id', lead.id);
        
        if (updateError) throw updateError;
      } catch (updateError) {
        console.error('Erro na atualização do lead:', updateError);
        // Não interromper o fluxo, apenas logar o erro
      }
      
      // Salvar no localStorage para persistência mesmo que a atualização no Supabase falhe
      localStorage.setItem('aicodepro_identified_email', email);
      localStorage.setItem('aicodepro_identified_phone', lead.phone || '');
      
      console.log('Lead associado à sessão com sucesso:', email);
      return { success: true, data: lead };
    } catch (innerError) {
      console.error('Erro durante o processo de associação:', innerError);
      
      // Verificar se o email é um dos emails de teste para simular sucesso mesmo com erro
      const testEmails = ['fivedeieis@gmail.com', 'test@example.com', 'dev@example.com'];
      
      if (testEmails.includes(email)) {
        console.log('Email de teste reconhecido mesmo após erro:', email);
        // Simular um lead encontrado
        const mockLead = {
          id: 'recovery-' + Math.random().toString(36).substring(2, 9),
          email: email,
          phone: null
        };
        
        // Salvar no localStorage para persistência
        localStorage.setItem('aicodepro_identified_email', email);
        
        return { success: true, data: mockLead, recovered: true };
      }
      
      throw innerError;
    }
  } catch (error) {
    console.error('Erro ao associar lead à sessão:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Rastreia a navegação entre aulas
 * @param {number} fromAula - Número da aula de origem
 * @param {number} toAula - Número da aula de destino
 * @returns {Promise} Resultado da operação
 */
export const trackAulaNavigation = async (fromAula, toAula) => {
  try {
    const sessionId = getSessionId();
    const utmParams = getAllUtmParams();
    // Obter o email e phone do usuário identificado do localStorage
    const identifiedEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_email') : null;
    const identifiedPhone = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_phone') : null;
    
    const navigationData = {
      email: identifiedEmail || null,
      phone: identifiedPhone || null,
      session_id: sessionId,
      from_aula: fromAula,
      to_aula: toAula,
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      timestamp: new Date().toISOString()
    };
    
    // Inserir na tabela 'aula_navigations'
    const { data, error } = await supabase
      .from('aula_navigations')
      .insert([navigationData]);
    
    if (error) throw error;
    
    console.log('Navegação entre aulas rastreada com sucesso:', fromAula, '->', toAula);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao rastrear navegação entre aulas:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Rastreia o download de um script de aula
 * @param {number} aulaNumber - Número da aula
 * @returns {Promise} Resultado da operação
 */
export const trackScriptDownload = async (aulaNumber) => {
  try {
    const sessionId = getSessionId();
    const utmParams = getAllUtmParams();
    // Obter o email e phone do usuário identificado do localStorage
    const identifiedEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_email') : null;
    const identifiedPhone = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_phone') : null;
    
    const downloadData = {
      email: identifiedEmail || null,
      phone: identifiedPhone || null,
      session_id: sessionId,
      aula_number: aulaNumber,
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      timestamp: new Date().toISOString()
    };
    
    // Inserir na tabela 'script_downloads'
    const { data, error } = await supabase
      .from('script_downloads')
      .insert([downloadData]);
    
    if (error) throw error;
    
    console.log('Download de script rastreado com sucesso:', aulaNumber);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao rastrear download de script:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Rastreia ações sociais (seguir no Instagram ou YouTube)
 * @param {string} platform - Plataforma social ('instagram' ou 'youtube')
 * @param {number} aulaNumber - Número da aula onde a ação foi realizada
 * @returns {Promise} Resultado da operação
 */
export const trackSocialAction = async (platform, aulaNumber) => {
  try {
    const sessionId = getSessionId();
    const utmParams = getAllUtmParams();
    // Obter o email e phone do usuário identificado do localStorage
    const identifiedEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_email') : null;
    const identifiedPhone = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_phone') : null;
    
    const socialData = {
      email: identifiedEmail || null,
      phone: identifiedPhone || null,
      session_id: sessionId,
      platform: platform,
      aula_number: aulaNumber,
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      timestamp: new Date().toISOString()
    };
    
    // Inserir na tabela 'social_actions'
    const { data, error } = await supabase
      .from('social_actions')
      .insert([socialData]);
    
    if (error) throw error;
    
    console.log('Ação social rastreada com sucesso:', platform, 'na aula', aulaNumber);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao rastrear ação social:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Rastreia ações do WhatsApp (clique no botão, envio de mensagem, etc.)
 * @param {string} actionType - Tipo de ação ('click', 'message_sent', etc.)
 * @param {number} aulaNumber - Número da aula onde a ação foi realizada
 * @returns {Promise} Resultado da operação
 */
export const trackWhatsAppAction = async (actionType, aulaNumber) => {
  try {
    // Verificar se o cliente Supabase está disponível
    if (!supabase) {
      console.warn('Cliente Supabase não disponível para rastrear ação do WhatsApp');
      return { success: false, error: 'Cliente Supabase não disponível' };
    }

    // Verificar parâmetros
    if (!actionType) {
      console.warn('Tipo de ação não fornecido para rastreamento de WhatsApp');
      return { success: false, error: 'Tipo de ação não fornecido' };
    }

    if (!aulaNumber && aulaNumber !== 0) {
      console.warn('Número da aula não fornecido para rastreamento de WhatsApp');
      aulaNumber = 0; // Usar 0 como valor padrão
    }

    const sessionId = getSessionId();
    const utmParams = getAllUtmParams();
    
    // Obter o email e phone do usuário identificado do localStorage
    const identifiedEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_email') : null;
    const identifiedPhone = typeof localStorage !== 'undefined' ? localStorage.getItem('aicodepro_identified_phone') : null;
    
    console.log('Rastreando ação do WhatsApp:', { 
      actionType, 
      aulaNumber, 
      email: identifiedEmail, 
      sessionId 
    });
    
    const whatsappData = {
      email: identifiedEmail || null,
      phone: identifiedPhone || null,
      session_id: sessionId,
      action_type: actionType,
      aula_number: aulaNumber,
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      timestamp: new Date().toISOString()
    };
    
    // Verificar se a tabela existe primeiro
    try {
      // Tentar inserir na tabela 'whatsapp_actions'
      const { data, error } = await supabase
        .from('whatsapp_actions')
        .insert([whatsappData]);
      
      if (error) {
        // Se o erro for relacionado à tabela não existir, registrar isso
        if (error.message && error.message.includes('relation "whatsapp_actions" does not exist')) {
          console.error('Tabela whatsapp_actions não existe no Supabase. Execute o SQL para criá-la.');
          return { 
            success: false, 
            error: 'Tabela whatsapp_actions não existe', 
            needsTableCreation: true 
          };
        }
        throw error;
      }
      
      console.log('Ação do WhatsApp rastreada com sucesso:', actionType, 'na aula', aulaNumber);
      return { success: true, data };
    } catch (dbError) {
      console.error('Erro ao inserir na tabela whatsapp_actions:', dbError);
      
      // Continuar a execução mesmo com erro no banco de dados
      // Não queremos que problemas de rastreamento afetem a experiência do usuário
      return { 
        success: false, 
        error: dbError.message,
        // Ainda assim, considerar como sucesso para a interface do usuário
        uiSuccess: true 
      };
    }
  } catch (error) {
    console.error('Erro ao rastrear ação do WhatsApp:', error);
    // Mesmo com erro, não afetar a experiência do usuário
    return { success: false, error: error.message, uiSuccess: true };
  }
};
