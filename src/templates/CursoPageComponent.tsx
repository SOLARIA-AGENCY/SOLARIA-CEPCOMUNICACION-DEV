import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Star, ChevronDown, ChevronUp, Phone, Mail, MapPin, PawPrint, Heart, Activity, Shield, Microscope } from 'lucide-react';
import { CursoMaestro } from '../config/cursos-maestro';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

// --- TEMPORARY DATA FOR DEVELOPMENT ---
const cursoEjemplo: CursoMaestro = {
  id: 'auxiliar-clinico-veterinario-norte',
  slug: 'auxiliar-clinico-veterinario-norte',
  nombre: 'Auxiliar Clínico Veterinario',
  sede: 'Norte',
  estado: 'activo',
  inicio: 'Septiembre 2025',
  slugBase: 'auxiliar-clinico-veterinario',
  imagen: '/images/cursos/auxiliar-veterinaria.jpg',
  categoria: 'veterinaria',
  copy: {
    slogan: 'Tu primer paso hacia una carrera dedicada al cuidado animal.',
    textosPrincipales: ['Anatomía Animal', 'Asistencia Quirúrgica'],
    titulos: ['Anatomía Animal', 'Asistencia Quirúrgica']
  },
  descripcionDetallada: {
    introduccion: "Conviértete en un profesional especializado en el cuidado y asistencia técnica veterinaria, con amplias salidas laborales en clínicas y hospitales veterinarios.",
    queAprendes: "El curso de Auxiliar Técnico Veterinario (ATV) te prepara para trabajar como asistente especializado en clínicas y hospitales veterinarios, proporcionando cuidados técnicos profesionales a todo tipo de animales. Adquirirás las competencias profesionales para asistir en consultas, cirugías, laboratorio, hospitalización y todas las áreas de una clínica veterinaria moderna.",
    puntosClave: [
      { icono: 'Clock', texto: '10 meses' },
      { icono: 'Users', texto: 'Presencial' },
      { icono: 'Award', texto: '300h Prácticas' }
    ],
    infoAdicional: {
      duracion: "10 meses - 40 sesiones presenciales",
      practicas: "300 horas en clínicas veterinarias",
      especializacion: "Asistencia técnica veterinaria completa"
    },
    inversion: {
      total: "1.150€ (10 cuotas de 100€ + 150€ matrícula)",
      modalidad: "Presencial - 1 día por semana",
      incluye: "Incluye agencia de colocación oficial"
    },
    salidasProfesionales: [
      "Clínicas veterinarias", "Hospitales veterinarios", "Centros de investigación", "Zoológicos y parques naturales", "Centros de cría y adiestramiento"
    ],
    modulos: [
      { titulo: "MÓDULO 1: ANATOMÍA Y FISIOLOGÍA ANIMAL", contenido: ["Anatomía y fisiología de los sistemas corporales", "Aparato locomotor: huesos, músculos y articulaciones", "Sistema nervioso y órganos de los sentidos", "Aparato circulatorio y respiratorio", "Aparato digestivo y sistema urinario", "Aparato reproductor", "Sistema endocrino", "Diferencias anatómicas entre especies"] },
      { titulo: "MÓDULO 2: PATOLOGÍA ANIMAL", contenido: ["Concepto de enfermedad y etiología", "Enfermedades infecciosas más comunes", "Enfermedades parasitarias", "Enfermedades metabólicas", "Traumatología veterinaria", "Oncología veterinaria básica", "Enfermedades hereditarias", "Zoonosis y salud pública"] },
      { titulo: "MÓDULO 3: TÉCNICAS DE EXPLORACIÓN CLÍNICA", contenido: ["Manejo y sujeción de animales", "Constantes vitales en diferentes especies", "Técnicas de exploración física", "Auscultación y palpación", "Inspección y observación clínica", "Registro de datos clínicos", "Comunicación con propietarios"] },
      { titulo: "MÓDULO 4: TÉCNICAS DE LABORATORIO", contenido: ["Toma de muestras biológicas", "Análisis de sangre básicos", "Análisis de orina", "Análisis coprológicos", "Citología básica", "Microbiología veterinaria", "Uso de equipos de laboratorio", "Interpretación de resultados básicos"] },
      { titulo: "MÓDULO 5: TÉCNICAS DE IMAGEN", contenido: ["Radiología veterinaria", "Posicionamiento para radiografías", "Protección radiológica", "Ecografía básica", "Endoscopia", "Mantenimiento de equipos", "Archivo y documentación de imágenes"] },
      { titulo: "MÓDULO 6: FARMACOLOGÍA VETERINARIA", contenido: ["Principios de farmacología", "Vías de administración de medicamentos", "Cálculo de dosis", "Medicamentos más utilizados", "Anestesia y analgesia", "Vacunas y programas de vacunación", "Almacenamiento de medicamentos", "Legislación farmacéutica veterinaria"] },
      { titulo: "MÓDULO 7: CIRUGÍA VETERINARIA", contenido: ["Instrumental quirúrgico", "Preparación del campo quirúrgico", "Esterilización y desinfección", "Asistencia en cirugía", "Anestesia y monitorización", "Cuidados postoperatorios", "Suturas básicas", "Urgencias quirúrgicas"] },
      { titulo: "MÓDULO 8: HOSPITALIZACIÓN Y CUIDADOS INTENSIVOS", contenido: ["Manejo de pacientes hospitalizados", "Fluidoterapia", "Alimentación de pacientes críticos", "Monitorización de constantes", "Cuidados de heridas", "Administración de medicamentos", "Fisioterapia veterinaria básica", "Eutanasia y manejo del dolor"] },
      { titulo: "MÓDULO 9: MEDICINA PREVENTIVA", contenido: ["Programas de vacunación", "Desparasitaciones", "Medicina preventiva por especies", "Nutrición animal", "Bienestar animal", "Programas sanitarios", "Educación sanitaria a propietarios"] },
      { titulo: "MÓDULO 10: GESTIÓN Y ADMINISTRACIÓN", contenido: ["Organización de la clínica veterinaria", "Atención al cliente", "Gestión de historiales clínicos", "Facturación y cobros", "Gestión de stock y almacén", "Legislación veterinaria", "Ética profesional", "Primeros auxilios en humanos"] }
    ],
    profesores: [
      { 
        nombre: "Cecilia Rodríguez", 
        foto: "/images/profesores/cecilia.jpg", 
        especialidad: "Veterinaria especialista en Medicina Interna",
        bio: "Veterinaria titulada con amplia experiencia en clínica de pequeños animales. Especialista en medicina interna, cirugía y diagnóstico por imagen. Formadora oficial de auxiliares técnicos veterinarios.",
        tags: ["Medicina Interna", "Cirugía Veterinaria", "Formadora Oficial"]
      }
    ],
    cursosComplementarios: [
      "Peluquería y Estética Canina", "Adiestramiento Canino", "Auxiliar de Enfermería", "Técnico en Emergencias Sanitarias", "Inglés Técnico Veterinario"
    ]
  }
};
// --- END TEMPORARY DATA ---

