import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Users, Calendar, TrendingUp } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import TimelineSection from '../components/organisms/TimelineSection';
import CursoCard from '../components/molecules/CursoCard';
import MiniCalendario from '../components/molecules/MiniCalendario';
import { cursosMaestro } from '../config/cursos-maestro';
import { agruparCursosPorMes, obtenerEstadisticasSede } from '../utils/sedeUtils';

type SedeSlug = 'cep-norte' | 'cep-santa-cruz';

const SedePage: React.FC = () => {
  const { slug } = useParams<{ slug: SedeSlug }>();
  
  if (!slug || !['cep-norte', 'cep-santa-cruz'].includes(slug)) {
    return <Navigate to="/" replace />;
  }
  
  const sede = slug === 'cep-norte' ? 'Norte' : 'Santa Cruz';
  const nombreCompleto = `CEP ${sede.toUpperCase()}`;
  
  const cursosAgrupados = agruparCursosPorMes(cursosMaestro, sede);
  const estadisticas = obtenerEstadisticasSede(cursosMaestro, sede);
  
  const infoSede = {
    'Norte': {
      descripcion: 'Campus situado en la zona norte de Tenerife, ofreciendo formación especializada en un entorno moderno y accesible.',
      direccion: 'Zona Norte, Tenerife',
      imagen: '/images/sedes/sede-cep-norte.png'
    },
    'Santa Cruz': {
      descripcion: 'Campus principal en Santa Cruz de Tenerife, con instalaciones de vanguardia y excelente conectividad.',
      direccion: 'Santa Cruz de Tenerife',
      imagen: '/images/sedes/sede-cep-santa-cruz.png'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <CepHeader />
      
      {/* Header Hero */}
      <div className="relative h-80 text-white overflow-hidden">
        <img 
          src={infoSede[sede].imagen} 
          alt={`Campus de ${nombreCompleto}`}
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
            {nombreCompleto}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-3xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>
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
      <main className="container mx-auto px-4 py-12">
        
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
      </main>
      <CepFooter />
    </div>
  );
};

export default SedePage; 