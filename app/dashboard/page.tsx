'use client';

import { useState, useEffect } from 'react';
import { StatisticsCard } from '@/components/StatisticsCard';
import supabase from '@/lib/supabase-client';

interface StatsData {
  totalViews: number;
  viewsByAula: Record<number, number>;
  totalDownloads: number;
  downloadsByAula: Record<number, number>;
  totalSocialActions: number;
  socialActionsByPlatform: Record<string, number>;
  totalNavigations: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatsData>({
    totalViews: 0,
    viewsByAula: {},
    totalDownloads: 0,
    downloadsByAula: {},
    totalSocialActions: 0,
    socialActionsByPlatform: {},
    totalNavigations: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        
        // Buscar visualizações de aulas
        const { data: viewsData, error: viewsError } = await supabase
          .from('aula_views')
          .select('*');
          
        if (viewsError) throw viewsError;
        
        // Buscar downloads de scripts
        const { data: downloadsData, error: downloadsError } = await supabase
          .from('script_downloads')
          .select('*');
          
        if (downloadsError) throw downloadsError;
        
        // Buscar ações sociais
        const { data: socialData, error: socialError } = await supabase
          .from('social_actions')
          .select('*');
          
        if (socialError) throw socialError;
        
        // Buscar navegações entre aulas
        const { data: navData, error: navError } = await supabase
          .from('aula_navigations')
          .select('*');
          
        if (navError) throw navError;
        
        // Processar dados de visualizações
        const viewsByAula: Record<number, number> = {};
        viewsData?.forEach(view => {
          const aulaNumber = view.aula_number;
          viewsByAula[aulaNumber] = (viewsByAula[aulaNumber] || 0) + 1;
        });
        
        // Processar dados de downloads
        const downloadsByAula: Record<number, number> = {};
        downloadsData?.forEach(download => {
          const aulaNumber = download.aula_number;
          downloadsByAula[aulaNumber] = (downloadsByAula[aulaNumber] || 0) + 1;
        });
        
        // Processar dados de ações sociais
        const socialActionsByPlatform: Record<string, number> = {};
        socialData?.forEach(action => {
          const platform = action.platform;
          socialActionsByPlatform[platform] = (socialActionsByPlatform[platform] || 0) + 1;
        });
        
        // Atualizar estado com as estatísticas
        setStats({
          totalViews: viewsData?.length || 0,
          viewsByAula,
          totalDownloads: downloadsData?.length || 0,
          downloadsByAula,
          totalSocialActions: socialData?.length || 0,
          socialActionsByPlatform,
          totalNavigations: navData?.length || 0
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
        setError('Erro ao carregar estatísticas. Verifique o console para mais detalhes.');
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);
  
  // Função para calcular a taxa de conversão de visualizações para downloads
  const calculateConversionRate = () => {
    if (stats.totalViews === 0) return '0%';
    const rate = (stats.totalDownloads / stats.totalViews) * 100;
    return `${rate.toFixed(1)}%`;
  };
  
  // Função para obter a aula mais popular
  const getMostPopularAula = () => {
    let maxViews = 0;
    let mostPopularAula = 0;
    
    Object.entries(stats.viewsByAula).forEach(([aula, views]) => {
      if (views > maxViews) {
        maxViews = views;
        mostPopularAula = parseInt(aula);
      }
    });
    
    return mostPopularAula > 0 ? `Aula ${mostPopularAula}` : 'Nenhuma';
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard - AI Code Pro</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Carregando estatísticas...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard - AI Code Pro</h1>
          <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 text-red-300">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard - AI Code Pro</h1>
          <a 
            href="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Voltar para as Aulas
          </a>
        </div>
        
        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatisticsCard 
            title="Total de Visualizações"
            value={stats.totalViews}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            }
            description="Número total de visualizações de aulas"
            color="blue"
          />
          
          <StatisticsCard 
            title="Downloads de Scripts"
            value={stats.totalDownloads}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            }
            description="Total de scripts baixados pelos alunos"
            color="green"
          />
          
          <StatisticsCard 
            title="Taxa de Conversão"
            value={calculateConversionRate()}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 12 5.25 5 2.625-5L14.5 17l2.625-5 4.875 5"></path>
                <path d="M3 7 9.375 2 15.75 7l5.25-5"></path>
              </svg>
            }
            description="Visualizações que resultaram em downloads"
            color="purple"
          />
          
          <StatisticsCard 
            title="Aula Mais Popular"
            value={getMostPopularAula()}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            }
            description="Aula com maior número de visualizações"
            color="orange"
          />
        </div>
        
        {/* Detalhes por Aula */}
        <h2 className="text-2xl font-semibold mb-4">Estatísticas por Aula</h2>
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Aula</th>
                  <th className="text-center py-3 px-4">Visualizações</th>
                  <th className="text-center py-3 px-4">Downloads</th>
                  <th className="text-center py-3 px-4">Taxa de Conversão</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map(aulaNumber => {
                  const views = stats.viewsByAula[aulaNumber] || 0;
                  const downloads = stats.downloadsByAula[aulaNumber] || 0;
                  const conversionRate = views > 0 ? ((downloads / views) * 100).toFixed(1) + '%' : '0%';
                  
                  return (
                    <tr key={aulaNumber} className="border-b border-gray-800 hover:bg-blue-900/10">
                      <td className="py-3 px-4">Aula {aulaNumber}</td>
                      <td className="text-center py-3 px-4">{views}</td>
                      <td className="text-center py-3 px-4">{downloads}</td>
                      <td className="text-center py-3 px-4">{conversionRate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Ações Sociais */}
        <h2 className="text-2xl font-semibold mb-4">Ações Sociais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatisticsCard 
            title="Seguidores no Instagram"
            value={stats.socialActionsByPlatform['instagram'] || 0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            }
            description="Pessoas que seguiram no Instagram"
            color="purple"
          />
          
          <StatisticsCard 
            title="Inscritos no YouTube"
            value={stats.socialActionsByPlatform['youtube'] || 0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            }
            description="Pessoas que se inscreveram no YouTube"
            color="red"
          />
        </div>
        
        {/* Navegações */}
        <h2 className="text-2xl font-semibold mb-4">Navegação entre Aulas</h2>
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 p-6">
          <StatisticsCard 
            title="Total de Navegações"
            value={stats.totalNavigations}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16"></path>
                <path d="M2 12H22"></path>
              </svg>
            }
            description="Número de vezes que os usuários navegaram entre aulas"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}
