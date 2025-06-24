import React, { useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursoData } from '../config/cursos-otono-2025';

const CursosPage: React.FC = () => {
  // Scroll al top cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Eliminamos duplicados por nombre de curso, manteniendo el primero que aparece.
  const cursosUnicos = cursoData.reduce((acc: any[], current) => {
    if (!acc.some(item => item.nombre === current.nombre)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const CursoCard = ({ curso }: { curso: any }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[380px] flex flex-col">
      <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} className="w-full h-40 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{curso.nombre}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
            {curso.copy.slogan}
        </p>
        <a
            href={`/${curso.slug}`}
            className="block w-full mt-auto bg-cep-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-cep-primary/90 transition-colors text-center"
        >
            Más Información
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cep-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestra Oferta Formativa
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Descubre todos nuestros cursos profesionales. Formación de calidad con prácticas garantizadas para impulsar tu futuro laboral.
            </p>
        </div>
      </section>

      {/* Cursos por Sedes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cursosUnicos.map((curso) => (
                <CursoCard key={curso.slug} curso={curso} />
              ))}
            </div>
        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default CursosPage; 