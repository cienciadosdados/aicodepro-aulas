import { createClient } from '@supabase/supabase-js';

// Inicializar o cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabase;

// Inicializar o Supabase apenas no lado do cliente
if (typeof window !== 'undefined') {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export default supabase;
