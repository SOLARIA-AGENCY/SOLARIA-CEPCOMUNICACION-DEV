import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cursosOcupadosConfig } from '../../config/cursos-ocupados';
import { cursosDesempleadosConfig } from '../../config/cursos-desempleados';
// Import removed - not used directly in this component
import CursoOcupadosPageComponent from '../../templates/CursoOcupadosPageComponent';

/**
 * DirectEmploymentWrapper - Componente para rutas directas de cursos de empleo desde Facebook Ads
 * 
 * PROPÓSITO:
 * - Gestiona rutas directas: /prevencion-riesgos-ambientales-ocupados
 * - Tracking específico para Facebook Pixel en cursos de empleo
 * - Optimizado para conversión sin fricción
 * - Analytics diferenciado para leads de Facebook en cursos subvencionados
 * 
 * FUNCIONALIDAD:
 * - Busca el curso en configuraciones de ocupados y desempleados
 * - Aplica tracking específico para cursos de empleo
 * - Renderiza usando el componente template apropiado
 */
const DirectEmploymentWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Buscar el curso en ambas configuraciones
  const curso = React.useMemo(() => {
    if (!slug) return null;
    
    // Buscar en cursos ocupados
    const cursoOcupado = cursosOcupadosConfig.find(c => c.slug === slug);
    if (cursoOcupado) return cursoOcupado;
    
    // Buscar en cursos desempleados
    const cursoDesempleado = cursosDesempleadosConfig.find(c => c.slug === slug);
    if (cursoDesempleado) return cursoDesempleado;
    
    return null;
  }, [slug]);

  // Tracking específico para rutas directas de cursos de empleo
  useEffect(() => {
    if (slug && curso) {
      // Facebook Pixel - Evento de visualización de curso de empleo directo
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'employment_course_page',
          content_name: slug,
          source: 'facebook_direct_employment',
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede
        });
      }

      // Google Analytics - Evento diferenciado para cursos de empleo
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'employment_course_view_direct', {
          event_category: 'facebook_employment_campaign',
          event_label: slug,
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede,
          traffic_source: 'facebook_direct_employment',
          course_category: 'subsidized_training'
        });
      }

      // Facebook Pixel - Evento específico para cursos SEPE
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_type: 'sepe_course',
          content_name: curso.nombre,
          employment_type: curso.tipo,
          course_id: curso.id,
          value: 0, // Curso gratuito
          currency: 'EUR',
          source: 'facebook_direct_sepe'
        });
      }

      // Tag Manager - Evento específico para rutas directas de empleo
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'employment_course_page_view_direct',
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede,
          traffic_source: 'facebook_direct_employment',
          page_type: 'direct_employment_course_landing',
          funding_source: 'sepe_subsidized'
        });
      }
    }
  }, [slug, curso]);

  if (!slug) {
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  if (!curso) {
    // Tracking de 404 para rutas directas de empleo
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'employment_course_not_found_direct', {
        event_category: 'facebook_employment_campaign',
        event_label: slug,
        attempted_slug: slug,
        course_type: 'employment_course'
      });
    }
    
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  // Renderizar usando el componente template apropiado
  return <CursoOcupadosPageComponent curso={curso} />;
};

export default DirectEmploymentWrapper;