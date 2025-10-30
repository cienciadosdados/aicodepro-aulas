/**
 * Investigar a origem dos triggers problemáticos
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env.local', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function investigate() {
  console.log('🔍 Investigando origem dos triggers...\n');

  try {
    // 1. Verificar se as tabelas TÊM coluna updated_at
    console.log('📋 Verificando estrutura das tabelas:\n');
    
    const tables = ['aula_views', 'script_downloads', 'aula_navigations', 'social_actions'];
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        const hasUpdatedAt = columns.includes('updated_at');
        
        console.log(`${table}:`);
        console.log(`  Colunas: ${columns.join(', ')}`);
        console.log(`  Tem updated_at? ${hasUpdatedAt ? '✅ SIM' : '❌ NÃO'}`);
        
        if (!hasUpdatedAt) {
          console.log(`  ⚠️  PROBLEMA: Trigger de updated_at sem a coluna!`);
        }
        console.log();
      }
    }

    // 2. Verificar a função update_updated_at_column
    console.log('\n🔧 Verificando função update_updated_at_column:\n');
    
    const { data: functions, error: funcError } = await supabase.rpc('exec_sql', {
      sql: `
        SELECT 
          p.proname as function_name,
          pg_get_functiondef(p.oid) as definition
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND p.proname = 'update_updated_at_column';
      `
    });

    if (funcError) {
      console.log('⚠️  Não foi possível verificar via RPC');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

investigate();
