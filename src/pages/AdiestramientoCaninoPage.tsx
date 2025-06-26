import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, PawPrint } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const AdiestramientoCaninoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Adiestramiento Canino',
    sede: 'Norte',
    tag: 'otono-2025-adiestramiento-canino-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "Módulo 1: Técnicas de adiestramiento de base aplicadas a perros",
      contenido: [
        "Comportamiento social y bases morfológicas de conducta en el perro. Origen, etapas del desarrollo, el vínculo humano-perro, comunicación",
        "Morfología",
        "Factores básicos modificadores de la conducta del perro y principios para su modificación a través del aprendizaje",
        "Biología de la conducta, genética de la conducta, ecología de la conducta, los sentidos del perro y su influencia en la conducta",
        "Aprendizaje no asociativo: habituación y sensibilización",
        "Aprendizaje asociativo: condicionamiento clásico y condicionamiento instrumental",
        "Programas básicos de obediencia, control, y desarrollo de habilidades y superación de obstáculos en el perro",
        "Cuaderno o informes de seguimiento del proceso",
        "Seguridad y autoprotección en el adiestramiento básico y manejo de perros",
        "El material de trabajo y condiciones del entorno e infraestructuras",
        "Técnicas de manipulación y manejo del perro. Interacción del perro con extraños y otros animales",
        "El bienestar en el perro: Leyes y normativas sobre protección animal de aplicación",
        "Técnicas básicas para el control y adiestramiento en obediencia del perro: tipos y utilización del material, el lenguaje corporal y verbal para adiestramiento básico",
        "Programación del desarrollo de los ejercicios de obediencia básica, y sus correcciones",
        "Técnicas básicas para el control y adiestramiento del perro en el desarrollo de agilidad, mediante el sorteo de obstáculos",
        "Normas de seguridad para el manejo del perro en los ejercicios con obstáculos"
      ]
    },
    {
      titulo: "Módulo 2: Modificación de conductas no deseadas en perros",
      contenido: [
        "Valoración de conductas no deseadas susceptibles de corrección",
        "Interpretación del lenguaje corporal en el perro. Reconocimiento y evaluación. Factores de influencia",
        "Reconocimiento de conductas no deseadas generadas por una patología",
        "Comportamientos repetitivos",
        "Identificación de factores abióticos/bióticos que producen conductas no deseadas",
        "Identificación de la conducta no deseada. Métodos de eliminación",
        "Identificación del tipo de agresión y su tratamiento",
        "Medidas de autoprotección y bienestar animal",
        "Informes de progresión, cuaderno de seguimiento"
      ]
    },
    {
      titulo: "Módulo 3: Cuidados higiénicos aplicados a perros",
      contenido: [
        "Metodología y control de la alimentación y nutrición en el perro",
        "Preparación del tipo de alimentación según: el valor alimenticio, necesidades energéticas, estado de salud",
        "La presentación, el almacenamiento. tipos de utensilios",
        "Alojamiento y transporte, normativa, condiciones especiales",
        "Cuidados higiénicos, control sanitario y estimulación del perro"
      ]
    },
    {
      titulo: "Módulo 4: Primeros Auxilios aplicados a Perros",
      contenido: [
        "Morfología y fisiología del perro",
        "Diagnóstico, Valoración inicial, secundaria, fracturas",
        "Material de primeros auxilios. Tipos y manejo",
        "Administración de medicamentos",
        "Técnicas de inmovilización. Traslado. Normativa",
        "Masaje cardíaco"
      ]
    }
  ];

  const cursosComplementarios = [
    "Auxiliar de Veterinaria",
    "ATV Felino",
    "ATV Animales Exóticos",
    "Especialista en animales Marinos y Cetáceos",
    "Adiestramiento Canino II",
    "Peluquería Canina y Felina"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="/images/cursos/adiestramiento-canino.jpg" 
          alt="Curso de Adiestramiento Canino" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-6">
              <PawPrint className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Curso Profesional de Adiestramiento de Base y Educación Canina Nivel I
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "Podemos juzgar el corazón de una persona por la forma en que trata a los animales"
              </p>
              <p className="text-yellow-400 font-semibold">- Immanuel Kant</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base mb-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                25 sesiones / 6 meses
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Grupos reducidos
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                Preparación ANACP
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 text-gray-900 px-8 py-4 text-lg font-bold rounded-full hover:bg-yellow-300 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              ¡INSCRÍBETE AHORA!
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* ¿Qué Aprendo? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                El curso de Adiestramiento de base I ofrece los conocimientos imprescindibles acerca de las 
                <strong> técnicas de adiestramiento de base aplicadas a perros</strong>, modificación de conductas no deseadas 
                así como los cuidados básicos y primeros auxilios, además de un módulo de orientación laboral, 
                dinámico y actualizado.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás la <strong>confianza, habilidades y conocimientos</strong> para trabajar como adiestrador canino 
                o aplicarlo con nuestras queridos animales.
              </p>
            </div>
          </section>

          {/* Información del Ciclo */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Award className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              Información del Ciclo
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-600">25 sesiones</p>
                <p className="text-gray-600">6 meses</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prácticas</h3>
                <p className="text-gray-600">Clases prácticas</p>
                <p className="text-gray-600">con animales reales</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialización</h3>
                <p className="text-gray-600">Preparación</p>
                <p className="text-gray-600">examen ANACP</p>
              </div>
            </div>
          </section>

          {/* Información Comercial */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              Información Comercial
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Precios y Modalidades</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-yellow-600">510€ Total</p>
                    <p className="text-gray-600">Precio completo del curso</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">6 cuotas mensuales:</span>
                      <span className="text-green-600 font-bold">85€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Matrícula:</span>
                      <span className="text-blue-600 font-bold">150€</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Salidas Profesionales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Adiestrador canino profesional</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Educador canino en centros especializados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Técnico en modificación de conducta</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Preparador para competiciones caninas</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Temario Expandible */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              Temario Completo
            </h2>
            <div className="space-y-4">
              {modulos.map((modulo, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {modulo.titulo}
                      </h3>
                      {expandedModule === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {expandedModule === index && (
                    <div className="px-6 pb-6">
                      <ul className="space-y-2">
                        {modulo.contenido.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tu Profesora Especialista */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              Tu Profesora Especialista
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                  <div className="relative">
                    <img 
                      src="/images/profesores/livia.jpg" 
                      alt="Livia Bernardi - Especialista en Adiestramiento Canino" 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Award className="w-6 h-6 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Livia Bernardi</h3>
                  <p className="text-lg text-yellow-600 font-semibold mb-4">Fundadora de Aboras Obediencia</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Profesional en activo con amplia experiencia docente en el sector del adiestramiento canino. 
                    Especialista en técnicas de modificación de conducta y preparación para el examen oficial ANACP.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Experiencia Docente
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Profesional en Activo
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Certificación ANACP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cursos Complementarios */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-400" />
              Cursos Complementarios
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cursosComplementarios.map((curso, index) => (
                  <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{curso}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center mb-12">
            <div className="bg-yellow-400 rounded-xl shadow-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                ¡Reserva tu Plaza Ahora!
              </h2>
              <p className="text-lg text-gray-800 mb-6">
                Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula y despejar todas las dudas
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-900 text-white px-8 sm:px-12 py-4 text-lg font-bold rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                ¡RESERVAR MI PLAZA AHORA!
              </button>
              <p className="text-sm text-gray-700 mt-4">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Te contactaremos en menos de 30 minutos
              </p>
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <Phone className="w-8 h-8 text-gray-700 mb-2" />
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-gray-600">922 21 92 57</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Mail className="w-8 h-8 text-gray-700 mb-2" />
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@cursostenerife.es</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <MapPin className="w-8 h-8 text-gray-700 mb-2" />
                    <p className="font-semibold">Sede Norte</p>
                    <p className="text-gray-600">C.C El Tompo - La Orotava</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <CepFooter />

      {/* Modal de Inscripción */}
      <CursoInscripcionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={curso}
      />
    </div>
  );
};

export default AdiestramientoCaninoPage; 