import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursosMaestro } from '../config/cursos-maestro';
import CicloCard from '../components/molecules/CicloCard';

const CiclosPage: React.FC = () => {
  // Obtener los ciclos formativos y asegurar que solo haya uno por tipo
  const todosLosCiclos = cursosMaestro.filter(c => c.categoria === 'ciclos' && c.estado === 'activo');
  const ciclosFormativosUnicos = Array.from(new Map(todosLosCiclos.map(c => [c.slugBase, c])).values());

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-400 text-cep-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span className="mr-2">🏆</span>
              TÍTULOS OFICIALES MINISTERIO DE EDUCACIÓN
            </div>
            <h2 className="text-4xl font-bold mb-4 text-cep-primary">CICLOS FORMATIVOS OFICIALES</h2>
            <p className="text-xl text-gray-600 mb-2">Formación Profesional Homologada por el MEC</p>
            <p className="text-lg text-gray-500">3 años de duración • Acceso directo a Universidad • Becas disponibles</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ciclosFormativosUnicos.map(ciclo => (
              <CicloCard key={ciclo.id} ciclo={ciclo} />
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-cep-primary">¿Por qué elegir nuestros Ciclos Formativos?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🏛️</div>
                  <h4 className="font-bold mb-2 text-gray-800">Título Oficial MEC</h4>
                  <p className="text-sm text-gray-600">Reconocimiento nacional e internacional</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-bold mb-2 text-gray-800">Acceso Universidad</h4>
                  <p className="text-sm text-gray-600">Acceso directo a estudios universitarios</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-bold mb-2 text-gray-800">Becas Disponibles</h4>
                  <p className="text-sm text-gray-600">Becas del Ministerio de Educación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CepFooter />
    </div>
  );
};

export default CiclosPage; 