import React from 'react';
import { Link } from 'react-router-dom';
import type { CursoMaestro } from '../../config/cursos-maestro';
import { ExternalLink, Clock } from 'lucide-react';

interface CicloCardProps {
  ciclo: CursoMaestro;
}

const CicloCard: React.FC<CicloCardProps> = ({ ciclo }) => {
    if (ciclo.categoria !== 'ciclos') return null;

  const gradoClass = ciclo.subtitulo?.toLowerCase().includes('superior')
    ? 'bg-blue-100 text-blue-800'
    : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
      <div className="relative">
        <img
          src={ciclo.imagen}
          alt={`Imagen del ciclo ${ciclo.nombre}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-md">
          <Clock size={14} className="mr-1" />
          <span>3 AÑOS</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-cep-primary mb-2 uppercase">{ciclo.nombre}</h3>
        <p className="text-gray-600 mb-4 text-sm flex-grow">{ciclo.copy.slogan}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${gradoClass}`}>{ciclo.subtitulo}</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">{ciclo.modalidad}</span>
        </div>
        <div className="mt-auto">
          <Link 
            to={`/curso/${ciclo.slug}`}
            className="inline-flex items-center justify-center w-full text-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-white bg-[#D81B60] hover:bg-cep-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cep-primary transition-all duration-300"
          >
            Más Información
            <ExternalLink className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CicloCard;
