import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Award, TrendingUp, ExternalLink } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { Link } from 'react-router-dom';
import { cursosMaestro } from '../config/cursos-maestro';
import type { CursoMaestro } from '../config/cursos-maestro';
import { ordenarCursosPorPrioridad } from '../utils/timeUtils';
import CursoCard from '../components/molecules/CursoCard';
import CicloCard from '../components/molecules/CicloCard';
import SedeSelector from '../components/organisms/SedeSelector';

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

// Datos de las categorías de cursos privados
const categoriasCursos = [
  {
    id: 1,
    titulo: "CICLOS FORMATIVOS",
    imagen: "/images/cursos/ciclos-formativos.jpg",
    categoria: "ciclos"
  },
  {
    id: 3,
    titulo: "SALUD, BIENESTAR Y DEPORTE",
    imagen: "/images/cursos/salud-bienestar-y-deporte.jpg",
    categoria: "bienestar"
  },
  {
    id: 4,
    titulo: "MUNDO ANIMAL",
    imagen: "/images/cursos/mundo-animal.jpg",
    categoria: "veterinaria"
  },
  {
    id: 5,
    titulo: "ESPECIALIZACIÓN SANITARIA",
    imagen: "/images/cursos/especializacion-sanitaria.jpg",
    categoria: "sanidad"
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

// Datos de Colaboradores y ONGs
  const _colaboradores = [
  { nombre: 'Aboras', src: '/images/colaboradores/aboras-logo.jpg' },
  { nombre: 'Clínica Dental Cidme', src: '/images/colaboradores/cidme-logo.jpg' },
  { nombre: 'Clínica Alper', src: '/images/colaboradores/clinica-alper-logo.jpg' },
  { nombre: 'Clínica Anaza', src: '/images/colaboradores/clinica-anaza-logo.jpg' },
  { nombre: 'Clínica Duggi', src: '/images/colaboradores/clinica-duggi-logo.jpg' },
  { nombre: 'Mi Óptica Central', src: '/images/colaboradores/mi-optica-central-logo.jpg' },
];

  const _ongs = [
  { nombre: 'Addanca', src: '/images/ongs/addanca-logo.jpg' },
  { nombre: 'Adepac', src: '/images/ongs/adepac-logo.jpg' },
  { nombre: 'Animal Club', src: '/images/ongs/animal-club-logo.jpg' },
  { nombre: 'Apanot', src: '/images/ongs/apanot-logo.jpg' },
  { nombre: 'La Esperanza del Sur', src: '/images/ongs/la-esperanza-del-sur-logo.jpg' },
  { nombre: 'SOS Felina', src: '/images/ongs/sosfelina-logo.jpg' },
  { nombre: 'Valle Colino', src: '/images/ongs/valle-colino-logo.jpg' },
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

  // Filtrar cursos por sede y estado
  const cursosNorte = ordenarCursosPorPrioridad(
    cursosMaestro.filter(c => c.sede === 'Norte' && c.categoria !== 'ciclos')
  );
  const cursosSantaCruz = ordenarCursosPorPrioridad(
    cursosMaestro.filter(c => c.sede === 'Santa Cruz' && c.categoria !== 'ciclos')
  );
  
  // const _cursosDestacados = ordenarCursosPorPrioridad(
  //   cursosMaestro.filter(c => c.destacado && c.estado === 'activo' && c.categoria !== 'ciclos')
  // );

  const ciclosFormativos = cursosMaestro.filter(c => c.categoria === 'ciclos' && c.estado === 'activo');
  
  // Para asegurar que mostramos solo una tarjeta por tipo de ciclo, pero usando la información más actualizada.
  const ciclosFormativosUnicos = [
    ciclosFormativos.find(c => c.slugBase === 'cfgm-farmacia-parafarmacia'),
    ciclosFormativos.find(c => c.slugBase === 'cfgs-higiene-bucodental')
  ].filter(Boolean) as CursoMaestro[];

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
              <a 
                href="https://cursostenerife.agenciascolocacion.com/candidatos/registro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors"
              >
                Ir a la Agencia
              </a>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">FORMACIÓN GRATUITA</h2>
              <p className="text-gray-600 mb-6">Cursos subvencionados para trabajadores y desempleados.</p>
              <a 
                href="https://cursostenerife.es/cursos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors"
              >
                VER CURSOS GRATUITOS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Campaña Otoño 2025 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cep-primary mb-4">CURSOS CAMPAÑA OTOÑO 2025</h2>
            <p className="text-xl text-gray-600 mb-2">¡ÚLTIMAS PLAZAS DISPONIBLES!</p>
            <p className="text-lg text-cep-primary font-semibold">Reserva tu plaza ahora - Los cursos empiezan pronto</p>
          </div>
          
          {/* Sección CEP NORTE */}
          {cursosNorte.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
                <h2 className="text-3xl font-bold text-gray-800 mx-4">SEDE CEP NORTE</h2>
                <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cursosNorte.map((curso) => <CursoCard key={curso.id} curso={curso} />)}
              </div>
            </div>
          )}

          {/* Sección CEP SANTA CRUZ */}
          {cursosSantaCruz.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
                <h2 className="text-3xl font-bold text-gray-800 mx-4">SEDE CEP SANTA CRUZ</h2>
                <span className="flex-grow h-1 bg-cep-primary rounded-full"></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cursosSantaCruz.map((curso) => <CursoCard key={curso.id} curso={curso} />)}
              </div>
            </div>
          )}
          
          <div className="text-center">
            <div className="bg-cep-primary text-white p-6 rounded-lg inline-block">
              <h3 className="text-xl font-bold mb-2">⏰ ¡No te quedes sin plaza!</h3>
              <p className="mb-4">Los cursos empiezan pronto. Reserva ahora y asegura tu futuro profesional.</p>
              <a 
                href="https://cursostenerife.es/contacto/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-cep-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold"
              >
                CONTACTAR AHORA
              </a>
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
              <a 
                href="https://cursostenerife.es/cursos/#desempleadas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors"
              >
                TRABAJADORES/AS DESEMPLEADOS/AS
              </a>
              <a 
                href="https://cursostenerife.es/cursos/#ocupadas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors"
              >
                TRABAJADORES/AS OCUPADOS/AS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Cursos Privados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-cep-primary text-center mb-12">NUESTROS CURSOS PRIVADOS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriasCursos.map((categoria) => (
              <div key={categoria.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src={categoria.imagen}
                  alt={categoria.titulo}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-white text-lg font-bold text-center px-4 drop-shadow-lg">{categoria.titulo}</h3>
                </div>
                <Link to={`/cursos/${categoria.categoria}`} className="absolute inset-0" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a 
              href="https://cursostenerife.es/cursos/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-cep-primary text-white px-8 py-3 rounded-lg hover:bg-cep-primary-dark transition-colors"
            >
              VER TODOS LOS CURSOS
            </a>
          </div>
        </div>
      </section>

      {/* Sección Cursos por Sede */}
      <SedeSelector />

      {/* Sección Especial - Ciclos Formativos Oficiales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-400 text-cep-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span className="mr-2">🏆</span>
              TÍTULOS OFICIALES MINISTERIO DE EDUCACIÓN
            </div>
            <h2 className="text-4xl font-bold mb-4 text-cep-primary">CICLOS FORMATIVOS OFICIALES</h2>
            <p className="text-xl text-gray-600 mb-2">Formación Profesional Homologada por el MEC</p>
            <p className="text-lg text-gray-500">3 Cursos Escolares • Acceso a Universidad • Becas disponibles</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ciclosFormativosUnicos.map(ciclo => (
              <CicloCard key={ciclo.id} ciclo={ciclo} />
            ))}
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="border-t border-gray-200"></div>

      {/* Equipo Docente */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cep-primary mb-4">Conoce a Nuestro Equipo Docente</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Profesionales apasionados y con amplia experiencia en sus sectores, dedicados a tu éxito.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10">
            {equipoDocente.map((profesor) => (
              <div key={profesor.id} className="text-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                  <img
                    src={profesor.imagen}
                    alt={`Foto de ${profesor.nombre}`}
                    className="w-full h-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800">{profesor.nombre}</h4>
                <p className="text-sm text-cep-primary font-medium">{profesor.especialidad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default HomePage; 