import React from 'react';
import { Link } from 'react-router-dom';
import type { CursoMaestro } from '../../config/cursos-maestro';
import { determinarColorEtiqueta, useTimeReal } from '../../utils/timeUtils';
import type { EmploymentStatus } from '../../types/employment';

const NivelTag: React.FC<{ nivel?: string }> = ({ nivel }) => {
  if (!nivel) return null;

  const esSuperior = nivel.toLowerCase().includes('superior');
  const color = esSuperior ? 'bg-cep-primary' : 'bg-green-600';
  const texto = esSuperior ? 'GRADO SUPERIOR' : 'GRADO MEDIO';

  return (
    <div className={`absolute top-12 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${color}`}>
      {texto}
    </div>
  );
};

interface CursoCardProps {
  curso: CursoMaestro;
  showEmploymentType?: boolean;
  employmentFilter?: EmploymentStatus;
}

const CursoCard: React.FC<CursoCardProps> = ({ curso, showEmploymentType, employmentFilter }) => {
  const fechaActual = useTimeReal();
  
  // Determinar si es ciclo formativo
  const esCiclo = curso.categoria === 'ciclos';
  
  // Usar nuevo sistema inteligente de colores con lógica unificada
  const fechaTag = determinarColorEtiqueta(curso.inicio, esCiclo, fechaActual, curso);
  
  const duracion = curso.descripcionDetallada?.puntosClave.find(p => p.icono === 'Clock')?.texto;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={curso.imagen.includes('quiromasaje-11-meses') ? '/images/cursos/quiromasaje-11-meses-optimized.webp' : 
               curso.imagen}
          alt={`Imagen del curso ${curso.nombre}`}
          className="w-full h-40 sm:h-48 object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Etiqueta de Estado/Fecha (Izquierda) */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${fechaTag.color}`}>
          {fechaTag.text}
        </div>

        {/* Etiqueta de Disponibilidad (Derecha) */}
        {curso.etiquetaPlazas && !showEmploymentType && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 animate-pulse">
            {curso.etiquetaPlazas}
          </div>
        )}
        
        {/* Etiqueta de Tipo de Empleo (Derecha) */}
        {showEmploymentType && employmentFilter && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
            employmentFilter === 'ocupados' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {employmentFilter === 'ocupados' ? 'TRABAJADORES' : 'DESEMPLEADOS'}
          </div>
        )}
        
        {curso.categoria === 'ciclos' && <NivelTag nivel={curso.subtitulo} />}
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">{curso.nombre}</h3>
        {duracion && <p className="text-xs text-gray-500 font-semibold mb-2 uppercase">{duracion}</p>}
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">{curso.copy.slogan}</p>
        <Link
          to={showEmploymentType && employmentFilter 
            ? `/curso-desempleado/${curso.id}` 
            : `/curso/${curso.slug}`
          }
          className="w-full bg-cep-primary text-white py-2 px-4 rounded-lg hover:bg-cep-primary-dark transition-colors font-semibold text-center block text-sm sm:text-base mt-auto"
        >
          VER CURSO COMPLETO
        </Link>
      </div>
    </div>
  );
};

export default CursoCard;