import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Stethoscope, Activity, Shield, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const CFGSHigieneBucodentalPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Ciclo Formativo de Grado Superior Higiene Bucodental',
    sede: 'Santa Cruz',
    tag: 'otono-2025-cfgs-higiene-bucodental-santacruz'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "Módulo 1: Recepción y logística en la clínica dental",
      contenido: [
        "Organización de los servicios de salud bucodental",
        "Gestión de la documentación sanitaria",
        "Sistemas de información y comunicación",
        "Atención al paciente en la clínica dental",
        "Gestión de citas y planificación de agenda",
        "Protocolos de recepción y despedida del paciente",
        "Gestión de stocks y materiales dentales",
        "Facturación y gestión administrativa"
      ]
    },
    {
      titulo: "Módulo 2: Estudio de la cavidad oral",
      contenido: [
        "Anatomía de la cabeza y cuello",
        "Anatomía dental y periodontal",
        "Fisiología del sistema estomatognático",
        "Embriología y desarrollo dental",
        "Histología de los tejidos orales",
        "Patología oral más frecuente",
        "Microbiología oral",
        "Farmacología aplicada a la odontología"
      ]
    },
    {
      titulo: "Módulo 3: Exploración de la cavidad oral",
      contenido: [
        "Técnicas de exploración intraoral y extraoral",
        "Instrumentos de exploración dental",
        "Índices de salud oral",
        "Técnicas de sondaje periodontal",
        "Registro de datos clínicos",
        "Interpretación de radiografías dentales",
        "Fotografía clínica dental",
        "Elaboración de odontogramas"
      ]
    },
    {
      titulo: "Módulo 4: Intervención bucodental",
      contenido: [
        "Técnicas de eliminación de placa bacteriana",
        "Instrumentación periodontal manual",
        "Instrumentación periodontal ultrasónica",
        "Técnicas de pulido dental",
        "Aplicación de flúor tópico",
        "Colocación de selladores de fosas y fisuras",
        "Técnicas de blanqueamiento dental",
        "Mantenimiento periodontal"
      ]
    },
    {
      titulo: "Módulo 5: Epidemiología en salud oral",
      contenido: [
        "Conceptos básicos de epidemiología",
        "Estudios epidemiológicos en salud oral",
        "Indicadores de salud bucodental",
        "Factores de riesgo en patología oral",
        "Programas de salud bucodental",
        "Evaluación de programas preventivos",
        "Estadística aplicada a la salud oral",
        "Investigación en higiene bucodental"
      ]
    },
    {
      titulo: "Módulo 6: Educación para la salud oral",
      contenido: [
        "Fundamentos de la educación sanitaria",
        "Técnicas de comunicación en salud",
        "Diseño de programas educativos",
        "Técnicas de higiene oral personalizada",
        "Educación nutricional para la salud oral",
        "Programas de salud escolar",
        "Educación para grupos especiales",
        "Evaluación de programas educativos"
      ]
    },
    {
      titulo: "Módulo 7: Conservadora, periodoncia, cirugía e implantes",
      contenido: [
        "Patología dental: caries y sus complicaciones",
        "Materiales de restauración dental",
        "Técnicas de aislamiento del campo operatorio",
        "Enfermedad periodontal: gingivitis y periodontitis",
        "Técnicas quirúrgicas básicas en odontología",
        "Implantología oral: conceptos básicos",
        "Mantenimiento de pacientes con implantes",
        "Complicaciones en implantología"
      ]
    },
    {
      titulo: "Módulo 8: Prótesis y ortodoncia",
      contenido: [
        "Tipos de prótesis dentales",
        "Toma de impresiones para prótesis",
        "Mantenimiento de prótesis removibles",
        "Conceptos básicos de ortodoncia",
        "Aparatología ortodóncica",
        "Higiene oral en pacientes ortodóncicos",
        "Mantenimiento de aparatos ortodóncicos",
        "Retención en ortodoncia"
      ]
    },
    {
      titulo: "Módulo 9: Primeros auxilios",
      contenido: [
        "Valoración inicial del paciente",
        "Soporte vital básico",
        "Manejo de la vía aérea",
        "Emergencias médicas en la clínica dental",
        "Shock anafiláctico",
        "Lipotimia y síncope",
        "Crisis hipertensiva",
        "Manejo del paciente diabético"
      ]
    },
    {
      titulo: "Módulo 10: Formación y orientación laboral",
      contenido: [
        "El derecho del trabajo",
        "El contrato de trabajo",
        "Seguridad Social",
        "Representación de los trabajadores",
        "Negociación colectiva",
        "Orientación profesional",
        "Búsqueda de empleo",
        "Trabajo en equipo"
      ]
    },
    {
      titulo: "Módulo 11: Empresa e iniciativa emprendedora",
      contenido: [
        "La empresa y su entorno",
        "Formas jurídicas de las empresas",
        "Plan de empresa",
        "Gestión administrativa y comercial",
        "Gestión financiera",
        "Obligaciones fiscales",
        "Calidad en la empresa",
        "Ética empresarial"
      ]
    },
    {
      titulo: "Módulo 12: Formación en centros de trabajo",
      contenido: [
        "Prácticas en clínicas dentales",
        "Aplicación práctica de conocimientos teóricos",
        "Integración en equipos de trabajo",
        "Desarrollo de competencias profesionales",
        "Seguimiento y evaluación de prácticas",
        "Memoria de prácticas",
        "Reflexión sobre la experiencia profesional",
        "Orientación para la inserción laboral"
      ]
    }
  ];

  const cursosComplementarios = [
    "Auxiliar de Odontología",
    "Auxiliar de Enfermería",
    "Auxiliar de Farmacia y Parafarmacia",
    "Técnico en Imagen para el Diagnóstico",
    "Especialización en Periodoncia",
    "Especialización en Ortodoncia"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/auxiliar-odontologia.jpg" 
            alt="Higiene Bucodental" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <GraduationCap className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ciclo Formativo de Grado Superior en Higiene Bucodental
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "La sonrisa es la curva más hermosa del cuerpo humano"
              </p>
              <p className="text-yellow-400 font-semibold">- Phyllis Diller</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                3 cursos escolares
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Semipresencial
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                Título Oficial MEC
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
                El <strong>Ciclo Formativo de Grado Superior en Higiene Bucodental</strong> te prepara para trabajar como 
                <strong> Higienista Bucodental</strong>, realizando técnicas de prevención bucodental, educando en 
                salud oral y colaborando en tratamientos odontológicos bajo supervisión facultativa.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás las <strong>competencias profesionales</strong> para desarrollar programas de educación 
                sanitaria, realizar técnicas preventivas y de mantenimiento de la salud bucodental.
              </p>
            </div>
          </section>

          {/* Información del Ciclo */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-gray-600">Años</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">600h</div>
                <div className="text-gray-600">Prácticas</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">Oficial</div>
                <div className="text-gray-600">Título</div>
              </div>
            </div>
          </section>

          {/* Información Comercial */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2"><strong>Total:</strong> 5.000€ (30 cuotas de 160€ + 200€ matrícula)</p>
                  <p className="text-gray-700 mb-4"><strong>Modalidad:</strong> Semipresencial - Miércoles 17:00-21:00h</p>
                  <p className="text-sm text-blue-600 font-medium">✓ Becas MEC disponibles</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Clínicas dentales privadas</li>
                    <li>• Centros de salud públicos</li>
                    <li>• Hospitales con servicio de odontología</li>
                    <li>• Centros de salud bucodental</li>
                    <li>• Programas de salud pública</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temario Expandible */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-purple-600" />
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

          {/* Tu Profesora Especialista */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Tu Profesora Especialista
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                  <div className="relative">
                    <img 
                      src="/images/profesores/nuria.jpg" 
                      alt="Nuria E. Ángel - Especialista en Higiene Bucodental" 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Award className="w-6 h-6 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuria E. Ángel</h3>
                  <p className="text-lg text-purple-600 font-semibold mb-4">Especialista en Higiene Bucodental y Periodoncia</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Higienista bucodental titulada con amplia experiencia en clínicas especializadas. 
                    Experta en educación sanitaria y técnicas preventivas avanzadas. Formadora oficial 
                    de ciclos formativos sanitarios.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Experiencia Clínica
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Formadora Oficial
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Especialista Periodoncia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cursos Complementarios */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-green-600" />
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-6">¿Necesitas más información?</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-2" />
                  <span>922 21 92 57</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-6 h-6 mr-2" />
                  <span>info@cursostenerife.es</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  <span>Santa Cruz de Tenerife</span>
                </div>
              </div>
              <div className="bg-yellow-400 rounded-lg p-1 inline-block">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  ¡RESERVAR MI PLAZA AHORA!
                </button>
              </div>
            </div>
          </section>

          {/* Ventajas profesionales */}
          <div className="bg-white rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Ventajas Profesionales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Alta Demanda Laboral</h3>
                  <p className="text-gray-600">Sector en crecimiento con excelentes oportunidades de empleo</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Estabilidad Económica</h3>
                  <p className="text-gray-600">Salarios competitivos y posibilidades de crecimiento profesional</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trabajo Gratificante</h3>
                  <p className="text-gray-600">Contribuyes directamente al bienestar y salud de las personas</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flexibilidad Horaria</h3>
                  <p className="text-gray-600">Opciones de trabajo en clínicas privadas y centros públicos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CepFooter />

      {/* Modal de Inscripción */}
      {isModalOpen && (
        <CursoInscripcionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          curso={curso}
        />
      )}
    </div>
  );
};

export default CFGSHigieneBucodentalPage; 