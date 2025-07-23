import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { EmploymentCourseConfig } from '../types/employment';
import EmploymentFormModal from '../components/molecules/EmploymentFormModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import LogosMinisteriales from '../components/molecules/LogosMinisteriales';
import { formatearFechaLegible, parsearFechaCurso } from '../utils/timeUtils';

interface CursoOcupadosPageComponentProps {
  curso: EmploymentCourseConfig;
}

const CursoOcupadosPageComponent: React.FC<CursoOcupadosPageComponentProps> = ({ curso }) => {
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

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(prev => prev === moduleIndex ? null : moduleIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          {curso.imagen && (
            <img 
              src={curso.imagen}
              alt={`Curso de ${curso.nombre}`}
              className="w-full h-full object-cover opacity-20"
            />
          )}
          <div className="absolute inset-0 bg-green-900/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              CURSO PARA TRABAJADORES OCUPADOS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {curso.nombre}
            </h1>
            {curso.descripcion && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <p className="text-lg sm:text-xl">
                  {curso.descripcion}
                </p>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base mb-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>{curso.datos_especificos.duracion}</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                <span>{curso.datos_especificos.modalidad}</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                <span>100% Gratuito SEPE</span>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="bg-yellow-400 rounded-lg p-1 inline-block">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡INSCRIBIRME AHORA!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Información del curso */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">📅 Fechas y Horarios</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Inicio:</strong> {(() => {
                      const fechaParseada = parsearFechaCurso(curso.fecha_inicio);
                      return fechaParseada ? formatearFechaLegible(fechaParseada) : curso.fecha_inicio;
                    })()}</p>
                    <p><strong>Fin:</strong> {(() => {
                      const fechaParseada = parsearFechaCurso(curso.fecha_fin);
                      return fechaParseada ? formatearFechaLegible(fechaParseada) : curso.fecha_fin;
                    })()}</p>
                    <p><strong>Duración:</strong> {curso.datos_especificos.duracion}</p>
                    <p><strong>Horario:</strong> {(curso.datos_especificos.caracteristicas as any).horario === 'tarde' ? 'Tardes' : 'Mañanas'}</p>
                    <p><strong>Modalidad:</strong> {curso.datos_especificos.modalidad}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">📍 Ubicación y Contacto</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Sede:</strong> CEP {curso.sede}</p>
                    <p><strong>Plazas:</strong> {curso.plazas_disponibles} disponibles</p>
                    <p><strong>Email:</strong> 
                      <a href={`mailto:${curso.datos_especificos.contacto.email}`} className="text-green-600 hover:underline ml-1">
                        {curso.datos_especificos.contacto.email}
                      </a>
                    </p>
                    <p><strong>Teléfono:</strong> 
                      <a href={`tel:${curso.datos_especificos.contacto.telefono}`} className="text-green-600 hover:underline ml-1">
                        {curso.datos_especificos.contacto.telefono}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Objetivos del curso */}
          {curso.objetivos && curso.objetivos.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                <Award className="inline-block w-8 h-8 mr-3 text-green-600" />
                Objetivos del Curso
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="grid gap-4">
                  {curso.objetivos.map((objetivo, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{objetivo}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Beneficios */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Beneficios del Curso
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curso.datos_especificos.beneficios.map((beneficio, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{beneficio}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Temario */}
          {curso.temario && curso.temario.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                <BookOpen className="inline-block w-8 h-8 mr-3 text-green-600" />
                Temario Completo
              </h2>
              <div className="space-y-4">
                {curso.temario.map((modulo, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{modulo.modulo}</h3>
                      {expandedModule === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedModule === index && (
                      <div className="px-6 pb-4">
                        <ul className="space-y-2">
                          {modulo.contenidos.map((contenido, contentIndex) => (
                            <li key={contentIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{contenido}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metodología */}
          {curso.metodologia && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                <Users className="inline-block w-8 h-8 mr-3 text-green-600" />
                Metodología
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {curso.metodologia}
                </p>
              </div>
            </section>
          )}

          {/* Requisitos */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Award className="inline-block w-8 h-8 mr-3 text-green-600" />
              Requisitos de Acceso
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="grid gap-3">
                {curso.datos_especificos.requisitos.map((requisito, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requisito}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para avanzar en tu carrera profesional?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                No pierdas esta oportunidad de formarte gratuitamente con certificación oficial
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
              >
                RESERVAR MI PLAZA AHORA
              </button>
              <div className="mt-4 text-sm opacity-75">
                <p>📞 {curso.datos_especificos.contacto.telefono} | 📧 {curso.datos_especificos.contacto.email}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <LogosMinisteriales />
      <CepFooter />
      
      <EmploymentFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employmentType={curso.tipo}
        courseId={curso.id}
        courseName={curso.nombre}
      />
    </div>
  );
};

export default CursoOcupadosPageComponent;