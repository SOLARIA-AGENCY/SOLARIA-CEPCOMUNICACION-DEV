import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Users, Calendar, TrendingUp } from 'lucide-react';
import TimelineSection from '../components/organisms/TimelineSection';
import CursoCard from '../components/molecules/CursoCard';
import MiniCalendario from '../components/molecules/MiniCalendario';
import { cursosMaestro } from '../config/cursos-maestro';
import { agruparCursosPorMes, obtenerEstadisticasSede } from '../utils/sedeUtils';

type SedeSlug = 'cep-norte' | 'cep-santa-cruz';

const SedePage: React.FC = () => {
  const { slug } = useParams<{ slug: SedeSlug }>();
  
  // Validar que el slug es válido
  if (!slug || !['cep-norte', 'cep-santa-cruz'].includes(slug)) {
    return <Navigate to="/" replace />;
  }
  
  // Mapear slug a nombre de sede
  const sede = slug === 'cep-norte' ? 'Norte' : 'Santa Cruz';
  const nombreCompleto = `CEP ${sede.toUpperCase()}`;
  
  // Obtener cursos agrupados y estadísticas
  const cursosAgrupados = agruparCursosPorMes(cursosMaestro, sede);
  const estadisticas = obtenerEstadisticasSede(cursosMaestro, sede);
  
  // Información de la sede
  const infoSede = {
    'Norte': {
      descripcion: 'Campus situado en la zona norte de Tenerife, ofreciendo formación especializada en un entorno moderno y accesible.',
      direccion: 'Zona Norte, Tenerife',
      imagen: '/images/sedes/cep-norte.jpg'
    },
    'Santa Cruz': {
      descripcion: 'Campus principal en Santa Cruz de Tenerife, con instalaciones de vanguardia y excelente conectividad.',
      direccion: 'Santa Cruz de Tenerife',
      imagen: '/images/sedes/cep-santa-cruz.jpg'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Hero */}
      <div className="relative h-64 bg-gradient-to-r from-cep-primary to-cep-primary-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${infoSede[sede].imagen})` }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {nombreCompleto}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-4">
              {infoSede[sede].descripcion}
            </p>
            <div className="flex items-center space-x-4 text-white/80">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>{infoSede[sede].direccion}</span>
              </div>
              <div className="hidden sm:block">
                <MiniCalendario />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users size={24} className="text-cep-primary" />
              </div>
              <div className="text-2xl font-bold text-cep-primary">{estadisticas.totalCursos}</div>
              <div className="text-sm text-gray-600">Cursos Totales</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{estadisticas.cursosConFecha}</div>
              <div className="text-sm text-gray-600">Con Fecha</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={24} className="text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{estadisticas.mesesActivos}</div>
              <div className="text-sm text-gray-600">Meses Activos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users size={24} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{estadisticas.categorias}</div>
              <div className="text-sm text-gray-600">Categorías</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Línea de Tiempo de Cursos */}
        {cursosAgrupados.conFecha.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-cep-primary mb-4">
                Cronograma de Cursos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cursos organizados por fecha de inicio - Desde el más próximo
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              {cursosAgrupados.conFecha.map((grupo, index) => (
                <TimelineSection
                  key={`${grupo.año}-${grupo.mes}`}
                  grupo={grupo}
                  isFirst={index === 0}
                  isLast={index === cursosAgrupados.conFecha.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cursos Próximamente */}
        {cursosAgrupados.proximamente.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
                Próximamente
              </h2>
              <p className="text-gray-600">
                Cursos en preparación - Fechas por confirmar
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosAgrupados.proximamente.map((curso) => (
                <CursoCard 
                  key={curso.id} 
                  curso={curso} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Mensaje si no hay cursos */}
        {cursosAgrupados.conFecha.length === 0 && cursosAgrupados.proximamente.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Calendar size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay cursos disponibles
            </h3>
            <p className="text-gray-500">
              Actualmente no hay cursos programados para esta sede
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SedePage; 