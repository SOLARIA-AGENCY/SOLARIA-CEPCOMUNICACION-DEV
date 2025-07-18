import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cursosOcupadosConfig } from '../../config/cursos-ocupados';
import { cursosDesempleadosConfig } from '../../config/cursos-desempleados';
import type { EmploymentCourseConfig } from '../../types/employment';
import CursoOcupadosPageComponent from '../../templates/CursoOcupadosPageComponent';

/**
 * SemanticEmploymentWrapper - Componente para rutas semánticas SEO/Orgánicas de cursos de empleo
 * 
 * PROPÓSITO:
 * - Gestiona rutas semánticas: /cursos-empleo/prevencion-riesgos-ambientales-ocupados
 * - Tracking específico para tráfico orgánico en cursos de empleo
 * - Optimizado para SEO y navegación web
 * - Analytics diferenciado para visitantes orgánicos
 * - Structured data especializado para cursos subvencionados
 * 
 * FUNCIONALIDAD:
 * - Busca el curso en configuraciones de ocupados y desempleados
 * - Aplica SEO avanzado con structured data
 * - Renderiza usando el componente template apropiado
 */
const SemanticEmploymentWrapper: React.FC = () => {
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

  // Tracking específico para rutas semánticas (SEO/Orgánico) de cursos de empleo
  useEffect(() => {
    if (slug && curso) {
      // Facebook Pixel - Evento de visualización orgánica (menos prioridad para cursos de empleo)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'employment_course_page',
          content_name: slug,
          source: 'organic_employment_semantic',
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede
        });
      }

      // Google Analytics - Evento principal para SEO de cursos de empleo
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'employment_course_view_organic', {
          event_category: 'organic_employment_traffic',
          event_label: slug,
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede,
          traffic_source: 'organic_employment_semantic',
          page_structure: 'semantic_employment_url',
          course_category: 'subsidized_training'
        });
      }

      // Schema.org - Structured data especializado para cursos subvencionados
      if (typeof window !== 'undefined' && curso.seo.structuredData) {
        const structuredData = {
          ...curso.seo.structuredData,
          // Enriquecer con información específica de cursos subvencionados
          "isAccessibleForFree": true,
          "financialAidEligible": true,
          "educationalCredentialAwarded": "Certificado SEPE",
          "provider": {
            "@type": "Organization",
            "name": "CEP Formación",
            "url": "https://cepcomunicacion.com",
            "foundingDate": "2010",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": curso.tipo === 'ocupados' ? "+34-672-947-701" : "+34-922-706-414",
              "contactType": "Admissions",
              "availableLanguage": "Spanish"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": curso.fecha_inicio,
            "validThrough": curso.fecha_fin,
            "description": "Curso 100% gratuito financiado por SEPE"
          }
        };

        // Insertar structured data para SEO
        const existingScript = document.getElementById('employment-course-structured-data');
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.id = 'employment-course-structured-data';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }

      // Meta tags dinámicos para SEO
      if (typeof window !== 'undefined' && curso.seo) {
        // Actualizar title
        document.title = curso.seo.title;
        
        // Actualizar meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', curso.seo.description);
        }
        
        // Actualizar meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', curso.seo.keywords);
        }
        
        // Agregar meta específicos para cursos subvencionados
        const metaEmploymentType = document.querySelector('meta[name="employment-type"]') || document.createElement('meta');
        metaEmploymentType.setAttribute('name', 'employment-type');
        metaEmploymentType.setAttribute('content', curso.tipo);
        if (!document.querySelector('meta[name="employment-type"]')) {
          document.head.appendChild(metaEmploymentType);
        }
        
        const metaFunding = document.querySelector('meta[name="funding-source"]') || document.createElement('meta');
        metaFunding.setAttribute('name', 'funding-source');
        metaFunding.setAttribute('content', 'SEPE');
        if (!document.querySelector('meta[name="funding-source"]')) {
          document.head.appendChild(metaFunding);
        }
      }

      // Tag Manager - Evento específico para rutas semánticas de empleo
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'employment_course_page_view_semantic',
          course_slug: slug,
          employment_type: curso.tipo,
          course_id: curso.id,
          sede: curso.sede,
          traffic_source: 'organic_employment_semantic',
          page_type: 'semantic_employment_course_page',
          url_structure: '/cursos-empleo/',
          funding_source: 'sepe_subsidized'
        });
      }
    }
  }, [slug, curso]);

  if (!slug) {
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  if (!curso) {
    // Tracking de 404 para rutas semánticas de empleo
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'employment_course_not_found_semantic', {
        event_category: 'organic_employment_traffic',
        event_label: slug,
        attempted_slug: slug,
        url_structure: '/cursos-empleo/',
        course_type: 'employment_course'
      });
    }
    
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  // Renderizar usando el componente template apropiado
  return <CursoOcupadosPageComponent curso={curso} />;
};

export default SemanticEmploymentWrapper;