import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Star, ChevronDown, ChevronUp, Phone, Mail, MapPin, PawPrint, Heart, Activity, Download, FileText, Send } from 'lucide-react';
import { CursoMaestro, getFolletoCurso, newsletterConfig } from '../../config/cursos-maestro';
import CursoInscripcionModal from '../organisms/CursoInscripcionModal';
import CepHeader from '../organisms/CepHeader';
import CepFooter from '../organisms/CepFooter';

interface CursoPageComponentProps {
  curso: CursoMaestro;
}

const CursoPageComponent: React.FC<CursoPageComponentProps> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const detalles = curso.descripcionDetallada;
  
  if (!detalles) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Información del curso no disponible</p>
      </div>
    );
  }

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(prev => prev === moduleIndex ? null : moduleIndex);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para suscribir al newsletter
      console.log('Suscribiendo al newsletter:', newsletterEmail);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewsletterEmail('');
      alert('¡Gracias por suscribirte! Recibirás nuestro newsletter semanal con las últimas novedades.');
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const HeroIcon = () => {
    switch (curso.categoria) {
      case 'veterinaria':
        return <PawPrint className="w-16 h-16 text-pink-600" />;
      case 'sanidad':
        return <Heart className="w-16 h-16 text-pink-600" />;
      case 'bienestar':
        return <Activity className="w-16 h-16 text-pink-600" />;
      case 'adiestramiento':
        return <PawPrint className="w-16 h-16 text-pink-600" />;
      default:
        return <Award className="w-16 h-16 text-pink-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 text-white overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img 
              src={curso.imagen} 
              alt={curso.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <HeroIcon />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {curso.nombre}
              </h1>
              <p className="text-xl sm:text-2xl text-pink-100 mb-8 font-light">
                {curso.copy.slogan}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {curso.copy.textosPrincipales.map((texto, index) => (
                  <span key={index} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {texto}
                  </span>
                ))}
              </div>
              <div className="bg-yellow-400 rounded-lg p-1 inline-block">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡RESERVAR MI PLAZA AHORA!
                </button>
              </div>
              <p className="text-pink-100 mt-4 text-sm">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                Sede: {curso.sede} • Inicio: {curso.inicio}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 py-12">
          {/* Introducción */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                ¿Qué es {curso.nombre}?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                {detalles.introduccion}
              </p>
            </div>
          </section>

          {/* Puntos Clave */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Información Clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {detalles.puntosClave.map((punto, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="mb-4">
                    {punto.icono === 'Clock' && <Clock className="w-12 h-12 text-pink-600 mx-auto" />}
                    {punto.icono === 'Users' && <Users className="w-12 h-12 text-pink-600 mx-auto" />}
                    {punto.icono === 'Award' && <Award className="w-12 h-12 text-pink-600 mx-auto" />}
                    {punto.icono === 'Book' && <BookOpen className="w-12 h-12 text-pink-600 mx-auto" />}
                  </div>
                  <p className="text-gray-700 font-medium">{punto.texto}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Qué Aprenderás */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                <Star className="inline-block w-8 h-8 mr-3 text-pink-600" />
                ¿Qué Aprenderás?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                {detalles.queAprendes}
              </p>
            </div>
          </section>

          {/* Módulos del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-pink-600" />
              Programa del Curso
            </h2>
            <div className="space-y-4">
              {detalles.modulos.map((modulo, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(index)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Módulo {index + 1}: {modulo.titulo}
                      </h3>
                    </div>
                    {expandedModule === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedModule === index && (
                    <div className="px-6 pb-4">
                      <div className="border-t pt-4">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {modulo.contenido.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Salidas Profesionales */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Award className="inline-block w-8 h-8 mr-3 text-pink-600" />
              Salidas Profesionales
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detalles.salidasProfesionales.map((salida, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{salida}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Requisitos */}
          {detalles.requisitos && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                Requisitos de Acceso
              </h2>
              <div className="bg-blue-50 rounded-xl p-6 sm:p-8">
                <ul className="space-y-3">
                  {detalles.requisitos.map((requisito, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Inversión */}
          {detalles.inversion && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                Inversión
              </h2>
              <div className="bg-green-50 rounded-xl p-6 sm:p-8 text-center">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-green-600 mb-2">{detalles.inversion.total}</p>
                  <p className="text-gray-600">{detalles.inversion.modalidad}</p>
                </div>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <p className="text-gray-700 font-medium">{detalles.inversion.incluye}</p>
                </div>
              </div>
            </section>
          )}

          {/* Profesores */}
          {detalles.profesores && detalles.profesores.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                <Award className="inline-block w-8 h-8 mr-3 text-pink-600" />
                Tu Profesor Especialista
              </h2>
              {detalles.profesores.map((profesor, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                      <div className="relative">
                        <img 
                          src={profesor.foto} 
                          alt={`${profesor.nombre} - ${profesor.especialidad}`} 
                          className="w-48 h-48 rounded-full object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                          <Award className="w-6 h-6 text-yellow-800" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6 sm:p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{profesor.nombre}</h3>
                      <p className="text-lg text-pink-600 font-semibold mb-4">{profesor.especialidad}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {profesor.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profesor.tags && profesor.tags.map((tag) => (
                          <span key={tag} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Cursos Complementarios */}
          {detalles.cursosComplementarios && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                <BookOpen className="inline-block w-8 h-8 mr-3 text-pink-600" />
                Cursos Complementarios
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detalles.cursosComplementarios.map((curso, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
                    <p className="text-gray-700 font-medium">{curso}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sección de Descarga de Folleto Específico */}
          {(() => {
            const folleto = getFolletoCurso(curso.slugBase);
            if (!folleto) return null;
            
            return (
              <section className="mb-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    {/* Imagen del folleto */}
                    <div className="md:w-1/3 bg-gradient-to-br from-pink-100 to-purple-100 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                          <FileText className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                          <p className="text-sm font-medium text-gray-600">Folleto PDF</p>
                          <p className="text-xs text-gray-500 mt-1">Información Completa</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="md:w-2/3 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {folleto.titulo}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {folleto.descripcion}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">📋 Incluye:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Programa académico completo</li>
                          <li>• Horarios y modalidades disponibles</li>
                          <li>• Precios y formas de pago</li>
                          <li>• Salidas profesionales detalladas</li>
                          <li>• Información del profesorado</li>
                          <li>• Prácticas y certificaciones</li>
                        </ul>
                      </div>
                      
                      <button
                        onClick={() => window.open(folleto.archivo, '_blank')}
                        className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Download className="w-5 h-5 mr-3" />
                        Descargar Folleto Gratuito
                      </button>
                      
                      <p className="text-xs text-gray-500 mt-3">
                        ✓ Descarga inmediata • ✓ Sin registro requerido • ✓ Información actualizada 2025
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* Sección de Newsletter */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl shadow-lg p-8">
              <div className="md:flex items-center">
                {/* Contenido Newsletter */}
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Send className="w-7 h-7 mr-3 text-pink-600" />
                    {newsletterConfig.titulo}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {newsletterConfig.descripcion}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {newsletterConfig.beneficios.slice(0, 4).map((beneficio, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formulario Newsletter */}
                <div className="md:w-1/3">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-4 text-center">¡Suscríbete Ahora!</h3>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <input
                        type="email"
                        placeholder="Tu email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors flex items-center justify-center font-semibold"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        {newsletterConfig.frecuencia} • Sin spam • Cancela cuando quieras
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Principal */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¡Inicia tu Carrera Profesional!
              </h2>
              <p className="text-lg text-pink-100 mb-6">
                Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula y despejar todas las dudas
              </p>
              <div className="bg-yellow-400 rounded-lg p-1 inline-block">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡RESERVAR MI PLAZA AHORA!
                </button>
              </div>
              <p className="text-sm text-pink-100 mt-4">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Te contactaremos en menos de 30 minutos
              </p>
            </div>
          </section>

          {/* Información de Contacto */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ¿Tienes Dudas? ¡Contáctanos!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-pink-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                  <p className="text-gray-600">928 414 222</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-pink-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@cepformacion.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-pink-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                  <p className="text-gray-600">Las Palmas de Gran Canaria</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CepFooter />

      {isModalOpen && (
        <CursoInscripcionModal
          isOpen={isModalOpen}
          curso={{
            nombre: curso.nombre,
            sede: curso.sede,
            tag: curso.slugBase // Usar slugBase como tag
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CursoPageComponent;
