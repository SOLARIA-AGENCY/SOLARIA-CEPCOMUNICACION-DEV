import React from 'react';
import { Link } from 'react-router-dom';
import { cursosMaestro, CursoMaestro } from '../config/cursos-maestro';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const SedeSection: React.FC<{ sede: 'Norte' | 'Santa Cruz', cursos: CursoMaestro[] }> = ({ sede, cursos }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-l-4 border-cep-primary pl-4">
      Sede CEP {sede}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cursos.map(curso => (
        <Link to={`/new/cursos/${curso.slug}`} key={curso.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
          <div className="relative">
            <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 bg-cep-primary text-white text-xs font-bold px-2 py-1 rounded">{curso.sede}</div>
            {curso.estado === 'proximamente' && (
              <div className="absolute bottom-0 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1">PRÓXIMAMENTE</div>
            )}
            {/* Aquí se podría añadir un estado para "últimas plazas" con otro color, ej: 'ultimas-plazas' */}
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-cep-primary transition-colors">{curso.nombre}</h2>
            <p className="mt-2 text-gray-600 text-sm">{curso.copy.slogan}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);


const NuevosCursosIndexPage: React.FC = () => {
  const cursosNorte = cursosMaestro.filter(c => c.sede === 'Norte');
  const cursosSantaCruz = cursosMaestro.filter(c => c.sede === 'Santa Cruz');

  return (
    <div className="bg-white">
      <CepHeader />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">Nuestros Cursos</h1>
        <p className="text-lg text-center text-gray-600 mb-16">Explora todas las formaciones que ofrecemos en nuestras sedes de Norte y Santa Cruz.</p>
        
        <SedeSection sede="Santa Cruz" cursos={cursosSantaCruz} />
        <SedeSection sede="Norte" cursos={cursosNorte} />

      </div>
      <CepFooter />
    </div>
  );
};

export default NuevosCursosIndexPage; 