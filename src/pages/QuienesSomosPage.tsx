import React, { useEffect } from 'react';
import { Users, Heart, Target, CheckCircle, Quote, Play, Award, BookOpen } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const QuienesSomosPage: React.FC = () => {
  // Scroll al top cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonios = [
    {
      texto: "Gracias a CEP he conseguido encontrar una estabilidad laboral y una profesión que me gusta y que consigue hacerme llegar todas las noches a casa feliz",
      nombre: "Pilar",
      profesion: "Técnico sup. higiene bucodental",
      imagen: "/images/profesores/sara.jpg"
    },
    {
      texto: "Las practicas han sido 100% beneficiosas para mi, para mi aprendizaje, he conocido gente fantástica y estoy feliz con mi carta de recomendación",
      nombre: "Sonia", 
      profesion: "Técnico en odontología",
      imagen: "/images/profesores/cecilia.jpg"
    },
    {
      texto: "Feliz porque conseguí trabajo en la farmacia donde realice las prácticas profesionales",
      nombre: "Priscila",
      profesion: "Auxiliar de farmacia", 
      imagen: "/images/profesores/esther.jpg"
    },
    {
      texto: "Agradecida de la docente que me toco, no pude tener un mejor ejemplo",
      nombre: "Jennifer",
      profesion: "Auxiliar de odontología",
      imagen: "/images/profesores/nuria.jpg"
    }
  ];

  const fundadores = [
    {
      nombre: "Fran de Amo Olivier",
      cargo: "Director y Fundador",
      descripcion: "Séptima generación dedicada a la docencia. Visionario del proyecto educativo CEP con más de 25 años de experiencia en formación profesional.",
      imagen: "/images/profesores/luis.jpg" // Placeholder
    },
    {
      nombre: "Carol de Amo Olivier", 
      cargo: "Directora y Co-fundadora",
      descripcion: "Especialista en metodologías innovadoras y desarrollo curricular. Líder en la implementación de valores educativos holísticos.",
      imagen: "/images/profesores/livia.jpg" // Placeholder
    }
  ];

  const ongs = [
    'ADEPAC', 'ADDANCA', 'SOS felina', 'Valle Colino', 
    'Sonrisas Canarias', 'Caretta Caretta'
  ];

  const valores = [
    {
      titulo: "Respeto hacia nuestro alumnado",
      descripcion: "Trato hacia nuestro alumnado con la mirada en sus potencialidades."
    },
    {
      titulo: "Compromiso de mejora continua",
      descripcion: "Seguir avanzando comprendiendo, anticipando y satisfaciendo las necesidades y expectativas de nuestros clientes."
    },
    {
      titulo: "Vocación docente",
      descripcion: "Ejercer la docencia desde el amor. Por amor a la enseñanza, por amor al prójimo y con la fe de mejorar nuestro entorno."
    },
    {
      titulo: "Honestidad y transparencia",
      descripcion: "Con nuestro equipo de trabajo y hacia nuestros alumnos y sociedad realizando publicidad honesta y siendo transparentes."
    },
    {
      titulo: "Escucha activa",
      descripcion: "Nos proponemos este valor como pilar fundamental del cambio y mejora en todos los ámbitos."
    },
    {
      titulo: "Creatividad",
      descripcion: "Fomentamos la creatividad tanto en nuestro equipo como en nuestros alumnos como herramienta indispensable."
    },
    {
      titulo: "Empatía",
      descripcion: "Fomentamos el trabajo de la capacidad empática como cualidad indispensable tanto en nuestro equipo como en los alumnos."
    },
    {
      titulo: "Innovación",
      descripcion: "Realizar nuestros proyectos educativos desde la perspectiva de la innovación tanto a nivel pedagógico como tecnológico."
    },
    {
      titulo: "Profesionalidad",
      descripcion: "Cumpliendo los compromisos pactados con los alumnos y alumnas en los plazos estipulados."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CepHeader />
      
      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-r from-cep-primary to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
                NOSOTROS
              </h1>
              <p className="text-xl text-white drop-shadow-xl font-medium mb-8">
                Una empresa familiar dedicada a la enseñanza durante 7 generaciones, 
                comprometida con el desarrollo personal y profesional de nuestros estudiantes
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-sm opacity-90">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-sm opacity-90">Generaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Alumnos titulados</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 max-w-md">
                <img 
                  src="/images/logos/CIRCULO CEP FORMACION LOGO.png" 
                  alt="CEP Formación Logo"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold mb-2">CEP Formación</h3>
                  <p className="text-sm opacity-90">Centro de Enseñanzas Profesionales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Fundadores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">NUESTROS FUNDADORES</h2>
              <p className="text-xl text-gray-600">Fran y Carol de Amo Olivier - Séptima generación dedicada a la docencia</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {fundadores.map((fundador, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <img 
                        src={fundador.imagen} 
                        alt={fundador.nombre}
                        className="w-20 h-20 rounded-full object-cover border-4 border-cep-primary mr-6"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-cep-primary">{fundador.nombre}</h3>
                        <p className="text-lg text-gray-600 font-medium">{fundador.cargo}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{fundador.descripcion}</p>
                    <div className="mt-6 flex items-center text-cep-primary">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">7ª Generación en Docencia</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-cep-primary mb-6">Nuestra Historia</h2>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    CEP Santa Cruz es una <strong>empresa familiar</strong> (Fran y Carol de Amo Olivier) rodeada de un magnífico equipo de profesionales. 
                    Llevamos en el ADN la enseñanza, somos la <strong>séptima generación dedicada a la docencia</strong>.
                  </p>
                  <p className="mb-4">
                    Nuestro abuelo materno, maestro de escuela nacional participó en las misiones pedagógicas y nuestra abuela materna 
                    recorrió largos caminos en bicicleta para enseñar corte y confección. Nuestra madre abrió en 1981 el primer CEP 
                    (Centro de Enseñanzas Profesionales) en una pequeña localidad de la península.
                  </p>
                  <p className="mb-4">
                    En <strong>1998</strong> con 1% capital, 99% ilusión y 10 alumnos se abrió <strong>CEP Orotava</strong>. En <strong>2010</strong> 
                    abrimos <strong>CEP Santa Cruz</strong> en un pequeño local. En <strong>2017</strong> nos mudamos a nuestras actuales instalaciones 
                    y fuimos reconocidos por el M.E.C para la impartición del ciclo Superior de Higiene Bucodental.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-cep-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">7 Generaciones</h3>
                  <p className="text-gray-600">dedicadas a la enseñanza</p>
                </div>
                <div className="bg-pink-100 rounded-lg p-6 text-center">
                  <Quote className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-800 italic">
                    "Educar la mente sin educar el corazón no es educar en absoluto"
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Aristóteles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Visión */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-cep-primary mr-3" />
                  <h2 className="text-2xl font-bold text-cep-primary">NUESTRA VISIÓN</h2>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Contribuir al incremento de capacidades, habilidades y competencias profesionales que permita al alumno y alumna afrontar de forma exitosa los retos del mundo laboral y personal.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Promover los valores de la igualdad de género en la isla de Tenerife.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Colaborar en la educación hacia la responsabilidad social y medioambiente en la isla de Tenerife.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Dar visibilidad a la realidad animal y medioambiente de la isla de Tenerife.</span>
                  </li>
                </ul>
              </div>

              {/* Misión */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-pink-600 mr-3" />
                  <h2 className="text-2xl font-bold text-cep-primary">NUESTRA MISIÓN</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Nuestra intención es consolidarnos como un <strong>centro de referencia en el sector</strong>, 
                  impulsando proyectos educativos innovadores en consonancia con las necesidades de las empresas, 
                  del entorno social y necesidades medioambientales, potenciando los valores y capacidades en las 
                  personas que contribuyan a su crecimiento personal, profesional, y al enriquecimiento por tanto 
                  de la sociedad y sostenibilidad de nuestro entorno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">NUESTROS VALORES</h2>
              <p className="text-xl text-gray-600">Los pilares fundamentales que guían nuestra labor educativa</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {valores.map((valor, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-cep-primary mb-3">{valor.titulo}</h3>
                  <p className="text-gray-700 text-sm">{valor.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">NUESTRA METODOLOGÍA</h2>
              <p className="text-xl text-gray-600">Formación holística basada en inteligencias múltiples</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                El proyecto formativo de nuestro centro se basa en el concepto del ser humano como un <strong>ser holístico 
                y con inteligencias múltiples</strong>, por lo que es necesario verlo y acompañarlo desde esa perspectiva en el aula 
                para que pueda desarrollar sus potencialidades y por lo tanto tenga más posibilidades de éxito en sus relaciones 
                sociales, laborales y a nivel personal.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Enfoque Pedagógico</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Vínculo docente-alumno personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Actividades participativas y educación emocional</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Desarrollo de habilidades sociales y comunicación</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Implementación de nuevas tecnologías</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Compromiso Social</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Intervenciones de ONG's y sensibilización social</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Jornadas de puertas abiertas comunitarias</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Práctica empresarial como base del aprendizaje</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span>Evaluación continua y integral</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video sección mejorada */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">Conoce nuestras instalaciones</h2>
              <p className="text-lg text-gray-600">Descubre nuestros espacios formativos y metodología educativa</p>
            </div>
            
            <div className="relative bg-gradient-to-br from-cep-primary to-pink-600 rounded-xl overflow-hidden shadow-xl">
              <div className="relative aspect-video">
                <img 
                  src="/images/logos/CIRCULO CEP FORMACION LOGO.png" 
                  alt="CEP Formación - Video institucional"
                  className="absolute inset-0 w-full h-full object-contain bg-white/10 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <a 
                    href="https://www.youtube.com/watch?v=8NqQav808LY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                      <p className="text-sm font-medium">Ver Video Institucional</p>
                    </div>
                  </a>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium">CEP Formación - Tour Virtual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colaboraciones con ONG's */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-cep-primary mb-6">Colaboramos con ONG's Canarias</h2>
            <p className="text-lg text-gray-600 mb-8">
              Durante todo el año colaboramos con diferentes organizaciones para ser responsables 
              con nuestro entorno social y ambiental
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {ongs.map((ong, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-cep-primary to-pink-600 text-white px-6 py-3 rounded-full font-semibold"
                >
                  {ong}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cep-primary mb-4">LA OPINIÓN DE NUESTROS ALUMNOS</h2>
              <p className="text-xl text-gray-600">Historias de éxito que nos motivan cada día</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonios.map((testimonio, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-cep-primary">
                  <div className="mb-4">
                    <img 
                      src={testimonio.imagen} 
                      alt={testimonio.nombre}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-cep-primary"
                    />
                  </div>
                  <Quote className="w-6 h-6 text-cep-primary mx-auto mb-3" />
                  <p className="text-gray-700 italic mb-4 text-sm">
                    "{testimonio.texto}"
                  </p>
                  <div>
                    <p className="font-bold text-cep-primary">{testimonio.nombre}</p>
                    <p className="text-sm text-gray-600">{testimonio.profesion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-cep-primary to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres formar parte de nuestra familia educativa?</h2>
          <p className="text-xl mb-8">Descubre cómo podemos ayudarte a alcanzar tus metas profesionales</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/cursos"
              className="bg-white text-cep-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Todos los Cursos
            </a>
            <a 
              href="/contacto"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-cep-primary transition-colors"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default QuienesSomosPage; 