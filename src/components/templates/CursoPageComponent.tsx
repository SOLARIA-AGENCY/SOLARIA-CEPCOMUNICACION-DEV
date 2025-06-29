import React, { useState, useEffect } from 'react';
import CepHeader from '../organisms/CepHeader';
import CepFooter from '../organisms/CepFooter';
import CursoInscripcionModal from '../organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, User, Book, ChevronDown, ChevronUp } from 'lucide-react';

// Definimos el tipo para los datos de un curso individual, basándonos en la estructura que ya tenemos.
// Esto nos ayuda a tener un código más seguro y predecible.
interface Curso {
  slug: string;
  nombre: string;
  sede: string;
  tag: string;
  inicio: string;
  imagen: string;
  temario?: string[];
  duracion?: string;
  precio?: {
    cuotas: number;
    importe: number;
    matricula: number;
  };
  practicas?: string;
  profesor?: string;
  certificacion?: string;
  profesorDetalle?: {
    nombre: string;
    foto: string;
    especialidad: string;
    descripcion: string;
  };
  modalidadInfo?: {
    tipo: string;
    horario: string;
    sesiones: string;
    certificacion: string;
  };
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
    descripciones: string[];
  };
}

// El componente recibe el objeto 'curso' como propiedad.
const CursoPageComponent: React.FC<{ curso: Curso }> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temarioExpanded, setTemarioExpanded] = useState(false);
  
  // Cada vez que el componente se carga, nos aseguramos de que la vista suba al principio.
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const { nombre, sede, inicio, imagen, copy, temario, duracion, precio, practicas, profesor, certificacion, profesorDetalle, modalidadInfo } = curso;

  // Renderizado del componente con toda la información del curso.
  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        {/* Sección Hero */}
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
            
            {/* Barra de Información */}
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

            {/* Contenido Principal */}
            <div className="prose prose-lg max-w-none">
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

              {/* Temario Detallado */}
              {temario && temario.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <div 
                    className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setTemarioExpanded(!temarioExpanded)}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                      <Book className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
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

              {/* Información Adicional */}
              {practicas && (
                <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-2">Experiencia Práctica</h4>
                  <p className="text-blue-800 text-sm sm:text-base">{practicas}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección del Profesor */}
        {profesorDetalle && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-cep-primary mb-8">
                  Tu Profesor/a Especialista
                </h2>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <img 
                    src={profesorDetalle.foto} 
                    alt={profesorDetalle.nombre} 
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-cep-primary mb-2">{profesorDetalle.nombre}</h3>
                  <p className="text-lg text-gray-600 mb-4">{profesorDetalle.especialidad}</p>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    {profesorDetalle.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detalles del Curso (Modalidad y Precio) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-cep-primary mb-12 text-center">Detalles del Curso</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Modalidad */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Modalidad y horarios</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <User className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.tipo || 'Clases presenciales'}</span>
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.horario || 'Horario por definir'}</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.sesiones || duracion}</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.certificacion || certificacion || 'Diploma CEP'}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Precio */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Precio e inscripción</h3>
                  {precio ? (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cep-primary mb-2">
                        {precio.cuotas * precio.importe + precio.matricula}€
                      </div>
                      <p className="text-gray-600 mb-4">{precio.cuotas} cuotas de {precio.importe}€ + {precio.matricula}€ matrícula</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">Consulta el precio y las opciones de financiación.</p>
                  )}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full mt-4 bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300"
                  >
                    Solicitar Información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-cep-primary">¡No te quedes fuera!</h2>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-gray-800">
                ¡Reserva ahora tu plaza y asegura tu futuro profesional!
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cep-primary text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              ¡Inscríbete Ahora!
            </button>
          </div>
        </section>
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

export default CursoPageComponent;
