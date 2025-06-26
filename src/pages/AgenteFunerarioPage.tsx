import React, { useState } from 'react';
import { Shield, Heart, BookOpen, Users, Clock, GraduationCap, ChevronDown, ChevronUp, FileText, Scale } from 'lucide-react';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AgenteFunerarioPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({});

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  const courseData = {
    title: "Agente Funerario",
    subtitle: "Formación Profesional Especializada",
    description: "Fórmate en un sector estable con futuro y alta demanda laboral",
    duration: "30 sesiones / 6 meses",
    practices: "150h prácticas en empresas",
    price: "850€ total",
    installments: "6 cuotas de 125€ + 100€ matrícula"
  };

  const modules = [
    {
      title: "Módulo 1: Legislación Funeraria",
      topics: [
        "Normativa estatal y autonómica del sector funerario",
        "Ley de Sanidad Mortuoria",
        "Reglamentos municipales de cementerios",
        "Protección de datos en servicios funerarios",
        "Derechos del consumidor en servicios funerarios",
        "Documentación legal obligatoria"
      ]
    },
    {
      title: "Módulo 2: Tanatopraxia y Conservación",
      topics: [
        "Fundamentos de la tanatopraxia",
        "Técnicas de conservación temporal",
        "Preparación del difunto",
        "Productos químicos y su aplicación",
        "Higiene y seguridad en tanatopraxia",
        "Equipos y materiales específicos"
      ]
    },
    {
      title: "Módulo 3: Psicología del Duelo",
      topics: [
        "Proceso de duelo y sus fases",
        "Atención psicológica a familias",
        "Comunicación empática y asertiva",
        "Manejo de situaciones difíciles",
        "Apoyo emocional especializado",
        "Protocolos de acompañamiento"
      ]
    },
    {
      title: "Módulo 4: Ceremonial y Protocolo",
      topics: [
        "Organización de ceremonias religiosas",
        "Ceremonias civiles y laicas",
        "Protocolo en velatorios",
        "Coordinación de actos funerarios",
        "Atención a diferentes culturas y religiones",
        "Gestión de espacios ceremoniales"
      ]
    },
    {
      title: "Módulo 5: Gestión Administrativa",
      topics: [
        "Tramitación de documentos oficiales",
        "Gestión de seguros de decesos",
        "Facturación y presupuestos",
        "Relaciones con administraciones públicas",
        "Gestión de cementerios y tanatorios",
        "Software específico del sector"
      ]
    },
    {
      title: "Módulo 6: Servicios Funerarios Especializados",
      topics: [
        "Repatriación nacional e internacional",
        "Cremación: procedimientos y normativa",
        "Inhumación tradicional",
        "Servicios de memoria y conmemoración",
        "Flores y ornamentación funeraria",
        "Transporte funerario especializado"
      ]
    }
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
        <div className="relative">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Shield className="h-12 w-12 text-blue-300" />
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
                  <p className="text-sm font-medium">{courseData.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.practices}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <GraduationCap className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.price}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <BookOpen className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">{courseData.installments}</p>
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

      {/* Contenido del curso */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Frase inspiracional */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-12 border border-gray-100">
            <blockquote className="text-center">
              <p className="text-lg sm:text-xl text-gray-700 italic mb-4">
                "El trabajo de un agente funerario es honrar la vida que fue vivida y brindar consuelo a quienes quedan."
              </p>
              <footer className="text-blue-600 font-medium">
                — Filosofía del Sector Funerario
              </footer>
            </blockquote>
          </div>

          {/* Programa del curso */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Programa del Curso
            </h2>
            
            <div className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full px-6 py-4 text-left bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 transition-colors duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                    </div>
                    {expandedModules[moduleIndex] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedModules[moduleIndex] && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ventajas del sector */}
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ¿Por qué elegir el sector funerario?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Estabilidad Laboral</h4>
                  <p className="text-gray-600">Sector anticrisis con demanda constante y creciente</p>
                </div>
              </div>
              <div className="flex items-start">
                <Heart className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Trabajo Humano</h4>
                  <p className="text-gray-600">Profesión de ayuda y acompañamiento en momentos difíciles</p>
                </div>
              </div>
              <div className="flex items-start">
                <Scale className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Buenos Salarios</h4>
                  <p className="text-gray-600">Remuneración competitiva desde el primer día</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Alta Demanda</h4>
                  <p className="text-gray-600">Necesidad creciente de profesionales cualificados</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para una carrera estable y humana?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a nuestro programa de Agente Funerario y accede a un sector con futuro, estabilidad laboral y alta demanda de profesionales.
            </p>
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

      <CepFooter />
      
      <CursoInscripcionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AgenteFunerarioPage; 