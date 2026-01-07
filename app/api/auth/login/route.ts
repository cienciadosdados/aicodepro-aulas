// API de autenticação simples para dashboard
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();
        
        // Senha definida no .env.local (obrigatório)
        const correctPassword = process.env.DASHBOARD_PASSWORD;
        
        if (!correctPassword) {
            console.error('DASHBOARD_PASSWORD não configurado');
            return NextResponse.json(
                { success: false, message: 'Erro de configuração do servidor' }, 
                { status: 500 }
            );
        }
        
        if (password === correctPassword) {
            // Criar token simples (em produção, usar JWT)
            const token = Buffer.from(`dashboard_${Date.now()}`).toString('base64');
            
            const response = NextResponse.json({ 
                success: true, 
                message: 'Login realizado com sucesso',
                token 
            });
            
            // Definir cookie httpOnly para segurança
            response.cookies.set('dashboard_auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });
            
            return response;
        } else {
            return NextResponse.json(
                { success: false, message: 'Senha incorreta' }, 
                { status: 401 }
            );
        }
        
    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json(
            { success: false, message: 'Erro interno do servidor' }, 
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    // Verificar se está autenticado
    const token = request.cookies.get('dashboard_auth')?.value;
    
    if (token && token.startsWith('ZGFzaGJvYXJkXw==')) { // Base64 de "dashboard_"
        return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 401 });
}
