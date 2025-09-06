const https = require('https');

const supabaseUrl = 'https://lqxrqnqxagjvzgqgfqjl.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeHJxbnF4YWdqdnpncWdmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzU3NzIsImV4cCI6MjAzNzI1MTc3Mn0.YEqOLFBXtHJJZqJGRpNZhqUdJJFBXtHJJZqJGRpNZhqU';

function querySupabase(endpoint, callback) {
  const options = {
    hostname: 'lqxrqnqxagjvzgqgfqjl.supabase.co',
    port: 443,
    path: `/rest/v1/${endpoint}`,
    method: 'GET',
    headers: {
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        callback(null, result);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

console.log('🔍 Consultando tabela unified_leads...\n');

// 1. Última atualização
querySupabase('unified_leads?select=updated_at,created_at,email&order=updated_at.desc&limit=1', (error, data) => {
  if (error) {
    console.error('❌ Erro:', error);
    return;
  }
  
  if (data && data.length > 0) {
    const record = data[0];
    console.log('🕐 ÚLTIMA ATUALIZAÇÃO DA TABELA:', record.updated_at);
    console.log('📧 Email do registro:', record.email || 'sem email');
    console.log('📅 Criado em:', record.created_at);
    console.log('');
  }

  // 2. Total de registros
  querySupabase('unified_leads?select=*&head=true', (error2, data2) => {
    console.log('📊 Consultando total de registros...');
    
    // 3. Registros mais recentes
    querySupabase('unified_leads?select=email,created_at,updated_at&order=created_at.desc&limit=5', (error3, data3) => {
      if (error3) {
        console.error('❌ Erro ao buscar registros recentes:', error3);
        return;
      }
      
      if (data3 && data3.length > 0) {
        console.log('📅 ÚLTIMOS 5 REGISTROS CRIADOS:');
        data3.forEach((record, index) => {
          console.log(`  ${index + 1}. ${record.email || 'sem email'}`);
          console.log(`     Criado: ${record.created_at}`);
          console.log(`     Atualizado: ${record.updated_at}`);
          console.log('');
        });
      }
    });
  });
});
