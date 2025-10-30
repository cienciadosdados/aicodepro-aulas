'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';

// Componente que usa useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const fromSurvey = searchParams.get('from') === 'survey';
  
  useEffect(() => {
    // Redirecionamento para o grupo após 12 segundos
    const timer = setTimeout(() => {
      window.location.href = 'https://chat.whatsapp.com/Kln3aacOp7uF782fRqobT1';
    }, 12000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#0c83fe]/20 rounded-xl blur-xl"></div>
            <div className="relative px-6 py-3 rounded-xl bg-black/40 border border-[#0c83fe] backdrop-blur-sm">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0c83fe]">
                AI Code Pro
              </h1>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {fromSurvey ? 'Pesquisa Concluída! 🎉' : 'Inscrição Confirmada! 🎉'}
          </h2>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
            <p className="text-xl mb-4 text-gray-300">
              {fromSurvey 
                ? 'Obrigado por suas respostas! Você está concorrendo ao treinamento de RAG.'
                : 'Enviamos todos os detalhes para o seu e-mail:'
              }
            </p>
            {email && (
              <p className="text-gray-400">
                <span className="text-[#0c83fe] font-semibold">{email}</span>
                {!fromSurvey && <span className="block text-sm mt-2">(Verifique sua caixa de spam caso não encontre)</span>}
              </p>
            )}
          </div>
        </div>

        {/* Seção do Treinamento de RAG - APENAS se vier da pesquisa */}
        {fromSurvey && (
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-6 mb-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              🎁 Veja seu treinamento gratuito de RAG
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              Como prometido, aqui está seu acesso ao treinamento completo de RAG Profissional com VectorDB:
            </p>
            
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                📚 O que você vai aprender:
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Implementação profissional de RAG</li>
                <li>• Integração com bancos de dados vetoriais</li>
                <li>• Otimização de performance e precisão</li>
                <li>• Casos de uso reais no mercado</li>
              </ul>
            </div>

            <div className="text-center">
              <a
                href="https://www.youtube.com/live/Svu5X2I_W08"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.05] shadow-lg text-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                🚀 Assistir Treinamento Gratuito
              </a>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-3">
              ⏰ Acesso liberado por tempo limitado
            </p>
          </div>
        )}

        {/* Seção dos passos importantes */}
        <div className="mb-8">
          <div className="relative inline-block mb-8 w-full max-w-md mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0c83fe]/30 via-[#0c83fe]/10 to-[#0c83fe]/30 rounded-lg blur-md"></div>
            <h3 className="relative text-xl md:text-2xl font-bold py-2 px-4 bg-black/60 backdrop-blur-sm rounded-lg border border-[#0c83fe]/40 text-[#0c83fe]">
              {fromSurvey ? '2 passos importantes:' : '2 passos que você precisa seguir agora:'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Entre no Grupo do WhatsApp",
                description: "Para garantir que você receberá todos os scripts dos projetos, é importante que esteja no grupo EXCLUSIVO, pois será nosso REPO oficial.",
                link: "https://chat.whatsapp.com/Kln3aacOp7uF782fRqobT1",
                buttonText: "PARTICIPAR DO GRUPO EXCLUSIVO"
              },
              fromSurvey ? {
                title: "Voltar às Aulas",
                description: "Continue assistindo as aulas do AI Code Pro e baixando os scripts. Você já está participando do sorteio do treinamento de RAG!",
                link: "/aula1",
                buttonText: "CONTINUAR ASSISTINDO"
              } : {
                title: "Responder a Pesquisa",
                description: "Ajude-nos a personalizar o conteúdo do AI Code Pro respondendo nossa pesquisa rápida. Suas respostas nos permitirão focar nos temas mais importantes para você.",
                link: `/pesquisa?email=${encodeURIComponent(email)}`,
                buttonText: "RESPONDER PESQUISA"
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c83fe]/20 to-[#0c83fe]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-[#0c83fe]/50 transition-colors duration-300 h-full flex flex-col">
                  <div className="mb-2 text-[#0c83fe] font-bold text-xl">
                    {index + 1}.
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-[#0c83fe] transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4 flex-grow">
                    {step.description}
                  </p>
                  <Link 
                    href={step.link}
                    target={index === 0 ? "_blank" : "_self"}
                    className="inline-block bg-[#0c83fe]/10 hover:bg-[#0c83fe]/20 text-[#0c83fe] font-medium py-2 px-4 rounded-lg border border-[#0c83fe]/30 transition-colors duration-300 w-full text-center"
                  >
                    {step.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Redirecionamento automático para o grupo em alguns segundos...
          </p>
          <p className="text-gray-400 text-sm">
            Tem alguma dúvida? Entre em contato pelo e-mail <a href="mailto:suporte@cienciadosdados.com" className="text-[#0c83fe] hover:underline">suporte@cienciadosdados.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente principal que envolve o conteúdo com Suspense
export default function ObrigadoPage() {
  useEffect(() => {
    document.title = 'AI Code Pro - Confirmação';
  }, []);
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Carregando...</h2>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
