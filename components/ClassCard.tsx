'use client';

import Link from 'next/link';
import { FaPlay, FaClock, FaCheckCircle } from 'react-icons/fa';

interface ClassCardProps {
  aulaNumber: number;
  title: string;
  description: string;
  duration?: string;
  thumbnail?: string;
  isAvailable?: boolean;
}

export function ClassCard({ 
  aulaNumber, 
  title, 
  description, 
  duration = '45 min',
  thumbnail,
  isAvailable = true 
}: ClassCardProps) {
  const aulaUrl = `/aula${aulaNumber}`;
  
  return (
    <Link 
      href={isAvailable ? aulaUrl : '#'}
      className={`group block ${!isAvailable ? 'pointer-events-none opacity-60' : ''}`}
    >
      <article className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#0c83fe]/20 overflow-hidden hover:border-[#0c83fe]/40 transition-all duration-300 hover:scale-[1.02] h-full">
        {/* Thumbnail/Header */}
        <div className="relative h-48 bg-gradient-to-br from-[#0c83fe]/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <div className="text-6xl font-bold text-white/90 mb-2">
                {aulaNumber}
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider">
                Aula
              </div>
            </div>
          )}
          
          {/* Play Button Overlay */}
          {isAvailable && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#0c83fe] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaPlay className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          )}
          
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white/90 font-semibold px-4 py-2 bg-black/40 rounded-lg">
                Em Breve
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0c83fe] transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <FaClock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {isAvailable && (
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span>Disponível</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
