import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cursosMaestro } from '../../config/cursos-maestro';
import type { CursoMaestro } from '../../config/cursos-maestro';
import CursoPageComponent from './CursoPageComponent';

/**
 * SemanticCourseWrapper - Componente para rutas semánticas SEO/Orgánicas
 * 
 * PROPÓSITO:
 * - Gestiona rutas semánticas: /cursos/quiromasaje-nivel2-norte
 * - Tracking específico para tráfico orgánico
 * - Optimizado para SEO y navegación web
 * - Analytics diferenciado para visitantes orgánicos
 */
const SemanticCourseWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Tracking específico para rutas semánticas (SEO/Orgánico)
  useEffect(() => {
    if (slug) {
      // Facebook Pixel - Evento de visualización orgánica (menos prioridad)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'course_page',
          content_name: slug,
          source: 'organic_semantic',
          course_slug: slug
        });
      }

      // Google Analytics - Evento principal para SEO
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'course_view_organic', {
          event_category: 'organic_traffic',
          event_label: slug,
          course_slug: slug,
          traffic_source: 'organic_semantic',
          page_structure: 'semantic_url'
        });
      }

      // Schema.org - Structured data para SEO
      if (typeof window !== 'undefined') {
        const curso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
        if (curso) {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": curso.nombre,
            "description": curso.copy.slogan,
            "provider": {
              "@type": "Organization",
              "name": "CEP Formación",
              "url": "https://cepcomunicacion.com"
            },
            "url": `https://cepcomunicacion.com/cursos/${slug}`,
            "courseMode": "blended",
            "educationalLevel": "professional"
          };

          // Insertar structured data para SEO
          const existingScript = document.getElementById('course-structured-data');
          if (existingScript) {
            existingScript.remove();
          }
          
          const script = document.createElement('script');
          script.id = 'course-structured-data';
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(structuredData);
          document.head.appendChild(script);
        }
      }

      // Tag Manager - Evento específico para rutas semánticas
      // @ts-expect-error - dataLayer is injected by external script
      if (typeof window !== 'undefined' && window.dataLayer) {
        // @ts-expect-error - dataLayer is injected by external script
        window.dataLayer.push({
          event: 'course_page_view_semantic',
          course_slug: slug,
          traffic_source: 'organic_semantic',
          page_type: 'semantic_course_page',
          url_structure: '/cursos/'
        });
      }
    }
  }, [slug]);

  if (!slug) {
    return <Navigate to="/cursos" replace />;
  }
  
  const curso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
  
  if (!curso) {
    // Tracking de 404 para rutas semánticas
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'course_not_found_semantic', {
        event_category: 'organic_traffic',
        event_label: slug,
        attempted_slug: slug,
        url_structure: '/cursos/'
      });
    }
    
    return <Navigate to="/cursos" replace />;
  }
  
  return <CursoPageComponent curso={curso} />;
};

export default SemanticCourseWrapper; 