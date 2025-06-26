import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Activity, Shield, Sparkles, Zap, GraduationCap } from 'lucide-react';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AuxiliarEsteticasPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({});

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  const courseData = {
    title: "Auxiliar de Clínicas Estéticas",
    subtitle: "Formación Profesional Especializada",
    description: "Conviértete en un profesional especializado en tratamientos estéticos y cuidado de la belleza",
    duration: "30 sesiones / 8 meses",
    practices: "200h prácticas en centros",
    price: "950€ total",
    installments: "8 cuotas de 100€ + 150€ matrícula"
  };

  const modules = [
    {
      title: "Unidad 1: Introducción a la Estética",
      topics: [
        "Historia y evolución de la estética",
        "Conceptos básicos de belleza y estética",
        "Ética profesional en estética",
        "Legislación y normativas del sector",
        "Higiene y seguridad en el centro estético",
        "Organización del gabinete estético"
      ]
    },
    {
      title: "Unidad 2: Anatomía y Fisiología de la Piel",
      topics: [
        "Estructura de la piel: epidermis, dermis e hipodermis",
        "Funciones de la piel",
        "Tipos de piel y sus características",
        "Proceso de envejecimiento cutáneo",
        "Alteraciones más comunes de la piel",
        "pH cutáneo y manto hidrolipídico"
      ]
    },
    {
      title: "Unidad 3: Cosmetología",
      topics: [
        "Principios activos en cosmética",
        "Formas cosméticas: emulsiones, geles, sérums",
        "Cosméticos para diferentes tipos de piel",
        "Cosmética masculina",
        "Cosmética solar y fotoenvejecimiento",
        "Cosmecéuticos y nutricosméticos"
      ]
    },
    {
      title: "Unidad 4: Técnicas de Diagnóstico Estético",
      topics: [
        "Análisis facial con lupa y luz de Wood",
        "Técnicas de exploración cutánea",
        "Ficha técnica del cliente",
        "Fotografía estética",
        "Medición de parámetros cutáneos",
        "Protocolos de diagnóstico"
      ]
    },
    {
      title: "Unidad 5: Tratamientos Faciales",
      topics: [
        "Limpieza facial profunda",
        "Exfoliación mecánica y química",
        "Extracción de comedones",
        "Masajes faciales terapéuticos",
        "Mascarillas faciales específicas",
        "Tratamientos anti-edad"
      ]
    },
    {
      title: "Unidad 6: Tratamientos Corporales",
      topics: [
        "Tratamientos reductores y reafirmantes",
        "Técnicas anti-celulíticas",
        "Drenaje linfático manual",
        "Exfoliación corporal",
        "Envolturas corporales",
        "Tratamientos de hidratación"
      ]
    },
    {
      title: "Unidad 7: Aparatología Estética",
      topics: [
        "Equipos de alta frecuencia",
        "Ultrasonidos en estética",
        "Radiofrecuencia estética",
        "Cavitación ultrasónica",
        "Presoterapia",
        "Mantenimiento de equipos"
      ]
    },
    {
      title: "Unidad 8: Depilación",
      topics: [
        "Métodos de depilación temporal",
        "Depilación con cera: técnicas y tipos",
        "Depilación eléctrica",
        "Fotodepilación IPL",
        "Cuidados pre y post depilación",
        "Complicaciones y contraindicaciones"
      ]
    }
  ];

  const cursosComplementarios = [
    "Masaje Estético y Relajante",
    "Microblading y Micropigmentación",
    "Manicura y Pedicura Profesional",
    "Maquillaje Profesional",
    "Drenaje Linfático Manual",
    "Quiromasaje"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gradient-to-br from-pink-900 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/auxiliar-enfermeria.jpg" 
            alt="Auxiliar de Clínicas Estéticas" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 to-purple-800/80"></div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Sparkles className="h-12 w-12 text-pink-300" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {courseData.title}
              </h1>
              
              <p className="text-lg sm:text-xl mb-6 text-pink-100">
                {courseData.subtitle}
              </p>
              
              <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-gray-200">
                {courseData.description}
              </p>

              {/* Información del curso */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="h-6 w-6 text-pink-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-pink-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.practices}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <GraduationCap className="h-6 w-6 text-pink-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.price}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <BookOpen className="h-6 w-6 text-pink-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.installments}</p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ¡RESERVAR MI PLAZA AHORA!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* ¿Qué Aprendo? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-pink-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Como <strong>Auxiliar de Clínicas Estéticas</strong> adquirirás los conocimientos teóricos y 
                prácticos necesarios para asistir en tratamientos estéticos faciales y corporales, 
                manejando equipos especializados y aplicando técnicas avanzadas de belleza y bienestar.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Objetivo:</strong> Formar profesionales capacitados para trabajar como 
                <strong> Auxiliar en centros de estética, spas, clínicas de medicina estética y centros de belleza</strong>, 
                con competencias en aparatología, tratamientos faciales, corporales y técnicas de depilación.
              </p>
            </div>
          </section>

          {/* ¿A Quién Va Dirigido? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Users className="inline-block w-8 h-8 mr-3 text-purple-600" />
              ¿A Quién Va Dirigido?
            </h2>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Si te apasiona el <strong>mundo de la belleza y el bienestar</strong>, tienes interés por 
                las nuevas tecnologías estéticas, te gusta el trato personalizado con clientes y 
                quieres formar parte del sector de la estética profesional, 
                <strong> ¡este es tu curso!</strong>
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm font-semibold text-pink-600">
                  <Award className="inline-block w-4 h-4 mr-2" />
                  Requisitos: Podrás acceder con 2º de la ESO o EGB
                </p>
              </div>
            </div>
          </section>

          {/* Salidas Profesionales */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Activity className="inline-block w-8 h-8 mr-3 text-indigo-600" />
              Salidas Profesionales
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Sparkles className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Centros de Estética</h3>
                <p className="text-gray-600">Auxiliar en tratamientos faciales y corporales</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Spas y Wellness</h3>
                <p className="text-gray-600">Especialista en relajación y bienestar</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Clínicas Medicina Estética</h3>
                <p className="text-gray-600">Asistente en tratamientos avanzados</p>
              </div>
            </div>
          </section>

          {/* Contenido del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-indigo-600" />
              Contenido Detallado del Curso - 8 Unidades Especializadas
            </h2>
            <div className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {module.title}
                      </h3>
                      {expandedModules[moduleIndex] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {expandedModules[moduleIndex] && (
                    <div className="px-6 pb-6">
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-pink-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Detalles del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Clock className="inline-block w-8 h-8 mr-3 text-orange-600" />
              Detalles del Curso
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Organización</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-pink-600 mr-3" />
                    <div>
                      <p className="font-semibold">Duración</p>
                      <p className="text-gray-600">8 meses (30 sesiones)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">Modalidad</p>
                      <p className="text-gray-600">Clases presenciales 1 día/semana</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-semibold">Tipo</p>
                      <p className="text-gray-600">Clases teórico/prácticas con aparatología</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="font-semibold">Prácticas</p>
                      <p className="text-gray-600">200 horas en centros especializados</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información Económica</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-pink-600">950€ Total</p>
                    <p className="text-gray-600">Precio completo del curso</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">8 cuotas mensuales:</span>
                      <span className="text-pink-600 font-bold">100€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Matrícula:</span>
                      <span className="text-purple-600 font-bold">150€</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 mt-4">
                    <p className="text-sm text-yellow-800">
                      <Award className="inline-block w-4 h-4 mr-1" />
                      Incluye uso de aparatología y agencia de colocación
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Profesorado */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Profesorado Estético Especializado
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Esteticistas Colegiadas</h3>
                <p className="text-lg text-pink-600 font-semibold mb-4">Profesionales con experiencia en centros de prestigio</p>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Nuestro equipo docente está formado por <strong>esteticistas colegiadas</strong> y 
                  <strong> profesionales especializados</strong> que trabajan en centros de estética y 
                  clínicas de medicina estética, garantizando formación actualizada con las últimas 
                  técnicas y tendencias del sector.
                </p>
              </div>
            </div>
          </section>

          {/* Amplía tus conocimientos */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-indigo-600" />
              Amplía tus conocimientos con
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cursosComplementarios.map((curso, index) => (
                  <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-pink-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{curso}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                ¡Conviértete en Auxiliar de Estética!
              </h2>
              <p className="text-lg text-pink-100 mb-6">
                Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula y resolver todas tus dudas
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-pink-600 px-8 sm:px-12 py-4 text-lg font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                ¡RESERVAR MI PLAZA AHORA!
              </button>
              <p className="text-sm text-pink-100 mt-4">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Te contactaremos en menos de 30 minutos
              </p>
            </div>
          </section>

          {/* Información de Contacto */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">¿Necesitas más información?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-pink-600 mb-2" />
                <p className="font-semibold">Teléfono</p>
                <p className="text-gray-600">922 21 92 57</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">info@cursostenerife.es</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-red-600 mb-2" />
                <p className="font-semibold">Sede Norte</p>
                <p className="text-gray-600">C.C El Tompo - La Orotava</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <CepFooter />
      
      <CursoInscripcionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AuxiliarEsteticasPage;
