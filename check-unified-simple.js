const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lqxrqnqxagjvzgqgfqjl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeHJxbnF4YWdqdnpncWdmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzU3NzIsImV4cCI6MjAzNzI1MTc3Mn0.YEqOLFBXtHJJZqJGRpNZhqUdJJFBXtHJJZqJGRpNZhqU'
);

async function check() {
  try {
    // Última atualização
    const { data, error } = await supabase
      .from('unified_leads')
      .select('updated_at, created_at, email')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Erro:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('🕐 ÚLTIMA ATUALIZAÇÃO:', data[0].updated_at);
      console.log('📧 Email:', data[0].email);
      console.log('📅 Criado em:', data[0].created_at);
    }

    // Total
    const { count } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true });

    console.log('📊 Total de registros:', count);

  } catch (err) {
    console.error('Erro:', err);
  }
}

check();
