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
  fixedTimestamp?: string; // Para tests determinísticos
}

const CursoCard: React.FC<CursoCardProps> = ({ curso, showEmploymentType, employmentFilter, fixedTimestamp }) => {
  const timeReal = useTimeReal();
  const fechaActual = fixedTimestamp ? new Date(fixedTimestamp) : timeReal;
  
  // Determinar si es ciclo formativo
  const esCiclo = curso.categoria === 'ciclos';
  
  // Determinar si es curso para trabajadores ocupados
  const esCursoOcupados = employmentFilter === 'ocupados';
  
  // Determinar si es curso para trabajadores desempleados
  const esCursoDesempleados = employmentFilter === 'desempleados';
  
  // Usar nuevo sistema inteligente de colores con lógica unificada
  const fechaTag = determinarColorEtiqueta(curso.inicio, esCiclo, fechaActual, curso);
  
  const duracion = curso.descripcionDetallada?.puntosClave.find(p => p.icono === 'Clock')?.texto;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={curso.imagen.includes('quiromasaje-11-meses') ? '/images/cursos/quiromasaje-11-meses-optimized.webp' : 
               `${curso.imagen}?v=${curso.inicio}`}
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
        
        {/* Etiquetas superiores derecha */}

        

        
        {curso.categoria === 'ciclos' && <NivelTag nivel={curso.subtitulo} />}
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
          esCursoOcupados ? 'text-green-600' : esCursoDesempleados ? 'text-blue-600' : 'text-cep-primary'
        }`}>{curso.nombre}</h3>
        
        {/* Subtítulo específico para cursos ocupados */}
        {esCursoOcupados && (
          <p className="text-sm font-semibold text-green-700 mb-2 uppercase">
            CURSO PARA TRABAJADORES OCUPADOS
          </p>
        )}
        
        {/* Subtítulo específico para cursos desempleados */}
        {esCursoDesempleados && (
          <p className="text-sm font-semibold text-blue-700 mb-2 uppercase">
            CURSO DE TRABAJADORES DESEMPLEADOS
          </p>
        )}
        
        {duracion && <p className={`text-xs font-semibold mb-2 uppercase ${
          esCursoDesempleados ? 'text-blue-500' : 'text-gray-500'
        }`}>{duracion}</p>}
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">{curso.copy.slogan}</p>
        <Link
          to={employmentFilter === 'desempleados'
            ? `/curso-desempleado/${curso.id}` 
            : employmentFilter === 'ocupados'
            ? `/curso-ocupado/${curso.id}`
            : `/curso/${curso.slug}`
          }
          className={`w-full py-2 px-4 rounded-lg transition-colors font-semibold text-center block text-sm sm:text-base mt-auto ${
            esCursoOcupados 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : esCursoDesempleados
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-cep-primary text-white hover:bg-cep-primary-dark'
          }`}
        >
          VER CURSO COMPLETO
        </Link>
      </div>
    </div>
  );
};

export default CursoCard;