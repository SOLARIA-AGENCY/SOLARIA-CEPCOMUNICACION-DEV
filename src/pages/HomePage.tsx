import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Award, TrendingUp, ExternalLink } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { Link } from 'react-router-dom';

// Datos para los slides del hero - solo imágenes como en el original
const heroSlides = [
  {
    id: 1,
    image: "/images/slideshow-3.jpg",
    alt: "El momento es ahora"
  },
  {
    id: 2,
    image: "/images/slideshow-1.jpg",
    alt: "Creemos en el poder de la actitud"
  },
  {
    id: 3,
    image: "/images/slideshow-2.jpg",
    alt: "Creemos en ti"
  }
];

// Cursos de la Campaña Otoño 2025 - COMPLETOS (14 variaciones)
const cursosOtono2025 = [
  {
    id: 1,
    titulo: "Adiestramiento Canino",
    sede: "CEP NORTE",
    imagen: "/images/cursos/adiestramiento-canino.jpg",
    inicio: "Septiembre 2025",
    duracion: "6 meses - 25 sesiones",
    descripcion: "Técnicas de adiestramiento de base y educación canina nivel I",
    link: "/adiestramiento-canino-norte",
    hasPage: true
  },
  {
    id: 2,
    titulo: "Auxiliar Clínicas Estéticas",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/auxiliar-de.jpg",
    inicio: "Septiembre 2025",
    duracion: "8 meses",
    descripcion: "Formación integral en tratamientos de estética y procedimientos en clínicas de medicina estética",
    link: "/auxiliar-clinicas-esteticas-santacruz",
    hasPage: true
  },
  {
    id: 3,
    titulo: "Agente Funerario",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    inicio: "Septiembre 2025",
    duracion: "6 meses",
    descripcion: "Curso profesional para trabajar en servicios funerarios. Incluye protocolos, legislación y atención a familias",
    link: "/agente-funerario-santacruz",
    hasPage: true
  },
  {
    id: 4,
    titulo: "Auxiliar Veterinario",
    sede: "CEP NORTE",
    imagen: "/images/cursos/auxiliar-veterinaria.jpg",
    inicio: "Septiembre 2025",
    duracion: "10 meses",
    descripcion: "Asistencia en clínicas veterinarias, cuidado animal, instrumentación quirúrgica y atención al cliente",
    link: "/auxiliar-clinico-veterinario-norte",
    hasPage: true
  },
  {
    id: 5,
    titulo: "Auxiliar Veterinario",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/auxiliar-veterinaria.jpg",
    inicio: "Octubre 2025",
    duracion: "10 meses",
    descripcion: "Asistencia en clínicas veterinarias, cuidado animal, instrumentación quirúrgica y atención al cliente",
    link: "/auxiliar-clinico-veterinario-santacruz",
    hasPage: true
  },
  {
    id: 6,
    titulo: "Auxiliar de Farmacia",
    sede: "CEP NORTE",
    imagen: "/images/cursos/farmacia-parafarmacia.jpg",
    inicio: "Septiembre 2025",
    duracion: "8 meses",
    descripcion: "Formación completa para trabajar en farmacias. Dispensación de medicamentos y atención farmacéutica",
    link: "/auxiliar-farmacia-dermo-norte",
    hasPage: true
  },
  {
    id: 7,
    titulo: "Auxiliar de Odontología",
    sede: "CEP NORTE",
    imagen: "/images/cursos/auxiliar-odontologia.jpg",
    inicio: "Septiembre 2025",
    duracion: "9 meses",
    descripcion: "Asistencia en clínicas dentales, instrumental odontológico, radiología dental y atención al paciente",
    link: "/auxiliar-odontologia-norte",
    hasPage: true
  },
  {
    id: 8,
    titulo: "Auxiliar de Odontología",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/auxiliar-odontologia.jpg",
    inicio: "Octubre 2025",
    duracion: "9 meses",
    descripcion: "Asistencia en clínicas dentales, instrumental odontológico, radiología dental y atención al paciente",
    link: "/auxiliar-odontologia-santacruz",
    hasPage: true
  },
   {
     id: 9,
     titulo: "Auxiliar de Enfermería",
     sede: "CEP NORTE",
     imagen: "/images/cursos/auxiliar-enfermeria.jpg",
     inicio: "Septiembre 2025",
     duracion: "10 meses",
     descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes",
     link: "/auxiliar-enfermeria-norte",
     hasPage: true
   },
   {
     id: 10,
     titulo: "Auxiliar de Enfermería",
     sede: "CEP SANTA CRUZ",
     imagen: "/images/cursos/auxiliar-enfermeria.jpg",
     inicio: "Octubre 2025",
     duracion: "10 meses",
     descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes",
     link: "/auxiliar-enfermeria-santacruz",
     hasPage: true
   },
   {
     id: 11,
     titulo: "Dietética y Nutrición",
     sede: "CEP NORTE",
     imagen: "/images/cursos/dietetica-nutricion.jpg",
     inicio: "Septiembre 2025",
     duracion: "8 meses",
     descripcion: "Especialización en nutrición clínica, dietoterapia y educación alimentaria para promoción de la salud",
     link: "/dietetica-nutricion-norte",
     hasPage: true
   },
   {
     id: 12,
     titulo: "Peluquería Canina y Felina",
     sede: "CEP NORTE",
     imagen: "/images/cursos/peluqueria-canina.jpg",
     inicio: "Septiembre 2025",
     duracion: "6 meses",
     descripcion: "Técnicas profesionales de peluquería y estética animal para perros y gatos de todas las razas",
     link: "/peluqueria-canina-felina-norte",
     hasPage: true
   },
   {
     id: 13,
     titulo: "Peluquería Canina y Felina",
     sede: "CEP SANTA CRUZ",
     imagen: "/images/cursos/peluqueria-canina.jpg",
     inicio: "Octubre 2025",
     duracion: "6 meses",
     descripcion: "Técnicas profesionales de peluquería y estética animal para perros y gatos de todas las razas",
     link: "/peluqueria-canina-felina-santacruz",
     hasPage: true
   },
   {
     id: 14,
     titulo: "Quiromasaje Nivel 2",
     sede: "CEP NORTE",
     imagen: "/images/cursos/salud-bienestar-y-deporte.jpg",
     inicio: "Septiembre 2025",
     duracion: "8 meses",
     descripcion: "Técnicas avanzadas de masaje terapéutico, rehabilitación y tratamiento de lesiones musculoesqueléticas",
     link: "/quiromasaje-nivel2-norte",
     hasPage: true
   }
 ];

