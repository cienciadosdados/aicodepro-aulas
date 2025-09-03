'use client';

import { useState, useEffect } from 'react';
import { trackSurveySubmission } from '../../lib/tracking-service';
import { LeadIdentifier } from '../../components/LeadIdentifier';

export default function PesquisaPage() {
  const [formData, setFormData] = useState({
    email: '',
    experiencia: '',
    interesse: '',
    desafio: '',
    objetivo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [identifiedEmail, setIdentifiedEmail] = useState('');
  const [isIdentified, setIsIdentified] = useState(false);
  const [missingData, setMissingData] = useState<string[]>([]);

  useEffect(() => {
    // Verificar se o usuário já está identificado
    const email = localStorage.getItem('aicodepro_identified_email');
    const phone = localStorage.getItem('aicodepro_identified_phone');
    const isProgrammer = localStorage.getItem('aicodepro_identified_isprogrammer');
    
    if (email && phone && isProgrammer) {
      setIdentifiedEmail(email);
      setFormData(prev => ({ ...prev, email }));
      setIsIdentified(true);
      setMissingData([]);
    } else {
      setIsIdentified(false);
      // Identificar quais dados estão faltando
      const missing = [];
      if (!email) missing.push('Email');
      if (!phone) missing.push('WhatsApp');
      if (!isProgrammer) missing.push('Se você é programador');
      setMissingData(missing);
    }
  }, []);

  const handleLeadIdentified = (email: string) => {
    setIdentifiedEmail(email);
    setFormData(prev => ({ ...prev, email }));
    setIsIdentified(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar se o usuário está identificado antes de enviar
      const email = localStorage.getItem('aicodepro_identified_email');
      const phone = localStorage.getItem('aicodepro_identified_phone');
      const isProgrammer = localStorage.getItem('aicodepro_identified_isprogrammer');
      
      if (!email || !phone || !isProgrammer) {
        // Se não estiver identificado, identificar dados faltantes e forçar identificação
        const missing = [];
        if (!email) missing.push('Email');
        if (!phone) missing.push('WhatsApp');
        if (!isProgrammer) missing.push('Se você é programador');
        setMissingData(missing);
        setIsIdentified(false);
        setIsLoading(false);
        return;
      }

      // Rastrear submissão da pesquisa
      await trackSurveySubmission(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar pesquisa:', error);
      // Mesmo com erro, considerar como enviado para não bloquear o usuário
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirecionar para /obrigado quando a pesquisa for concluída
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        const redirectUrl = `/obrigado?from=survey${formData.email ? `&email=${encodeURIComponent(formData.email)}` : ''}`;
        window.location.href = redirectUrl;
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, formData.email]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full text-center border border-white/20">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              🎉 Pesquisa Concluída!
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Obrigado por participar! Você está concorrendo ao treinamento de RAG.
            </p>
          </div>

          {/* Seção do Treinamento de RAG */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-6 mb-6 border border-red-500/30">
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

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Redirecionando em alguns segundos...
            </p>
            <div className="relative w-full h-2 bg-black/40 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#0c83fe] animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se não estiver identificado, mostrar o LeadIdentifier
  if (!isIdentified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              🔐 Identificação Necessária
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Para responder a pesquisa, precisamos de alguns dados básicos:
            </p>
            {missingData.length > 0 && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  ⚠️ Dados faltantes:
                </h3>
                <ul className="text-red-200 space-y-1">
                  {missingData.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <LeadIdentifier onIdentified={handleLeadIdentified} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            🎯 Pesquisa AI Code Pro
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Concorra a um Treinamento de RAG Profissional!
          </p>
          <p className="text-gray-400">
            Suas respostas nos ajudam a criar conteúdo ainda melhor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!identifiedEmail && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Seu Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
          )}

          <div>
            <label htmlFor="experiencia" className="block text-sm font-medium text-gray-300 mb-2">
              Qual seu nível de experiência com IA? *
            </label>
            <select
              id="experiencia"
              name="experiencia"
              required
              value={formData.experiencia}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" className="bg-gray-800">Selecione...</option>
              <option value="iniciante" className="bg-gray-800">Iniciante - Pouco ou nenhum conhecimento</option>
              <option value="intermediario" className="bg-gray-800">Intermediário - Já usei algumas ferramentas</option>
              <option value="avancado" className="bg-gray-800">Avançado - Desenvolvo com IA regularmente</option>
              <option value="expert" className="bg-gray-800">Expert - Trabalho profissionalmente com IA</option>
            </select>
          </div>

          <div>
            <label htmlFor="interesse" className="block text-sm font-medium text-gray-300 mb-2">
              Qual área mais te interessa? *
            </label>
            <select
              id="interesse"
              name="interesse"
              required
              value={formData.interesse}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" className="bg-gray-800">Selecione...</option>
              <option value="rag" className="bg-gray-800">RAG e Bancos Vetoriais</option>
              <option value="agentes" className="bg-gray-800">Agentes de IA</option>
              <option value="automacao" className="bg-gray-800">Automação de Processos</option>
              <option value="desenvolvimento" className="bg-gray-800">Desenvolvimento Full Stack com IA</option>
              <option value="todos" className="bg-gray-800">Todos os tópicos</option>
            </select>
          </div>

          <div>
            <label htmlFor="desafio" className="block text-sm font-medium text-gray-300 mb-2">
              Qual seu maior desafio atual com IA? *
            </label>
            <textarea
              id="desafio"
              name="desafio"
              required
              rows={3}
              value={formData.desafio}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Descreva seu principal desafio..."
            />
          </div>

          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-300 mb-2">
              O que você espera alcançar com IA? *
            </label>
            <textarea
              id="objetivo"
              name="objetivo"
              required
              rows={3}
              value={formData.objetivo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Seus objetivos e expectativas..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </div>
            ) : (
              '🚀 Enviar Pesquisa'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/aula1"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ← Voltar às aulas
          </a>
        </div>
      </div>
    </div>
  );
}
