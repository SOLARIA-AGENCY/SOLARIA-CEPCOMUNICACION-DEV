# 🎯 RUTAS DUALES PARA CURSOS DE EMPLEO - DOCUMENTACIÓN TÉCNICA

## 📋 RESUMEN EJECUTIVO

Sistema de rutas duales implementado para cursos de empleo (ocupados/desempleados) siguiendo el patrón exitoso de cursos regulares. Optimizado para SEO, conversión de Facebook Ads y tracking diferenciado.

### ✅ IMPLEMENTACIÓN COMPLETADA

- **Interfaces TypeScript**: Actualizadas con campos `slug` y `seo`
- **Componentes Wrapper**: 3 nuevos componentes especializados
- **Rutas Duales**: Sistema completo implementado en App.tsx
- **Tracking Analytics**: Diferenciado para cada tipo de tráfico
- **SEO Avanzado**: Structured data y meta tags dinámicos
- **Redirecciones Legacy**: Preservación de SEO equity

## 🏗️ ARQUITECTURA DEL SISTEMA

### 1. ESTRUCTURA DE RUTAS

```
RUTAS DIRECTAS (Facebook Ads)
├── /prevencion-riesgos-ambientales-ocupados
└── /[futuro-curso-slug]

RUTAS SEMÁNTICAS (SEO)
├── /cursos-empleo/prevencion-riesgos-ambientales-ocupados
└── /cursos-empleo/[futuro-curso-slug]

RUTAS LEGACY (Redirecciones 301)
├── /legacy-curso-ocupado/:id
└── /legacy-curso-desempleado/:id
```

### 2. COMPONENTES PRINCIPALES

#### **DirectEmploymentWrapper**
- 📍 Ruta: `/prevencion-riesgos-ambientales-ocupados`
- 🎯 Propósito: Conversión Facebook Ads
- 📊 Tracking: Facebook Pixel prioritario
- 🔄 Funcionalidad: Carga directa sin fricción

#### **SemanticEmploymentWrapper**
- 📍 Ruta: `/cursos-empleo/prevencion-riesgos-ambientales-ocupados`
- 🎯 Propósito: SEO y tráfico orgánico
- 📊 Tracking: Google Analytics prioritario
- 🔍 Funcionalidad: Structured data + meta tags dinámicos

#### **LegacyEmploymentRedirect**
- 📍 Ruta: `/legacy-curso-ocupado/:id`
- 🎯 Propósito: Redirecciones 301 preservando SEO
- 📊 Tracking: Analytics de redirecciones
- 🔄 Funcionalidad: Mapeo ID → slug SEO

## 🔧 CONFIGURACIÓN TÉCNICA

### 1. INTERFACE ACTUALIZADA

```typescript
export interface EmploymentCourseConfig {
  id: string;
  slug: string; // NUEVO - Para rutas duales
  nombre: string;
  tipo: EmploymentStatus;
  // ... campos existentes
  seo: { // NUEVA SECCIÓN
    title: string;
    description: string;
    keywords: string;
    structuredData?: {
      "@context": string;
      "@type": string;
      // ... schema.org completo
    };
  };
}
```

### 2. EJEMPLO DE CONFIGURACIÓN

```typescript
{
  id: 'PRO-OCUP-PREV-RIESGOS-25',
  slug: 'prevencion-riesgos-ambientales-ocupados',
  nombre: 'Prevención de Riesgos Ambientales',
  tipo: 'ocupados',
  // ... datos del curso
  seo: {
    title: 'Curso Prevención de Riesgos Ambientales - Trabajadores Ocupados | CEP Formación',
    description: 'Curso gratuito de Prevención de Riesgos Ambientales para trabajadores. Financiado por SEPE...',
    keywords: 'prevención riesgos ambientales, curso trabajadores ocupados, SEPE, formación gratuita...',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Prevención de Riesgos Ambientales",
      // ... structured data completo
    }
  }
}
```

## 📊 TRACKING Y ANALYTICS

### 1. FACEBOOK PIXEL EVENTS

#### DirectEmploymentWrapper
```javascript
// Evento principal
window.fbq('track', 'ViewContent', {
  content_type: 'employment_course_page',
  content_name: slug,
  source: 'facebook_direct_employment',
  employment_type: curso.tipo,
  course_id: curso.id,
  sede: curso.sede
});

// Evento específico SEPE
window.fbq('track', 'Lead', {
  content_type: 'sepe_course',
  content_name: curso.nombre,
  employment_type: curso.tipo,
  value: 0, // Curso gratuito
  source: 'facebook_direct_sepe'
});
```

#### SemanticEmploymentWrapper
```javascript
window.fbq('track', 'ViewContent', {
  content_type: 'employment_course_page',
  content_name: slug,
  source: 'organic_employment_semantic',
  employment_type: curso.tipo
});
```

### 2. GOOGLE ANALYTICS EVENTS

#### DirectEmploymentWrapper
```javascript
gtag('event', 'employment_course_view_direct', {
  event_category: 'facebook_employment_campaign',
  event_label: slug,
  employment_type: curso.tipo,
  traffic_source: 'facebook_direct_employment',
  course_category: 'subsidized_training'
});
```

