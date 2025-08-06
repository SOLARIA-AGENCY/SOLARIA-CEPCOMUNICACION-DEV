import React, { useState } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursosMaestro } from '../config/cursos-maestro';
import { ordenarCursosPorPrioridad } from '../utils/timeUtils';
import CursoCard from '../components/molecules/CursoCard';
import { Search } from 'lucide-react';

interface TodosLosCursosPageProps {
  fixedTimestamp?: string; // Para tests determinísticos
}

const TodosLosCursosPage: React.FC<TodosLosCursosPageProps> = ({ fixedTimestamp }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const cursosFiltrados = cursosMaestro.filter(curso => 
    curso.categoria !== 'ciclos' &&
    curso.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const cursosNorte = ordenarCursosPorPrioridad(
    cursosFiltrados.filter(curso => curso.sede === 'Norte')
  );
  const cursosSantaCruz = ordenarCursosPorPrioridad(
    cursosFiltrados.filter(curso => curso.sede === 'Santa Cruz')
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader fixedTimestamp={fixedTimestamp} />
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cep-primary mb-4">Todos Nuestros Cursos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra oferta formativa. Cursos diseñados para impulsar tu carrera profesional en nuestras sedes de Tenerife.
          </p>
        </div>

        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar un curso por nombre..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-cep-primary focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* --- SEDE CEP NORTE --- */}
        <section id="sede-norte" className="mb-16">
          <div className="flex items-center mb-8">
            <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
            <h2 className="text-3xl font-bold text-gray-800 mx-4">SEDE CEP NORTE</h2>
            <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
          </div>
          {cursosNorte.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cursosNorte.map(curso => (
                <CursoCard key={curso.codigo} curso={curso} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No se encontraron cursos para la sede Norte con el término de búsqueda actual.</p>
          )}
        </section>

        {/* --- SEDE CEP SANTA CRUZ --- */}
        <section id="sede-santa-cruz">
          <div className="flex items-center mb-8">
            <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
            <h2 className="text-3xl font-bold text-gray-800 mx-4">SEDE CEP SANTA CRUZ</h2>
            <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
          </div>
          {cursosSantaCruz.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cursosSantaCruz.map(curso => (
                <CursoCard key={curso.codigo} curso={curso} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No se encontraron cursos para la sede Santa Cruz con el término de búsqueda actual.</p>
          )}
        </section>
        
      </main>
      <CepFooter fixedTimestamp={fixedTimestamp} />
    </div>
  );
};

export default TodosLosCursosPage; 