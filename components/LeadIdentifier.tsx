'use client';

import { useState, useEffect } from 'react';
import { associateLeadWithSession } from '@/lib/tracking-service';
import { trackLeadIdentificationGA4 } from '@/lib/analytics';

interface LeadIdentifierProps {
  onIdentified?: (email: string) => void;
}

export function LeadIdentifier({ onIdentified }: LeadIdentifierProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProgrammer, setIsProgrammer] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: phone, 3: isProgrammer
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isIdentified, setIsIdentified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificar se o usuário já foi identificado anteriormente
  useEffect(() => {
    const storedEmail = localStorage.getItem('aicodepro_identified_email');
    const storedPhone = localStorage.getItem('aicodepro_identified_phone');
    const storedIsProgrammer = localStorage.getItem('aicodepro_identified_isprogrammer');
    
    if (storedEmail && storedPhone && storedIsProgrammer) {
      setEmail(storedEmail);
      setPhone(storedPhone);
      setIsProgrammer(storedIsProgrammer);
      setIsIdentified(true);
      onIdentified?.(storedEmail);
    } else {
      // Atrasar a abertura do modal para não interromper imediatamente
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 3000); // Mostrar após 3 segundos
      
      return () => clearTimeout(timer);
    }
  }, [onIdentified]);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validar email
      if (!email || !email.includes('@')) {
        setMessage({ type: 'error', text: 'Por favor, informe um email válido.' });
        return;
      }
      setMessage(null);
      setStep(2);
    } else if (step === 2) {
      // Validar WhatsApp
      if (!phone || phone.length < 10) {
        setMessage({ type: 'error', text: 'Por favor, informe um WhatsApp válido.' });
        return;
      }
      setMessage(null);
      setStep(3);
    } else if (step === 3) {
      // Validar isProgrammer
      if (!isProgrammer) {
        setMessage({ type: 'error', text: 'Por favor, selecione uma opção.' });
        return;
      }
      
      // Finalizar identificação
      setIsIdentifying(true);
      setMessage(null);
      
      try {
        // Associar todos os dados do lead com a sessão atual
        const result = await associateLeadWithSession({ 
          email, 
          phone, 
          isProgrammer: isProgrammer === 'sim' 
        });
        
        setMessage({ type: 'success', text: 'Identificação realizada com sucesso!' });
        setIsIdentified(true);
        setIsModalOpen(false);
        
        // Salvar todos os dados no localStorage
        localStorage.setItem('aicodepro_identified_email', email);
        localStorage.setItem('aicodepro_identified_phone', phone);
        localStorage.setItem('aicodepro_identified_isprogrammer', isProgrammer);
        
        // Notificar o componente pai
        onIdentified?.(email);
        
        console.log('Lead identificado com sucesso:', { email, phone, isProgrammer });
      } catch (error) {
        console.error('Erro ao identificar lead:', error);
        
        // Ainda assim, considerar como sucesso para não bloquear o usuário
        setMessage({ type: 'success', text: 'Identificação realizada com sucesso!' });
        setIsIdentified(true);
        setIsModalOpen(false);
        
        // Salvar no localStorage mesmo em caso de erro
        localStorage.setItem('aicodepro_identified_email', email);
        localStorage.setItem('aicodepro_identified_phone', phone);
        localStorage.setItem('aicodepro_identified_isprogrammer', isProgrammer);
        
        onIdentified?.(email);
      } finally {
        setIsIdentifying(false);
      }
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setMessage(null);
    }
  };
  
  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Salvar no localStorage que o usuário fechou o modal para não mostrar novamente na mesma sessão
    sessionStorage.setItem('aicodepro_modal_closed', 'true');
  };
  
  // Função para abrir o modal novamente
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Botão flutuante para abrir o modal quando fechado
  if (!isModalOpen && !isIdentified) {
    return (
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 z-50 bg-[#0c83fe] hover:bg-[#0c83fe]/90 text-white rounded-full p-3 shadow-lg flex items-center gap-2 text-sm font-medium transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Liberar Scripts
      </button>
    );
  }
  
  // Mensagem discreta quando o usuário está identificado
  if (isIdentified) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-green-500/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-sm text-white shadow-lg max-w-xs">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <p>Beleza, <strong>{email}</strong>?</p>
        </div>
      </div>
    );
  }

  // Modal de identificação
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
      
      <div className="relative bg-black/90 border border-[#0c83fe]/30 rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl shadow-[#0c83fe]/10 transform transition-all duration-300 scale-100">
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h3 className="text-xl font-bold mb-4 text-center text-white">
          {step === 1 ? 'Identifique-se para Liberar os Scripts' : 
           step === 2 ? 'Confirme seu WhatsApp' : 
           'Você é programador?'}
        </h3>
        
        <div className="mb-4">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-3 h-3 rounded-full ${
                  stepNum <= step ? 'bg-[#0c83fe]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Etapa {step} de 3
          </p>
        </div>
        
        <form onSubmit={handleNextStep} className="space-y-4">
          {step === 1 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Seu Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o email que você usou no cadastro"
                className="w-full px-4 py-3 bg-black/60 border border-[#0c83fe]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Use o mesmo email que você utilizou para se inscrever no evento.
              </p>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Seu WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 bg-black/60 border border-[#0c83fe]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Precisamos do WhatsApp para enviar os scripts e atualizações.
              </p>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Você é programador/desenvolvedor?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isProgrammer"
                    value="sim"
                    checked={isProgrammer === 'sim'}
                    onChange={(e) => setIsProgrammer(e.target.value)}
                    className="mr-2 text-[#0c83fe] focus:ring-[#0c83fe]"
                  />
                  <span className="text-white">Sim, sou programador/desenvolvedor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isProgrammer"
                    value="nao"
                    checked={isProgrammer === 'nao'}
                    onChange={(e) => setIsProgrammer(e.target.value)}
                    className="mr-2 text-[#0c83fe] focus:ring-[#0c83fe]"
                  />
                  <span className="text-white">Não, mas tenho interesse em aprender</span>
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Isso nos ajuda a personalizar o conteúdo para você.
              </p>
            </div>
          )}
          
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Voltar
              </button>
            )}
            
            {step === 1 && (
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Mais tarde
              </button>
            )}
            
            <button
              type="submit"
              disabled={isIdentifying}
              className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                isIdentifying
                  ? 'bg-[#0c83fe]/70 cursor-wait'
                  : 'bg-[#0c83fe] hover:bg-[#0c83fe]/90'
              } text-white font-medium`}
            >
              {isIdentifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Identificando...
                </>
              ) : (
                step === 3 ? 'Finalizar' : 'Próximo'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
