import React, { useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const CursosPage: React.FC = () => {
  // Scroll al top cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cursos campaña otoño 2025 - 14 variaciones
  const cursosCampana = [
    {
      id: 1,
      nombre: "Adiestramiento Canino",
      descripcion: "Técnicas de adiestramiento de base y educación canina nivel I. Aprende métodos profesionales para el entrenamiento y modificación de conductas caninas.",
      sede: "CEP NORTE",
      inicio: "Septiembre 2025",
      duracion: "6 meses - 25 sesiones",
      hasPage: true,
      link: "/adiestramiento-canino"
    },
    {
      id: 2,
      nombre: "Auxiliar Clínicas Estéticas",
      descripcion: "Formación integral en tratamientos de estética y procedimientos en clínicas de medicina estética. Incluye técnicas avanzadas y atención al cliente.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "8 meses",
      hasPage: false
    },
    {
      id: 3,
      nombre: "Agente Funerario",
      descripcion: "Curso profesional para trabajar en servicios funerarios. Incluye protocolos, legislación, atención a familias y gestión de ceremonias.",
      sede: "CEP SANTA CRUZ", 
      inicio: "Septiembre 2025",
      duracion: "6 meses",
      hasPage: false
    },
    {
      id: 4,
      nombre: "Auxiliar Veterinario",
      descripcion: "Asistencia en clínicas veterinarias, cuidado animal, instrumentación quirúrgica y atención al cliente en el sector veterinario.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "10 meses",
      hasPage: false
    },
    {
      id: 5,
      nombre: "Auxiliar de Farmacia",
      descripcion: "Formación completa para trabajar en farmacias. Dispensación de medicamentos, atención farmacéutica y gestión de productos sanitarios.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025", 
      duracion: "8 meses",
      hasPage: false
    },
    {
      id: 6,
      nombre: "Auxiliar de Odontología",
      descripcion: "Asistencia en clínicas dentales, instrumental odontológico, radiología dental y atención al paciente en consultas dentales.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "9 meses", 
      hasPage: false
    },
    {
      id: 7,
      nombre: "Auxiliar de Enfermería",
      descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes.",
      sede: "CEP NORTE",
      inicio: "Septiembre 2025",
      duracion: "10 meses",
      hasPage: false
    },
    {
      id: 8,
      nombre: "Auxiliar de Enfermería",
      descripcion: "Cuidados básicos de enfermería, asistencia sanitaria, técnicas de primeros auxilios y atención a pacientes.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "10 meses",
      hasPage: false
    },
    {
      id: 9,
      nombre: "Gestión Administrativa",
      descripcion: "Administración de empresas, gestión documental, atención al cliente y procedimientos administrativos.",
      sede: "CEP NORTE",
      inicio: "Septiembre 2025",
      duracion: "8 meses",
      hasPage: false
    },
    {
      id: 10,
      nombre: "Gestión Administrativa", 
      descripcion: "Administración de empresas, gestión documental, atención al cliente y procedimientos administrativos.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "8 meses",
      hasPage: false
    },
    {
      id: 11,
      nombre: "Marketing Digital",
      descripcion: "Estrategias de marketing online, redes sociales, SEO, SEM y comercio electrónico para empresas.",
      sede: "CEP NORTE",
      inicio: "Septiembre 2025",
      duracion: "6 meses",
      hasPage: false
    },
    {
      id: 12,
      nombre: "Marketing Digital",
      descripcion: "Estrategias de marketing online, redes sociales, SEO, SEM y comercio electrónico para empresas.",
      sede: "CEP SANTA CRUZ", 
      inicio: "Septiembre 2025",
      duracion: "6 meses",
      hasPage: false
    },
    {
      id: 13,
      nombre: "Atención Sociosanitaria",
      descripcion: "Cuidado de personas dependientes, técnicas de asistencia personal y apoyo en el domicilio.",
      sede: "CEP NORTE",
      inicio: "Septiembre 2025",
      duracion: "12 meses",
      hasPage: false
    },
    {
      id: 14,
      nombre: "Atención Sociosanitaria", 
      descripcion: "Cuidado de personas dependientes, técnicas de asistencia personal y apoyo en el domicilio.",
      sede: "CEP SANTA CRUZ",
      inicio: "Septiembre 2025",
      duracion: "12 meses",
      hasPage: false
    }
  ];

  // Separar cursos por sede
  const cursosNorte = cursosCampana.filter(curso => curso.sede === "CEP NORTE");
  const cursosSantaCruz = cursosCampana.filter(curso => curso.sede === "CEP SANTA CRUZ");

  const CursoCard = ({ curso }: { curso: any }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow min-h-[400px] flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{curso.nombre}</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as any,
            overflow: 'hidden'
          }}>
            {curso.descripcion}
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">📅 Inicio:</span>
              <span>{curso.inicio}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">⏱️ Duración:</span>
              <span>{curso.duracion}</span>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200 mt-auto">
          {curso.hasPage ? (
            <a
              href={curso.link}
              className="block w-full bg-cep-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-cep-primary-dark transition-colors text-center"
            >
              Ver curso completo
            </a>
          ) : (
            <span className="block w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold text-center">
              PRÓXIMAMENTE
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cep-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CURSOS CAMPAÑA OTOÑO 2025
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Descubre nuestra oferta formativa para septiembre 2025. 
              Cursos profesionales en nuestras dos sedes: CEP Norte (La Orotava) y CEP Santa Cruz.
            </p>
            <div className="bg-black bg-opacity-80 rounded-xl p-8 max-w-3xl mx-auto shadow-2xl border border-white border-opacity-20">
              <p className="text-2xl font-bold mb-3 text-yellow-400">🚀 ¡ÚLTIMAS PLAZAS DISPONIBLES!</p>
              <p className="text-lg leading-relaxed text-white">Los cursos empiezan en septiembre • Plazas limitadas • Reserva ya tu plaza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos por Sedes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* CEP NORTE */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">CEP NORTE - LA OROTAVA</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cursos disponibles en nuestra sede del norte de Tenerife, 
                ubicada en C.C El Tompo – Última planta – La Orotava
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursosNorte.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          </div>

          {/* CEP SANTA CRUZ */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">CEP SANTA CRUZ</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cursos disponibles en nuestra sede principal de Santa Cruz de Tenerife, 
                Plaza José Antonio Barrios Olivero Bajo Estadio Heliodoro
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursosSantaCruz.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Necesitas más información sobre algún curso?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo está disponible para resolver todas tus dudas y ayudarte a elegir el curso perfecto para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:922219257"
                className="bg-cep-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-cep-primary-dark transition-colors"
              >
                📞 Llamar: 922 219 257
              </a>
              <a
                href="/contacto"
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                💬 Contactar por formulario
              </a>
            </div>
          </div>

        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default CursosPage; 