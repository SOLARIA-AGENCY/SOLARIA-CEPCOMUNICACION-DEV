import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cursosMaestro } from '../config/cursos-maestro';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const PaginaCursoDinamica: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const curso = cursosMaestro.find(c => c.slug === slug);

  if (!curso) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <CepHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-cep-primary mb-4">Error 404</h1>
          <p className="text-lg text-gray-700 mb-8">
            El curso que buscas no se ha encontrado.
          </p>
          <Link to="/new/cursos" className="bg-cep-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-cep-secondary transition-colors">
            Ver todos los cursos
          </Link>
        </main>
        <CepFooter />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        <div className="relative h-80 bg-black">
          <img 
            src={curso.imagen} 
            alt={`Imagen de ${curso.nombre}`} 
            className="w-full h-full object-cover opacity-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-5xl font-extrabold tracking-tight">
              {curso.nombre} en <span className="text-cep-primary">{curso.sede}</span>
            </h1>
            <p className="mt-4 text-xl font-light max-w-3xl">{curso.copy.slogan}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
            {curso.estado === 'proximamente' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded-md" role="alert">
                    <p className="font-bold">¡Muestra tu interés!</p>
                    <p>
                        Este curso se abrirá próximamente en nuestra sede de {curso.sede}. Inscríbete en la lista de espera y sé el primero en saber cuándo abrimos matrículas.
                    </p>
                </div>
            )}
            {/* Aquí iría el resto del contenido de la página y el formulario */}
            <h2 className="text-3xl font-bold text-gray-900">Sobre el curso</h2>
            {curso.copy.textosPrincipales.map((texto, index) => (
              <p key={index} className="mt-4 text-lg text-gray-700">{texto}</p>
            ))}
            
            <h3 className="text-2xl font-bold mt-10">¿Qué aprenderás?</h3>
            <ul className="mt-4 space-y-2">
            {curso.copy.titulos.map((titulo, i) => (
                <li key={i} className="flex items-start">
                <span className="text-cep-primary font-bold mr-2">✓</span>
                <span>{titulo}</span>
                </li>
            ))}
            </ul>

            <div className="mt-12 text-center">
              <button className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-lg">
                RESERVA TU PLAZA AHORA
              </button>
            </div>

        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default PaginaCursoDinamica; 