// Datos de cursos con imágenes reales
const cursosPrivados = [
  {
    id: 1,
    titulo: "CICLOS FORMATIVOS",
    imagen: "/images/cursos/ciclos-formativos.jpg",
    link: "/categoria/ciclos-formativos"
  },
  {
    id: 2,
    titulo: "AUXILIAR DE",
    imagen: "/images/cursos/auxiliar-de.jpg",
    link: "/categoria/auxiliar-de"
  },
  {
    id: 3,
    titulo: "SALUD, BIENESTAR Y DEPORTE",
    imagen: "/images/cursos/salud-bienestar-y-deporte.jpg",
    link: "/categoria/salud-bienestar-y-deporte"
  },
  {
    id: 4,
    titulo: "MUNDO ANIMAL",
    imagen: "/images/cursos/mundo-animal.jpg",
    link: "/categoria/mundo-animal"
  },
  {
    id: 5,
    titulo: "ESPECIALIZACIÓN SANITARIA",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    link: "/categoria/especializacion-sanitaria"
  },
  {
    id: 6,
    titulo: "MEDIA DESIGN",
    imagen: "/images/cursos/diseno-de-medios.jpg",
    link: "/categoria/media-design"
  }
];

// Datos del equipo docente - AMPLIADO con todos los profesores
const equipoDocente = [
  {
    id: 1,
    nombre: "Alexis Galán",
    especialidad: "Farmacia",
    imagen: "/images/profesores/alexis.jpg"
  },
  {
    id: 2,
    nombre: "Livia Bernardi",
    especialidad: "Adiestramiento Canino",
    imagen: "/images/profesores/livia.jpg"
  },
  {
    id: 3,
    nombre: "Nuria E. Ángel",
    especialidad: "Odontología",
    imagen: "/images/profesores/nuria.jpg"
  },
  {
    id: 4,
    nombre: "Sara Jaquete",
    especialidad: "Veterinaria",
    imagen: "/images/profesores/sara.jpg"
  },
  {
    id: 5,
    nombre: "Lali Hernández",
    especialidad: "Inglés",
    imagen: "/images/profesores/cecilia.jpg"
  },
  {
    id: 6,
    nombre: "Goretti Valdés",
    especialidad: "Farmacia",
    imagen: "/images/profesores/goreti.jpg"
  },
  {
    id: 7,
    nombre: "Luis J. González",
    especialidad: "Medicina Estética",
    imagen: "/images/profesores/luis.jpg"
  },
  {
    id: 8,
    nombre: "Esther González",
    especialidad: "Medicina Estética",
    imagen: "/images/profesores/esther.jpg"
  }
];

