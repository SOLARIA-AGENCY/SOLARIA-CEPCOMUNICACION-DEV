import React, { useState, useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, Euro, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cursoData } from '../config/cursos-otono-2025';

const AdiestramientoCaninoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temarioExpanded, setTemarioExpanded] = useState(false);
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  // Usar datos enriquecidos del curso 0 (Adiestramiento Canino)
  const curso = cursoData[0];
  const { nombre, sede, inicio, imagen, copy, temario, duracion, precio, practicas, profesor, certificacion } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        {/* Hero Section - Mobile First Responsive */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-black">
          <img 
            src={imagen} 
            alt={`Imagen de ${nombre}`} 
            className="w-full h-full object-cover object-center opacity-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Info Bar Enriquecida - Mobile First */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-12 grid grid-cols-2 md:flex md:flex-wrap items-center justify-around gap-4 sm:gap-6 -mt-32 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Inicio</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{inicio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Sede</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{sede}</p>
                </div>
              </div>
              {duracion && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Duración</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">{duracion}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-3">
                <Award className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Certificación</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{certificacion || 'Diploma CEP'}</p>
                </div>
              </div>
            </div>

            {/* Content Section - Mobile First */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="md:col-span-2 prose prose-lg max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sobre el curso</h2>
                <p className="text-sm sm:text-base">{copy.textosPrincipales[0]}</p>
                <p className="text-sm sm:text-base">{copy.textosPrincipales[1]}</p>
                
                <h3 className="text-xl sm:text-2xl font-bold mt-8 sm:mt-10">¿Qué aprenderás?</h3>
                <ul className="space-y-2">
                  {copy.titulos.map((titulo, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{titulo}</span>
                    </li>
                  ))}
                </ul>
                
                {copy.textosPrincipales[2] && <p className="mt-4 sm:mt-6 text-sm sm:text-base">{copy.textosPrincipales[2]}</p>}

                {/* Temario Detallado - Mobile First */}
                {temario && temario.length > 0 && (
                  <div className="mt-8 sm:mt-10">
                    <div 
                      className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setTemarioExpanded(!temarioExpanded)}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                        Temario Completo
                      </h3>
                      {temarioExpanded ? <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6" /> : <ChevronDown className="w-5 sm:w-6 h-5 sm:h-6" />}
                    </div>
                    
                    {temarioExpanded && (
                      <div className="mt-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                        <ul className="space-y-3">
                          {temario.map((modulo, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-cep-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-gray-700 text-sm sm:text-base">{modulo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Información adicional - Mobile First */}
                {practicas && (
                  <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg">
                    <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-2">Experiencia Práctica</h4>
                    <p className="text-blue-800 text-sm sm:text-base">{practicas}</p>
                  </div>
                )}

                {profesor && (
                  <div className="mt-4 sm:mt-6 bg-green-50 p-4 sm:p-6 rounded-lg">
                    <h4 className="text-base sm:text-lg font-bold text-green-900 mb-2 flex items-center">
                      <User className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Profesor/a Especialista
                    </h4>
                    <p className="text-green-800 text-sm sm:text-base">{profesor}</p>
                  </div>
                )}

              </div>

              {/* CTA Sidebar Enriquecido - Mobile First */}
              <aside className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">¿Listo para empezar?</h3>
                  <p className="text-gray-600 mt-2 mb-4 sm:mb-6 text-sm sm:text-base">Solicita información sin compromiso y reserva tu plaza.</p>

                  {/* Información de Precio - Mobile First */}
                  {precio && (
                    <div className="bg-cep-primary/10 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                      <div className="flex items-center mb-2">
                        <Euro className="w-4 sm:w-5 h-4 sm:h-5 text-cep-primary mr-2" />
                        <span className="font-bold text-gray-900 text-sm sm:text-base">Información Económica</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">
                        <strong>{precio.cuotas} cuotas</strong> de <strong>{precio.importe}€</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700">
                        + Matrícula: <strong>{precio.matricula}€</strong>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    ¡Inscríbete Ahora!
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">Plazas limitadas. Grupos reducidos.</p>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>
      
      <CursoInscripcionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={{ nombre: curso.nombre, sede: curso.sede, tag: curso.tag }}
      />
      
      <CepFooter />
    </div>
  );
};

export default AdiestramientoCaninoPage; 