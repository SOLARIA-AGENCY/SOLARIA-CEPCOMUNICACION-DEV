import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const AuxiliarEnfermeriaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Auxiliar de Enfermería',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-enfermeria-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "MÓDULO 1: ANATOMÍA Y FISIOLOGÍA HUMANA",
      contenido: [
        "Organización del cuerpo humano",
        "Sistema esquelético y muscular",
        "Sistema cardiovascular",
        "Sistema respiratorio",
        "Sistema digestivo",
        "Sistema nervioso",
        "Sistema endocrino",
        "Sistema genitourinario"
      ]
    },
    {
      titulo: "MÓDULO 2: FUNDAMENTOS DE ENFERMERÍA",
      contenido: [
        "Historia y evolución de la enfermería",
        "Ética y deontología profesional",
        "Comunicación terapéutica",
        "Educación para la salud",
        "Proceso de atención de enfermería",
        "Documentación sanitaria",
        "Seguridad del paciente"
      ]
    },
    {
      titulo: "MÓDULO 3: TÉCNICAS BÁSICAS DE ENFERMERÍA",
      contenido: [
        "Higiene y aseo del paciente",
        "Movilización y traslado",
        "Constantes vitales",
        "Administración de medicación",
        "Cuidados de heridas",
        "Técnicas de vendajes",
        "Sondajes y drenajes"
      ]
    },
    {
      titulo: "MÓDULO 4: CUIDADOS AUXILIARES HOSPITALARIOS",
      contenido: [
        "Organización hospitalaria",
        "Unidades de hospitalización",
        "Cuidados pre y postoperatorios",
        "Urgencias y emergencias",
        "Cuidados intensivos",
        "Esterilización y desinfección",
        "Control de infecciones"
      ]
    },
    {
      titulo: "MÓDULO 5: CUIDADOS AUXILIARES EN GERIATRÍA",
      contenido: [
        "Proceso de envejecimiento",
        "Patologías geriátricas más frecuentes",
        "Cuidados específicos del anciano",
        "Prevención de caídas",
        "Estimulación cognitiva",
        "Cuidados paliativos",
        "Apoyo a la familia"
      ]
    },
    {
      titulo: "MÓDULO 6: PRIMEROS AUXILIOS",
      contenido: [
        "Evaluación inicial del paciente",
        "Reanimación cardiopulmonar",
        "Atención a traumatismos",
        "Quemaduras y heridas",
        "Intoxicaciones",
        "Crisis convulsivas",
        "Transporte sanitario"
      ]
    }
  ];

  const cursosComplementarios = [
    "Técnico en Emergencias Sanitarias",
    "Auxiliar de Farmacia",
    "Cuidados Geriátricos",
    "Atención Sociosanitaria",
    "Primeros Auxilios Avanzados",
    "Inglés Sanitario"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/auxiliar-enfermeria.jpg" 
            alt="Auxiliar de Enfermería" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Stethoscope className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Auxiliar de Enfermería
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "Cuidar es un arte que requiere tanta devoción como la creación de una obra maestra"
              </p>
              <p className="text-yellow-400 font-semibold">- Florence Nightingale</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                10 meses
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Presencial
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                300h Prácticas
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
                El curso de <strong>Auxiliar de Enfermería</strong> te prepara para trabajar como 
                <strong> asistente sanitario especializado</strong> en hospitales, clínicas y centros 
                de atención primaria, proporcionando cuidados básicos a los pacientes.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás las <strong>competencias profesionales</strong> para realizar técnicas básicas 
                de enfermería, cuidados auxiliares y apoyo al personal sanitario cualificado.
              </p>
            </div>
          </section>

          {/* Información del Ciclo */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-700">10 meses - 40 sesiones presenciales</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prácticas</h3>
                <p className="text-gray-700">300 horas en centros sanitarios</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center">
                <Stethoscope className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialización</h3>
                <p className="text-gray-700">Cuidados auxiliares sanitarios</p>
              </div>
            </div>
          </section>

          {/* Información Comercial */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2"><strong>Total:</strong> 1.150€ (10 cuotas de 100€ + 150€ matrícula)</p>
                  <p className="text-gray-700 mb-4"><strong>Modalidad:</strong> Presencial - 1 día por semana</p>
                  <p className="text-sm text-blue-600 font-medium">✓ Incluye agencia de colocación oficial</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Hospitales públicos y privados</li>
                    <li>• Centros de atención primaria</li>
                    <li>• Clínicas especializadas</li>
                    <li>• Residencias geriátricas</li>
                    <li>• Centros de día</li>
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
                      src="/images/profesores/maria-carmen.jpg" 
                      alt="María Carmen López - Enfermera especialista" 
                      className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Award className="w-6 h-6 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">María Carmen López</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-4">Diplomada en Enfermería</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Enfermera diplomada con más de 20 años de experiencia en el ámbito hospitalario. 
                    Especialista en cuidados intensivos y formación de auxiliares de enfermería. 
                    Formadora oficial de técnicos en cuidados auxiliares de enfermería.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Enfermería Hospitalaria
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                      Cuidados Intensivos
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Formadora Oficial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cursos Complementarios */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-teal-600" />
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
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¡Inicia tu Carrera Sanitaria!
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

export default AuxiliarEnfermeriaPage; 