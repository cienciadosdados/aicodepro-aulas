'use client';

import { ReactNode } from 'react';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange';
}

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  green: 'bg-green-500/10 text-green-500 border-green-500/20',
  purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  red: 'bg-red-500/10 text-red-500 border-red-500/20',
  orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
};

export function StatisticsCard({ 
  title, 
  value, 
  icon, 
  description,
  color = 'blue'
}: StatisticsCardProps) {
  const colorClasses = colorMap[color];
  
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${colorClasses}`}>
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-200">{title}</h3>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        {description && (
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}
