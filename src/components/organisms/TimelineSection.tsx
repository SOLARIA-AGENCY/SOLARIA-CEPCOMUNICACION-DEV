import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import CursoUnificadoCard from '../molecules/CursoUnificadoCard';
import type { CursosPorMes } from '../../utils/sedeUtils';

interface TimelineSectionProps {
  grupo: CursosPorMes;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ grupo, isFirst = false, isLast = false }) => {
  return (
    <div className="relative">
      {/* Línea de tiempo vertical */}
      {!isFirst && (
        <div className="absolute left-6 top-0 w-0.5 h-8 bg-cep-primary/30"></div>
      )}
      
      <div className="flex items-start space-x-6">
        {/* Punto de la línea de tiempo */}
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 bg-cep-primary rounded-full flex items-center justify-center shadow-lg">
            <Calendar size={20} className="text-white" />
          </div>
          {/* Línea hacia abajo */}
          {!isLast && (
            <div className="absolute left-6 top-12 w-0.5 bg-cep-primary/30" 
                 style={{ height: 'calc(100% + 2rem)' }}></div>
          )}
        </div>
        
        {/* Contenido del mes */}
        <div className="flex-1 pb-12">
          {/* Header del mes */}
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-cep-primary mb-2">
              {grupo.mes}
            </h3>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">
                  {grupo.cursos.length} {grupo.cursos.length === 1 ? 'curso' : 'cursos'}
                </span>
              </div>
              <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Inicio: {grupo.mes}</span>
            </div>
          </div>
          
          {/* Grid de cursos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grupo.cursos.map((curso) => (
              <CursoUnificadoCard 
                key={curso.id || curso.codigo} 
                curso={curso} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection; 