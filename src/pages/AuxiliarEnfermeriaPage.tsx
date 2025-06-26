import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Heart, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, Stethoscope, Activity, Shield } from 'lucide-react';
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
      titulo: "BLOQUE 1: Técnicas básicas de enfermería",
      contenido: [
        "Introducción. Aproximación al rol de auxiliar de enfermería",
        "Estructura biológica y funcional del ser humano",
        "La piel. Higiene y aseo del paciente",
        "Sistema esquelético-muscular. Procedimientos relacionados",
        "Movilización, deambulación y traslado de pacientes",
        "Úlceras por presión",
        "Sistema cardiocirculatorio. Procedimientos relacionados",
        "Constantes vitales. Procedimientos relacionados",
        "Aparato respiratorio. Procedimientos relacionados",
        "Aparato digestivo. Procedimientos relacionados",
        "Alimentación y nutrición. Procedimientos relacionados",
        "Aparato urinario. Procedimientos relacionados",
        "Sistema neuroendocrino y órganos de los sentidos",
        "Sistema inmunitario y sanguíneo. Trasplante de órganos y tejidos",
        "Aparato genital. Reproducción humana y parto. Procedimientos relacionados",
        "Recién nacido. Procedimientos relacionados con sus cuidados",
        "El anciano. Cuidados y procedimientos de enfermería",
        "Paciente terminal. Procedimientos relacionados",
        "Procedimientos diagnósticos",
        "Terapéutica quirúrgica",
        "Terapéutica farmacológica",
        "Termoterapia e hidroterapia",
        "Características y tratamiento del dolor. Procedimientos relacionados",
        "Primeros auxilios I",
        "Primeros auxilios II"
      ]
    },
    {
      titulo: "BLOQUE 2: La higiene del medio hospitalario",
      contenido: [
        "La unidad del paciente. La cama hospitalaria",
        "Prevención de infecciones",
        "Aislamiento. Procedimientos relacionados",
        "Materiales e instrumental de uso sanitario. El carro de curas",
        "Limpieza. Procedimientos relacionados",
        "Desinfección. Procedimientos relacionados",
        "Esterilización. Procedimientos relacionados",
        "Central de esterilización",
        "Muestras biológicas. Procedimientos de recogida y transporte",
        "Manipulación de residuos sanitarios",
        "ANEXO: Riesgos laborales del TCAE"
      ]
    },
    {
      titulo: "BLOQUE 3: Operaciones administrativas y documentación sanitaria",
      contenido: [
        "La salud",
        "Organización sanitaria",
        "Niveles de asistencia sanitaria",
        "El equipo de enfermería",
        "Documentación",
        "Documentación sanitaria",
        "Almacenes sanitarios. Gestión de existencias e inventarios",
        "Operaciones de compraventa"
      ]
    }
  ];

  const cursosComplementarios = [
    "Curso masaje",
    "Auxiliar de Odontología",
    "Dietética y nutrición",
    "Auxiliar de farmacia y parafarmacia",
    "Ciclo medio de farmacia y parafarmacia",
    "Ciclo superior de higiene bucodental",
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
            src="/images/cursos/auxiliar-enfermeria.jpg" 
            alt="Auxiliar de Enfermería" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Stethoscope className="w-12 h-12 text-blue-300" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Curso de Técnicas Auxiliares en Enfermería
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "Las pequeñas cosas son las responsables de los grandes cambios"
              </p>
              <p className="text-blue-300 font-semibold">- Paulo Coelho</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                40 sesiones / 10 meses
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                Grupos reducidos
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                300h prácticas
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
                El curso de <strong>Técnicas Auxiliares en Enfermería</strong> ofrece los conocimientos imprescindibles 
                acerca de las técnicas básicas de enfermería, documentación e higiene del medio hospitalario y un 
                módulo de orientación laboral, dinámico y actualizado.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Objetivo:</strong> Adquirir la confianza, habilidades y conocimientos para trabajar como auxiliar 
                en <strong>centros médicos, hospitales concertados, consultas privadas</strong> entre otros.
              </p>
            </div>
          </section>

          {/* ¿A Quién Va Dirigido? */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <Users className="inline-block w-8 h-8 mr-3 text-teal-600" />
              ¿A Quién Va Dirigido?
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Si te gusta el <strong>área sanitaria</strong>, el trato al público, aconsejar, escuchar, ayudar, 
                fomentar la promoción de la salud, <strong>¡no lo dudes!</strong>
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
              <Activity className="inline-block w-8 h-8 mr-3 text-green-600" />
              Salidas Profesionales
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hospitales</h3>
                <p className="text-gray-600">Hospitales públicos y concertados como auxiliar de enfermería</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Centros Médicos</h3>
                <p className="text-gray-600">Clínicas privadas y centros de atención primaria</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Consultas Privadas</h3>
                <p className="text-gray-600">Consultas médicas especializadas y centros de salud</p>
              </div>
            </div>
          </section>

          {/* Contenido del Curso */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-purple-600" />
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
                      <p className="text-gray-600">Clases teórico/prácticas</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="font-semibold">Prácticas</p>
                      <p className="text-gray-600">300 horas en empresas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información Económica</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600">1.150€ Total</p>
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
                <Stethoscope className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Equipo Multidisciplinar</h3>
                <p className="text-lg text-blue-600 font-semibold mb-4">Profesionales del sector en activo</p>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Nuestro equipo docente está formado por un equipo multidisciplinar en el que todos son 
                  <strong> profesionales del sector en activo</strong>, garantizando formación actualizada 
                  y práctica real del día a día hospitalario.
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
            <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl shadow-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
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