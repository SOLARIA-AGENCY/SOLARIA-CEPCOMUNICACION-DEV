import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, BookOpen, Star, ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';
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
            tag: curso.id // Usamos el ID único como tag
          }}
        />
      </div>
    );
  }

  const HeroIcon = () => {
    switch (curso.categoria) {
      case 'veterinaria': return <i className="fas fa-paw text-yellow-400 text-4xl"></i>;
      case 'sanidad': return <i className="fas fa-heartbeat text-red-400 text-4xl"></i>;
      case 'bienestar': return <i className="fas fa-spa text-teal-400 text-4xl"></i>;
      default: return <i className="fas fa-graduation-cap text-blue-400 text-4xl"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CepHeader />
      
      <div className="relative bg-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={curso.imagen} 
            alt={`Curso de ${curso.nombre}`}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <HeroIcon />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
              {curso.nombre}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {detalles.introduccion}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-base">
              {detalles.puntosClave.map((item, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  {item.icono === 'Clock' && <Clock className="w-5 h-5 mr-2 text-yellow-400" />}
                  {item.icono === 'Users' && <Users className="w-5 h-5 mr-2 text-blue-400" />}
                  {item.icono === 'Award' && <Award className="w-5 h-5 mr-2 text-green-400" />}
                  <span>{item.texto}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-10 rounded-lg text-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡RESERVA TU PLAZA AHORA!
                </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-12">
            <section id="que-aprendo">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                ¿Qué aprenderás?
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8 text-lg text-gray-700 leading-relaxed space-y-4">
                <p>{detalles.queAprendes}</p>
              </div>
            </section>

            <section id="temario">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                Temario Completo
              </h2>
              <div className="space-y-3">
                {detalles.modulos.map((modulo, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{modulo.titulo}</h3>
                      {expandedModule === index ? (
                        <ChevronUp className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>
                    {expandedModule === index && (
                      <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                        <ul className="space-y-3 mt-4">
                          {modulo.contenido.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
            
            <section id="profesorado">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="w-8 h-8 mr-3 text-yellow-500" />
                Profesorado Especialista
              </h2>
              {detalles.profesores.map((profesor, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
                  <div className="md:w-1/3 flex items-center justify-center p-6 bg-gray-50">
                    <img 
                      src={profesor.foto} 
                      alt={`Profesor ${profesor.nombre}`} 
                      className="w-40 h-40 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{profesor.nombre}</h3>
                    <p className="text-md text-blue-600 font-semibold mb-4">{profesor.especialidad}</p>
                    <p className="text-gray-700 mb-4 leading-relaxed">{profesor.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {profesor.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Columna lateral */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información Clave</h3>
              <ul className="space-y-4">
                {detalles.infoAdicional && (
                  <>
                    <li className="flex items-center"><Clock className="w-5 h-5 mr-3 text-gray-500"/><span><strong>Duración:</strong> {detalles.infoAdicional.duracion}</span></li>
                    <li className="flex items-center"><Award className="w-5 h-5 mr-3 text-gray-500"/><span><strong>Prácticas:</strong> {detalles.infoAdicional.practicas}</span></li>
                  </>
                )}
                {detalles.inversion && (
                   <li className="flex items-center"><i className="fas fa-euro-sign w-5 h-5 mr-3 text-gray-500"></i><span><strong>Inversión:</strong> {detalles.inversion.total}</span></li>
                )}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white rounded-xl shadow-lg p-6 text-center">
               <h3 className="text-2xl font-bold mb-3">¿Listo para empezar?</h3>
               <p className="mb-6">Reserva tu plaza ahora y un asesor resolverá todas tus dudas.</p>
               <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all"
                >
                  RESERVAR MI PLAZA
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Salidas Profesionales</h3>
              <ul className="space-y-2">
                {detalles.salidasProfesionales.map((salida, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span>{salida}</span>
                  </li>
                ))}
              </ul>
            </div>
            
             <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contacto Directo</h3>
              <ul className="space-y-3">
                <li className="flex items-center"><Phone className="w-5 h-5 mr-3 text-gray-500"/> 922 21 92 57</li>
                <li className="flex items-center"><Mail className="w-5 h-5 mr-3 text-gray-500"/> info@cursostenerife.es</li>
                <li className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-gray-500"/> Sede Norte y Santa Cruz</li>
              </ul>
            </div>

          </aside>
        </div>
      </main>

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
       {/* Font Awesome para iconos que faltan */}
      <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" async></script>
    </div>
  );
};

export default CursoPageComponent; 