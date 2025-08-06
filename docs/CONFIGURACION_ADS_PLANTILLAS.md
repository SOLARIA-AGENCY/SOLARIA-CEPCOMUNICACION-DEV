# Configuración de Ads en Plantillas de Cursos - CEP Formación

## Versión 2.0 - Integración Completa de Publicidad

### Resumen Ejecutivo

Las plantillas de cursos automáticas han sido actualizadas para incluir una configuración completa de publicidad y marketing digital. Cada curso generado automáticamente incluirá ahora toda la infraestructura necesaria para campañas de Meta Ads, tracking, automatización y seguimiento de leads.

### Estructura de la Configuración de Ads

Cada plantilla de curso incluye ahora una sección `configuracion_ads` con los siguientes componentes:

#### 1. Configuración de Campaña
```json
"campana": {
  "tag_seguimiento": "{{TEMPORADA}}-{{SLUG_CURSO}}-{{SEDE_SLUG}}",
  "nombre_formulario": "CEP {{SEDE_COMPLETA}} – {{NOMBRE_CURSO}} – CAMPAÑA {{TEMPORADA_UPPER}} – SOLARIA AGENCY",
  "lista_mailchimp": "Lista: {{NOMBRE_CURSO}} {{SEDE_COMPLETA}} {{TEMPORADA_UPPER}}",
  "landing_preinscripcion": "landing-{{SLUG_CURSO}}-{{SEDE_SLUG}}",
  "estado_campana": "{{ESTADO_CAMPANA}}",
  "prioridad": "{{PRIORIDAD_CAMPANA}}"
}
```

#### 2. URLs Estratégicas
- **Ruta Directa**: Para leads de Facebook Ads
- **Ruta Semántica**: Para tráfico orgánico y SEO
- Diferenciación clara de propósitos

#### 3. Configuración de Formularios Meta
- Títulos de bienvenida estandarizados
- Descripciones personalizables por curso
- Campos requeridos y opcionales
- Avisos RGPD completos
- Mensajes de confirmación personalizados

#### 4. Tracking y Analytics
- **Facebook Pixel**: Eventos personalizados por curso
- **Google Analytics**: Goals y eventos específicos
- **Tag Manager**: Triggers y dataLayer configurados

#### 5. Contenido de Ads
- Variantes de títulos (3 opciones)
- Textos de anuncios personalizables
- CTAs recomendados
- Hashtags sugeridos
- Definición de audiencia objetivo

#### 6. Automatización n8n
- Flujos principales de lead automation
- Acciones automáticas (email, WhatsApp, asignación)
- Integraciones con Mailchimp, Google Sheets
- Timing específico para cada acción

#### 7. Configuración Técnica
- Tipo de formulario optimizado
- Configuraciones de entrega flexible
- Autocompletado de campos
- Optimización de conversión

### Variables de Plantilla Disponibles

#### Variables Básicas
- `{{NOMBRE_CURSO}}`: Nombre completo del curso
- `{{SEDE}}`: Sede del curso (Norte, Santa Cruz)
- `{{SLUG_CURSO}}`: Slug URL del curso
- `{{TEMPORADA}}`: Temporada de la campaña (ej: otono-2025)

#### Variables de Campaña
- `{{ESTADO_CAMPANA}}`: Estado actual (activa, pausada, planificada)
- `{{PRIORIDAD_CAMPANA}}`: Nivel de prioridad
- `{{DESCRIPCION_FORMULARIO}}`: Descripción específica para el formulario
- `{{ESPECIALIDAD_DESTACADA}}`: Especialidad a destacar
- `{{MES_INICIO}}`: Mes de inicio del curso

#### Variables de Contenido
- `{{TEXTO_AD_1}}`, `{{TEXTO_AD_2}}`, `{{TEXTO_AD_3}}`: Variantes de texto
- `{{HASHTAG_1}}`, `{{HASHTAG_2}}`, `{{HASHTAG_3}}`: Hashtags específicos
- `{{BENEFICIO_PRINCIPAL}}`: Beneficio principal a destacar
- `{{DESCRIPCION_AUDIENCIA}}`: Descripción de la audiencia objetivo

