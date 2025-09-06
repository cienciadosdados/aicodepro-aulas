// Componente de login para dashboard
'use client';

import { useState } from 'react';

interface DashboardLoginProps {
  onLogin: () => void;
}

export function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        onLogin();
      } else {
        setError(result.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-black/60 backdrop-blur-sm border border-[#0c83fe]/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0c83fe] to-[#00ff88] bg-clip-text text-transparent">
              Dashboard AI Code Pro
            </h1>
            <p className="text-gray-400 mt-2">
              Acesso restrito - Digite a senha para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-[#0c83fe]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0c83fe] focus:ring-1 focus:ring-[#0c83fe]"
                placeholder="Digite a senha..."
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0c83fe] to-[#00ff88] hover:from-[#00ff88] hover:to-[#0c83fe] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                  Verificando...
                </div>
              ) : (
                'Acessar Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Sistema protegido por autenticação</p>
            <p className="mt-1">© 2025 AI Code Pro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
