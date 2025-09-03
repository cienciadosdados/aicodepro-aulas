// Script simples para verificar dados de teste usando curl
const { exec } = require('child_process');

const SUPABASE_URL = 'https://mnwqydirohyiflubxhfb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud3F5ZGlyb2h5aWZsdWJ4aGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzQyNjEsImV4cCI6MjAzNzI1MDI2MX0.yBhsKhgJBBtqJFNOJWBBxQJtl2aKqHWLJTMVCjVxLGU';
const TEST_EMAIL = 'teste_tracking@aicodepro.com';

const tables = [
    'aula_views',
    'qualified_leads', 
    'aula_navigations',
    'script_downloads',
    'social_actions',
    'promo_banner_clicks'
];

async function checkTable(tableName) {
    return new Promise((resolve) => {
        const url = `${SUPABASE_URL}/rest/v1/${tableName}?email=eq.${encodeURIComponent(TEST_EMAIL)}&select=*&limit=1`;
        const cmd = `curl -s -H "apikey: ${SUPABASE_KEY}" -H "Authorization: Bearer ${SUPABASE_KEY}" "${url}"`;
        
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ ${tableName}: Erro de conexão`);
                resolve({ table: tableName, status: 'error', error: error.message });
                return;
            }
            
            try {
                const data = JSON.parse(stdout);
                if (Array.isArray(data) && data.length > 0) {
                    console.log(`✅ ${tableName}: ${data.length} registro(s) encontrado(s)`);
                    resolve({ table: tableName, status: 'success', count: data.length });
                } else {
                    console.log(`⚠️  ${tableName}: Nenhum registro encontrado`);
                    resolve({ table: tableName, status: 'empty', count: 0 });
                }
            } catch (parseError) {
                console.log(`❌ ${tableName}: Erro ao processar resposta`);
                resolve({ table: tableName, status: 'error', error: 'Parse error' });
            }
        });
    });
}

async function verifyAllTables() {
    console.log('🧪 VERIFICAÇÃO DE DADOS DE TESTE NO SUPABASE');
    console.log('='.repeat(50));
    console.log(`Procurando por registros com email: ${TEST_EMAIL}\n`);
    
    const results = [];
    
    for (const table of tables) {
        const result = await checkTable(table);
        results.push(result);
        
        // Delay entre consultas
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Resumo final
    console.log('\n📊 RESUMO DOS RESULTADOS:');
    console.log('='.repeat(50));
    
    const successful = results.filter(r => r.status === 'success');
    const empty = results.filter(r => r.status === 'empty');
    const errors = results.filter(r => r.status === 'error');
    
    console.log(`✅ Tabelas com dados: ${successful.length}`);
    console.log(`⚠️  Tabelas vazias: ${empty.length}`);
    console.log(`❌ Tabelas com erro: ${errors.length}`);
    
    if (successful.length > 0) {
        console.log('\n✅ TABELAS FUNCIONANDO:');
        successful.forEach(r => {
            console.log(`   - ${r.table}: ${r.count} registro(s)`);
        });
    }
    
    if (empty.length > 0) {
        console.log('\n⚠️  TABELAS SEM DADOS DE TESTE:');
        empty.forEach(r => {
            console.log(`   - ${r.table}: Execute o teste HTML primeiro`);
        });
    }
    
    if (errors.length > 0) {
        console.log('\n❌ TABELAS COM PROBLEMAS:');
        errors.forEach(r => {
            console.log(`   - ${r.table}: ${r.error}`);
        });
    }

    console.log('\n💡 PRÓXIMOS PASSOS:');
    if (empty.length > 0 || errors.length > 0) {
        console.log('   1. Execute o arquivo test-tracking.html no navegador');
        console.log('   2. Clique em "Executar Todos os Testes"');
        console.log('   3. Execute este script novamente');
    } else {
        console.log('   ✅ Todos os sistemas de tracking estão funcionando!');
    }
}

verifyAllTables().catch(console.error);
