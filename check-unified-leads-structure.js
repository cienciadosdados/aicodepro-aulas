// Script para verificar a estrutura da tabela unified_leads
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis de ambiente do Supabase não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUnifiedLeadsStructure() {
  try {
    console.log('🔍 Verificando estrutura da tabela unified_leads...\n');

    // 1. Buscar alguns registros para ver a estrutura
    const { data: sampleData, error: sampleError } = await supabase
      .from('unified_leads')
      .select('*')
      .limit(3);

    if (sampleError) {
      console.error('❌ Erro ao buscar dados de amostra:', sampleError);
      return;
    }

    if (sampleData && sampleData.length > 0) {
      console.log('📋 Campos encontrados na tabela unified_leads:');
      const fields = Object.keys(sampleData[0]);
      fields.forEach(field => {
        const value = sampleData[0][field];
        const type = typeof value;
        console.log(`  • ${field}: ${type} (exemplo: ${value})`);
      });
      console.log('\n');
    }

    // 2. Verificar campos de timestamp específicos
    const timestampFields = ['created_at', 'updated_at', 'timestamp', 'last_updated', 'modified_at'];
    console.log('🕐 Verificando campos de timestamp...');
    
    for (const field of timestampFields) {
      try {
        const { data, error } = await supabase
          .from('unified_leads')
          .select(field)
          .limit(1);
        
        if (!error && data) {
          console.log(`  ✅ Campo '${field}' existe`);
        }
      } catch (e) {
        console.log(`  ❌ Campo '${field}' não existe`);
      }
    }

    // 3. Verificar estatísticas da tabela
    console.log('\n📊 Estatísticas da tabela:');
    const { count, error: countError } = await supabase
      .from('unified_leads')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`  • Total de registros: ${count}`);
    }

    // 4. Verificar registros mais recentes (se existir campo de data)
    if (sampleData && sampleData.length > 0) {
      const fields = Object.keys(sampleData[0]);
      const dateFields = fields.filter(field => 
        field.includes('created') || 
        field.includes('updated') || 
        field.includes('timestamp') ||
        field.includes('date')
      );

      if (dateFields.length > 0) {
        console.log('\n📅 Registros mais recentes:');
        for (const dateField of dateFields) {
          try {
            const { data: recentData, error: recentError } = await supabase
              .from('unified_leads')
              .select(`id, email, ${dateField}`)
              .order(dateField, { ascending: false })
              .limit(3);

            if (!recentError && recentData) {
              console.log(`\n  Ordenado por ${dateField}:`);
              recentData.forEach((record, index) => {
                console.log(`    ${index + 1}. ${record.email || 'sem email'} - ${record[dateField]}`);
              });
            }
          } catch (e) {
            console.log(`  ❌ Erro ao ordenar por ${dateField}`);
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar a verificação
checkUnifiedLeadsStructure()
  .then(() => {
    console.log('\n✅ Verificação concluída!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro na execução:', error);
    process.exit(1);
  });
