'use client';

import { RowBoatWidget } from '@/components/RowBoatWidget';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TesteChat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título da página de teste */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🧪 Teste do RowBoat Chat
            </h1>
            <p className="text-gray-300 text-lg">
              Página isolada para testar o widget RowBoat sem interferências
            </p>
          </div>

          {/* Card de informações */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#0c83fe] mb-4">
              Status do Teste
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">✅ RowBoat Widget</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Client ID: 59_ypmEi07KzUzgRR4kGiw</li>
                  <li>• Porta: localhost:3000</li>
                  <li>• Script: /api/bootstrap.js</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">🚫 Chatbase</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Completamente desabilitado</li>
                  <li>• Sem scripts carregados</li>
                  <li>• Zero interferência</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              📋 Como Testar
            </h3>
            <div className="text-gray-300 text-left space-y-2">
              <p>1. Certifique-se que o RowBoat está rodando em <code className="bg-gray-700 px-2 py-1 rounded">localhost:3000</code></p>
              <p>2. O widget deve aparecer no canto inferior direito</p>
              <p>3. Teste as funcionalidades de chat</p>
              <p>4. Compare com uma aula normal (que usa Chatbase)</p>
            </div>
          </div>

          {/* Links de navegação */}
          <div className="mt-8 flex gap-4 justify-center">
            <a 
              href="/aula1" 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Ver Aula 1 (Chatbase)
            </a>
            <a 
              href="/" 
              className="px-6 py-3 bg-[#0c83fe] hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Voltar ao Início
            </a>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* RowBoat Widget - Único chat ativo nesta página */}
      <RowBoatWidget />
    </div>
  );
}
