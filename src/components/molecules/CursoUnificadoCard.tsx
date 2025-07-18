import React from 'react';
import { Link } from 'react-router-dom';
import { CursoUnificado } from '../../utils/sedeUtils';
import { determinarColorEtiqueta, useTimeReal, formatearFechaLegible, parsearFechaCurso } from '../../utils/timeUtils';

interface CursoUnificadoCardProps {
  curso: CursoUnificado;
}

const CursoUnificadoCard: React.FC<CursoUnificadoCardProps> = ({ curso }) => {
  const fechaActual = useTimeReal();
  
  // Determinar si es curso subvencionado
  const esCursoSubvencionado = 'esCursoSubvencionado' in curso && curso.esCursoSubvencionado;
  
  // Obtener fecha de inicio
  const fechaInicio = esCursoSubvencionado 
    ? (curso as any).fecha_inicio 
    : curso.inicio;
  
  // Determinar URL de destino
  const urlDestino = esCursoSubvencionado
    ? `/${(curso as any).slug}` // Usar slug semántico para cursos subvencionados
    : `/curso/${curso.slug}`; // Para cursos regulares
  
  // Usar nuevo sistema inteligente de colores
  const fechaTag = determinarColorEtiqueta(
    fechaInicio, 
    curso.categoria === 'ciclos',
    fechaActual, 
    esCursoSubvencionado ? undefined : (curso as any)
  );
  
  const duracion = curso.descripcionDetallada?.puntosClave.find(p => p.icono === 'Clock')?.texto;

  // Determinar color del tipo de curso
  const getColorTipo = () => {
    if (esCursoSubvencionado) {
      const tipoCurso = (curso as any).tipo;
      return tipoCurso === 'ocupados' ? 'bg-green-600' : 'bg-blue-600';
    }
    return 'bg-cep-primary';
  };

  // Determinar etiqueta del tipo
  const getEtiquetaTipo = () => {
    if (esCursoSubvencionado) {
      const tipoCurso = (curso as any).tipo;
      return tipoCurso === 'ocupados' ? 'TRABAJADORES' : 'DESEMPLEADOS';
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

        {/* Etiqueta de Tipo de Curso (Derecha) */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${getColorTipo()}`}>
          {getEtiquetaTipo()}
        </div>
        
        {/* Etiqueta de Nivel para ciclos */}
        {!esCursoSubvencionado && curso.categoria === 'ciclos' && (curso as any).subtitulo && (
          <div className={`absolute top-12 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
            (curso as any).subtitulo.toLowerCase().includes('superior') ? 'bg-cep-primary' : 'bg-green-600'
          }`}>
            {(curso as any).subtitulo.toLowerCase().includes('superior') ? 'GRADO SUPERIOR' : 'GRADO MEDIO'}
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
          esCursoSubvencionado 
            ? ((curso as any).tipo === 'ocupados' ? 'text-green-600' : 'text-blue-600')
            : 'text-cep-primary'
        }`}>
          {curso.nombre}
        </h3>
        
        {duracion && (
          <p className="text-xs text-gray-500 font-semibold mb-2 uppercase">{duracion}</p>
        )}
        
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">
          {esCursoSubvencionado ? (curso as any).descripcion : curso.copy.slogan}
        </p>

        {/* Información específica para cursos subvencionados */}
        {esCursoSubvencionado && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">📅 Inicio:</span>
              <span className="ml-2">
                {(() => {
                  const fechaParseada = parsearFechaCurso((curso as any).fecha_inicio);
                  return fechaParseada ? formatearFechaLegible(fechaParseada) : (curso as any).fecha_inicio;
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
                (curso as any).tipo === 'ocupados' ? 'text-green-600' : 'text-blue-600'
              }`}>
                100% GRATUITO
              </span>
            </div>
          </div>
        )}
        
        <Link
          to={urlDestino}
          className={`w-full text-white py-2 px-4 rounded-lg font-semibold text-center block text-sm sm:text-base mt-auto transition-colors ${
            esCursoSubvencionado
              ? ((curso as any).tipo === 'ocupados' 
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