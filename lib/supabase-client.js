import { createClient } from '@supabase/supabase-js';

// Inicializar o cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Função para obter ou criar o cliente Supabase
let supabaseInstance = null;

const getSupabaseClient = () => {
  // Verificar se estamos no lado do cliente
  if (typeof window === 'undefined') {
    console.warn('[Supabase] Tentativa de acessar cliente no servidor');
    return null;
  }

  // Verificar se as credenciais estão configuradas
  if (!supabaseUrl || !supabaseKey) {
    console.error('[Supabase] Credenciais não configuradas');
    return null;
  }

  // Criar instância apenas uma vez (singleton)
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseKey);
      console.log('[Supabase] Cliente inicializado com sucesso');
    } catch (error) {
      console.error('[Supabase] Erro ao criar cliente:', error);
      return null;
    }
  }

  return supabaseInstance;
};

// Exportar o cliente (será null no servidor)
const supabase = typeof window !== 'undefined' ? getSupabaseClient() : null;

export default supabase;
export { getSupabaseClient };
