'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase-client';

export default function TestEnrollment() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testEnrollmentData = async () => {
      try {
        console.log('Testando acesso às tabelas de enrollment...');
        
        // Testar enrollment_clicks
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('enrollment_clicks')
          .select('*');
          
        console.log('Enrollment clicks:', enrollmentData, enrollmentError);
        
        // Testar anonymous_enrollment_clicks
        const { data: anonymousData, error: anonymousError } = await supabase
          .from('anonymous_enrollment_clicks')
          .select('*');
          
        console.log('Anonymous clicks:', anonymousData, anonymousError);
        
        // Testar unified_leads
        const { data: leadsData, error: leadsError } = await supabase
          .from('unified_leads')
          .select('has_enrollment_intent')
          .eq('has_enrollment_intent', true);
          
        console.log('Leads with intent:', leadsData, leadsError);
        
        setData({
          enrollmentClicks: enrollmentData?.length || 0,
          anonymousClicks: anonymousData?.length || 0,
          leadsWithIntent: leadsData?.length || 0,
          errors: {
            enrollment: enrollmentError,
            anonymous: anonymousError,
            leads: leadsError
          }
        });
        
      } catch (err) {
        console.error('Erro no teste:', err);
        setError(String(err));
      }
    };
    
    testEnrollmentData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Métricas de Enrollment</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-6">
            <h2 className="font-bold">Erro:</h2>
            <pre>{error}</pre>
          </div>
        )}
        
        {data && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Resultados:</h2>
            <div className="space-y-4">
              <div>
                <strong>Enrollment Clicks:</strong> {data.enrollmentClicks}
                {data.errors.enrollment && (
                  <div className="text-red-400 text-sm mt-1">
                    Erro: {JSON.stringify(data.errors.enrollment)}
                  </div>
                )}
              </div>
              
              <div>
                <strong>Anonymous Clicks:</strong> {data.anonymousClicks}
                {data.errors.anonymous && (
                  <div className="text-red-400 text-sm mt-1">
                    Erro: {JSON.stringify(data.errors.anonymous)}
                  </div>
                )}
              </div>
              
              <div>
                <strong>Leads with Intent:</strong> {data.leadsWithIntent}
                {data.errors.leads && (
                  <div className="text-red-400 text-sm mt-1">
                    Erro: {JSON.stringify(data.errors.leads)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