#### SemanticEmploymentWrapper
```javascript
gtag('event', 'employment_course_view_organic', {
  event_category: 'organic_employment_traffic',
  event_label: slug,
  employment_type: curso.tipo,
  traffic_source: 'organic_employment_semantic',
  page_structure: 'semantic_employment_url'
});
```

## 🔍 SEO AVANZADO

### 1. STRUCTURED DATA ENRIQUECIDO

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Prevención de Riesgos Ambientales",
  "description": "Curso especializado en identificación...",
  "isAccessibleForFree": true,
  "financialAidEligible": true,
  "educationalCredentialAwarded": "Certificado SEPE",
  "provider": {
    "@type": "Organization",
    "name": "CEP Formación",
    "foundingDate": "2010",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34-672-947-701",
      "contactType": "Admissions"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Curso 100% gratuito financiado por SEPE"
  }
}
```

### 2. META TAGS DINÁMICOS

- **Title**: Específico por curso con keywords
- **Description**: Optimizada para CTR
- **Keywords**: Términos específicos del curso
- **Employment-Type**: Meta personalizado
- **Funding-Source**: Identificador SEPE

## 🔄 IMPLEMENTACIÓN PROGRESIVA

### FASE 1: BASE IMPLEMENTADA ✅
- [x] Interfaces TypeScript actualizadas
- [x] Componentes wrapper creados
- [x] Rutas duales configuradas
- [x] Tracking básico implementado

### FASE 2: EXPANSIÓN
- [ ] Agregar más cursos ocupados
- [ ] Implementar cursos desempleados
- [ ] Optimizar structured data
- [ ] A/B testing de rutas

### FASE 3: OPTIMIZACIÓN
- [ ] Análisis de performance
- [ ] Refinamiento de tracking
- [ ] Mejoras UX específicas
- [ ] Automatización de slugs

## 🚀 CÓMO AGREGAR NUEVOS CURSOS

### 1. Actualizar Configuración
```typescript
// En cursos-ocupados.ts o cursos-desempleados.ts
{
  id: 'PRO-OCUP-NUEVO-CURSO-25',
  slug: 'nuevo-curso-ocupados', // ⚠️ IMPORTANTE: Slug SEO-friendly
  nombre: 'Nuevo Curso',
  tipo: 'ocupados',
  // ... datos del curso
  seo: {
    title: 'Nuevo Curso - Trabajadores Ocupados | CEP Formación',
    description: 'Descripción optimizada para SEO...',
    keywords: 'keywords, específicos, del, curso',
    structuredData: { /* ... */ }
  }
}
```

### 2. Agregar Rutas en App.tsx
```typescript
{/* NUEVO CURSO - Rutas Duales */}
<Route path="/nuevo-curso-ocupados" element={<DirectEmploymentWrapper />} />
<Route path="/cursos-empleo/nuevo-curso-ocupados" element={<SemanticEmploymentWrapper />} />
```

### 3. Configurar Facebook Ads
- **URL de destino**: `/nuevo-curso-ocupados`
- **Tracking**: Automático via DirectEmploymentWrapper
- **Conversiones**: Configuradas automáticamente

## 📈 MÉTRICAS DE ÉXITO

### KPIs PRINCIPALES
- **Conversión Facebook → Formulario**: DirectEmploymentWrapper
- **Tráfico orgánico**: SemanticEmploymentWrapper
- **SEO Rankings**: Rutas semánticas
- **Redirecciones exitosas**: LegacyEmploymentRedirect

### DASHBOARDS RECOMENDADOS
- **Facebook Ads Manager**: Eventos 'ViewContent' y 'Lead'
- **Google Analytics**: Custom events por employment_type
- **Google Search Console**: Rendimiento rutas /cursos-empleo/
- **Tag Manager**: Eventos de redirección legacy

## 🔧 MANTENIMIENTO

### TAREAS REGULARES
1. **Semanal**: Revisar métricas de conversión
2. **Mensual**: Análisis SEO de rutas semánticas
3. **Trimestral**: Optimización de structured data
4. **Anual**: Revisión completa del sistema

### ALERTAS A CONFIGURAR
- **404s**: En rutas de empleo
- **Redirecciones**: Fallos en legacy redirects
- **Performance**: Tiempo de carga components
- **SEO**: Caída en rankings orgánicos

---

## 📝 NOTAS TÉCNICAS

### DECISIONES DE DISEÑO
1. **Slug único**: Por tipo de empleo para evitar conflictos
2. **Wrapper especializado**: Tracking específico por audiencia
3. **Structured data enriquecido**: Información financiera y elegibilidad
4. **Meta tags dinámicos**: Actualización automática por curso

### LIMITACIONES ACTUALES
- Solo 1 curso ocupado implementado
- Cursos desempleados pendientes
- Redirecciones legacy preparadas pero no activas
- A/B testing no implementado

### PRÓXIMOS PASOS
1. Agregar más cursos ocupados
2. Implementar cursos desempleados
3. Activar redirecciones legacy
4. Configurar A/B testing de rutas

---

*📅 Documento actualizado: 2025-01-18*  
*🔄 Versión: 1.0.0*  
*👨‍💻 Implementado por: ECO-NAZCAMEDIA*