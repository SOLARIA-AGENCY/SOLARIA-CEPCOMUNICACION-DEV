import React from 'react';
import { Link } from 'react-router-dom';
import type { CursoMaestro } from '../../config/cursos-maestro';

const getFechaTag = (inicio: string | undefined) => {
  if (!inicio) return { text: 'Próximamente', color: 'bg-gray-500' };
  const mes = inicio.toLowerCase();
  if (mes.includes('julio')) return { text: 'JULIO 2025', color: 'bg-orange-500' };
  if (mes.includes('septiembre')) return { text: 'SEPTIEMBRE 2025', color: 'bg-green-500' };
  if (mes.includes('octubre')) return { text: 'OCTUBRE 2025', color: 'bg-blue-500' };
  return { text: inicio.toUpperCase(), color: 'bg-purple-500' };
};

const CursoCard: React.FC<{ curso: CursoMaestro }> = ({ curso }) => {
  const fechaTag = getFechaTag(curso.inicio);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={curso.imagen}
          alt={`Imagen del curso ${curso.nombre}`}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${fechaTag.color}`}>
          {fechaTag.text}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">{curso.nombre}</h3>
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">{curso.copy.slogan}</p>
        <Link
          to={`/curso/${curso.slug}`}
          className="w-full bg-cep-primary text-white py-2 px-4 rounded-lg hover:bg-cep-primary-dark transition-colors font-semibold text-center block text-sm sm:text-base mt-auto"
        >
          VER CURSO COMPLETO
        </Link>
      </div>
    </div>
  );
};

export default CursoCard; 