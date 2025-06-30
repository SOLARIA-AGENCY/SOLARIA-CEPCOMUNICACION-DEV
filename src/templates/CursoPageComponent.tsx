import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Star, ChevronDown, ChevronUp, Phone, Mail, MapPin, PawPrint, Heart, Activity } from 'lucide-react';
import { CursoMaestro } from '../config/cursos-maestro';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

interface CursoPageComponentProps {
  curso: CursoMaestro;
}

const CursoPageComponent: React.FC<CursoPageComponentProps> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  
  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Curso no encontrado</h1>
          <p className="text-lg text-gray-600">No se pudo cargar la información del curso.</p>
        </div>
        <CepFooter />
      </div>
    );
  }
  
  const detalles = curso.descripcionDetallada;

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(prev => prev === moduleIndex ? null : moduleIndex);
  };

  if (!detalles) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{curso.nombre}</h1>
            <p className="text-lg text-gray-600">Más información sobre este curso estará disponible próximamente.</p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
                SOLICITAR INFORMACIÓN
            </button>
        </div>
        <CepFooter />
        <CursoInscripcionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          curso={{
            nombre: curso.nombre,
            sede: curso.sede,
            slug: curso.slug
          }}
        />
      </div>
    );
  }

  const HeroIcon = () => {
    switch (curso.categoria) {
      case 'veterinaria': return <PawPrint className="w-12 h-12 text-yellow-400" />;
      case 'sanidad': return <Heart className="w-12 h-12 text-red-400" />;
      case 'bienestar': return <Activity className="w-12 h-12 text-teal-400" />;
      default: return <BookOpen className="w-12 h-12 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={curso.imagen} 
            alt={`Curso de ${curso.nombre}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <HeroIcon />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {curso.nombre}
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "{curso.copy.slogan}"
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              {detalles.puntosClave && detalles.puntosClave.map((item: any, index: number) => (
                <div key={index} className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  {item.icono === 'Clock' && <Clock className="w-5 h-5 mr-2" />}
                  {item.icono === 'Users' && <Users className="w-5 h-5 mr-2" />}
                  {item.icono === 'Award' && <Award className="w-5 h-5 mr-2" />}
                  <span>{item.texto}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <div className="bg-yellow-400 rounded-lg p-1 inline-block">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡RESERVAR MI PLAZA AHORA!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {detalles.queAprendes}
              </p>
              {detalles.introduccion && (
                <p className="text-lg leading-relaxed text-gray-700">
                  {detalles.introduccion}
                </p>
              )}
            </div>
          </section>

          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-700">
                  {detalles.infoAdicional?.duracion || 'No especificado'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prácticas</h3>
                <p className="text-gray-700">
                  {detalles.infoAdicional?.practicas || 'No especificado'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                <PawPrint className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialización</h3>
                <p className="text-gray-700">
                  {detalles.infoAdicional?.especializacion || 'No especificado'}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Total:</strong> {detalles.inversion?.total || 'Consultar'}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Modalidad:</strong> {detalles.inversion?.modalidad || 'No especificado'}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    ✓ {detalles.inversion?.incluye || 'Material didáctico incluido'}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    {detalles.salidasProfesionales && detalles.salidasProfesionales.map((salida: any, index: number) => (
                      <li key={index}>• {salida}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              Temario Completo
            </h2>
            <div className="space-y-4">
              {detalles.modulos && detalles.modulos.map((modulo: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleModule(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{modulo.titulo}</h3>
                    {expandedModule === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedModule === index && (
                    <div className="px-6 pb-4">
                      <ul className="space-y-2">
                        {modulo.contenido && modulo.contenido.map((item: any, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Tu Profesor Especialista
            </h2>
            {detalles.profesores && detalles.profesores.map((profesor: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                    <div className="relative">
                      <img 
                        src={profesor.foto}
                        alt={`Foto de ${profesor.nombre}`}
                        className="w-40 h-40 rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full">
                         <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{profesor.nombre}</h3>
                    <p className="text-lg font-semibold text-blue-600 mb-4">{profesor.especialidad}</p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {profesor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profesor.tags && profesor.tags.map((tag: any, tagIndex: number) => (
                         <span key={tagIndex} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

        <CepFooter />
        <CursoInscripcionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          curso={{
            nombre: curso.nombre,
            sede: curso.sede,
            slug: curso.slug
          }}
        />
    </div>
  );
}

export default CursoPageComponent; 