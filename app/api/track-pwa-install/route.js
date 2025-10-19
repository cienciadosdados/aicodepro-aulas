import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Verificar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'OK' : 'FALTANDO')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'OK' : 'FALTANDO')
}

// Criar cliente Supabase
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function POST(request) {
  const requestId = Math.random().toString(36).substring(2, 8)
  console.log(`[${requestId}] 📱 Nova instalação PWA`)
  
  // Verificar se Supabase está configurado
  if (!supabase) {
    console.error(`[${requestId}] ❌ Supabase não configurado!`)
    return NextResponse.json(
      { success: false, error: 'Configuração do servidor incompleta', details: 'Supabase não inicializado' },
      { status: 500 }
    )
  }
  
  try {
    const { userAgent, timestamp, source = 'unknown', email } = await request.json()
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     null
    
    console.log(`[${requestId}] Dados recebidos:`, {
      source,
      email,
      userAgent: userAgent?.substring(0, 50) + '...',
      ipAddress
    })
    
    // Inserir no banco via Supabase
    const { data, error } = await supabase
      .from('pwa_installs')
      .insert({
        user_agent: userAgent,
        source: source,
        ip_address: ipAddress,
        email: email,
        timestamp: timestamp || new Date().toISOString()
      })
      .select('id, email, created_at')
    
    if (error) {
      console.error(`[${requestId}] ❌ Erro Supabase:`, error)
      console.error(`[${requestId}] Detalhes do erro:`, JSON.stringify(error, null, 2))
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar no banco', details: error.message, code: error.code },
        { status: 500 }
      )
    }
    
    const savedData = Array.isArray(data) ? data[0] : data
    console.log(`[${requestId}] ✅ Instalação PWA salva no banco:`, savedData)
    
    return NextResponse.json({
      success: true,
      message: 'Instalação PWA registrada no banco',
      data: data
    })
  } catch (error) {
    console.error(`[${requestId}] ❌ Erro ao registrar instalação PWA:`, error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  const requestId = Math.random().toString(36).substring(2, 8)
  console.log(`[${requestId}] 📊 Carregando stats de PWA installs`)
  
  try {
    // Contar total
    const { count: totalCount, error: totalError } = await supabase
      .from('pwa_installs')
      .select('*', { count: 'exact', head: true })
    
    if (totalError) throw totalError
    
    // Contar hoje
    const today = new Date().toISOString().split('T')[0]
    const { count: todayCount, error: todayError } = await supabase
      .from('pwa_installs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today)
    
    if (todayError) throw todayError
    
    // Contar com email
    const { count: emailCount, error: emailError } = await supabase
      .from('pwa_installs')
      .select('*', { count: 'exact', head: true })
      .not('email', 'is', null)
    
    if (emailError) throw emailError
    
    return NextResponse.json({
      success: true,
      stats: {
        total_installs: totalCount || 0,
        installs_today: todayCount || 0,
        installs_with_email: emailCount || 0
      }
    })
  } catch (error) {
    console.error(`[${requestId}] ❌ Erro ao carregar stats:`, error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    )
  }
}