#### Variables de Integración
- `{{MAILCHIMP_LIST_ID}}`: ID de la lista en Mailchimp
- `{{GOOGLE_SHEET_ID}}`: ID de la hoja de Google Sheets
- `{{WHATSAPP_TEMPLATE_ID}}`: ID del template de WhatsApp
- `{{EMAIL_TEMPLATE_ID}}`: ID del template de email

### Tipos de Plantillas

#### 1. Cursos para Desempleados
- Configuración específica para programas subvencionados
- Tracking diferenciado por sede
- Formularios adaptados a requisitos específicos

#### 2. Cursos Privados
- Configuración simplificada sin sede específica
- URLs adaptadas a estructura de cursos privados
- Tracking con categoría "Private Course Lead"

### Implementación y Uso

#### Generación Automática
Cuando se genere un nuevo curso usando estas plantillas:

1. **Se creará automáticamente**:
   - Configuración completa de Meta Ads
   - Formularios con RGPD integrado
   - Tracking de Facebook Pixel y Google Analytics
   - Automatización n8n configurada
   - Listas de Mailchimp preparadas

2. **Se configurará**:
   - URLs duales (directa y semántica)
   - Eventos de conversión específicos
   - Flujos de automatización personalizados
   - Contenido de ads con variantes

#### Personalización
Para personalizar una campaña específica:

1. Reemplazar las variables `{{}}` con valores reales
2. Ajustar textos de ads según el curso específico
3. Configurar IDs de integración (Mailchimp, Google Sheets)
4. Activar los flujos de n8n correspondientes

### Estándares de Nomenclatura

#### Tags de Seguimiento
Formato: `{{TEMPORADA}}-{{SLUG_CURSO}}-{{SEDE_SLUG}}`
Ejemplo: `otono-2025-auxiliar-farmacia-norte`

#### Nombres de Formularios
Formato: `CEP {{SEDE_COMPLETA}} – {{NOMBRE_CURSO}} – CAMPAÑA {{TEMPORADA_UPPER}} – SOLARIA AGENCY`
Ejemplo: `CEP Norte – Auxiliar de Farmacia – CAMPAÑA OTOÑO 2025 – SOLARIA AGENCY`

#### Listas de Mailchimp
Formato: `Lista: {{NOMBRE_CURSO}} {{SEDE_COMPLETA}} {{TEMPORADA_UPPER}}`
Ejemplo: `Lista: Auxiliar de Farmacia Norte OTOÑO 2025`

### Integración con Sistemas Existentes

#### Facebook Meta Ads
- Formularios configurados con "Más volumen"
- Entrega flexible optimizada
- Autocompletado activado
- Pixel de retargeting integrado

#### Mailchimp
- Listas específicas por curso y sede
- Secuencias de bienvenida automáticas
- Segmentación por tags de campaña

#### n8n Automation
- Flujos maestros reutilizables
- Integración con Google Sheets
- Envío automático de WhatsApp y email
- Asignación rotativa de asesores

#### Google Analytics & Tag Manager
- Goals específicos por curso
- Eventos de conversión configurados
- DataLayer estructurado
- Triggers personalizados

### Próximos Pasos

1. **Validación**: Revisar configuraciones específicas por curso
2. **Implementación**: Activar flujos de n8n correspondientes
3. **Testing**: Probar formularios y tracking
4. **Optimización**: Ajustar textos y configuraciones según performance

### Notas Técnicas

- Todas las configuraciones son compatibles con RGPD
- Los formularios incluyen avisos de privacidad completos
- El tracking respeta las políticas de cookies
- Las automatizaciones incluyen delays apropiados
- La estructura es escalable para nuevas campañas

---

**Versión**: 2.0  
**Fecha**: Enero 2025  
**Responsable**: ECO-NAZCAMEDIA  
**Estado**: Implementado