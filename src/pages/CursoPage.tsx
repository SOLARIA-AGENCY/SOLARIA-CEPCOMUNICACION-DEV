import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

// DATA STORE - Integrado por fallo en creación de archivo
interface CursoData {
  slug: string; nombre: string; sede: string; tag: string; inicio: string; imagen: string;
  copy: { slogan: string; textosPrincipales: string[]; titulos: string[]; descripciones: string[]; };
}

const cursosOtono2025: CursoData[] = [
    { slug: 'adiestramiento-canino-norte', nombre: 'Adiestramiento Canino', sede: 'Norte', tag: 'otono-2025-adiestramiento-canino-norte', inicio: 'Septiembre 2025', imagen: '/images/cursos/mundo-animal.jpg', copy: { slogan: 'Haz de tu pasión por los perros tu profesión.', textosPrincipales: ['Fórmate en Adiestramiento Canino con prácticas reales y título CEP. Plazas limitadas.', 'Aprende técnicas de educación y manejo canino con instructores expertos. Prácticas garantizadas y salida laboral real.', 'Conviértete en adiestrador profesional y trabaja con perros de forma ética y efectiva. Plazas abiertas.'], titulos: ['Fórmate como adiestrador canino. Prácticas reales y empleo.', 'Curso de adiestramiento con prácticas y título CEP.', 'Da el salto profesional al mundo canino.'], descripciones: ['Descubre cómo convertir tu pasión por los perros en profesión.', 'Haz clic y conoce nuestro curso de adiestrador canino.', 'Solicita plaza y accede a prácticas reales. Más info.'] } },
    { slug: 'agente-funerario-santacruz', nombre: 'Agente Funerario', sede: 'Santa Cruz', tag: 'otono-2025-agente-funerario-santacruz', inicio: 'Septiembre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Fórmate en un sector estable con futuro.', textosPrincipales: ['Fórmate como Agente Funerario y trabaja en un sector estable con futuro. Curso oficial, prácticas reales y orientación laboral garantizada.', 'Descubre una profesión humana y necesaria. Curso de Agente Funerario con prácticas en empresas y doble titulación.', 'Da el paso a una carrera con estabilidad laboral. Fórmate como agente funerario con CEP y accede a empleo real.'], titulos: ['Curso Agente Funerario con prácticas y empleo garantizado.', 'Fórmate en servicios funerarios. Estabilidad laboral real.', 'Especialízate como agente funerario. Plazas abiertas.'], descripciones: ['Solicita información sobre el curso más completo del sector.', 'Descubre una profesión estable y humana. Haz clic.', 'Conoce fechas, requisitos y salidas laborales. Más info.'] } },
    { slug: 'auxiliar-clinico-veterinario-norte', nombre: 'Auxiliar Clínico Veterinario', sede: 'Norte', tag: 'otono-2025-auxiliar-clinico-veterinario-norte', inicio: 'Septiembre 2025', imagen: '/images/cursos/mundo-animal.jpg', copy: { slogan: 'Convierte tu amor por los animales en tu futuro.', textosPrincipales: ['Fórmate como Auxiliar Clínico Veterinario y trabaja en clínicas, refugios y centros de acogida. Incluye 350h de prácticas reales, doble diploma y grupos reducidos.', 'Convierte tu amor por los animales en tu futuro profesional. Curso presencial, prácticas en empresa y doble diploma en el Norte de Tenerife.', 'Empieza tu carrera como Auxiliar Veterinario con CEP Norte. Aprende de profesionales en activo, disfruta de prácticas reales y consigue orientación laboral.'], titulos: ['Auxiliar Veterinario Norte. Prácticas reales y doble diploma.', 'Fórmate como ACV en el Norte. 350h de prácticas garantizadas.', 'Da el salto al mundo animal. Curso ACV Norte de Tenerife.'], descripciones: ['Solicita información y comienza tu futuro en el mundo animal Norte.', 'Descubre cómo trabajar con animales en el Norte de Tenerife.', 'Reserva plaza en el curso líder de veterinaria del Norte.'] } },
    { slug: 'auxiliar-clinico-veterinario-santacruz', nombre: 'Auxiliar Clínico Veterinario', sede: 'Santa Cruz', tag: 'otono-2025-auxiliar-clinico-veterinario-santacruz', inicio: 'Septiembre 2025', imagen: '/images/cursos/mundo-animal.jpg', copy: { slogan: 'Tu vocación animal, nuestra formación profesional.', textosPrincipales: ['Fórmate como Auxiliar Clínico Veterinario y trabaja en clínicas, refugios y centros de acogida. Incluye 350h de prácticas reales, doble diploma y grupos reducidos.', 'Convierte tu amor por los animales en tu futuro profesional. Curso presencial, prácticas en empresa y doble diploma. Fórmate con expertos.', 'Empieza tu carrera como Auxiliar Veterinario con CEP. Aprende de profesionales en activo, disfruta de prácticas reales y consigue orientación laboral.'], titulos: ['Haz de tu pasión por los animales tu empleo. Curso con prácticas reales.', 'Fórmate como Auxiliar Veterinario en clínicas. Prácticas garantizadas.', 'Da el salto al mundo animal. Curso con 350h de prácticas.'], descripciones: ['Solicita información y comienza tu futuro en el mundo animal.', 'Descubre cómo trabajar con animales y obtener tu diploma oficial.', 'Reserva plaza en el curso líder de veterinaria. Fechas de inicio.'] } },
    { slug: 'auxiliar-clinicas-esteticas-santacruz', nombre: 'Auxiliar de Clínicas Estéticas', sede: 'Santa Cruz', tag: 'otono-2025-auxiliar-clinicas-esteticas-santacruz', inicio: 'Octubre 2025', imagen: '/images/cursos/salud-bienestar-y-deporte.jpg', copy: { slogan: 'Descubre el mundo de la estética profesional.', textosPrincipales: ['Fórmate como Auxiliar de Clínicas Estéticas y trabaja en centros de belleza y medicina estética. Curso con prácticas reales y doble titulación.', 'Aprende técnicas avanzadas, disfruta de prácticas garantizadas y accede a empleo real.', 'Especialízate en medicina estética y tratamientos de belleza. Curso presencial con prácticas en clínicas y orientación laboral.'], titulos: ['Auxiliar Clínicas Estéticas. Prácticas reales y empleo.', 'Curso de estética profesional. Doble titulación.', 'Especialízate en medicina estética. Plazas abiertas.'], descripciones: ['Descubre cómo trabajar en el sector de la belleza y estética.', 'Solicita información sobre nuestro curso de estética profesional.', 'Conoce fechas, temario y salidas laborales en estética.'] } },
    { slug: 'auxiliar-enfermeria-norte', nombre: 'Auxiliar de Enfermería', sede: 'Norte', tag: 'otono-2025-auxiliar-enfermeria-norte', inicio: 'Noviembre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Da el paso hacia una profesión estable y humana.', textosPrincipales: ['Fórmate como Auxiliar de Enfermería y comienza una carrera con futuro en centros sanitarios y hospitales del Norte. Incluye prácticas reales, doble diploma y grupos reducidos.', 'Da el paso hacia una profesión estable y humana en el Norte de Tenerife. Curso con prácticas en hospitales, formación actualizada y doble titulación.', 'Curso de Auxiliar de Enfermería Norte: prácticas en empresas, orientación laboral y doble diploma. Prepárate para trabajar donde más importa.'], titulos: ['Conviértete en Auxiliar de Enfermería Norte. Prácticas reales.', 'Da el salto al sector sanitario Norte. Empleo asegurado.', 'Fórmate en salud Norte. Curso presencial, doble titulación.'], descripciones: ['Descubre cómo trabajar en hospitales del Norte de Tenerife.', 'Reserva tu plaza Norte y accede a prácticas reales.', 'Fórmate con los mejores del Norte y consigue empleo.'] } },
    { slug: 'auxiliar-enfermeria-santacruz', nombre: 'Auxiliar de Enfermería', sede: 'Santa Cruz', tag: 'otono-2025-auxiliar-enfermeria-santacruz', inicio: 'Septiembre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Fórmate para trabajar donde más importa.', textosPrincipales: ['Fórmate como Auxiliar de Enfermería y comienza una carrera con futuro en centros sanitarios y hospitales. Incluye prácticas reales, doble diploma y grupos reducidos.', 'Da el paso hacia una profesión estable y humana. Curso con prácticas en hospitales, formación actualizada y doble titulación.', 'Descubre la formación más completa en Auxiliar de Enfermería. Prácticas reales, grupos reducidos y empleabilidad asegurada.'], titulos: ['Conviértete en Auxiliar de Enfermería. Prácticas reales y doble diploma.', 'Da el salto al sector sanitario. Curso con empleo asegurado.', 'Comienza tu carrera en sanidad. Prácticas en hospitales.'], descripciones: ['Descubre cómo puedes trabajar en hospitales y centros médicos.', 'Reserva tu plaza y accede a prácticas reales.', 'Tu futuro en la sanidad comienza aquí.'] } },
    { slug: 'auxiliar-farmacia-dermo-norte', nombre: 'Auxiliar Farmacia + Dermo', sede: 'Norte', tag: 'otono-2025-auxiliar-farmacia-dermo-norte', inicio: 'Octubre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Especialízate en farmacia y dermocosmética.', textosPrincipales: ['Especialízate como Auxiliar de Farmacia y Parafarmacia con Dermocosmética en el Norte. Curso presencial, prácticas reales y título oficial.', 'Da el salto profesional en farmacia, perfumería o parafarmacia del Norte. Prácticas en empresas, formación en dermocosmética y orientación laboral.', 'Fórmate en farmacia y dermocosmética con CEP Norte. Grupos reducidos, prácticas garantizadas y doble diploma.'], titulos: ['Fórmate como Auxiliar de Farmacia Norte. Prácticas y título oficial.', 'Curso farmacia y dermocosmética Norte: prácticas reales y empleo.', 'Tu futuro en farmacia Norte empieza aquí. Doble diploma.'], descripciones: ['Haz clic y descubre tu empleo en farmacia del Norte.', 'Solicita tu plaza Norte y accede a prácticas en empresas.', 'Conoce el temario y salidas profesionales Norte.'] } },
    { slug: 'auxiliar-odontologia-norte', nombre: 'Auxiliar en Odontología', sede: 'Norte', tag: 'otono-2025-auxiliar-odontologia-norte', inicio: 'Noviembre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Da el paso al sector dental.', textosPrincipales: ['Fórmate como Auxiliar de Odontología con especialidad en Periodoncia en el Norte. Curso presencial, prácticas reales y orientación laboral.', 'Descubre el curso más completo en odontología del Norte. Prácticas en clínicas, grupos reducidos y doble diploma.', 'Prepárate para trabajar en clínicas dentales del Norte con nuestro curso especializado. Prácticas garantizadas y empleabilidad real.'], titulos: ['Fórmate como auxiliar dental Norte y especialízate en periodoncia.', 'Curso de odontología Norte con prácticas en clínicas.', 'Da el salto al sector dental Norte. Plazas limitadas.'], descripciones: ['Descubre cómo conseguir tu empleo en odontología Norte.', 'Solicita información Norte y accede a prácticas reales.', 'Empieza tu carrera en el sector dental Norte.'] } },
    { slug: 'auxiliar-odontologia-santacruz', nombre: 'Auxiliar en Odontología', sede: 'Santa Cruz', tag: 'otono-2025-auxiliar-odontologia-santacruz', inicio: 'Noviembre 2025', imagen: '/images/cursos/especializacion-sanitaria.jpg', copy: { slogan: 'Prepárate para trabajar en clínicas dentales.', textosPrincipales: ['Fórmate como Auxiliar de Odontología con especialidad en Periodoncia. Curso presencial, prácticas reales y orientación laboral.', 'Descubre el curso más completo en odontología. Prácticas en clínicas, grupos reducidos y doble diploma.', 'Consigue tu título de auxiliar de odontología y especialízate en periodoncia. Prácticas en empresas y orientación laboral.'], titulos: ['Fórmate como auxiliar dental y especialízate en periodoncia.', 'Curso de odontología con prácticas en clínicas y doble diploma.', 'Prepárate para trabajar en clínicas dentales.'], descripciones: ['Descubre cómo conseguir tu empleo en odontología.', 'Solicita información y accede a prácticas reales.', 'Conoce el temario, fechas y opciones de inscripción.'] } },
    { slug: 'dietetica-nutricion-norte', nombre: 'Dietética y Nutrición', sede: 'Norte', tag: 'otono-2025-dietetica-nutricion-norte', inicio: 'Septiembre 2025', imagen: '/images/cursos/salud-bienestar-y-deporte.jpg', copy: { slogan: 'Ayuda a transformar vidas.', textosPrincipales: ['Fórmate como dietista-nutricionista en el Norte y ayuda a transformar vidas. Curso presencial, prácticas en empresas y título oficial.', 'Descubre el curso líder en dietética y nutrición del Norte. Prácticas reales, grupos reducidos y salidas laborales.', 'Cambia tu vida y la de los demás con nuestro curso de dietética Norte. Prácticas en empresas y empleo asegurado.'], titulos: ['Fórmate como dietista Norte y mejora la salud de los demás.', 'Curso de dietética Norte: prácticas en empresas y empleo.', 'Aprende nutrición Norte y cambia vidas. Plazas limitadas.'], descripciones: ['Haz clic y transforma tu futuro en la nutrición Norte.', 'Descubre cómo ser dietista Norte con prácticas y empleo.', 'Haz de la alimentación tu profesión Norte.'] } },
    { slug: 'peluqueria-canina-felina-norte', nombre: 'Peluquería Canina y Felina', sede: 'Norte', tag: 'otono-2025-peluqueria-canina-felina-norte', inicio: 'Septiembre 2025', imagen: '/images/cursos/mundo-animal.jpg', copy: { slogan: 'Aprende técnicas de estética y salud animal.', textosPrincipales: ['Fórmate como peluquero/a canino y felino en el Norte. Curso presencial, prácticas en centros reales y título CEP.', 'Aprende técnicas de estética y salud animal Norte. Prácticas en empresa, grupos reducidos y empleabilidad real.', 'Curso de peluquería canina y felina Norte: prácticas garantizadas y salida laboral directa.'], titulos: ['Curso de peluquería animal Norte con prácticas y empleo.', 'Aprende técnicas de corte y baño en animales Norte.', 'Prácticas reales Norte en centros de estética animal.'], descripciones: ['Haz clic y solicita información sobre peluquería animal Norte.', 'Conoce fechas Norte, temario y salidas profesionales.', 'Tu carrera en el mundo animal Norte empieza aquí.'] } },
    { slug: 'peluqueria-canina-felina-santacruz', nombre: 'Peluquería Canina y Felina', sede: 'Santa Cruz', tag: 'otono-2025-peluqueria-canina-felina-santacruz', inicio: 'Julio 2025', imagen: '/images/cursos/mundo-animal.jpg', copy: { slogan: 'Convierte tu pasión por los animales en tu futuro profesional.', textosPrincipales: ['Fórmate como peluquero/a canino y felino. Curso presencial, prácticas en centros reales y título CEP.', 'Aprende técnicas de estética y salud animal. Prácticas en empresa, grupos reducidos y empleabilidad real.', 'Descubre cómo trabajar en centros de estética animal con nuestro curso práctico y certificado.'], titulos: ['Curso de peluquería animal con prácticas y empleo.', 'Aprende técnicas de corte y baño en animales.', 'Prácticas reales en centros de estética animal.'], descripciones: ['Haz clic y solicita información sobre peluquería animal.', 'Conoce fechas, temario y salidas profesionales.', 'Fórmate con expertos y accede a empleo.'] } },
    { slug: 'quiromasaje-nivel2-norte', nombre: 'Quiromasaje Nivel II', sede: 'Norte', tag: 'otono-2025-quiromasaje-nivel2-norte', inicio: 'Julio 2025', imagen: '/images/cursos/salud-bienestar-y-deporte.jpg', copy: { slogan: 'Especialízate en masaje deportivo y terapéutico.', textosPrincipales: ['Especialízate en Quiromasaje Nivel II Norte y trabaja en spas, gimnasios y centros de bienestar. Curso presencial, prácticas y bolsa de empleo.', 'Aprende técnicas avanzadas de masaje deportivo y terapéutico Norte. Prácticas en empresa y titulación CEP.', 'Fórmate en quiromasaje Norte con profesionales en activo. Grupos reducidos y prácticas garantizadas.'], titulos: ['Curso de quiromasaje nivel II Norte: prácticas y bolsa de empleo.', 'Especialízate en masaje deportivo Norte. Plazas limitadas.', 'Prácticas reales Norte, grupos reducidos y empleo.'], descripciones: ['Solicita información Norte y accede a la bolsa de empleo.', 'Descubre cómo especializarte en quiromasaje Norte.', 'Conoce el programa Norte, fechas y salidas laborales.'] } }
];

const CursoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const curso = cursosOtono2025.find(c => c.slug === slug);

  useEffect(() => {
    if (!curso) {
      navigate('/404'); // o a una página de cursos
    }
    window.scrollTo(0, 0);
  }, [curso, navigate]);

  if (!curso) {
    return null; // O un spinner de carga
  }

  const { nombre, sede, inicio, imagen, copy } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-96 bg-black">
          <img src={imagen} alt={`Imagen de ${nombre}`} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Info Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12 flex flex-wrap items-center justify-around gap-6 -mt-32 relative z-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Inicio</p>
                  <p className="font-bold text-gray-900">{inicio}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Sede</p>
                  <p className="font-bold text-gray-900">{sede}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Certificación</p>
                  <p className="font-bold text-gray-900">Diploma CEP</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900">Sobre el curso</h2>
                <p>{copy.textosPrincipales[0]}</p>
                <p>{copy.textosPrincipales[1]}</p>
                
                <h3 className="text-2xl font-bold mt-10">¿Qué aprenderás?</h3>
                <ul className="space-y-2">
                  {copy.titulos.map((titulo, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{titulo}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="mt-6">{copy.textosPrincipales[2]}</p>

              </div>

              {/* CTA Sidebar */}
              <aside className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900">¿Listo para empezar?</h3>
                  <p className="text-gray-600 mt-2 mb-6">Solicita información sin compromiso y reserva tu plaza.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    ¡Inscríbete Ahora!
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">Plazas limitadas. Grupos reducidos.</p>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>

      <CursoInscripcionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={{ nombre: curso.nombre, sede: curso.sede, tag: curso.tag }}
      />
      
      <CepFooter />
    </div>
  );
};

export default CursoPage; 