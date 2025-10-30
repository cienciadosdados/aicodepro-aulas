/**
 * Script para verificar triggers e policies do Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Ler .env.local manualmente
const envContent = readFileSync('.env.local', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Credenciais do Supabase não configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTriggers() {
  console.log('🔍 Verificando triggers e policies do Supabase...\n');

  const tables = ['aula_views', 'script_downloads', 'aula_navigations', 'social_actions'];

  for (const table of tables) {
    console.log(`\n📋 Tabela: ${table}`);
    console.log('─'.repeat(50));

    // Tentar fazer um insert de teste
    try {
      const testData = {
        aula_number: 999,
        session_id: 'test_session',
        email: null,
        phone: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        timestamp: new Date().toISOString()
      };

      // Adicionar campos específicos por tabela
      if (table === 'aula_navigations') {
        testData.from_aula = 1;
        testData.to_aula = 2;
        delete testData.aula_number;
      } else if (table === 'social_actions') {
        testData.platform = 'test';
      }

      console.log('Tentando insert de teste...');
      const { data, error } = await supabase
        .from(table)
        .insert([testData])
        .select();

      if (error) {
        console.error(`❌ Erro no insert: ${error.message}`);
        console.error(`   Código: ${error.code}`);
        console.error(`   Detalhes: ${error.details}`);
        console.error(`   Hint: ${error.hint}`);
      } else {
        console.log('✅ Insert funcionou!');
        console.log(`   ID inserido: ${data?.[0]?.id || 'N/A'}`);
        
        // Deletar o registro de teste
        if (data?.[0]?.id) {
          await supabase.from(table).delete().eq('id', data[0].id);
          console.log('   Registro de teste deletado');
        }
      }
    } catch (error) {
      console.error(`❌ Erro inesperado: ${error.message}`);
    }
  }

  console.log('\n✅ Verificação concluída!');
}

checkTriggers();
