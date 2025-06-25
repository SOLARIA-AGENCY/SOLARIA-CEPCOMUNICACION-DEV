# Campaña OTOÑO 2025 - CEP FORMACIÓN (Solaria Agency)

## 1. Objetivo General
Implementar una campaña de captación de alumnos para los cursos presenciales de CEP FORMACIÓN en Tenerife, optimizando el rendimiento mediante geosegmentación, automatización integral y enfoque audiovisual, todo gestionado desde infraestructura propia de Solaria Agency.

---

## 2. Arquitectura Operativa

### 2.1 Plataformas Utilizadas
- **Meta Business Suite (Facebook/Instagram Ads)**
- **Mailchimp**: email marketing + automatizaciones
- **n8n**: motor de automatización principal
- **Google Sheets**: base de registro de leads
- **Dominio**: `cepcomunicacion.com` (propiedad de Solaria)
- **Email operativo**: `info@cepcomunicacion.com` (DKIM/SPF verificado)

### 2.2 Principios Estratégicos
- Ads separados por sede geográfica (CEP NORTE / CEP SANTA CRUZ)
- Un formulario directo por ad (sin campos adicionales)
- Flujo automatizado de contacto vía email + WhatsApp + llamada
- Aislamiento operativo total respecto a `cursostenerife.es`

---

## 3. Estructura de la Campaña en Meta Ads

### Campaña: "CEP FORMACIÓN - OTOÑO 2025"
- **Objetivo**: Generación de leads

### Conjuntos de Anuncios:
1. **CEP NORTE**
   - Segmentación: Norte de Tenerife
   - Ads de cursos disponibles en esta sede

2. **CEP SANTA CRUZ**
   - Segmentación: SC + Sur
   - Ads de cursos en esta sede

### Anuncios
- Formato: **video tipo Reels (15s)**
- Estructura creativa:
  - 0.0s: Imagen emocional de la profesión
  - 1.0s: Inclusión de hombre y mujer
  - 1.5s: Título del curso
  - 3.0s: Logo de CEP visible
- Formularios vinculados: 1 por ad
- Sin campos adicionales (solo email + tel. autorrelleno)

---

## 4. Flujo de Captación Automatizado (via n8n)

1. **Formulario enviado (Meta Ads)**
2. **Lead sincronizado automáticamente con Mailchimp**
3. **Email automatizado**:
   - Agradecimiento + información + aviso de llamada
   - Botón para cancelar la llamada
     - Redirige a landing con temario y CTA final
4. **15 min después**: Envío de WhatsApp desde número oficial CEP (automatizado con n8n o servidor MCP)
5. **Asignación de llamada a asesor CEP**:
   - n8n actualiza Google Sheet compartido (leads)
   - Campo "asesor asignado" con asignación rotativa o distribuida
   - Envío automático de email al asesor con datos del lead y guion de contacto

### 📬 Email al Asesor (estructura propuesta)

**Asunto:** 🎯 Nuevo lead asignado – Curso [CURSO] en [SEDE]

**Contenido:**

Hola [Nombre del Asesor],

Tienes un nuevo lead asignado para contactar en las próximas horas.

**📌 Detalles del lead:**
- Nombre: [Nombre del lead]
- Teléfono: [Teléfono del lead]
- Email: [Email del lead]
- Curso: [Nombre del curso]
- Sede: [CEP NORTE / SANTA CRUZ]
- Formulario enviado el: [Fecha y hora]

---

### 📞 Guion sugerido para llamada:

> Hola, ¿[Nombre del lead]?
>
> Mi nombre es [Tu nombre], te llamo de parte de CEP Formación. Nos dejaste tus datos para recibir información sobre el curso de [Nombre del curso] en [Sede].
>
> ¿Tienes un momento para contarte en qué consiste y cómo puedes preinscribirte?
>
> *(A partir de aquí:)*
> - Reafirmar beneficios clave del curso (prácticas, horarios, grupos reducidos)
> - Confirmar disponibilidad y motivación del lead
> - Ofrecer enviarle el temario y el link directo de preinscripción
> - Preguntar si prefiere mantener contacto por WhatsApp o email
> - Dejar abierta opción de reserva de plaza

**👉 Enlace a ficha del lead en Google Sheet:** [URL directa con búsqueda]

**🕒 Recuerda:** contactar en las próximas 2 horas. Si no responde, anotar intento en la hoja compartida.

6. **Registro automático de eventos:**
   - Google Sheets: `MASTER LEADS - OTOÑO 2025`
   - Mailchimp: apertura, clicks, cancelación
   - n8n: logs de ejecución + fallback

---

## 5. Implementación de Landing de Preinscripción

### Objetivo
Confirmar el interés del lead antes de la llamada y facilitar pre-matriculación.

### Contenido:
- Formulario completo:
  - Nombre, apellidos
  - Email, teléfono
  - Curso y sede
  - Preferencia de contacto
  - Opción de reserva de plaza
- Mensaje final: "Un asesor se pondrá en contacto contigo para finalizar tu matrícula"

### Ubicación del Enlace:
- Email de bienvenida
- WhatsApp automatizado
- Landings Mailchimp

---

## 6. Plan Futuro: Matriculación Online + Pago

### Objetivo Estratégico
Implementar sistema completo de inscripción y cobro de tasas mediante:
- Validación de identidad
- Firma digital
- Pasarela de pago (Stripe, Redsys, etc.)
- Integración con CRM y automatizaciones de onboarding

---

## 7. Optimización de Registro y Seguimiento

### Google Sheets (MASTER LEADS)
- Columnas nuevas:
  - Asesor asignado
  - Fecha de contacto
  - Estado de matrícula
  - Guion utilizado (sí/no/observaciones)

### Mailchimp
- Etiquetas de segmentación:
  - Pre-inscrito
  - Matriculado
  - Sin respuesta

### n8n
- Control de errores
- Logging de WhatsApp + emails + asignaciones
- Automatización de tareas con cron y webhooks

---

## 8. Objetivos Secundarios
- Aumentar tasa de conversión de formulario con menos fricción (+5%)
- Captar leads de calidad segmentados por zona (mejor conversión final)
- Recuperar leads indecisos con contacto via email/landing sin llamada
- Disminuir abandono tras 1er contacto gracias a redundancia email+whatsapp
- Confirmar interés real mediante landing de preinscripción
- Facilitar cierre de matrícula a futuro mediante plataforma propia
- Estandarizar el guion comercial para asesores de contacto telefónico

---

## 9. Acciones Pendientes
- Crear plantilla HTML en Mailchimp para email inicial
- Diseñar landings:
  - Cancelación de llamada
  - Temario + última oportunidad
  - Formulario de preinscripción
- Generar flujo completo en n8n (con Google Sheet + Mailchimp + WhatsApp)
- Producir videos por curso (1 por sede si aplica)
- Confirmar listado final de cursos y fechas
- Vincular formularios a listas Mailchimp + flujos correspondientes
- Incluir guion de contacto en todos los emails de asignación a asesores

---

**Documento vivo**. Actualizar en cada iteración de la campaña.

