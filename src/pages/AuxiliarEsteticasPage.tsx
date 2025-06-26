import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Activity, Shield, Sparkles, Zap } from 'lucide-react';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const AuxiliarEsteticasPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Auxiliar de Clínicas Estéticas',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-clinicas-esteticas-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "UNIDAD DIDÁCTICA 1: INTRODUCCIÓN A LA ESTÉTICA",
      contenido: [
        "Historia de la estética",
        "Evolución de los tratamientos estéticos",
        "Legislación en estética",
        "Ética profesional en el sector estético",
        "Tipos de centros estéticos",
        "Organización del gabinete estético",
        "El profesional de la estética",
        "Higiene y desinfección en estética"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 2: ANATOMÍA Y FISIOLOGÍA DE LA PIEL",
      contenido: [
        "Estructura de la piel",
        "Funciones de la piel",
        "Tipos de piel",
        "Alteraciones cutáneas más comunes",
        "El envejecimiento cutáneo",
        "Factores que influyen en el estado de la piel",
        "Anexos cutáneos: pelo y uñas",
        "Cicatrización y regeneración cutánea"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 3: COSMETOLOGÍA",
      contenido: [
        "Principios activos en cosmética",
        "Formas cosméticas",
        "Clasificación de productos cosméticos",
        "Cosmética facial",
        "Cosmética corporal",
        "Productos para tratamientos específicos",
        "Conservación y almacenamiento de cosméticos",
        "Reacciones adversas a cosméticos"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 4: TÉCNICAS DE DIAGNÓSTICO ESTÉTICO",
      contenido: [
        "Anamnesis estética",
        "Exploración visual de la piel",
        "Técnicas de análisis cutáneo",
        "Uso de equipos de diagnóstico",
        "Fotografía en estética",
        "Fichas técnicas y protocolos",
        "Valoración de resultados",
        "Seguimiento de tratamientos"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 5: TRATAMIENTOS FACIALES",
      contenido: [
        "Limpieza facial profunda",
        "Exfoliación y peeling",
        "Mascarillas faciales",
        "Masajes faciales",
        "Tratamientos anti-edad",
        "Tratamientos para acné",
        "Hidratación y nutrición facial",
        "Protocolos de tratamiento facial"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 6: TRATAMIENTOS CORPORALES",
      contenido: [
        "Exfoliación corporal",
        "Envoltorios corporales",
        "Masajes estéticos corporales",
        "Tratamientos reductores",
        "Tratamientos anticelulíticos",
        "Tratamientos reafirmantes",
        "Drenaje linfático manual",
        "Protocolos de tratamiento corporal"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 7: APARATOLOGÍA ESTÉTICA",
      contenido: [
        "Radiofrecuencia",
        "Cavitación",
        "Presoterapia",
        "Electroestimulación",
        "Láser estético",
        "Luz pulsada intensa (IPL)",
        "Ultrasonidos",
        "Mantenimiento de equipos"
      ]
    },
    {
      titulo: "UNIDAD DIDÁCTICA 8: DEPILACIÓN",
      contenido: [
        "Anatomía del sistema piloso",
        "Métodos de depilación",
        "Depilación con cera",
        "Depilación láser",
        "Fotodepilación",
        "Cuidados pre y post depilación",
        "Complicaciones en depilación",
        "Protocolos de depilación"
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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-900 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-pink-300" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Curso de Auxiliar de Clínicas Estéticas
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "La belleza comienza en el momento en que decides ser tú mismo"
              </p>
              <p className="text-pink-300 font-semibold">- Coco Chanel</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                30 sesiones / 8 meses
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Grupos reducidos
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                200h prácticas
              </div>
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
                            <CheckCircle className="w-4 h-4 text-pink-500 mr-3 mt-1 flex-shrink-0" />
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

      {/* Modal de Inscripción */}
      <CursoInscripcionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={curso}
      />
    </div>
  );
};

export default AuxiliarEsteticasPage;
