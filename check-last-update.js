// Script para verificar última atualização da tabela unified_leads
import supabase from './lib/supabase-client.js';

async function checkLastUpdate() {
  try {
    console.log('🔍 Verificando última atualização da tabela unified_leads...\n');

    // Verificar registro mais recente por created_at
    const { data: latestCreated, error: createdError } = await supabase
      .from('unified_leads')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (createdError) {
      console.error('❌ Erro ao buscar por created_at:', createdError);
    } else if (latestCreated && latestCreated.length > 0) {
      console.log('📅 Registros mais recentes por CRIAÇÃO:');
      latestCreated.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.email || 'sem email'} - ${record.created_at}`);
      });
      console.log('');
    }

    // Verificar registro mais recente por updated_at
    const { data: latestUpdated, error: updatedError } = await supabase
      .from('unified_leads')
      .select('id, email, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5);

    if (updatedError) {
      console.error('❌ Erro ao buscar por updated_at:', updatedError);
    } else if (latestUpdated && latestUpdated.length > 0) {
      console.log('🔄 Registros mais recentes por ATUALIZAÇÃO:');
      latestUpdated.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.email || 'sem email'} - ${record.updated_at}`);
      });
      console.log('');
    }

    // Contar total de registros
    const { count, error: countError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 Total de registros na unified_leads: ${count}`);
    }

    // Verificar estrutura de um registro
    const { data: sample, error: sampleError } = await supabase
      .from('unified_leads')
      .select('*')
      .limit(1);

    if (!sampleError && sample && sample.length > 0) {
      console.log('\n📋 Campos disponíveis na tabela:');
      Object.keys(sample[0]).forEach(field => {
        console.log(`  • ${field}`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Verificar se estamos no ambiente correto
if (typeof window === 'undefined') {
  // Node.js environment
  checkLastUpdate()
    .then(() => {
      console.log('\n✅ Verificação concluída!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro na execução:', error);
      process.exit(1);
    });
} else {
  // Browser environment
  console.log('Execute este script no Node.js, não no browser');
}
