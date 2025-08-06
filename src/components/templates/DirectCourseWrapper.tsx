import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cursosMaestro } from '../../config/cursos-maestro';
import type { CursoMaestro } from '../../config/cursos-maestro';
import CursoPageComponent from './CursoPageComponent';

/**
 * DirectCourseWrapper - Componente para rutas directas desde Facebook Ads
 * 
 * PROPÓSITO:
 * - Gestiona rutas directas: /quiromasaje-nivel2-norte
 * - Tracking específico para Facebook Pixel
 * - Optimizado para conversión sin fricción
 * - Analytics diferenciado para leads de Facebook
 */
const DirectCourseWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Tracking específico para rutas directas (Facebook)
  useEffect(() => {
    if (slug) {
      // Facebook Pixel - Evento de visualización de curso directo
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'course_page',
          content_name: slug,
          source: 'facebook_direct',
          course_slug: slug
        });
      }

      // Google Analytics - Evento diferenciado
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'course_view_direct', {
          event_category: 'facebook_campaign',
          event_label: slug,
          course_slug: slug,
          traffic_source: 'facebook_direct'
        });
      }

      // Tag Manager - Evento específico
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'course_page_view_direct',
          course_slug: slug,
          traffic_source: 'facebook_direct',
          page_type: 'direct_course_landing'
        });
      }
    }
  }, [slug]);

  if (!slug) {
    return <Navigate to="/cursos" replace />;
  }
  
  const curso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
  
  if (!curso) {
    // Tracking de 404 para rutas directas
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'course_not_found_direct', {
        event_category: 'facebook_campaign',
        event_label: slug,
        attempted_slug: slug
      });
    }
    
    return <Navigate to="/cursos" replace />;
  }
  
  return <CursoPageComponent curso={curso} />;
};

export default DirectCourseWrapper; 