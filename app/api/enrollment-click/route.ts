// API Route para capturar cliques de matrícula
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const {
            email,
            phone,
            session_id,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            user_agent,
            referrer,
            button_text,
            current_page = '/espera'
        } = body;

        // Capturar IP do request
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        // Dados para inserir na tabela enrollment_clicks
        const enrollmentData = {
            email,
            phone,
            session_id,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            user_agent,
            referrer,
            ip_address: ip,
            current_page,
            button_text,
            timestamp: new Date().toISOString()
        };

        // Inserir na tabela enrollment_clicks (trigger vai atualizar unified_leads automaticamente)
        const { data, error } = await supabase
            .from('enrollment_clicks')
            .insert([enrollmentData]);

        if (error) {
            console.error('Erro ao salvar clique de matrícula:', error);
            return NextResponse.json(
                { success: false, error: error.message }, 
                { status: 500 }
            );
        }

        // Retornar sucesso
        return NextResponse.json({ 
            success: true, 
            message: 'Clique de matrícula registrado com sucesso',
            data 
        });

    } catch (error) {
        console.error('Erro na API de enrollment click:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' }, 
            { status: 500 }
        );
    }
}
