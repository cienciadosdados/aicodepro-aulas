/**
 * Script para verificar registros de "Interesse Registrado" (script_downloads)
 * 
 * Este script mostra:
 * 1. Últimos registros de interesse
 * 2. Distribuição por aula
 * 3. Taxa de conversão (views → interesse)
 * 4. Usuários identificados
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

async function checkInteresseRegistrado() {
  console.log('🔍 Verificando registros de "Interesse Registrado"...\n');

  try {
    // 1. Verificar últimos registros
    console.log('📊 Últimos 10 registros de interesse:');
    const { data: recentDownloads, error: recentError } = await supabase
      .from('script_downloads')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (recentError) {
      console.error('❌ Erro ao buscar registros:', recentError);
      throw recentError;
    }

    if (!recentDownloads || recentDownloads.length === 0) {
      console.log('⚠️  NENHUM registro de interesse encontrado!');
      console.log('   Isso indica que ninguém clicou em "Baixar Script".\n');
    } else {
      console.log(`✅ ${recentDownloads.length} registros encontrados\n`);
      
      recentDownloads.forEach((download, index) => {
        const timestamp = new Date(download.timestamp);
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

        console.log(`${index + 1}. Aula ${download.aula_number} - ${timestamp.toLocaleString('pt-BR')} (${timeAgo})`);
        console.log(`   Email: ${download.email || 'não identificado'}`);
        console.log(`   Phone: ${download.phone || 'não identificado'}`);
        console.log(`   Session: ${download.session_id?.substring(0, 20)}...`);
        console.log(`   UTM Source: ${download.utm_source || 'N/A'}\n`);
      });

      // Verificar se há registros recentes (últimas 24h)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const recentCount = recentDownloads.filter(d => new Date(d.timestamp) > oneDayAgo).length;
      
      if (recentCount === 0) {
        console.log('⚠️  ATENÇÃO: Nenhum registro de interesse nas últimas 24 horas!\n');
      } else {
        console.log(`✅ ${recentCount} registro(s) de interesse nas últimas 24 horas\n`);
      }
    }

    // 2. Distribuição por aula
    console.log('📈 Distribuição de interesse por aula:');
    const { data: distribution, error: distError } = await supabase
      .from('script_downloads')
      .select('aula_number');

    if (distError) {
      console.error('❌ Erro ao buscar distribuição:', distError);
    } else if (distribution) {
      const counts = {};
      distribution.forEach(download => {
        counts[download.aula_number] = (counts[download.aula_number] || 0) + 1;
      });

      Object.keys(counts).sort((a, b) => a - b).forEach(aulaNum => {
        const bar = '█'.repeat(Math.min(counts[aulaNum], 50));
        console.log(`Aula ${aulaNum}: ${bar} ${counts[aulaNum]} interesses`);
      });
      console.log();
    }

    // 3. Estatísticas gerais
    console.log('📊 Estatísticas gerais:');
    const { count: totalDownloads, error: countError } = await supabase
      .from('script_downloads')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Erro ao contar registros:', countError);
    } else {
      console.log(`Total de registros de interesse: ${totalDownloads}`);
    }

    // Contar sessões únicas
    const { data: sessions, error: sessionsError } = await supabase
      .from('script_downloads')
      .select('session_id');

    if (!sessionsError && sessions) {
      const uniqueSessions = new Set(sessions.map(s => s.session_id)).size;
      console.log(`Sessões únicas: ${uniqueSessions}`);
    }

    // Contar emails identificados
    const { data: emails, error: emailsError } = await supabase
      .from('script_downloads')
      .select('email')
      .not('email', 'is', null);

    if (!emailsError && emails) {
      const uniqueEmails = new Set(emails.map(e => e.email)).size;
      console.log(`Usuários identificados: ${uniqueEmails}`);
      if (totalDownloads > 0) {
        console.log(`Taxa de identificação: ${((uniqueEmails / totalDownloads) * 100).toFixed(1)}%`);
      }
    }

    // 4. Taxa de conversão (views → interesse)
    console.log('\n📈 Taxa de Conversão (Visualizações → Interesse):');
    
    const { count: totalViews } = await supabase
      .from('aula_views')
      .select('*', { count: 'exact', head: true });

    if (totalViews && totalDownloads) {
      const conversionRate = ((totalDownloads / totalViews) * 100).toFixed(2);
      console.log(`Total de visualizações: ${totalViews}`);
      console.log(`Total de interesses: ${totalDownloads}`);
      console.log(`Taxa de conversão: ${conversionRate}%`);
      
      if (parseFloat(conversionRate) < 1) {
        console.log('⚠️  Taxa de conversão baixa! Considere otimizar o CTA.');
      } else if (parseFloat(conversionRate) < 5) {
        console.log('✅ Taxa de conversão razoável.');
      } else {
        console.log('🎉 Excelente taxa de conversão!');
      }
    }

    console.log('\n✅ Verificação concluída!');

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
    process.exit(1);
  }
}

// Executar verificação
checkInteresseRegistrado();
