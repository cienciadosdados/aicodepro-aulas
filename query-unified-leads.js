// Consulta para verificar última atualização da unified_leads
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase - usando as mesmas credenciais do projeto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lqxrqnqxagjvzgqgfqjl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeHJxbnF4YWdqdnpncWdmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzU3NzIsImV4cCI6MjAzNzI1MTc3Mn0.YEqOLFBXtHJJZqJGRpNZhqUdJJFBXtHJJZqJGRpNZhqU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function queryUnifiedLeads() {
  try {
    console.log('🔍 Consultando tabela unified_leads...\n');

    // 1. Última atualização geral
    const { data: maxUpdate, error: maxError } = await supabase
      .from('unified_leads')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (maxError) {
      console.error('❌ Erro ao buscar última atualização:', maxError);
      return;
    }

    if (maxUpdate && maxUpdate.length > 0) {
      console.log(`🕐 ÚLTIMA ATUALIZAÇÃO DA TABELA: ${maxUpdate[0].updated_at}`);
    }

    // 2. Total de registros
    const { count, error: countError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 TOTAL DE REGISTROS: ${count}`);
    }

    // 3. Registros mais recentes (criação)
    const { data: recent, error: recentError } = await supabase
      .from('unified_leads')
      .select('email, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!recentError && recent) {
      console.log('\n📅 REGISTROS MAIS RECENTES (por criação):');
      recent.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.email || 'sem email'}`);
        console.log(`     Criado: ${record.created_at}`);
        console.log(`     Atualizado: ${record.updated_at}`);
      });
    }

    // 4. Registros mais recentemente atualizados
    const { data: updated, error: updatedError } = await supabase
      .from('unified_leads')
      .select('email, created_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5);

    if (!updatedError && updated) {
      console.log('\n🔄 REGISTROS MAIS RECENTEMENTE ATUALIZADOS:');
      updated.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.email || 'sem email'}`);
        console.log(`     Criado: ${record.created_at}`);
        console.log(`     Atualizado: ${record.updated_at}`);
      });
    }

    // 5. Estatísticas por período
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    
    const { count: hojeCriados, error: hojeError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', hoje.toISOString().split('T')[0]);

    const { count: ontemCriados, error: ontemError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', ontem.toISOString().split('T')[0])
      .lt('created_at', hoje.toISOString().split('T')[0]);

    if (!hojeError && !ontemError) {
      console.log('\n📈 ESTATÍSTICAS:');
      console.log(`  • Criados hoje: ${hojeCriados || 0}`);
      console.log(`  • Criados ontem: ${ontemCriados || 0}`);
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

queryUnifiedLeads();
