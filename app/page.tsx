'use client';

import { FloatingGrid } from '@/components/FloatingGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <FloatingGrid />
      
      <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🎓 AI Code Pro</h1>
        <p className="text-xl text-[#0c83fe] mb-6">Especialista em Inteligência Artificial Aplicada</p>
        
        <div className="grid gap-4 mt-8">
          <Link 
            href="/aula1" 
            className="block p-4 bg-black/60 hover:bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-lg transition-all"
          >
            <h3 className="text-white font-bold">Aula 1</h3>
            <p className="text-gray-400 text-sm">Introdução à IA</p>
          </Link>
          
          <Link 
            href="/aula2" 
            className="block p-4 bg-black/60 hover:bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-lg transition-all"
          >
            <h3 className="text-white font-bold">Aula 2</h3>
            <p className="text-gray-400 text-sm">Fundamentos</p>
          </Link>
          
          <Link 
            href="/aula3" 
            className="block p-4 bg-black/60 hover:bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-lg transition-all"
          >
            <h3 className="text-white font-bold">Aula 3</h3>
            <p className="text-gray-400 text-sm">Prática</p>
          </Link>
          
          <Link 
            href="/aula4" 
            className="block p-4 bg-black/60 hover:bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-lg transition-all"
          >
            <h3 className="text-white font-bold">Aula 4</h3>
            <p className="text-gray-400 text-sm">Avançado</p>
          </Link>
          
          <Link 
            href="/aula5" 
            className="block p-4 bg-black/60 hover:bg-[#0c83fe]/20 border border-[#0c83fe]/30 rounded-lg transition-all"
          >
            <h3 className="text-white font-bold">Aula 5</h3>
            <p className="text-gray-400 text-sm">Projeto Final</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
