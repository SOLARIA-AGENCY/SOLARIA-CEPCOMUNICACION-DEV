import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, User, Award, Book, ChevronDown, ChevronUp, Star, Phone, Mail, MapPin, Calendar, Users, Heart, Shield, Microscope } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';

const AuxiliarFarmaciaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const cursoData = {
    nombre: 'Auxiliar de Farmacia y Parafarmacia + Dermocosmética',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte',
    inicio: '🔴 PRIORIDAD JULIO 2025',
    duracion: '48 sesiones / 12 meses',
    precio: {
      cuotas: 12,
      importe: 100,
      matricula: 150
    },
    practicas: '350 horas prácticas en farmacias y parafarmacias',
    profesor: 'Alexis Galán (Farmacéutico Colegiado)',
    certificacion: 'Diploma CEP + Especialización Dermocosmética + Agencia Colocación Oficial'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <CepHeader />
      
      {/* Header con prioridad */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-sm">🔴 PRIORIDAD MÁXIMA</span>
            <span className="font-semibold">ADELANTADO A JULIO 2025 POR ALTA DEMANDA</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  🔴 JULIO 2025 - PRIORIDAD
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Auxiliar de Farmacia y Parafarmacia
                <span className="block text-green-300 mt-2">+ Dermocosmética</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                El curso de <strong>Auxiliar de Farmacia</strong> ofrece los conocimientos imprescindibles del
                funcionamiento de una oficina de farmacia, las funciones del auxiliar de farmacia y un módulo
                de orientación laboral, dinámico y actualizado, adquiriendo la confianza, habilidades y conocimientos para trabajar como
                <strong> Auxiliar en Farmacias o parafarmacias, almacén de medicamentos</strong>.
              </p>
              
              {/* Características destacadas */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="text-green-300" size={24} />
                  <span className="font-semibold">🔴 Julio 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-green-300" size={24} />
                  <span>12 meses</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-green-300" size={24} />
                  <span>Grupos reducidos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-green-300" size={24} />
                  <span>350h prácticas</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-400 text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-red-600"
              >
                🔴 RESERVAR PLAZA PRIORITARIA - JULIO 2025
              </button>
            </div>
            
            <div className="relative">
              <img
                src="/images/cursos/farmacia-parafarmacia.jpg"
                alt="Auxiliar de Farmacia"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="font-bold text-xl">🔴 PRIORIDAD</div>
                  <div className="text-sm">Julio 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información del curso */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Auxiliar de Farmacia y Parafarmacia + Dermocosmética
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialízate en el sector farmacéutico con formación integral que incluye farmacología, 
              parafarmacia y dermocosmética profesional. <strong>Adelantado a Julio 2025 por alta demanda</strong>.
            </p>
          </div>

          {/* Módulos del curso */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Microscope className="text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">ANATOMOPATOLOGÍA</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Piel: higiene y aseo del paciente</li>
                <li>• Sistema esquelético-muscular</li>
                <li>• Sistema cardiocirculatorio e inmunológico</li>
                <li>• Constantes vitales y primeros auxilios</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <Shield className="text-green-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">FARMACOLOGÍA</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Conceptos básicos sobre medicamentos</li>
                <li>• Dispensación y prescripción médica</li>
                <li>• Biofarmacia y farmacocinética</li>
                <li>• Farmacología por sistemas</li>
                <li>• Homeopatía y fitoterapia</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <Heart className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">PARAFARMACIA + DERMO</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Productos parafarmacéuticos</li>
                <li>• Dermocosmética profesional</li>
                <li>• Alimentación y nutrición</li>
                <li>• Productos sanitarios</li>
                <li>• Cosmética especializada</li>
              </ul>
            </div>
          </div>

          {/* Información práctica */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <Calendar className="mx-auto mb-3" size={32} />
                <h4 className="font-bold text-lg">🔴 INICIO PRIORITARIO</h4>
                <p>Julio 2025</p>
                <p className="text-sm opacity-90">Adelantado por demanda</p>
              </div>
              <div>
                <Clock className="mx-auto mb-3" size={32} />
                <h4 className="font-bold text-lg">DURACIÓN</h4>
                <p>48 sesiones</p>
                <p className="text-sm opacity-90">12 meses formación</p>
              </div>
              <div>
                <Award className="mx-auto mb-3" size={32} />
                <h4 className="font-bold text-lg">PRÁCTICAS</h4>
                <p>350 horas</p>
                <p className="text-sm opacity-90">Empresas reales</p>
              </div>
              <div>
                <Users className="mx-auto mb-3" size={32} />
                <h4 className="font-bold text-lg">MODALIDAD</h4>
                <p>Presencial</p>
                <p className="text-sm opacity-90">Grupos reducidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precio y financiación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Inversión y Financiación</h2>
              <p className="text-xl text-gray-600">
                Formación profesional accesible con múltiples opciones de pago
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Pago Fraccionado</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-2">1.350€</div>
                  <div className="text-gray-600 mb-6">Total del curso</div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span>Matrícula:</span>
                      <span className="font-bold">150€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>12 cuotas de:</span>
                      <span className="font-bold">100€/mes</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total:</span>
                        <span>1.350€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">Incluido en el Curso</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>48 sesiones de formación teórico-práctica</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>350 horas de prácticas en empresas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>Especialización en Dermocosmética</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>Agencia de colocación oficial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>Material didáctico incluido</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span>Diploma CEP Formación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profesor */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestro Profesor Especialista</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <img
                    src="/images/profesores/alexis.jpg"
                    alt="Alexis Galán"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-800">Alexis Galán</h3>
                  <p className="text-blue-600 font-semibold">Farmacéutico Colegiado</p>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Especialista en Dermocosmética</h4>
                  <p className="text-gray-600 mb-4">
                    Farmacéutico titulado con amplia experiencia en oficina de farmacia y especialización en dermocosmética. 
                    Experto en dispensación farmacéutica, productos parafarmacéuticos y asesoramiento dermofarmacológico. 
                    Formador certificado con experiencia docente en el sector.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm">Farmacéutico Colegiado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm">Especialista Dermocosmética</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm">Experiencia Docente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm">Profesional en Activo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">🔴 PRIORIDAD MÁXIMA - JULIO 2025</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Convocatoria adelantada por alta demanda. Especialízate como Auxiliar de Farmacia con Dermocosmética 
            y accede a un sector con excelentes oportunidades laborales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold">
              🔴 Inicio: Julio 2025
            </div>
            <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold">
              350h Prácticas Reales
            </div>
            <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold">
              Agencia Colocación
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-red-600 px-12 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-red-600"
          >
            RESERVAR PLAZA PRIORITARIA JULIO 2025
          </button>
          
          <p className="text-sm mt-4 opacity-90">
            Plazas limitadas • Convocatoria prioritaria • Contacto inmediato
          </p>
        </div>
      </section>

      <CepFooter />

      {/* Modal de inscripción */}
      <CursoInscripcionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={cursoData}
      />
    </div>
  );
};

export default AuxiliarFarmaciaPage;
