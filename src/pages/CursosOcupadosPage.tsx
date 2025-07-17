import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoCard from '../components/molecules/CursoCard';
import SedeSelector from '../components/organisms/SedeSelector';
import LogosMinisteriales from '../components/molecules/LogosMinisteriales';
import { cursosOcupadosConfig, ocupadosDefaultConfig, ocupadosMetadata } from '../config/cursos-ocupados';
import { trackEmploymentPageView } from '../utils/employmentTracking';
import { EmploymentCourseConfig } from '../types/employment';

const CursosOcupadosPage: React.FC = () => {
  const [selectedSede, setSelectedSede] = useState<'Norte' | 'Santa Cruz' | 'Todas'>('Todas');
  const [filteredCursos, setFilteredCursos] = useState<EmploymentCourseConfig[]>(cursosOcupadosConfig);

  useEffect(() => {
    // Tracking de página
    trackEmploymentPageView('ocupados', 'listing');
  }, []);

  useEffect(() => {
    // Filtrar cursos por sede
    if (selectedSede === 'Todas') {
      setFilteredCursos(cursosOcupadosConfig);
    } else {
      setFilteredCursos(cursosOcupadosConfig.filter(curso => curso.sede === selectedSede));
    }
  }, [selectedSede]);

  const activeCursos = filteredCursos.filter(curso => curso.activo);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{ocupadosMetadata.title}</title>
        <meta name="description" content={ocupadosMetadata.description} />
        <meta name="keywords" content={ocupadosMetadata.keywords} />
        <link rel="canonical" href={`${window.location.origin}${ocupadosMetadata.canonical}`} />
        <meta property="og:title" content={ocupadosMetadata.title} />
        <meta property="og:description" content={ocupadosMetadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}${ocupadosMetadata.canonical}`} />
      </Helmet>

      <CepHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <span className="text-6xl mr-4">{ocupadosDefaultConfig.icons.main}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {ocupadosDefaultConfig.messaging.headline}
              </h1>
              <p className="text-xl text-gray-600">
                {ocupadosDefaultConfig.messaging.subheadline}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {ocupadosDefaultConfig.messaging.benefits_intro}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ocupadosDefaultConfig.icons.features.map((icon, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-2">{icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {['Profesional', 'Crecimiento', 'Certificado', 'Flexible'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">
                Información importante para trabajadores
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>• Todos los cursos son 100% gratuitos, financiados por el SEPE</p>
                <p>• Horarios diseñados para ser compatibles con tu trabajo actual</p>
                <p>• Certificación oficial reconocida en todo el territorio nacional</p>
                <p>• Mejora tu CV y aumenta tus oportunidades profesionales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de sede */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {(['Todas', 'Norte', 'Santa Cruz'] as const).map((sede) => (
              <button
                key={sede}
                onClick={() => setSelectedSede(sede)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedSede === sede
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {sede}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de cursos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Cursos Disponibles para Trabajadores
            {selectedSede !== 'Todas' && ` en ${selectedSede}`}
          </h2>
          
          {activeCursos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay cursos disponibles
              </h3>
              <p className="text-gray-500">
                {selectedSede !== 'Todas' 
                  ? `No hay cursos para trabajadores disponibles en ${selectedSede} actualmente.`
                  : 'No hay cursos para trabajadores disponibles actualmente.'
                }
              </p>
              <p className="text-gray-500 mt-2">
                Contacta con nosotros para más información sobre próximos cursos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCursos.map((curso) => (
                <div key={curso.id} className="relative">
                  <CursoCard 
                    curso={{
                      id: curso.id,
                      slug: `ocupados-${curso.id.toLowerCase()}`,
                      slugBase: `ocupados-${curso.id.toLowerCase()}`,
                      nombre: curso.nombre,
                      codigo: curso.id,
                      sede: curso.sede,
                      estado: curso.activo ? 'activo' : 'proximamente',
                      categoria: 'sanidad',
                      imagen: '/images/cursos/formacion-gratuita.jpg',
                      inicio: curso.fecha_inicio,
                      copy: {
                        slogan: 'Curso gratuito para trabajadores',
                        destacados: []
                      },
                      descripcionDetallada: {
                        introduccion: 'Curso gratuito para trabajadores',
                        puntosClave: [
                          { icono: 'Clock', texto: curso.datos_especificos.duracion },
                          { icono: 'Globe', texto: curso.datos_especificos.modalidad },
                          { icono: 'Award', texto: curso.datos_especificos.certificacion }
                        ],
                        queAprendes: 'Contenido específico del curso',
                        salidasProfesionales: ['Mejora profesional'],
                        modulos: [],
                        profesores: []
                      }
                    }}
                    showEmploymentType={true}
                    employmentFilter="ocupados"
                  />
                  
                  {/* Indicador de tipo de curso */}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Trabajadores
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información de contacto específica */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Información y Contacto - Cursos para Trabajadores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Contacto Especializado</h4>
              <p className="text-gray-600 mb-1">
                📧 Email: <a href={`mailto:${ocupadosDefaultConfig.contact.email}`} className="text-blue-600 hover:underline">
                  {ocupadosDefaultConfig.contact.email}
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                📞 Teléfono: <a href={`tel:${ocupadosDefaultConfig.contact.telefono}`} className="text-blue-600 hover:underline">
                  {ocupadosDefaultConfig.contact.telefono}
                </a>
              </p>
              <a 
                href={`https://wa.me/${ocupadosDefaultConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                </svg>
                WhatsApp
              </a>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Horarios de Atención</h4>
              <p className="text-gray-600 mb-1">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-gray-600 mb-1">Sábados: 9:00 - 14:00</p>
              <p className="text-gray-600 mb-4">Domingos: Cerrado</p>
              
              <p className="text-sm text-gray-500">
                Horario especial para trabajadores: consultas por WhatsApp hasta las 20:00
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para dar el siguiente paso en tu carrera?
            </h3>
            <p className="text-lg mb-6">
              Solicita información sobre nuestros cursos gratuitos para trabajadores
            </p>
            <a 
              href={`mailto:${ocupadosDefaultConfig.contact.email}`}
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {ocupadosDefaultConfig.messaging.cta}
            </a>
          </div>
        </div>
      </main>

      <LogosMinisteriales />
      <CepFooter />
    </div>
  );
};

export default CursosOcupadosPage;