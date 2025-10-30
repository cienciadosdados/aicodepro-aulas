/**
 * Script para testar tracking de visualizações de aulas em PRODUÇÃO
 * 
 * Este script verifica:
 * 1. Se há registros recentes na tabela aula_views
 * 2. Distribuição de visualizações por aula
 * 3. Últimas visualizações registradas
 * 4. Problemas de tracking
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

async function testTracking() {
  console.log('🔍 Verificando tracking de visualizações de aulas...\n');

  try {
    // 1. Verificar últimos registros
    console.log('📊 Últimas 10 visualizações registradas:');
    const { data: recentViews, error: recentError } = await supabase
      .from('aula_views')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (recentError) {
      console.error('❌ Erro ao buscar visualizações:', recentError);
      throw recentError;
    }

    if (!recentViews || recentViews.length === 0) {
      console.log('⚠️  NENHUMA visualização encontrada!');
      console.log('   Isso indica que o tracking NÃO está funcionando.\n');
    } else {
      console.log(`✅ ${recentViews.length} visualizações encontradas\n`);
      
      recentViews.forEach((view, index) => {
        const timestamp = new Date(view.timestamp);
        const now = new Date();
        const diffHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        let timeAgo = '';
        if (diffDays > 0) {
          timeAgo = `${diffDays} dia(s) atrás`;
        } else if (diffHours > 0) {
          timeAgo = `${diffHours} hora(s) atrás`;
        } else {
          timeAgo = 'menos de 1 hora atrás';
        }

        console.log(`${index + 1}. Aula ${view.aula_number} - ${timestamp.toLocaleString('pt-BR')} (${timeAgo})`);
        console.log(`   Email: ${view.email || 'não identificado'}`);
        console.log(`   Session: ${view.session_id?.substring(0, 20)}...`);
        console.log(`   UTM Source: ${view.utm_source || 'N/A'}\n`);
      });

      // Verificar se há registros recentes (últimas 24h)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const recentCount = recentViews.filter(v => new Date(v.timestamp) > oneDayAgo).length;
      
      if (recentCount === 0) {
        console.log('⚠️  ATENÇÃO: Nenhuma visualização nas últimas 24 horas!');
        console.log('   O tracking pode estar com problemas.\n');
      } else {
        console.log(`✅ ${recentCount} visualização(ões) nas últimas 24 horas\n`);
      }
    }

    // 2. Distribuição por aula
    console.log('📈 Distribuição de visualizações por aula:');
    const { data: distribution, error: distError } = await supabase
      .from('aula_views')
      .select('aula_number');

    if (distError) {
      console.error('❌ Erro ao buscar distribuição:', distError);
    } else if (distribution) {
      const counts = {};
      distribution.forEach(view => {
        counts[view.aula_number] = (counts[view.aula_number] || 0) + 1;
      });

      Object.keys(counts).sort((a, b) => a - b).forEach(aulaNum => {
        const bar = '█'.repeat(Math.min(counts[aulaNum], 50));
        console.log(`Aula ${aulaNum}: ${bar} ${counts[aulaNum]} views`);
      });
      console.log();
    }

    // 3. Estatísticas gerais
    console.log('📊 Estatísticas gerais:');
    const { count: totalViews, error: countError } = await supabase
      .from('aula_views')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Erro ao contar visualizações:', countError);
    } else {
      console.log(`Total de visualizações: ${totalViews}`);
    }

    // Contar sessões únicas
    const { data: sessions, error: sessionsError } = await supabase
      .from('aula_views')
      .select('session_id');

    if (!sessionsError && sessions) {
      const uniqueSessions = new Set(sessions.map(s => s.session_id)).size;
      console.log(`Sessões únicas: ${uniqueSessions}`);
    }

    // Contar emails identificados
    const { data: emails, error: emailsError } = await supabase
      .from('aula_views')
      .select('email')
      .not('email', 'is', null);

    if (!emailsError && emails) {
      const uniqueEmails = new Set(emails.map(e => e.email)).size;
      console.log(`Usuários identificados: ${uniqueEmails}`);
      console.log(`Taxa de identificação: ${((uniqueEmails / totalViews) * 100).toFixed(1)}%`);
    }

    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
    process.exit(1);
  }
}

// Executar teste
testTracking();
