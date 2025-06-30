import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Award, TrendingUp, ExternalLink } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { Link } from 'react-router-dom';
import { cursosMaestro } from '../config/cursos-maestro';
import type { CursoMaestro } from '../config/cursos-maestro';

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

// Componente de tarjeta de curso reutilizable
const CursoCard: React.FC<{ curso: CursoMaestro }> = ({ curso }) => {
  const getFechaTag = (inicio: string | undefined) => {
    if (!inicio) return { text: 'Próximamente', color: 'bg-gray-500' };
    const mes = inicio.toLowerCase();
    if (mes.includes('julio')) return { text: 'JULIO 2025', color: 'bg-orange-500' };
    if (mes.includes('septiembre')) return { text: 'SEPTIEMBRE 2025', color: 'bg-green-500' };
    if (mes.includes('octubre')) return { text: 'OCTUBRE 2025', color: 'bg-blue-500' };
    return { text: inicio.toUpperCase(), color: 'bg-purple-500' };
  };

  const fechaTag = getFechaTag(curso.inicio);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={curso.imagen}
          alt={curso.nombre}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${fechaTag.color}`}>
          {fechaTag.text}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-cep-primary mb-2">{curso.nombre}</h3>
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">{curso.copy.slogan}</p>
        <Link
          to={`/curso/${curso.slug}`}
          className="w-full bg-cep-primary text-white py-2 px-4 rounded-lg hover:bg-cep-primary-dark transition-colors font-semibold text-center block text-sm sm:text-base mt-auto"
        >
          VER CURSO COMPLETO
        </Link>
      </div>
    </div>
  );
};

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
  const cursosNorte = cursosMaestro.filter(c => c.sede === 'Norte' && c.estado === 'activo' && c.categoria !== 'ciclos');
  const cursosSantaCruz = cursosMaestro.filter(c => c.sede === 'Santa Cruz' && c.estado === 'activo' && c.categoria !== 'ciclos');
  const ciclosFormativos = cursosMaestro.filter(c => c.categoria === 'ciclos' && c.estado === 'activo');

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
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-cep-primary mb-2">CEP NORTE</h3>
                <p className="text-gray-600">Cursos disponibles en nuestra sede del Norte</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cursosNorte.map((curso) => <CursoCard key={curso.id} curso={curso} />)}
              </div>
            </div>
          )}

          {/* Sección CEP SANTA CRUZ */}
          {cursosSantaCruz.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-cep-primary mb-2">CEP SANTA CRUZ</h3>
                <p className="text-gray-600">Cursos disponibles en nuestra sede de Santa Cruz</p>
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

      {/* Sección Especial - Ciclos Formativos Oficiales */}
      <section className="py-16 bg-gradient-to-br from-cep-primary via-pink-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-400 text-cep-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span className="mr-2">🏆</span>
              TÍTULOS OFICIALES MINISTERIO DE EDUCACIÓN
            </div>
            <h2 className="text-4xl font-bold mb-4">CICLOS FORMATIVOS OFICIALES</h2>
            <p className="text-xl text-pink-100 mb-2">Formación Profesional Homologada por el MEC</p>
            <p className="text-lg text-pink-200">3 años de duración • Acceso directo a Universidad • Becas disponibles</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {ciclosFormativos.map(curso => {
                const getFechaTag = (inicio: string | undefined) => {
                  if (!inicio) return { text: 'Próximamente', color: 'bg-gray-500' };
                  const mes = inicio.toLowerCase();
                  if (mes.includes('septiembre')) return { text: 'SEPTIEMBRE 2025', color: 'bg-green-500' };
                  return { text: inicio.toUpperCase(), color: 'bg-purple-500' };
                };
                const fechaTag = getFechaTag(curso.inicio);
                const esGradoSuperior = curso.nombre.includes('CFGS');

                return (
                  <div key={curso.id} className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={curso.imagen}
                        alt={curso.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${fechaTag.color}`}>
                          {fechaTag.text}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-400 text-cep-primary px-3 py-1 rounded-full text-xs font-bold">
                        {esGradoSuperior ? 'GRADO SUPERIOR' : 'GRADO MEDIO'}
                      </div>
                    </div>
                    <div className="p-6 text-gray-800">
                      <h3 className="text-xl font-bold text-cep-primary mb-3">{curso.nombre}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📍</span>
                          <span className="font-semibold">Sede:</span>
                          <span className="ml-1">{curso.sede}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">⏱️</span>
                          <span className="font-semibold">Duración:</span>
                          <span className="ml-1 text-cep-primary font-bold">{curso.descripcionDetallada?.infoAdicional?.duracion || '2.000 horas'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🎓</span>
                          <span className="font-semibold">Título:</span>
                          <span className="ml-1">Oficial MEC</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Prácticas Incluidas</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Becas MEC</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Acceso Universidad</span>
                      </div>
                      <Link
                        to={`/curso/${curso.slug}`}
                        className="block w-full bg-cep-primary text-white text-center py-3 rounded-lg hover:bg-cep-primary-dark transition-colors font-bold"
                      >
                        VER INFORMACIÓN COMPLETA
                      </Link>
                    </div>
                  </div>
                );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">¿Por qué elegir nuestros Ciclos Formativos?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🏛️</div>
                  <h4 className="font-bold mb-2">Título Oficial MEC</h4>
                  <p className="text-sm text-pink-100">Reconocimiento nacional e internacional</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-bold mb-2">Acceso Universidad</h4>
                  <p className="text-sm text-pink-100">Acceso directo a estudios universitarios</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-bold mb-2">Becas Disponibles</h4>
                  <p className="text-sm text-pink-100">Becas del Ministerio de Educación</p>
                </div>
              </div>
            </div>
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
              <a 
                href="https://cursostenerife.es/quienes-somos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-cep-primary text-white px-6 py-2 rounded-lg hover:bg-cep-primary-dark transition-colors"
              >
                Saber más
              </a>
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
            {/* Colaboradores hardcoded */}
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
            {/* ONGs hardcoded */}
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