import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Activity, Shield, Microscope, PawPrint } from 'lucide-react';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AuxiliarVeterinarioPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const curso = {
    nombre: 'Auxiliar Técnico Veterinario (ATV)',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-clinico-veterinario-norte'
  };

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  const modulos = [
    {
      titulo: "MÓDULO 1: ANATOMÍA Y FISIOLOGÍA ANIMAL",
      contenido: [
        "Anatomía y fisiología de los sistemas corporales",
        "Aparato locomotor: huesos, músculos y articulaciones",
        "Sistema nervioso y órganos de los sentidos",
        "Aparato circulatorio y respiratorio",
        "Aparato digestivo y sistema urinario",
        "Aparato reproductor",
        "Sistema endocrino",
        "Diferencias anatómicas entre especies"
      ]
    },
    {
      titulo: "MÓDULO 2: PATOLOGÍA ANIMAL",
      contenido: [
        "Concepto de enfermedad y etiología",
        "Enfermedades infecciosas más comunes",
        "Enfermedades parasitarias",
        "Enfermedades metabólicas",
        "Traumatología veterinaria",
        "Oncología veterinaria básica",
        "Enfermedades hereditarias",
        "Zoonosis y salud pública"
      ]
    },
    {
      titulo: "MÓDULO 3: TÉCNICAS DE EXPLORACIÓN CLÍNICA",
      contenido: [
        "Manejo y sujeción de animales",
        "Constantes vitales en diferentes especies",
        "Técnicas de exploración física",
        "Auscultación y palpación",
        "Inspección y observación clínica",
        "Registro de datos clínicos",
        "Comunicación con propietarios"
      ]
    },
    {
      titulo: "MÓDULO 4: TÉCNICAS DE LABORATORIO",
      contenido: [
        "Toma de muestras biológicas",
        "Análisis de sangre básicos",
        "Análisis de orina",
        "Análisis coprológicos",
        "Citología básica",
        "Microbiología veterinaria",
        "Uso de equipos de laboratorio",
        "Interpretación de resultados básicos"
      ]
    },
    {
      titulo: "MÓDULO 5: TÉCNICAS DE IMAGEN",
      contenido: [
        "Radiología veterinaria",
        "Posicionamiento para radiografías",
        "Protección radiológica",
        "Ecografía básica",
        "Endoscopia",
        "Mantenimiento de equipos",
        "Archivo y documentación de imágenes"
      ]
    },
    {
      titulo: "MÓDULO 6: FARMACOLOGÍA VETERINARIA",
      contenido: [
        "Principios de farmacología",
        "Vías de administración de medicamentos",
        "Cálculo de dosis",
        "Medicamentos más utilizados",
        "Anestesia y analgesia",
        "Vacunas y programas de vacunación",
        "Almacenamiento de medicamentos",
        "Legislación farmacéutica veterinaria"
      ]
    },
    {
      titulo: "MÓDULO 7: CIRUGÍA VETERINARIA",
      contenido: [
        "Instrumental quirúrgico",
        "Preparación del campo quirúrgico",
        "Esterilización y desinfección",
        "Asistencia en cirugía",
        "Anestesia y monitorización",
        "Cuidados postoperatorios",
        "Suturas básicas",
        "Urgencias quirúrgicas"
      ]
    },
    {
      titulo: "MÓDULO 8: HOSPITALIZACIÓN Y CUIDADOS INTENSIVOS",
      contenido: [
        "Manejo de pacientes hospitalizados",
        "Fluidoterapia",
        "Alimentación de pacientes críticos",
        "Monitorización de constantes",
        "Cuidados de heridas",
        "Administración de medicamentos",
        "Fisioterapia veterinaria básica",
        "Eutanasia y manejo del dolor"
      ]
    },
    {
      titulo: "MÓDULO 9: MEDICINA PREVENTIVA",
      contenido: [
        "Programas de vacunación",
        "Desparasitaciones",
        "Medicina preventiva por especies",
        "Nutrición animal",
        "Bienestar animal",
        "Programas sanitarios",
        "Educación sanitaria a propietarios"
      ]
    },
    {
      titulo: "MÓDULO 10: GESTIÓN Y ADMINISTRACIÓN",
      contenido: [
        "Organización de la clínica veterinaria",
        "Atención al cliente",
        "Gestión de historiales clínicos",
        "Facturación y cobros",
        "Gestión de stock y almacén",
        "Legislación veterinaria",
        "Ética profesional",
        "Primeros auxilios en humanos"
      ]
    }
  ];

  const cursosComplementarios = [
    "Peluquería y Estética Canina",
    "Adiestramiento Canino",
    "Auxiliar de Enfermería",
    "Técnico en Emergencias Sanitarias",
    "Inglés Técnico Veterinario"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cursos/auxiliar-enfermeria.jpg" 
            alt="Auxiliar Técnico Veterinario" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <PawPrint className="h-12 w-12 text-blue-300" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {courseData.title}
              </h1>
              
              <p className="text-lg sm:text-xl mb-6 text-blue-100">
                {courseData.subtitle}
              </p>
              
              <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-gray-200">
                {courseData.description}
              </p>

              {/* Información del curso */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">40 sesiones / 10 meses</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">Grupos reducidos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Award className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">300h prácticas</p>
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
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Como <strong>Auxiliar Técnico Veterinario</strong> adquirirás los conocimientos y habilidades 
                necesarias para asistir al veterinario en el diagnóstico, tratamiento y cuidado de animales 
                de compañía, realizando técnicas especializadas bajo supervisión profesional.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Objetivo:</strong> Formar profesionales capacitados para trabajar como 
                <strong> Auxiliar Técnico en clínicas veterinarias, hospitales veterinarios y centros de salud animal</strong>, 
                con competencias en técnicas de laboratorio, imagen, cirugía y cuidados intensivos.
              </p>
            </div>
          </section>

          {/* ¿A Quién Va Dirigido? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Users className="inline-block w-8 h-8 mr-3 text-green-600" />
              ¿A Quién Va Dirigido?
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Si eres <strong>amante de los animales</strong>, te interesa la medicina veterinaria, 
                tienes vocación de servicio y quieres formar parte del equipo sanitario veterinario, 
                <strong> ¡este es tu curso!</strong>
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm font-semibold text-blue-600">
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
                <PawPrint className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Clínicas Veterinarias</h3>
                <p className="text-gray-600">Auxiliar técnico en consultas y tratamientos</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hospitales Veterinarios</h3>
                <p className="text-gray-600">Especialista en cuidados intensivos y hospitalización</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Centros Especializados</h3>
                <p className="text-gray-600">Laboratorios, centros de imagen y cirugía</p>
              </div>
            </div>
          </section>

          {/* Contenido del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-indigo-600" />
              Contenido Detallado del Curso - 10 Módulos Especializados
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
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
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
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold">Duración</p>
                      <p className="text-gray-600">10 meses (40 sesiones)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold">Modalidad</p>
                      <p className="text-gray-600">Clases presenciales 1 día/semana</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">Tipo</p>
                      <p className="text-gray-600">Clases teórico/prácticas intensivas</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="font-semibold">Prácticas</p>
                      <p className="text-gray-600">300 horas en clínicas veterinarias</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información Económica</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600">1.350€ Total</p>
                    <p className="text-gray-600">Precio completo del curso</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">10 cuotas mensuales:</span>
                      <span className="text-blue-600 font-bold">120€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Matrícula:</span>
                      <span className="text-green-600 font-bold">150€</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 mt-4">
                    <p className="text-sm text-yellow-800">
                      <Award className="inline-block w-4 h-4 mr-1" />
                      Incluye material especializado y agencia de colocación
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
              Profesorado Veterinario Especializado
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <PawPrint className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Veterinarios Colegiados</h3>
                <p className="text-lg text-blue-600 font-semibold mb-4">Profesionales en activo con experiencia clínica</p>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Nuestro equipo docente está formado por <strong>veterinarios colegiados</strong> y 
                  <strong> ATV's con experiencia</strong> que trabajan en clínicas y hospitales veterinarios, 
                  garantizando formación actualizada con las últimas técnicas y protocolos del sector.
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
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{curso}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-xl shadow-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                ¡Conviértete en Auxiliar Técnico Veterinario!
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula y resolver todas tus dudas
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 px-8 sm:px-12 py-4 text-lg font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                ¡RESERVAR MI PLAZA AHORA!
              </button>
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
      
      <CursoInscripcionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AuxiliarVeterinarioPage;
