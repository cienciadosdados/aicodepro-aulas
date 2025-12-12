/**
 * Script para desabilitar triggers e testar inserts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Ler .env.local
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
  console.error('❌ Credenciais não configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixTriggers() {
  console.log('🔧 Desabilitando triggers...\n');

  const tables = ['aula_views', 'script_downloads', 'aula_navigations', 'social_actions'];

  try {
    // Desabilitar triggers em cada tabela
    for (const table of tables) {
      console.log(`Desabilitando triggers em ${table}...`);
      
      const { error } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE public.${table} DISABLE TRIGGER ALL;`
      });

      if (error) {
        console.log(`⚠️  Não foi possível desabilitar via RPC: ${error.message}`);
        console.log('   Vou tentar via SQL direto...');
      } else {
        console.log(`✅ Triggers desabilitados em ${table}`);
      }
    }

    console.log('\n🧪 Testando inserts...\n');

    // Testar insert em cada tabela
    for (const table of tables) {
      console.log(`Testando ${table}...`);

      const testData = {
        aula_number: 999,
        session_id: 'test_fix',
        email: null,
        phone: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        timestamp: new Date().toISOString()
      };

      if (table === 'aula_navigations') {
        testData.from_aula = 1;
        testData.to_aula = 2;
        delete testData.aula_number;
      } else if (table === 'social_actions') {
        testData.platform = 'test';
      }

      const { data, error } = await supabase
        .from(table)
        .insert([testData])
        .select();

      if (error) {
        console.log(`❌ AINDA com erro: ${error.message}`);
      } else {
        console.log(`✅ INSERT FUNCIONOU!`);
        
        // Deletar registro de teste
        if (data?.[0]?.id) {
          await supabase.from(table).delete().eq('id', data[0].id);
          console.log(`   Registro de teste deletado`);
        }
      }
      console.log();
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

fixTriggers();
