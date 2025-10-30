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

async function testReal() {
  console.log('🧪 Inserindo registro REAL (não vai deletar)...\n');

  const testData = {
    aula_number: 999,
    session_id: 'test_real_' + Date.now(),
    email: 'teste_funcionou@aicodepro.com',
    phone: null,
    utm_source: 'teste_fix',
    utm_medium: null,
    utm_campaign: null,
    timestamp: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('script_downloads')
    .insert([testData])
    .select();

  if (error) {
    console.log('❌ Erro:', error.message);
  } else {
    console.log('✅ SUCESSO! Registro inserido:');
    console.log('   ID:', data[0].id);
    console.log('   Email:', data[0].email);
    console.log('   Aula:', data[0].aula_number);
    console.log('\n👉 Vá no Supabase e veja a tabela script_downloads');
    console.log('   Procure por: aula_number = 999');
  }
}

testReal();
