import React, { useState, useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoCard from '../components/molecules/CursoCard';
// import SedeFilterSelector from '../components/molecules/SedeFilterSelector';
import LogosMinisteriales from '../components/molecules/LogosMinisteriales';
import { cursosDesempleadosConfig, desempleadosDefaultConfig, desempleadosMetadata } from '../config/cursos-desempleados';
import { trackEmploymentPageView } from '../utils/employmentTracking';
import { EmploymentCourseConfig } from '../types/employment';

const CursosDesempleadosPage: React.FC = () => {
  const [selectedSede, setSelectedSede] = useState<'Norte' | 'Santa Cruz' | 'Todas'>('Todas');
  const [filteredCursos, setFilteredCursos] = useState<EmploymentCourseConfig[]>(cursosDesempleadosConfig);

  useEffect(() => {
    // Tracking de página
    trackEmploymentPageView('desempleados', 'listing');
  }, []);

  useEffect(() => {
    // Filtrar cursos por sede
    if (selectedSede === 'Todas') {
      setFilteredCursos(cursosDesempleadosConfig);
    } else {
      setFilteredCursos(cursosDesempleadosConfig.filter(curso => curso.sede === selectedSede));
    }
  }, [selectedSede]);

  const activeCursos = filteredCursos.filter(curso => curso.activo);

  return (
    <div className="min-h-screen bg-gray-50">
      <title>{desempleadosMetadata.title}</title>
      <meta name="description" content={desempleadosMetadata.description} />
      <meta name="keywords" content={desempleadosMetadata.keywords} />
      <link rel="canonical" href={`${window.location.origin}${desempleadosMetadata.canonical}`} />
      <meta property="og:title" content={desempleadosMetadata.title} />
      <meta property="og:description" content={desempleadosMetadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${window.location.origin}${desempleadosMetadata.canonical}`} />

      <CepHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <span className="text-6xl mr-4">{desempleadosDefaultConfig.icons.main}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {desempleadosDefaultConfig.messaging.headline}
              </h1>
              <p className="text-xl text-gray-600">
                {desempleadosDefaultConfig.messaging.subheadline}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {desempleadosDefaultConfig.messaging.benefits_intro}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {desempleadosDefaultConfig.icons.features.map((icon, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-2">{icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {['Fortaleza', 'Formación', 'Prácticas', 'Crecimiento'][index]}
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
                Información importante para desempleados
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>• Todos los cursos son 100% gratuitos, financiados por SEPE/SCE</p>
                <p>• Certificados de profesionalidad reconocidos oficialmente</p>
                <p>• Prácticas profesionales incluidas en empresas del sector</p>
                <p>• Orientación laboral personalizada para tu inserción profesional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de próximos cursos */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                Próximos cursos para desempleados
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Estamos preparando una amplia oferta de cursos específicos para personas en búsqueda activa de empleo.</p>
                <p className="mt-2">Déjanos tus datos y te informaremos en cuanto estén disponibles las nuevas convocatorias.</p>
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
                    ? 'bg-blue-600 text-white'
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
            Cursos Disponibles para Desempleados
            {selectedSede !== 'Todas' && ` en ${selectedSede}`}
          </h2>
          
          {activeCursos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Próximamente disponibles
              </h3>
              <p className="text-gray-500 mb-4">
                Estamos preparando una amplia oferta de cursos específicos para desempleados.
              </p>
              <p className="text-gray-500 mb-6">
                Mientras tanto, puedes consultar todos nuestros cursos disponibles o contactar con nosotros para más información.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/cursos" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ver todos los cursos
                </a>
                <a 
                  href={`mailto:${desempleadosDefaultConfig.contact.email}`}
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Contactar
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCursos.map((curso) => (
                <div key={curso.id} className="relative">
                  <CursoCard 
                    curso={{
                      id: curso.id,
                      slug: `desempleados-${curso.id.toLowerCase()}`,
                      slugBase: `desempleados-${curso.id.toLowerCase()}`,
                      nombre: curso.nombre,
                      codigo: curso.id,
                      sede: curso.sede,
                      estado: curso.activo ? 'activo' : 'proximamente',
                      categoria: 'sanidad',
                      imagen: '/images/cursos/formacion-gratuita.jpg',
                      inicio: curso.fecha_inicio,
                      copy: {
                        slogan: 'Curso gratuito para desempleados',
                        textosPrincipales: [],
                        titulos: []
                      },
                      descripcionDetallada: {
                        introduccion: 'Curso gratuito para desempleados',
                        puntosClave: [
                          { icono: 'Clock', texto: curso.datos_especificos.duracion },
                          { icono: 'Globe', texto: curso.datos_especificos.modalidad },
                          { icono: 'Award', texto: curso.datos_especificos.certificacion }
                        ],
                        queAprendes: 'Contenido específico del curso',
                        salidasProfesionales: ['Inserción laboral'],
                        modulos: [],
                        profesores: []
                      }
                    }}
                    showEmploymentType={true}
                    employmentFilter="desempleados"
                  />
                  
                  {/* Indicador de tipo de curso */}
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Desempleados
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información de contacto específica */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Información y Contacto - Cursos para Desempleados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Contacto General</h4>
              <p className="text-gray-600 mb-1">
                📧 Email: <a href={`mailto:${desempleadosDefaultConfig.contact.email}`} className="text-blue-600 hover:underline">
                  {desempleadosDefaultConfig.contact.email}
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                📞 Teléfono: <a href={`tel:${desempleadosDefaultConfig.contact.telefono}`} className="text-blue-600 hover:underline">
                  {desempleadosDefaultConfig.contact.telefono}
                </a>
              </p>
              <a 
                href={`https://wa.me/${desempleadosDefaultConfig.contact.whatsapp}`}
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
                Atención especializada para orientación laboral: consulta disponibilidad
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de pre-inscripción */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Pre-inscripción para próximos cursos
          </h3>
          <p className="text-gray-600 mb-6">
            Deja tus datos y te informaremos en cuanto estén disponibles las nuevas convocatorias para desempleados.
          </p>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input 
                type="tel" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área de interés
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecciona...</option>
                <option value="sanidad">Sanidad</option>
                <option value="veterinaria">Veterinaria</option>
                <option value="administracion">Administración</option>
                <option value="tecnologia">Tecnología</option>
                <option value="comercio">Comercio</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  required
                />
                <span className="text-sm text-gray-600">
                  Acepto el tratamiento de mis datos personales y recibir información sobre cursos
                </span>
              </label>
            </div>
            
            <div className="md:col-span-2">
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar pre-inscripción
              </button>
            </div>
          </form>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para iniciar tu nueva carrera profesional?
            </h3>
            <p className="text-lg mb-6">
              Contacta con nosotros para más información sobre cursos para desempleados
            </p>
            <a 
              href={`mailto:${desempleadosDefaultConfig.contact.email}`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {desempleadosDefaultConfig.messaging.cta}
            </a>
          </div>
        </div>
      </main>

      <LogosMinisteriales />
      <CepFooter />
    </div>
  );
};

export default CursosDesempleadosPage;