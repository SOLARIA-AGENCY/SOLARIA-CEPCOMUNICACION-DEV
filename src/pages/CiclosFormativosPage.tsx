import React from 'react';
import { Link } from 'react-router-dom';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursosMaestro, Curso } from '../config/cursos-maestro';
import { GraduationCap, Award } from 'lucide-react';

const CiclosFormativosPage: React.FC = () => {
  const ciclos = cursosMaestro.filter((c: Curso) => c.categoria === 'ciclos');

  return (
    <div className="bg-gray-100">
      <CepHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cep-primary">Ciclos Formativos Oficiales</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Impulsa tu carrera con una titulación oficial del Ministerio de Educación. Fórmate para una profesión con futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {ciclos.map((ciclo: Curso) => (
            <div key={ciclo.id} className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col group">
              <div className="relative">
                <img src={ciclo.imagen} alt={`Imagen de ${ciclo.nombre}`} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <div className="absolute top-4 right-4 bg-white text-cep-primary px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                   Titulación Oficial
                 </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 flex-grow">{ciclo.nombre}</h2>
                <p className="text-gray-600 mb-6">{ciclo.copy.slogan}</p>
                <div className="space-y-3 text-gray-700 mb-6">
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-3 text-cep-primary" />
                    <span>Acceso a Universidad / Grado Superior</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3 text-cep-primary" />
                    <span>Prácticas en empresa garantizadas</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link to={`/curso/${ciclo.id}`} className="block w-full text-center bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform group-hover:scale-105">
                    Ver Ficha Completa
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CepFooter />
    </div>
  );
};

export default CiclosFormativosPage; 