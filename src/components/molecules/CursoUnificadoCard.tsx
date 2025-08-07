import React from 'react';
import { Link } from 'react-router-dom';
import { CursoUnificado } from '../../utils/sedeUtils';
import { determinarColorEtiqueta, useTimeReal, formatearFechaLegible, parsearFechaCurso } from '../../utils/timeUtils';
import { CursoMaestro } from '../../config/cursos-maestro';
import { EmploymentCourseConfig } from '../../types/employment';

// Type guards para distinguir tipos de curso
const esCursoSubvencionado = (curso: CursoUnificado): curso is EmploymentCourseConfig & { 
  esCursoSubvencionado: true;
  slug: string;
  codigo: string;
  estado: string;
  inicio: string;
  categoria: string;
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  descripcionDetallada?: {
    puntosClave: Array<{ icono: string; texto: string }>;
  };
} => {
  return 'esCursoSubvencionado' in curso && curso.esCursoSubvencionado === true;
};

const esCursoMaestro = (curso: CursoUnificado): curso is CursoMaestro => {
  return !('esCursoSubvencionado' in curso);
};

interface CursoUnificadoCardProps {
  curso: CursoUnificado;
}

const CursoUnificadoCard: React.FC<CursoUnificadoCardProps> = ({ curso }) => {
  const fechaActual = useTimeReal();
  
  // Determinar tipo de curso usando type guard
  const esSubvencionado = esCursoSubvencionado(curso);
  
  // Obtener fecha de inicio con tipado seguro
  const fechaInicio = esSubvencionado 
    ? curso.fecha_inicio 
    : curso.inicio;
  
  // Determinar URL de destino con tipado seguro
  const urlDestino = esSubvencionado
    ? `/${curso.slug}` // Usar slug semántico para cursos subvencionados
    : `/curso/${curso.slug}`; // Para cursos regulares
  
  // Usar nuevo sistema inteligente de colores con tipado seguro
  const fechaTag = determinarColorEtiqueta(
    fechaInicio, 
    curso.categoria === 'ciclos',
    fechaActual, 
    esSubvencionado ? undefined : curso
  );
  
  const duracion = curso.descripcionDetallada?.puntosClave.find(p => p.icono === 'Clock')?.texto;

  // Determinar color del tipo de curso con tipado seguro
  const getColorTipo = (): string => {
    if (esSubvencionado) {
      return curso.tipo === 'ocupados' ? 'bg-green-600' : 'bg-blue-600';
    }
    return 'bg-cep-primary';
  };

  // Determinar etiqueta del tipo con tipado seguro
  const getEtiquetaTipo = (): string => {
    if (esSubvencionado) {
      return curso.tipo === 'ocupados' ? 'TRABAJADORES' : 'DESEMPLEADOS';
    }
    return 'PRIVADO';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={curso.imagen}
          alt={`Imagen del curso ${curso.nombre}`}
          className="w-full h-40 sm:h-48 object-cover"
          loading="lazy"
          decoding="async"
        />
        
        {/* Etiqueta de Estado/Fecha (Izquierda) */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${fechaTag.color}`}>
          {fechaTag.text}
        </div>

        {/* Banners Superiores Derecha */}
        <div className="absolute top-3 right-3 flex flex-col items-end space-y-2">
          {/* Etiqueta de Tipo de Curso */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getColorTipo()}`}>
            {getEtiquetaTipo()}
          </div>

          {/* Etiqueta de Gratuidad para cursos subvencionados */}
          {esSubvencionado && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getColorTipo()}`}>
              GRATIS
            </div>
          )}
        </div>
        
        {/* Etiqueta de Nivel para ciclos con tipado seguro */}
        {!esSubvencionado && esCursoMaestro(curso) && curso.categoria === 'ciclos' && curso.subtitulo && (
          <div className={`absolute top-12 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
            curso.subtitulo.toLowerCase().includes('superior') ? 'bg-cep-primary' : 'bg-green-600'
          }`}>
            {curso.subtitulo.toLowerCase().includes('superior') ? 'GRADO SUPERIOR' : 'GRADO MEDIO'}
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
          esSubvencionado 
            ? (curso.tipo === 'ocupados' ? 'text-green-600' : 'text-blue-600')
            : 'text-cep-primary'
        }`}>
          {curso.nombre}
        </h3>
        
        {duracion && (
          <p className="text-xs text-gray-500 font-semibold mb-2 uppercase">{duracion}</p>
        )}
        
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">
          {esSubvencionado ? curso.descripcion : curso.copy.slogan}
        </p>

        {/* Información específica para cursos subvencionados con tipado seguro */}
        {esSubvencionado && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">📅 Inicio:</span>
              <span className="ml-2">
                {(() => {
                  const fechaParseada = parsearFechaCurso(curso.fecha_inicio);
                  return fechaParseada ? formatearFechaLegible(fechaParseada) : curso.fecha_inicio;
                })()}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">📍 Sede:</span>
              <span className="ml-2">CEP {curso.sede}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">💰 Precio:</span>
              <span className={`ml-2 font-bold ${
                curso.tipo === 'ocupados' ? 'text-green-600' : 'text-blue-600'
              }`}>
                100% GRATUITO
              </span>
            </div>
          </div>
        )}
        
        <Link
          to={urlDestino}
          className={`w-full text-white py-2 px-4 rounded-lg font-semibold text-center block text-sm sm:text-base mt-auto transition-colors ${
            esSubvencionado
              ? (curso.tipo === 'ocupados' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700')
              : 'bg-cep-primary hover:bg-cep-primary-dark'
          }`}
        >
          VER CURSO COMPLETO
        </Link>
      </div>
    </div>
  );
};

export default CursoUnificadoCard;