// Datos de colaboradores
const colaboradores = [
  {
    id: 1,
    nombre: "Clínica Veterinaria Añaza",
    imagen: "/images/colaboradores/clinica-anaza-logo.jpg"
  },
  {
    id: 2,
    nombre: "Clínica Veterinaria Duggi",
    imagen: "/images/colaboradores/clinica-duggi-logo.jpg"
  },
  {
    id: 3,
    nombre: "Centro Veterinario Alper",
    imagen: "/images/colaboradores/clinica-alper-logo.jpg"
  },
  {
    id: 4,
    nombre: "Aboras Obediencia",
    imagen: "/images/colaboradores/aboras-logo.jpg"
  },
  {
    id: 5,
    nombre: "CIDME",
    imagen: "/images/colaboradores/cidme-logo.jpg"
  },
  {
    id: 6,
    nombre: "Mi Óptica Central",
    imagen: "/images/colaboradores/mi-optica-central-logo.jpg"
  }
];

// Datos de ONGs
const ongs = [
  {
    id: 1,
    nombre: "Addanca",
    imagen: "/images/ongs/addanca-logo.jpg"
  },
  {
    id: 2,
    nombre: "Adepac",
    imagen: "/images/ongs/adepac-logo.jpg"
  },
  {
    id: 3,
    nombre: "Animal Club",
    imagen: "/images/ongs/animal-club-logo.jpg"
  },
  {
    id: 4,
    nombre: "Apanot",
    imagen: "/images/ongs/apanot-logo.jpg"
  },
  {
    id: 5,
    nombre: "La Esperanza del Sur",
    imagen: "/images/ongs/la-esperanza-del-sur-logo.jpg"
  },
  {
    id: 6,
    nombre: "SOS Felina",
    imagen: "/images/ongs/sosfelina-logo.jpg"
  },
  {
    id: 7,
    nombre: "Valle Colino",
    imagen: "/images/ongs/valle-colino-logo.jpg"
  }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-avanzar slides cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <CepHeader />
      
      {/* Hero Slideshow - Mobile First Responsive */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-contain object-center"
              />
            </div>
          ))}
          
          {/* Controles del slideshow - Mobile optimized */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          {/* Indicadores - Mobile optimized */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de iconos - Mobile First */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">PROFESORES CUALIFICADOS</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">CURSOS PROFESIONALES</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">RÁPIDA SALIDA LABORAL</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Agencia de Colocación / Formación Gratuita */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">AGENCIA DE COLOCACIÓN</h2>
              <p className="text-gray-600 mb-6">Ofrecemos un servicio para demandantes de empleo.</p>
              <button className="bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors">
                Ir a la Agencia
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">FORMACIÓN GRATUITA</h2>
              <p className="text-gray-600 mb-6">Cursos subvencionados para trabajadores y desempleados.</p>
              <button className="bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors">
                VER CURSOS GRATUITOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Campaña Otoño 2025 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cep-primary mb-4">CURSOS INICIO SEPTIEMBRE 2025</h2>
            <p className="text-xl text-gray-600 mb-2">¡ÚLTIMAS PLAZAS DISPONIBLES!</p>
            <p className="text-lg text-cep-primary font-semibold">Reserva tu plaza ahora - Los cursos empiezan pronto</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cursosOtono2025.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">{curso.titulo}</h3>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <p><strong>Sede:</strong> {curso.sede}</p>
                    <p><strong>Inicio:</strong> {curso.inicio}</p>
                    <p><strong>Duración:</strong> {curso.duracion}</p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 line-clamp-3">{curso.descripcion}</p>
                  {curso.hasPage ? (
                    <Link 
                      to={curso.link}
                      className="w-full bg-cep-primary text-white py-2 px-4 rounded-lg hover:bg-cep-primary-dark transition-colors font-semibold text-center block text-sm sm:text-base"
                    >
                      VER CURSO COMPLETO
                    </Link>
                  ) : (
                    <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-semibold cursor-not-allowed text-sm sm:text-base">
                      PRÓXIMAMENTE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-cep-primary text-white p-6 rounded-lg inline-block">
              <h3 className="text-xl font-bold mb-2">⏰ ¡No te quedes sin plaza!</h3>
              <p className="mb-4">Los cursos empiezan en septiembre. Reserva ahora y asegura tu futuro profesional.</p>
              <button className="bg-white text-cep-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold">
                CONTACTAR AHORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Formación Gratuita */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img 
              src="/images/formacion-gratuita.jpg" 
              alt="Formación gratuita" 
              className="mx-auto mb-8 rounded-lg shadow-lg max-w-md w-full"
            />
            <div className="flex justify-center space-x-8">
              <button className="bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors">
                TRABAJADORES/AS DESEMPLEADOS/AS
              </button>
              <button className="bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors">
                TRABAJADORES/AS OCUPADOS/AS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Cursos Privados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-cep-primary text-center mb-12">NUESTROS CURSOS PRIVADOS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cursosPrivados.map((curso) => (
              <div key={curso.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-white text-lg font-bold text-center px-4 drop-shadow-lg">{curso.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors">
              VER TODOS LOS CURSOS
            </button>
          </div>
        </div>
      </section>

      {/* Conócenos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cep-primary mb-6">CONÓCENOS</h2>
              <p className="text-gray-600 mb-6">
                CEP Santa Cruz es una empresa familiar rodeada de un magnifico equipo de profesionales. 
                Llevamos en el ADN la enseñanza, somos la séptima generación dedicada a la docencia. 
                También colaboramos con éxito con el servicio y asistimos regularmente a seminarios de formación.
              </p>
              <button className="bg-cep-primary text-white px-6 py-2 rounded-lg hover:bg-cep-primary-dark transition-colors">
                Saber más
              </button>
            </div>
            <div className="text-center">
              <img 
                src="/images/video-preview.jpg" 
                alt="Vista previa del video" 
                className="w-full h-64 rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Docente */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {equipoDocente.map((profesor) => (
              <div key={profesor.id} className="text-center">
                <img
                  src={profesor.imagen}
                  alt={profesor.nombre}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-cep-primary">{profesor.nombre}</h3>
                <p className="text-gray-600">{profesor.especialidad}</p>
                <p className="text-sm text-gray-500">Cursos Tenerife</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colaboradores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-cep-primary text-center mb-12">
            Agradecemos la buena relación y profesionalidad de nuestros colaboradores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {colaboradores.map((colaborador) => (
              <div key={colaborador.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={colaborador.imagen}
                  alt={colaborador.nombre}
                  className="w-20 h-20 object-contain mx-auto"
                  title={colaborador.nombre}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONGs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-cep-primary text-center mb-6">
            Concienciados ante la necesidad de dar cuidado a nuestros animales abandonados, somos socios de:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 items-center justify-items-center mb-8">
            {ongs.map((ong) => (
              <div key={ong.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={ong.imagen}
                  alt={ong.nombre}
                  className="w-20 h-20 object-contain mx-auto"
                  title={ong.nombre}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              Somos una empresa socialmente responsable, sensible ante las injusticias y desigualdades 
              por lo que colaboramos con varias ONGs.
            </p>
          </div>
        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default HomePage; 