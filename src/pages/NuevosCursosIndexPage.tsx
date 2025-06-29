import React from 'react';
import { Link } from 'react-router-dom';
import { cursosMaestro, CursoMaestro } from '../config/cursos-maestro';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const SedeSection: React.FC<{ sede: 'Norte' | 'Santa Cruz', cursos: CursoMaestro[] }> = ({ sede, cursos }) => {
  const direccion = sede === 'Norte' 
    ? 'La Orotava'
    : 'Santa Cruz de Tenerife';

  const Badge: React.FC<{ curso: CursoMaestro }> = ({ curso }) => {
    if (curso.estado === 'activo' && curso.inicio) {
      const color = curso.inicio.includes('Julio') ? 'bg-orange-500' : 'bg-green-600';
      return (
        <div className={`absolute bottom-0 left-0 ${color} text-white text-xs font-bold px-3 py-1`}>
          INICIA EN {curso.inicio.toUpperCase()}
        </div>
      );
    }
    return (
      <div className="absolute bottom-0 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1">
        PRÓXIMAMENTE
      </div>
    );
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-pink-600 uppercase mb-2">
          Sede CEP {sede}
        </h2>
        <p className="text-lg text-gray-500">{direccion}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursos.map(curso => (
          <Link to={`/new/cursos/${curso.slug}`} key={curso.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
            <div className="relative">
              <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-cep-primary text-white text-xs font-bold px-2 py-1 rounded-full">{curso.sede}</div>
              <Badge curso={curso} />
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
};


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