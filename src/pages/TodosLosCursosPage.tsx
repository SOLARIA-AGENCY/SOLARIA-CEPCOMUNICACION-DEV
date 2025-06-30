import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, BookOpen, MapPin, Search } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursosMaestro } from '../config/cursos-maestro';
import type { CursoMaestro } from '../config/cursos-maestro';

const TodosLosCursosPage: React.FC = () => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const categorias = [
    'todos', 
    'sanidad', 
    'veterinaria', 
    'bienestar', 
    'ciclos', 
    'adiestramiento',
  ];

  const cursosFiltrados = cursosMaestro.filter(curso => {
    const pasaCategoria = filtroCategoria === 'todos' || curso.categoria === filtroCategoria;
    const pasaBusqueda = terminoBusqueda === '' || curso.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
    return curso.estado === 'activo' && pasaCategoria && pasaBusqueda;
  });

  const getCategoriaNombre = (id: string) => {
    const nombres: { [key: string]: string } = {
      todos: 'Todos los Cursos',
      sanidad: 'Sanidad',
      veterinaria: 'Mundo Animal',
      bienestar: 'Bienestar y Deporte',
      ciclos: 'Ciclos Formativos',
      adiestramiento: 'Adiestramiento Canino',
    };
    return nombres[id] || 'Categoría';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cep-primary mb-4">Nuestros Cursos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra oferta formativa. Encuentra el curso perfecto para impulsar tu carrera profesional.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-cep-primary focus:border-cep-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  onClick={() => setFiltroCategoria(categoria)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    filtroCategoria === categoria
                      ? 'bg-cep-primary text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoriaNombre(categoria)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listado de Cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cursosFiltrados.map(curso => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
        {cursosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No se encontraron cursos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
      <CepFooter />
    </div>
  );
};

const CursoCard: React.FC<{ curso: CursoMaestro }> = ({ curso }) => {
  return (
    <Link to={`/curso/${curso.slug}`} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={curso.imagen}
          alt={`Imagen del curso ${curso.nombre}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-cep-primary text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {curso.sede}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-cep-primary/80" />
          <p className="text-xs font-semibold uppercase text-cep-primary/80 tracking-wider">
            {curso.categoria.replace(/-/g, ' ')}
          </p>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cep-primary transition-colors">
          {curso.nombre}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {curso.copy.slogan}
        </p>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-sm text-gray-500">
            <span className="font-bold text-cep-primary">VER CURSO</span>
            <BookOpen className="w-5 h-5 group-hover:text-cep-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default TodosLosCursosPage; 