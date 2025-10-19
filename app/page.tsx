'use client';

import { FloatingGrid } from '@/components/FloatingGrid';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClassCard } from '@/components/ClassCard';
import { ChatbotWidget } from '@/components/ChatbotWidget';

export default function Home() {
  const aulas = [
    {
      aulaNumber: 1,
      title: 'SaaS Agents AI (MVP)',
      description: 'Vamos criar um MVP de um SAAS de desenvolvimentos de Agentes de IA embedáveis em Sites, Apps e Whatsapp',
      duration: '45 min',
      isAvailable: true
    },
    {
      aulaNumber: 2,
      title: 'WhatsApp + MCP Supabase + Multi Agentes',
      description: 'Integração do WhatsApp com MCP (Model Context Protocol) e Supabase para criar sistemas de multi-agentes que podem interagir através de mensagens',
      duration: '50 min',
      isAvailable: true
    },
    {
      aulaNumber: 3,
      title: 'Agentes de IA - Projetos Profissionais Escaláveis',
      description: 'Criação de agentes de IA autônomos capazes de executar tarefas complexas, tomar decisões e interagir com APIs e sistemas externos',
      duration: '55 min',
      isAvailable: true
    },
    {
      aulaNumber: 4,
      title: 'Projeto Agents Full Stack',
      description: 'Integração de todos os conceitos aprendidos para construir aplicações completas com IA, incluindo front-end, back-end e implantação em produção',
      duration: '48 min',
      isAvailable: true
    },
    {
      aulaNumber: 5,
      title: 'Agentes que criam agentes',
      description: 'Aprenda a criar sistemas de IA que são capazes de gerar e gerenciar outros agentes de forma autônoma e escalável',
      duration: '52 min',
      isAvailable: true
    }
  ];

  return (
    <>
      <FloatingGrid />
      <Header />
      
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-full text-sm text-[#0c83fe] mb-6">
              Construa o Futuro com IA
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              IA de Alto Nível.
              <br />
              <span className="text-gray-400">Para desenvolvedores.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              Aprenda na prática a desenvolver soluções avançadas com{' '}
              <span className="text-[#0c83fe]">LLM</span>,{' '}
              <span className="text-[#0c83fe]">MCP</span>,{' '}
              <span className="text-[#0c83fe]">RAG</span>,{' '}
              <span className="text-[#0c83fe]">VectorDB</span>,{' '}
              <span className="text-[#0c83fe]">Embedding</span> e{' '}
              <span className="text-[#0c83fe]">Agentes de IA</span> usando ferramentas como{' '}
              <span className="text-[#0c83fe]">CrewAI</span>,{' '}
              <span className="text-[#0c83fe]">LangGraph</span>.
            </p>
          </div>

          {/* Aulas Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Aulas Disponíveis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aulas.map((aula) => (
                <ClassCard
                  key={aula.aulaNumber}
                  aulaNumber={aula.aulaNumber}
                  title={aula.title}
                  description={aula.description}
                  duration={aula.duration}
                  isAvailable={aula.isAvailable}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#0c83fe]/20 to-purple-600/20 rounded-2xl border border-[#0c83fe]/30 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Garanta Sua Vaga Agora!
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Vagas Limitadas - Turma Exclusiva - 100% online e Gratuito
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/aula1"
                className="px-8 py-4 bg-[#0c83fe] hover:bg-[#0c83fe]/80 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Começar Agora
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </>
  );
}
