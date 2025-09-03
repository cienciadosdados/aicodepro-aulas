// Script para verificar dados de teste no Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mnwqydirohyiflubxhfb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud3F5ZGlyb2h5aWZsdWJ4aGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzQyNjEsImV4cCI6MjAzNzI1MDI2MX0.yBhsKhgJBBtqJFNOJWBBxQJtl2aKqHWLJTMVCjVxLGU';
const supabase = createClient(supabaseUrl, supabaseKey);

// Email de teste para buscar
const TEST_EMAIL = 'teste_tracking@aicodepro.com';

async function verifyTable(tableName, searchField = 'email') {
    try {
        console.log(`\n🔍 Verificando tabela: ${tableName}`);
        
        const { data, error, count } = await supabase
            .from(tableName)
            .select('*', { count: 'exact' })
            .eq(searchField, TEST_EMAIL)
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            console.log(`❌ Erro ao consultar ${tableName}:`, error.message);
            return { table: tableName, status: 'error', error: error.message };
        }

        if (data && data.length > 0) {
            console.log(`✅ ${tableName}: ${data.length} registro(s) encontrado(s)`);
            console.log(`   Último registro:`, data[0]);
            return { table: tableName, status: 'success', count: data.length, lastRecord: data[0] };
        } else {
            console.log(`⚠️  ${tableName}: Nenhum registro encontrado`);
            return { table: tableName, status: 'empty', count: 0 };
        }
    } catch (error) {
        console.log(`❌ Erro inesperado em ${tableName}:`, error.message);
        return { table: tableName, status: 'error', error: error.message };
    }
}

async function verifyAllTables() {
    console.log('🧪 VERIFICAÇÃO DE DADOS DE TESTE NO SUPABASE');
    console.log('='.repeat(50));
    console.log(`Procurando por registros com email: ${TEST_EMAIL}`);
    
    const tables = [
        'aula_views',
        'qualified_leads', 
        'aula_navigations',
        'script_downloads',
        'social_actions',
        'promo_banner_clicks',
        'whatsapp_actions'
    ];

    const results = [];
    
    for (const table of tables) {
        const result = await verifyTable(table);
        results.push(result);
        
        // Delay entre consultas
        await new Promise(resolve => setTimeout(resolve, 500));
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
            console.log(`   - ${r.table}`);
        });
    }
    
    if (errors.length > 0) {
        console.log('\n❌ TABELAS COM PROBLEMAS:');
        errors.forEach(r => {
            console.log(`   - ${r.table}: ${r.error}`);
        });
    }

    // Verificação adicional: contar registros totais
    console.log('\n📈 CONTAGEM TOTAL DE REGISTROS:');
    console.log('='.repeat(50));
    
    for (const table of tables) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            
            if (!error) {
                console.log(`   ${table}: ${count} registros totais`);
            }
        } catch (e) {
            console.log(`   ${table}: Erro ao contar registros`);
        }
    }
}

// Executar verificação
verifyAllTables().catch(console.error);