interface CursoPageComponentProps {
  curso: CursoMaestro;
}

const CursoPageComponent: React.FC<CursoPageComponentProps> = ({ curso = cursoEjemplo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  
  const { descripcionDetallada: detalles } = curso;

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(prev => prev === moduleIndex ? null : moduleIndex);
  };

  if (!detalles) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{curso.nombre}</h1>
            <p className="text-lg text-gray-600">Más información sobre este curso estará disponible próximamente.</p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
                SOLICITAR INFORMACIÓN
            </button>
        </div>
        <CepFooter />
        <CursoInscripcionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          curso={{
            nombre: curso.nombre,
            sede: curso.sede,
            tag: curso.id
          }}
        />
      </div>
    );
  }

  const HeroIcon = () => {
    switch (curso.categoria) {
      case 'veterinaria': return <PawPrint className="w-12 h-12 text-yellow-400" />;
      case 'sanidad': return <Heart className="w-12 h-12 text-red-400" />;
      case 'bienestar': return <Activity className="w-12 h-12 text-teal-400" />;
      default: return <BookOpen className="w-12 h-12 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section con imagen - ESTRUCTURA ORIGINAL */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={curso.imagen} 
            alt={`Curso de ${curso.nombre}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <HeroIcon />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {curso.nombre}
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg sm:text-xl italic mb-2">
                "Los animales son mis amigos... y yo no me como a mis amigos"
              </p>
              <p className="text-yellow-400 font-semibold">- George Bernard Shaw</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              {detalles.puntosClave.map((item, index) => (
                <div key={index} className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  {item.icono === 'Clock' && <Clock className="w-5 h-5 mr-2" />}
                  {item.icono === 'Users' && <Users className="w-5 h-5 mr-2" />}
                  {item.icono === 'Award' && <Award className="w-5 h-5 mr-2" />}
                  <span>{item.texto}</span>
                </div>
              ))}
            </div>
            
            {/* Botón de inscripción - DISEÑO ORIGINAL */}
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
          {/* ¿Qué Aprendo? - ESTRUCTURA ORIGINAL */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              ¿Qué Aprendo?
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                El curso de <strong>Auxiliar Técnico Veterinario (ATV)</strong> te prepara para trabajar como
                <strong> asistente especializado en clínicas y hospitales veterinarios</strong>, proporcionando
                cuidados técnicos profesionales a todo tipo de animales.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Adquirirás las <strong>competencias profesionales</strong> para asistir en consultas, cirugías,
                laboratorio, hospitalización y todas las áreas de una clínica veterinaria moderna.
              </p>
            </div>
          </section>

          {/* Información del Ciclo - CARDS ORIGINALES */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duración</h3>
                <p className="text-gray-700">{detalles.infoAdicional?.duracion || '10 meses - 40 sesiones presenciales'}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prácticas</h3>
                <p className="text-gray-700">{detalles.infoAdicional?.practicas || '300 horas en clínicas veterinarias'}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                <PawPrint className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Especialización</h3>
                <p className="text-gray-700">{detalles.infoAdicional?.especializacion || 'Asistencia técnica veterinaria completa'}</p>
              </div>
            </div>
          </section>

          {/* Información Comercial - ESTRUCTURA ORIGINAL */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información del Curso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Inversión</h4>
                  <p className="text-gray-700 mb-2"><strong>Total:</strong> {detalles.inversion?.total || '1.150€ (10 cuotas de 100€ + 150€ matrícula)'}</p>
                  <p className="text-gray-700 mb-4"><strong>Modalidad:</strong> {detalles.inversion?.modalidad || 'Presencial - 1 día por semana'}</p>
                  <p className="text-sm text-blue-600 font-medium">✓ {detalles.inversion?.incluye || 'Incluye agencia de colocación oficial'}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Salidas Profesionales</h4>
                  <ul className="text-gray-700 space-y-1">
                    {detalles.salidasProfesionales.map((salida, index) => (
                      <li key={index}>• {salida}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temario Expandible - ESTRUCTURA ORIGINAL */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
              Temario Completo
            </h2>
            <div className="space-y-4">
              {detalles.modulos.map((modulo, index) => (
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

          {/* Tu Profesor Especialista - DISEÑO ORIGINAL COMPLETO */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline-block w-8 h-8 mr-3 text-yellow-500" />
              Tu Profesor Especialista
            </h2>
            {detalles.profesores.map((profesor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-6 sm:p-8 flex justify-center">
                    <div className="relative">
                      <img 
                        src={profesor.foto} 
                        alt={`${profesor.nombre} - ${profesor.especialidad}`} 
                        className="w-48 h-48 rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                        <Award className="w-6 h-6 text-yellow-800" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{profesor.nombre}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">{profesor.especialidad}</p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {profesor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profesor.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Cursos Complementarios - ESTRUCTURA ORIGINAL */}
          {detalles.cursosComplementarios && (
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                <BookOpen className="inline-block w-8 h-8 mr-3 text-green-600" />
                Cursos Complementarios
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detalles.cursosComplementarios.map((curso, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
                    <p className="text-gray-700 font-medium">{curso}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Principal - DISEÑO ORIGINAL */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¡Inicia tu Carrera Veterinaria!
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

          {/* Información de Contacto - ESTRUCTURA ORIGINAL */}
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
        curso={{
          nombre: curso.nombre,
          sede: curso.sede,
          tag: curso.id
        }}
      />
    </div>
  );
};

export default CursoPageComponent; 