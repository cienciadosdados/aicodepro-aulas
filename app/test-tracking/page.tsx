'use client';

import { useEffect, useState } from 'react';
import { trackAulaView, trackScriptDownload, trackAulaNavigation } from '@/lib/tracking-service';

export default function TestTracking() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev]);
  };

  useEffect(() => {
    addLog('Página de teste carregada');
    addLog('Verificando cliente Supabase...');
    
    // Verificar se o Supabase está disponível
    import('@/lib/supabase-client').then((module) => {
      if (module.default) {
        addLog('✅ Cliente Supabase disponível');
      } else {
        addLog('❌ Cliente Supabase NÃO disponível');
      }
    });
  }, []);

  const testAulaView = async () => {
    setIsLoading(true);
    addLog('🧪 Testando trackAulaView...');
    
    try {
      const result = await trackAulaView(999); // Aula de teste
      
      if (result.success) {
        addLog('✅ trackAulaView: SUCESSO');
        addLog(`   Dados: ${JSON.stringify(result.data)}`);
      } else {
        addLog(`❌ trackAulaView: FALHOU - ${result.error}`);
      }
    } catch (error: any) {
      addLog(`❌ trackAulaView: ERRO - ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const testScriptDownload = async () => {
    setIsLoading(true);
    addLog('🧪 Testando trackScriptDownload...');
    
    try {
      const result = await trackScriptDownload(999); // Aula de teste
      
      if (result.success) {
        addLog('✅ trackScriptDownload: SUCESSO');
        addLog(`   Dados: ${JSON.stringify(result.data)}`);
      } else {
        addLog(`❌ trackScriptDownload: FALHOU - ${result.error}`);
      }
    } catch (error: any) {
      addLog(`❌ trackScriptDownload: ERRO - ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const testNavigation = async () => {
    setIsLoading(true);
    addLog('🧪 Testando trackAulaNavigation...');
    
    try {
      const result = await trackAulaNavigation(1, 2);
      
      if (result.success) {
        addLog('✅ trackAulaNavigation: SUCESSO');
        addLog(`   Dados: ${JSON.stringify(result.data)}`);
      } else {
        addLog(`❌ trackAulaNavigation: FALHOU - ${result.error}`);
      }
    } catch (error: any) {
      addLog(`❌ trackAulaNavigation: ERRO - ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const testAll = async () => {
    await testAulaView();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testScriptDownload();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testNavigation();
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('Logs limpos');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#0c83fe]">
          🧪 Teste de Tracking - AI Code Pro
        </h1>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Controles de Teste</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={testAulaView}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Aula View
            </button>

            <button
              onClick={testScriptDownload}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Download
            </button>

            <button
              onClick={testNavigation}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Navigation
            </button>

            <button
              onClick={testAll}
              disabled={isLoading}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test All
            </button>
          </div>

          <button
            onClick={clearLogs}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded w-full"
          >
            Limpar Logs
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Console de Logs</h2>
          
          <div className="bg-black rounded p-4 h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500">Nenhum log ainda...</div>
            ) : (
              logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`mb-1 ${
                    log.includes('✅') ? 'text-green-400' : 
                    log.includes('❌') ? 'text-red-400' : 
                    log.includes('🧪') ? 'text-yellow-400' : 
                    'text-gray-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
          <h3 className="font-bold text-yellow-400 mb-2">⚠️ Instruções</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Esta página testa as funções de tracking do Supabase</li>
            <li>• Clique nos botões para testar cada função</li>
            <li>• Verifique os logs para ver se há erros</li>
            <li>• Depois, verifique no Supabase se os dados foram inseridos</li>
            <li>• Use aula_number=999 para identificar registros de teste</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a 
            href="/"
            className="text-[#0c83fe] hover:underline"
          >
            ← Voltar para Home
          </a>
        </div>
      </div>
    </div>
  );
}
