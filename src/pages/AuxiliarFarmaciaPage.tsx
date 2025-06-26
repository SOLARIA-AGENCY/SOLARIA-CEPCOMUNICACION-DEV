import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Pill, Activity, Shield, Microscope } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const AuxiliarFarmaciaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Auxiliar de Farmacia y Parafarmacia',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "BLOQUE 1: ANATOMOPATOLOGÍA",
      contenido: [
        "LA PIEL: HIGIENE Y ASEO DEL PACIENTE",
        "SISTEMA ESQUELÉTICO-MUSCULAR",
        "SISTEMA CARDIOCIRCULATORIO E INMUNOLÓGICO",
        "CONSTANTES VITALES",
        "APARATO RESPIRATORIO",
        "APARATO DIGESTIVO",
        "ALIMENTACIÓN Y NUTRICIÓN",
        "APARATO URINARIO",
        "APARATO GENITAL. REPRODUCCIÓN HUMANA",
        "PRIMEROS AUXILIOS"
      ]
    },
    {
      titulo: "BLOQUE 2: FARMACOLOGÍA",
      contenido: [
        "Herramientas de la farmacia registro de datos de post dispensación; programas de gestión",
        "Conceptos básicos sobre medicamentos: definiciones; medicamentos legalmente reconocidos; prescripción y dispensación de medicamentos",
        "El embalaje exterior; el acondicionamiento primario; símbolos, siglas y leyendas; el prospecto; el cupón-precinto",
        "Funciones del Técnico en la atención farmacéutica",
        "Dispensación de medicamentos sujetos a prescripción médica",
        "Biofarmacia y farmacocinética: introducción; Los procesos ADME; concepto general de acción y efecto farmacológico; interacciones",
        "Dosificación. Farmacovigilancia: índice terapéutico; sistema español clasificación ATC de medicamentos",
        "Farmacología por sistemas. Cuadro resumen de atención farmacéutica en algunas patologías menores",
        "Terapia anti infecciosa. Inmunidad y vacunas: introducción; antibióticos; antivirales; inmunidad y vacunas",
        "Homeopatía: Prescripción y dispensación",
        "Productos fitoterapéuticos: las plantas medicinales; partes utilizadas clasificación; composición química; preparación y presentación de plantas medicinales; algas y hongos",
        "Medicamentos de uso animal: introducción; autorización y registro de medicamentos veterinarios; comercialización, prescripción y dispensación de medicamentos veterinarios",
        "Farmacia hospitalaria: introducción; objetivos de un servicio de farmacia hospitalaria; áreas de trabajo; sistema de dispensación de medicamentos; sistemas automatizados de almacenamiento y dispensación de medicamentos; dispensación de medicamentos de especial control"
      ]
    },
    {
      titulo: "BLOQUE 3: PARAFARMACIA",
      contenido: [
        "Los productos parafarmacéuticos",
        "Alimentación y nutrición",
        "Alimentación infantil y productos de puericultura",
        "Situaciones especiales: alimentación enteral, domiciliaria y dietoterápica",
        "Productos sanitarios",
        "Productos para la incontinencia urinaria, ginecológicos y anticonceptivos",
        "Aparataje y equipos: sistemas de medición",
        "Insuficiencia venosa: varices y productos de contención elástica",
        "Biocidas",
        "Productos odontológicos",
        "Productos cosméticos",
        "Dermocosmética: productos y tratamiento",
        "Anomalías, patologías e higiene capilares. Cosmética masculina",
        "Cosmética infantil. La higiene del bebé",
        "La radiación y los productos solares",
        "Ortopedia y prótesis",
        "Óptica y audioprótesis"
      ]
    }
  ];

  const cursosComplementarios = [
    "Curso masaje",
    "Dermocosmética",
    "Dietética y nutrición",
    "Ciclo medio de Farmacia y Parafarmacia",
    "Inglés"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/auxiliar-de.jpg" 
            alt="Auxiliar de Farmacia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Pill className="h-12 w-12 text-green-300" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {curso.nombre}
              </h1>
              
              <p className="text-lg sm:text-xl mb-6 text-green-100">
                Formación Profesional Especializada
              </p>
              
              <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-gray-200">
                Conviértete en un profesional especializado en el sector farmacéutico y parafarmacéutico
              </p>

              {/* Información del curso */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="h-6 w-6 text-green-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">40 sesiones / 10 meses</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-green-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">Grupos reducidos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Award className="h-6 w-6 text-green-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">250h prácticas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <BookOpen className="h-6 w-6 text-green-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">1.150€ total</p>
                </div>
              </div>

              <div className="bg-yellow-400 rounded-full p-1 inline-block">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                El curso de <strong>Auxiliar de Farmacia</strong> ofrece los conocimientos imprescindibles del 
                funcionamiento de una oficina de farmacia, las funciones del auxiliar de farmacia y un módulo 
                de orientación laboral, dinámico y actualizado.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Objetivo:</strong> Adquirir la confianza, habilidades y conocimientos para trabajar como 
                <strong> Auxiliar en Farmacias o parafarmacias, almacén de medicamentos</strong>.
              </p>
            </div>
          </section>

          {/* ¿A Quién Va Dirigido? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Users className="inline-block w-8 h-8 mr-3 text-blue-600" />
              ¿A Quién Va Dirigido?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Si te gusta el <strong>área sanitaria</strong>, el trato al público, aconsejar, escuchar, ayudar, 
                fomentar la promoción de la salud, <strong>¡no lo dudes!</strong>
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm font-semibold text-green-600">
                  <Award className="inline-block w-4 h-4 mr-2" />
                  Requisitos: Podrás acceder con 2º de la ESO o EGB
                </p>
              </div>
            </div>
          </section>

          {/* Salidas Profesionales */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Activity className="inline-block w-8 h-8 mr-3 text-purple-600" />
              Salidas Profesionales
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Pill className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Farmacias</h3>
                <p className="text-gray-600">Oficinas de farmacia como auxiliar especializado</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Parafarmacias</h3>
                <p className="text-gray-600">Establecimientos de productos sanitarios y cosméticos</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Microscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Almacenes</h3>
                <p className="text-gray-600">Almacenes de medicamentos y distribución farmacéutica</p>
              </div>
            </div>
          </section>

          {/* Contenido del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-indigo-600" />
              Contenido Detallado del Curso
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
                    <Clock className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold">Duración</p>
                      <p className="text-gray-600">10 meses (40 sesiones)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold">Modalidad</p>
                      <p className="text-gray-600">Clases presenciales 1 día/semana</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">Tipo</p>
                      <p className="text-gray-600">Clases teórico/prácticas</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="font-semibold">Prácticas</p>
                      <p className="text-gray-600">250 horas en empresas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información Económica</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-green-600">1.150€ Total</p>
                    <p className="text-gray-600">Precio completo del curso</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">10 cuotas mensuales:</span>
                      <span className="text-green-600 font-bold">100€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Matrícula:</span>
                      <span className="text-blue-600 font-bold">150€</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 mt-4">
                    <p className="text-sm text-yellow-800">
                      <Award className="inline-block w-4 h-4 mr-1" />
                      Incluye agencia de colocación oficial
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
              Profesorado Especializado
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <Pill className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Equipo Multidisciplinar</h3>
                <p className="text-lg text-green-600 font-semibold mb-4">Profesionales del sector en activo</p>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Nuestro equipo docente está formado por un equipo multidisciplinar en el que todos son 
                  <strong> profesionales del sector en activo</strong>, garantizando formación actualizada 
                  y práctica real del día a día farmacéutico.
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
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{curso}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                ¡Inicia tu Carrera Farmacéutica!
              </h2>
              <p className="text-lg text-green-100 mb-6">
                Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula y despejar todas las dudas
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-green-600 px-8 sm:px-12 py-4 text-lg font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                ¡RESERVAR MI PLAZA AHORA!
              </button>
              <p className="text-sm text-green-100 mt-4">
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
                <Phone className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-semibold">Teléfono</p>
                <p className="text-gray-600">922 21 92 57</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-blue-600 mb-2" />
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

      <CepFooter />
    </div>
  );
};

export default AuxiliarFarmaciaPage;
