import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cursosOcupadosConfig } from '../../config/cursos-ocupados';
import { cursosDesempleadosConfig } from '../../config/cursos-desempleados';

/**
 * LegacyEmploymentRedirect - Componente para redirecciones 301 de URLs antiguas de cursos de empleo
 * 
 * PROPÓSITO:
 * - Gestiona redirecciones desde URLs antiguas: /curso-ocupado/:id -> /prevencion-riesgos-ambientales-ocupados
 * - Mantiene SEO equity de URLs existentes
 * - Tracking específico para redirecciones legacy
 * - Preserva funcionalidad durante transición
 * 
 * FUNCIONALIDAD:
 * - Detecta ID de curso legacy
 * - Mapea a nuevo slug SEO-friendly
 * - Ejecuta redirección 301 preservando SEO
 * - Analytics de redirecciones legacy
 */
const LegacyEmploymentRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Buscar el curso por ID y obtener su slug nuevo
  const cursoData = React.useMemo(() => {
    if (!id) return null;
    
    // Buscar en cursos ocupados
    const cursoOcupado = cursosOcupadosConfig.find(c => c.id === id);
    if (cursoOcupado) {
      return {
        curso: cursoOcupado,
        newUrl: `/${cursoOcupado.slug}`,
        semanticUrl: `/cursos-empleo/${cursoOcupado.slug}`
      };
    }
    
    // Buscar en cursos desempleados
    const cursoDesempleado = cursosDesempleadosConfig.find(c => c.id === id);
    if (cursoDesempleado) {
      return {
        curso: cursoDesempleado,
        newUrl: `/${cursoDesempleado.slug}`,
        semanticUrl: `/cursos-empleo/${cursoDesempleado.slug}`
      };
    }
    
    return null;
  }, [id]);

  // Tracking específico para redirecciones legacy
  useEffect(() => {
    if (id && cursoData) {
      // Google Analytics - Evento de redirección legacy
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'employment_legacy_redirect', {
          event_category: 'seo_redirects',
          event_label: id,
          legacy_id: id,
          new_slug: cursoData.curso.slug,
          employment_type: cursoData.curso.tipo,
          redirect_type: '301_legacy_to_semantic',
          old_url_pattern: '/curso-ocupado/:id',
          new_url_pattern: '/slug-seo-friendly'
        });
      }

      // Facebook Pixel - Evento de redirección para análisis
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView', {
          content_type: 'employment_course_redirect',
          content_name: cursoData.curso.slug,
          source: 'legacy_redirect',
          legacy_id: id,
          new_slug: cursoData.curso.slug,
          employment_type: cursoData.curso.tipo
        });
      }

      // Tag Manager - Evento de redirección legacy
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'employment_legacy_redirect',
          legacy_id: id,
          new_slug: cursoData.curso.slug,
          employment_type: cursoData.curso.tipo,
          redirect_type: '301_legacy_to_semantic',
          old_url: `/curso-ocupado/${id}`,
          new_url: cursoData.newUrl,
          semantic_url: cursoData.semanticUrl
        });
      }
    }
  }, [id, cursoData]);

  if (!id) {
    return <Navigate to="/cursos-ocupados" replace />;
  }

  if (!cursoData) {
    // Tracking de 404 para IDs legacy no encontrados
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'employment_legacy_not_found', {
        event_category: 'seo_redirects',
        event_label: id,
        legacy_id: id,
        error_type: 'legacy_id_not_found'
      });
    }
    
    return <Navigate to="/cursos-ocupados" replace />;
  }

  // Redirigir a la nueva URL SEO-friendly
  // Por defecto usa la URL semántica para mejor SEO
  return <Navigate to={cursoData.semanticUrl} replace />;
};

export default LegacyEmploymentRedirect;