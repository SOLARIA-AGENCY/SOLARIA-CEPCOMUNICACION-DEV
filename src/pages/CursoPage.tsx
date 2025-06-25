import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import { cursoData } from '../config/cursos-otono-2025';
import { Calendar, MapPin, Award, CheckCircle, Clock, Euro, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const CursoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temarioExpanded, setTemarioExpanded] = useState(false);
  
  const curso = cursoData.find(c => c.slug === slug);

  useEffect(() => {
    if (!curso) {
      navigate('/404'); // o a una página de cursos
    }
    window.scrollTo(0, 0);
  }, [curso, navigate]);

  if (!curso) {
    return null; // O un spinner de carga
  }

  const { nombre, sede, inicio, imagen, copy, temario, duracion, precio, practicas, profesor, certificacion } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-96 bg-black">
          <img src={imagen} alt={`Imagen de ${nombre}`} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Info Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12 -mt-32 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-cep-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Inicio</p>
                    <p className="font-bold text-gray-900">{inicio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-cep-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Sede</p>
                    <p className="font-bold text-gray-900">{sede}</p>
                  </div>
                </div>
                {duracion && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-cep-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Duración</p>
                      <p className="font-bold text-gray-900">{duracion}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-cep-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Certificación</p>
                    <p className="font-bold text-gray-900">{certificacion || 'Diploma CEP'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección especial para Ciclos Formativos Oficiales */}
            {(curso.slug.includes('cfgs-') || curso.slug.includes('cfgm-')) && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-12 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <img 
                      src="/images/logos/logo ministerio educacion.png" 
                      alt="Ministerio de Educación y Formación Profesional" 
                      className="w-20 h-20 md:w-24 md:h-24 bg-white p-2 rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">Título Oficial Homologado</h3>
                      <p className="text-blue-100 text-lg">Ministerio de Educación y Formación Profesional</p>
                      <p className="text-blue-200 text-sm mt-1">Centro autorizado Nº 38017275</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="bg-white/20 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium">✅ Validez Nacional</p>
                      <p className="text-sm font-medium">✅ Becas MEC Disponibles</p>
                      <p className="text-sm font-medium">✅ Centros Privados y Concertados</p>
                    </div>
                    <p className="text-xs text-blue-200">Formación Profesional Reglada</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                {/* Descripción */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900">Sobre el curso</h2>
                  <p>{copy.textosPrincipales[0]}</p>
                  <p>{copy.textosPrincipales[1]}</p>
                  {copy.textosPrincipales[2] && <p>{copy.textosPrincipales[2]}</p>}
                </div>

                {/* Temario */}
                {temario && temario.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setTemarioExpanded(!temarioExpanded)}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="w-6 h-6 mr-3 text-cep-primary" />
                        Temario del curso
                      </h3>
                      {temarioExpanded ? (
                        <ChevronUp className="w-6 h-6 text-cep-primary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-cep-primary" />
                      )}
                    </div>
                    
                    {temarioExpanded && (
                      <div className="mt-6">
                        <ul className="space-y-3">
                          {temario.map((modulo, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{modulo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Qué aprenderás */}
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900">¿Qué aprenderás?</h3>
                  <ul className="space-y-3">
                    {copy.titulos.map((titulo, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{titulo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Información adicional */}
                {(practicas || profesor) && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Información adicional</h3>
                    <div className="space-y-3">
                      {practicas && (
                        <div className="flex items-start">
                          <Award className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700"><strong>Prácticas:</strong> {practicas}</span>
                        </div>
                      )}
                      {profesor && (
                        <div className="flex items-start">
                          <User className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700"><strong>Profesor:</strong> {profesor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Sidebar */}
              <aside className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">¿Listo para empezar?</h3>
                  <p className="text-gray-600">Solicita información sin compromiso y reserva tu plaza.</p>
                  
                  {/* Precio */}
                  {precio && (
                    <div className="bg-cep-primary/10 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Euro className="w-5 h-5 text-cep-primary mr-2" />
                        <span className="text-sm font-medium text-cep-primary">Precio del curso</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          {precio.cuotas} cuotas de <strong>{precio.importe}€</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                          Matrícula: <strong>{precio.matricula}€</strong>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    ¡Inscríbete Ahora!
                  </button>
                  <p className="text-xs text-gray-400 text-center">Plazas limitadas. Grupos reducidos.</p>
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

export default CursoPage; 