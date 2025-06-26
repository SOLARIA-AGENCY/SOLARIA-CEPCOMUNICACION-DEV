import React, { useState } from 'react';
import { Shield, Heart, BookOpen, Users, Clock, GraduationCap, ChevronDown, ChevronUp, FileText, Scale, CheckCircle, Award, Star, Phone, Mail, MapPin } from 'lucide-react';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AgenteFunerarioPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Agente Funerario',
    sede: 'Norte',
    tag: 'otono-2025-agente-funerario-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "MÓDULO 1: LEGISLACIÓN FUNERARIA",
      contenido: [
        "Normativa estatal y autonómica del sector funerario",
        "Ley de Sanidad Mortuoria",
        "Reglamentos municipales de cementerios",
        "Protección de datos en servicios funerarios",
        "Derechos del consumidor en servicios funerarios",
        "Documentación legal obligatoria"
      ]
    },
    {
      titulo: "MÓDULO 2: TANATOPRAXIA Y CONSERVACIÓN",
      contenido: [
        "Fundamentos de la tanatopraxia",
        "Técnicas de conservación temporal",
        "Preparación del difunto",
        "Productos químicos y su aplicación",
        "Higiene y seguridad en tanatopraxia",
        "Equipos y materiales específicos"
      ]
    },
    {
      titulo: "MÓDULO 3: PSICOLOGÍA DEL DUELO",
      contenido: [
        "Proceso de duelo y sus fases",
        "Atención psicológica a familias",
        "Comunicación empática y asertiva",
        "Manejo de situaciones difíciles",
        "Apoyo emocional especializado",
        "Protocolos de acompañamiento"
      ]
    },
    {
      titulo: "MÓDULO 4: CEREMONIAL Y PROTOCOLO",
      contenido: [
        "Organización de ceremonias religiosas",
        "Ceremonias civiles y laicas",
        "Protocolo en velatorios",
        "Coordinación de actos funerarios",
        "Atención a diferentes culturas y religiones",
        "Gestión de espacios ceremoniales"
      ]
    },
    {
      titulo: "MÓDULO 5: GESTIÓN ADMINISTRATIVA",
      contenido: [
        "Tramitación de documentos oficiales",
        "Gestión de seguros de decesos",
        "Facturación y presupuestos",
        "Relaciones con administraciones públicas",
        "Gestión de cementerios y tanatorios",
        "Software específico del sector"
      ]
    },
    {
      titulo: "MÓDULO 6: SERVICIOS FUNERARIOS ESPECIALIZADOS",
      contenido: [
        "Repatriación nacional e internacional",
        "Cremación: procedimientos y normativa",
        "Inhumación tradicional",
        "Servicios de memoria y conmemoración",
        "Flores y ornamentación funeraria",
        "Transporte funerario especializado"
      ]
    }
  ];

  const cursosComplementarios = [
    "Psicología del Duelo",
    "Gestión Administrativa",
    "Protocolo y Ceremonial",
    "Auxiliar de Enfermería",
    "Atención Sociosanitaria",
    "Mediación Familiar"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/especializacion-sanitaria.jpg" 
            alt="Agente Funerario" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Agente Funerario
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "El trabajo de un agente funerario es honrar la vida que fue vivida y brindar consuelo a quienes quedan"
              </p>
              <p className="text-yellow-400 font-semibold">- Filosofía del Sector Funerario</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                6 meses
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Presencial
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                Prácticas
              </div>
            </div>
            
            {/* Botón de inscripción */}
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
          {/* ¿Qué Aprendo? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                El curso de <strong>Agente Funerario</strong> te prepara para trabajar en un sector 
                <strong> de alta demanda y estabilidad laboral</strong>, brindando apoyo profesional 
                a las familias en momentos difíciles.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás las <strong>competencias profesionales</strong> para gestionar servicios funerarios, 
                protocolo ceremonial, tanatopraxia y atención psicológica especializada.
              </p>
            </div>
          </section>

          {/* Información del Ciclo */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-700">6 meses - 30 sesiones presenciales</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 text-center">
                <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialización</h3>
                <p className="text-gray-700">Servicios funerarios profesionales</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center">
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enfoque</h3>
                <p className="text-gray-700">Atención humana y profesional</p>
              </div>
            </div>
          </section>

          {/* Información Comercial */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2"><strong>Total:</strong> 850€ (6 cuotas de 125€ + 100€ matrícula)</p>
                  <p className="text-gray-700 mb-4"><strong>Modalidad:</strong> Presencial - 1 día por semana</p>
                  <p className="text-sm text-blue-600 font-medium">✓ Incluye agencia de colocación oficial</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Funerarias y tanatorios</li>
                    <li>• Cementerios y crematorios</li>
                    <li>• Servicios de repatriación</li>
                    <li>• Empresas de seguros de decesos</li>
                    <li>• Gestión administrativa funeraria</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temario Expandible */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              Temario Completo
            </h2>
            <div className="space-y-4">
              {modulos.map((modulo, index) => (
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
                        {modulo.contenido.map((item, itemIndex) => (
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

          {/* Tu Profesor Especialista */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Tu Profesor Especialista
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                  <div className="relative">
                    <img 
                      src="/images/profesores/antonio.jpg" 
                      alt="Antonio Martín - Especialista en Servicios Funerarios" 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Award className="w-6 h-6 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Antonio Martín</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-4">Especialista en Servicios Funerarios</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Profesional con más de 15 años de experiencia en el sector funerario. 
                    Especialista en tanatopraxia, gestión funeraria y protocolo ceremonial. 
                    Formador oficial de agentes funerarios con amplia experiencia docente.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Tanatopraxia
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      Gestión Funeraria
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Formador Oficial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cursos Complementarios */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-gray-600" />
              Cursos Complementarios
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cursosComplementarios.map((curso, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
                  <p className="text-gray-700 font-medium">{curso}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Información de Contacto */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-gray-600 rounded-xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¡Inicia tu Carrera en el Sector Funerario!
              </h2>
              <p className="text-lg text-blue-100 mb-6">
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
              <p className="text-sm text-blue-100 mt-4">
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
                <Phone className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-semibold">Teléfono</p>
                <p className="text-gray-600">922 21 92 57</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-green-600 mb-2" />
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

      {/* Modal de Inscripción */}
      <CursoInscripcionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={curso}
      />
    </div>
  );
};

export default AgenteFunerarioPage; 