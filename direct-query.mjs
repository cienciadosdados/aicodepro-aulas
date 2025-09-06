import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lqxrqnqxagjvzgqgfqjl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeHJxbnF4YWdqdnpncWdmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzU3NzIsImV4cCI6MjAzNzI1MTc3Mn0.YEqOLFBXtHJJZqJGRpNZhqUdJJFBXtHJJZqJGRpNZhqU'
);

async function queryUnifiedLeads() {
  console.log('🔍 Consultando tabela unified_leads...\n');

  try {
    // 1. Última atualização
    const { data: lastUpdate, error: updateError } = await supabase
      .from('unified_leads')
      .select('updated_at, created_at, email')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('❌ Erro ao buscar última atualização:', updateError);
    } else if (lastUpdate && lastUpdate.length > 0) {
      const record = lastUpdate[0];
      console.log('🕐 ÚLTIMA ATUALIZAÇÃO DA TABELA:', record.updated_at);
      console.log('📧 Email do registro:', record.email || 'sem email');
      console.log('📅 Criado em:', record.created_at);
      console.log('');
    }

    // 2. Total de registros
    const { count, error: countError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Erro ao contar registros:', countError);
    } else {
      console.log('📊 TOTAL DE REGISTROS:', count);
      console.log('');
    }

    // 3. Registros mais recentes
    const { data: recent, error: recentError } = await supabase
      .from('unified_leads')
      .select('email, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentError) {
      console.error('❌ Erro ao buscar registros recentes:', recentError);
    } else if (recent && recent.length > 0) {
      console.log('📅 ÚLTIMOS 5 REGISTROS CRIADOS:');
      recent.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.email || 'sem email'}`);
        console.log(`     Criado: ${record.created_at}`);
        console.log(`     Atualizado: ${record.updated_at}`);
        console.log('');
      });
    }

    // 4. Estatísticas por data
    const hoje = new Date().toISOString().split('T')[0];
    const ontem = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const { count: hojeCriados } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', hoje);

    const { count: ontemCriados } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', ontem)
      .lt('created_at', hoje);

    console.log('📈 ESTATÍSTICAS:');
    console.log(`  • Criados hoje (${hoje}): ${hojeCriados || 0}`);
    console.log(`  • Criados ontem (${ontem}): ${ontemCriados || 0}`);

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

queryUnifiedLeads();
