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
    imagen: "/images/cursos/mundo-animal.jpg",
    inicio: "Septiembre 2025",
    duracion: "6 meses - 25 sesiones",
    descripcion: "Técnicas de adiestramiento de base y educación canina nivel I",
    link: "/adiestramiento-canino",
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
    link: "/auxiliar-clinicas-esteticas",
    hasPage: false
  },
  {
    id: 3,
    titulo: "Agente Funerario",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    inicio: "Septiembre 2025",
    duracion: "6 meses",
    descripcion: "Curso profesional para trabajar en servicios funerarios. Incluye protocolos, legislación y atención a familias",
    link: "/agente-funerario",
    hasPage: false
  },
  {
    id: 4,
    titulo: "Auxiliar Veterinario",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/mundo-animal.jpg",
    inicio: "Septiembre 2025",
    duracion: "10 meses",
    descripcion: "Asistencia en clínicas veterinarias, cuidado animal, instrumentación quirúrgica y atención al cliente",
    link: "/auxiliar-veterinario",
    hasPage: false
  },
  {
    id: 5,
    titulo: "Auxiliar de Farmacia",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    inicio: "Septiembre 2025",
    duracion: "8 meses",
    descripcion: "Formación completa para trabajar en farmacias. Dispensación de medicamentos y atención farmacéutica",
    link: "/auxiliar-farmacia",
    hasPage: false
  },
  {
    id: 6,
    titulo: "Auxiliar de Odontología",
    sede: "CEP SANTA CRUZ",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    inicio: "Septiembre 2025",
    duracion: "9 meses",
    descripcion: "Asistencia en clínicas dentales, instrumental odontológico, radiología dental y atención al paciente",
    link: "/auxiliar-odontologia",
    hasPage: false
  },
  {
    id: 7,
    titulo: "Auxiliar de Enfermería",
    sede: "CEP NORTE",
    imagen: "/images/cursos/auxiliar-de.jpg",
    inicio: "Septiembre 2025",
    duracion: "10 meses",
    descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes",
    link: "/auxiliar-enfermeria-norte",
    hasPage: false
  },
     {
     id: 8,
     titulo: "Auxiliar de Enfermería",
     sede: "CEP SANTA CRUZ",
     imagen: "/images/cursos/auxiliar-de.jpg",
     inicio: "Septiembre 2025",
     duracion: "10 meses",
     descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes",
     link: "/auxiliar-enfermeria-santacruz",
     hasPage: false
   },
   {
     id: 9,
     titulo: "Gestión Administrativa",
     sede: "CEP NORTE",
     imagen: "/images/cursos/ciclos-formativos.jpg",
     inicio: "Septiembre 2025",
     duracion: "8 meses",
     descripcion: "Administración de empresas, gestión documental, atención al cliente y procedimientos administrativos",
     link: "/gestion-administrativa-norte",
     hasPage: false
   },
   {
     id: 10,
     titulo: "Gestión Administrativa", 
     sede: "CEP SANTA CRUZ",
     imagen: "/images/cursos/ciclos-formativos.jpg",
     inicio: "Septiembre 2025",
     duracion: "8 meses",
     descripcion: "Administración de empresas, gestión documental, atención al cliente y procedimientos administrativos",
     link: "/gestion-administrativa-santacruz",
     hasPage: false
   },
   {
     id: 11,
     titulo: "Marketing Digital",
     sede: "CEP NORTE",
     imagen: "/images/cursos/diseno-de-medios.jpg",
     inicio: "Septiembre 2025",
     duracion: "6 meses",
     descripcion: "Estrategias de marketing online, redes sociales, SEO, SEM y comercio electrónico para empresas",
     link: "/marketing-digital-norte",
     hasPage: false
   },
   {
     id: 12,
     titulo: "Marketing Digital",
     sede: "CEP SANTA CRUZ", 
     imagen: "/images/cursos/diseno-de-medios.jpg",
     inicio: "Septiembre 2025",
     duracion: "6 meses",
     descripcion: "Estrategias de marketing online, redes sociales, SEO, SEM y comercio electrónico para empresas",
     link: "/marketing-digital-santacruz",
     hasPage: false
   },
   {
     id: 13,
     titulo: "Atención Sociosanitaria",
     sede: "CEP NORTE",
     imagen: "/images/cursos/salud-bienestar-y-deporte.jpg",
     inicio: "Septiembre 2025",
     duracion: "12 meses",
     descripcion: "Cuidado de personas dependientes, técnicas de asistencia personal y apoyo en el domicilio",
     link: "/atencion-sociosanitaria-norte",
     hasPage: false
   },
   {
     id: 14,
     titulo: "Atención Sociosanitaria", 
     sede: "CEP SANTA CRUZ",
     imagen: "/images/cursos/salud-bienestar-y-deporte.jpg",
     inicio: "Septiembre 2025",
     duracion: "12 meses",
     descripcion: "Cuidado de personas dependientes, técnicas de asistencia personal y apoyo en el domicilio",
     link: "/atencion-sociosanitaria-santacruz",
     hasPage: false
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
      
      {/* Hero Slideshow - Solo imágenes */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
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
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Controles del slideshow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de iconos - PROFESORES CUALIFICADOS, CURSOS PROFESIONALES, RÁPIDA SALIDA LABORAL */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cep-primary mb-2">PROFESORES CUALIFICADOS</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cep-primary mb-2">CURSOS PROFESIONALES</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cep-primary mb-2">RÁPIDA SALIDA LABORAL</h3>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursosOtono2025.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cep-primary mb-2">{curso.titulo}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>Sede:</strong> {curso.sede}</p>
                    <p><strong>Inicio:</strong> {curso.inicio}</p>
                    <p><strong>Duración:</strong> {curso.duracion}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{curso.descripcion}</p>
                  {curso.hasPage ? (
                    <Link 
                      to={curso.link}
                      className="w-full bg-cep-primary text-white py-2 px-4 rounded-lg hover:bg-cep-primary-dark transition-colors font-semibold text-center block"
                    >
                      VER CURSO COMPLETO
                    </Link>
                  ) : (
                    <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
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
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold text-center px-4">{curso.titulo}</h3>
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

      {/* Colaboradores y ONGs - simplificado */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-cep-primary text-center mb-8">
            Agradecemos la buena relación y profesionalidad de nuestros colaboradores
          </h2>
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