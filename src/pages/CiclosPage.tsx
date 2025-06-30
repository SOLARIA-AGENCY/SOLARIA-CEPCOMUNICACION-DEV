import React from 'react';
import { Link } from 'react-router-dom';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { cursosMaestro } from '../config/cursos-maestro';
import type { CursoMaestro } from '../config/cursos-maestro';

const CiclosPage: React.FC = () => {
  // Obtener los ciclos formativos y asegurar que solo haya uno por tipo
  const todosLosCiclos = cursosMaestro.filter(c => c.categoria === 'ciclos' && c.estado === 'activo');
  const ciclosFormativosUnicos = Array.from(new Map(todosLosCiclos.map(c => [c.slugBase, c])).values());

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      <section className="py-16 bg-gradient-to-br from-cep-primary via-pink-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-400 text-cep-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span className="mr-2">🏆</span>
              TÍTULOS OFICIALES MINISTERIO DE EDUCACIÓN
            </div>
            <h2 className="text-4xl font-bold mb-4">CICLOS FORMATIVOS OFICIALES</h2>
            <p className="text-xl text-pink-100 mb-2">Formación Profesional Homologada por el MEC</p>
            <p className="text-lg text-pink-200">3 años de duración • Acceso directo a Universidad • Becas disponibles</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {ciclosFormativosUnicos.map(curso => {
                const getFechaTag = (inicio: string | undefined) => {
                  if (!inicio) return { text: 'Próximamente', color: 'bg-gray-500' };
                  const mes = inicio.toLowerCase();
                  if (mes.includes('septiembre')) return { text: 'SEPTIEMBRE 2025', color: 'bg-green-500' };
                  return { text: inicio.toUpperCase(), color: 'bg-purple-500' };
                };
                const fechaTag = getFechaTag(curso.inicio);
                const esGradoSuperior = curso.nombre.includes('CFGS');

                return (
                  <div key={curso.id} className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={curso.imagen}
                        alt={curso.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${fechaTag.color}`}>
                          {fechaTag.text}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-400 text-cep-primary px-3 py-1 rounded-full text-xs font-bold">
                        {esGradoSuperior ? 'GRADO SUPERIOR' : 'GRADO MEDIO'}
                      </div>
                    </div>
                    <div className="p-6 text-gray-800">
                      <h3 className="text-xl font-bold text-cep-primary mb-3">{curso.nombre}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📍</span>
                          <span className="font-semibold">Sede:</span>
                          <span className="ml-1">{curso.sede}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">⏱️</span>
                          <span className="font-semibold">Duración:</span>
                          <span className="ml-1 text-cep-primary font-bold">{curso.descripcionDetallada?.infoAdicional?.duracion || '2.000 horas'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🎓</span>
                          <span className="font-semibold">Título:</span>
                          <span className="ml-1">Oficial MEC</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Prácticas Incluidas</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Becas MEC</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Acceso Universidad</span>
                      </div>
                      <Link
                        to={`/curso/${curso.slug}`}
                        className="block w-full bg-cep-primary text-white text-center py-3 rounded-lg hover:bg-cep-primary-dark transition-colors font-bold"
                      >
                        VER INFORMACIÓN COMPLETA
                      </Link>
                    </div>
                  </div>
                );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">¿Por qué elegir nuestros Ciclos Formativos?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🏛️</div>
                  <h4 className="font-bold mb-2">Título Oficial MEC</h4>
                  <p className="text-sm text-pink-100">Reconocimiento nacional e internacional</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-bold mb-2">Acceso Universidad</h4>
                  <p className="text-sm text-pink-100">Acceso directo a estudios universitarios</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-bold mb-2">Becas Disponibles</h4>
                  <p className="text-sm text-pink-100">Becas del Ministerio de Educación</p>
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