import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Pill, Microscope, Activity, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const CFGMFarmaciaParafarmaciaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Ciclo Formativo de Grado Medio Farmacia y Parafarmacia',
    sede: 'Santa Cruz',
    tag: 'otono-2025-cfgm-farmacia-parafarmacia-santacruz'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "Módulo 1: Oficina de farmacia",
      contenido: [
        "Organización del sistema sanitario",
        "La oficina de farmacia en el sistema sanitario",
        "Dispensación de medicamentos",
        "Atención farmacéutica",
        "Gestión de stocks",
        "Sistemas de información",
        "Legislación farmacéutica",
        "Control de calidad en la oficina de farmacia"
      ]
    },
    {
      titulo: "Módulo 2: Dispensación de productos farmacéuticos",
      contenido: [
        "Formas farmacéuticas",
        "Vías de administración",
        "Farmacocinética y farmacodinamia",
        "Dispensación de medicamentos con receta",
        "Dispensación de medicamentos sin receta",
        "Medicamentos de uso veterinario",
        "Productos sanitarios",
        "Interacciones medicamentosas"
      ]
    },
    {
      titulo: "Módulo 3: Dispensación de productos parafarmacéuticos",
      contenido: [
        "Productos de higiene y cosmética",
        "Productos dietéticos y complementos alimenticios",
        "Productos de ortopedia y prótesis",
        "Productos sanitarios",
        "Fitoterapia",
        "Homeopatía",
        "Dermofarmacia",
        "Consejo farmacéutico en parafarmacia"
      ]
    },
    {
      titulo: "Módulo 4: Operaciones básicas de laboratorio",
      contenido: [
        "Material de laboratorio",
        "Técnicas básicas de laboratorio",
        "Preparación de disoluciones",
        "Métodos de separación",
        "Análisis cualitativo básico",
        "Análisis cuantitativo básico",
        "Control de calidad de materias primas",
        "Seguridad en el laboratorio"
      ]
    },
    {
      titulo: "Módulo 5: Formulación magistral",
      contenido: [
        "Formas farmacéuticas líquidas",
        "Formas farmacéuticas sólidas",
        "Formas farmacéuticas semisólidas",
        "Cálculos en formulación magistral",
        "Control de calidad en formulación",
        "Acondicionamiento y etiquetado",
        "Documentación en formulación magistral",
        "Buenas prácticas de elaboración"
      ]
    },
    {
      titulo: "Módulo 6: Promoción de la salud",
      contenido: [
        "Educación para la salud",
        "Programas de promoción de la salud",
        "Prevención de enfermedades",
        "Hábitos saludables",
        "Farmacia y salud pública",
        "Campañas sanitarias",
        "Comunicación en salud",
        "Evaluación de programas de salud"
      ]
    },
    {
      titulo: "Módulo 7: Primeros auxilios",
      contenido: [
        "Valoración inicial del paciente",
        "Soporte vital básico",
        "Actuación ante emergencias",
        "Traumatismos",
        "Quemaduras",
        "Intoxicaciones",
        "Botiquín de urgencias",
        "Transporte de heridos"
      ]
    },
    {
      titulo: "Módulo 8: Anatomofisiología y patología básicas",
      contenido: [
        "Organización del cuerpo humano",
        "Sistema cardiovascular",
        "Sistema respiratorio",
        "Sistema digestivo",
        "Sistema nervioso",
        "Sistema endocrino",
        "Sistema inmunitario",
        "Patologías más frecuentes"
      ]
    },
    {
      titulo: "Módulo 9: Formación y orientación laboral",
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
      titulo: "Módulo 10: Empresa e iniciativa emprendedora",
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
      titulo: "Módulo 11: Formación en centros de trabajo",
      contenido: [
        "Prácticas en farmacias y parafarmacias",
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
    "Auxiliar de Farmacia",
    "Auxiliar de Enfermería",
    "Dietética y Nutrición",
    "Técnico en Imagen para el Diagnóstico",
    "Especialización en Dermofarmacia",
    "Especialización en Fitoterapia"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/farmacia-parafarmacia.jpg" 
            alt="Farmacia y Parafarmacia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Pill className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ciclo Formativo de Grado Medio en Farmacia y Parafarmacia
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "La farmacia es el farmacéutico y su conocimiento, todo lo demás es comercio"
              </p>
              <p className="text-yellow-400 font-semibold">- Fabio A. González</p>
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
              <BookOpen className="inline-block w-8 h-8 mr-3 text-green-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                El <strong>Ciclo Formativo de Grado Medio en Farmacia y Parafarmacia</strong> te prepara para trabajar como 
                <strong> Técnico en Farmacia y Parafarmacia</strong>, asistiendo en la dispensación de productos farmacéuticos, 
                parafarmacéuticos y en la elaboración de fórmulas magistrales.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás las <strong>competencias profesionales</strong> para trabajar en oficinas de farmacia, 
                parafarmacias, almacenes farmacéuticos y laboratorios de formulación magistral.
              </p>
            </div>
          </section>

          {/* Información del Ciclo */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center">
                <GraduationCap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Título Oficial</h3>
                <p className="text-gray-700">Expedido por el Ministerio de Educación y Formación Profesional</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-700">3 cursos escolares - Modalidad semipresencial</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prácticas</h3>
                <p className="text-gray-700">Aula práctica con material real + 350h en farmacias</p>
              </div>
            </div>
          </section>

          {/* Información Comercial */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2"><strong>Total:</strong> 5.000€ (30 cuotas de 160€ + 200€ matrícula)</p>
                  <p className="text-gray-700 mb-4"><strong>Modalidad:</strong> Semipresencial - Jueves 17:00-21:00h</p>
                  <p className="text-sm text-blue-600 font-medium">✓ Becas MEC disponibles</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Oficinas de farmacia</li>
                    <li>• Parafarmacias</li>
                    <li>• Almacenes farmacéuticos</li>
                    <li>• Laboratorios de formulación magistral</li>
                    <li>• Droguerías especializadas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temario Expandible */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-green-600" />
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
                      src="/images/profesores/alexis.jpg" 
                      alt="Alexis Galán - Farmacéutico especialista" 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Award className="w-6 h-6 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Alexis Galán</h3>
                  <p className="text-lg text-green-600 font-semibold mb-4">Farmacéutico especialista en Farmacia Comunitaria</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Farmacéutico titulado con amplia experiencia en farmacia comunitaria y hospitalaria. 
                    Especialista en formulación magistral y atención farmacéutica. Formador oficial 
                    de ciclos formativos sanitarios.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Farmacia Comunitaria
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Formulación Magistral
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
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
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
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
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 sm:p-8 text-white text-center">
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

export default CFGMFarmaciaParafarmaciaPage; 