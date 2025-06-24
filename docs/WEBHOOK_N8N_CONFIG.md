# Configuración Webhook N8N - Formulario Modal CEP

## 📋 Estructura de Datos Enviados

El formulario modal envía los siguientes datos al webhook de n8n:

```json
{
  // DATOS DEL LEAD
  "nombre": "string",
  "apellidos": "string", 
  "email": "string",
  "telefono": "string",
  "sedePreferida": "Norte|Santa Cruz",
  "comentarios": "string (opcional)",
  "preferenciasContacto": "cualquier_hora|mananas|tardes|fines_semana",
  
  // DATOS DEL CURSO
  "curso": "string",
  "sede": "string",
  "tag": "string",
  
  // METADATOS
  "procedencia": "landing_web_modal",
  "tipo": "reserva_plaza",
  "timestamp": "ISO 8601",
  "url": "string",
  "userAgent": "string"
}
```

## 🔗 Configuración del Webhook

### URL del Webhook
```
https://tu-instancia-n8n.com/webhook/cep-inscripciones
```

### Método HTTP
```
POST
```

### Headers
```json
{
  "Content-Type": "application/json"
}
```

## ⚙️ Flujo N8N Recomendado

### 1. Webhook Trigger
- **Tipo**: HTTP Request
- **Path**: `/webhook/cep-inscripciones`
- **Método**: POST
- **Autenticación**: Opcional (Bearer token recomendado)

### 2. Validación de Datos
```javascript
// Validar campos obligatorios
if (!$json.nombre || !$json.apellidos || !$json.email || !$json.telefono) {
  throw new Error('Campos obligatorios faltantes');
}

// Validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test($json.email)) {
  throw new Error('Email inválido');
}

// Validar teléfono (formato español)
const telefonoRegex = /^[6-9]\d{8}$/;
if (!telefonoRegex.test($json.telefono.replace(/\s+/g, ''))) {
  throw new Error('Teléfono inválido');
}
```

### 3. Enriquecimiento de Datos
```javascript
// Añadir datos calculados
const enrichedData = {
  ...input.all(),
  leadId: `CEP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  fechaCreacion: new Date().toISOString(),
  estado: 'nuevo',
  asesorAsignado: null,
  origen: 'landing_solaria',
  prioridad: $json.curso.includes('Adiestramiento') ? 'alta' : 'media'
};
```

### 4. Google Sheets - Registro Lead
```javascript
// Insertar en Google Sheets
const sheetData = [
  [
    $json.leadId,
    $json.timestamp,
    $json.nombre,
    $json.apellidos,
    $json.email,
    $json.telefono,
    $json.curso,
    $json.sedePreferida,
    $json.comentarios,
    $json.preferenciasContacto,
    $json.procedencia,
    'nuevo',
    '', // asesor_asignado
    '', // fecha_contacto
    $json.url
  ]
];
```

### 5. Mailchimp - Añadir Contacto
```javascript
// Configuración Mailchimp
const mailchimpData = {
  email_address: $json.email,
  status: 'subscribed',
  merge_fields: {
    FNAME: $json.nombre,
    LNAME: $json.apellidos,
    PHONE: $json.telefono,
    CURSO: $json.curso,
    SEDE: $json.sedePreferida,
    COMENTARIOS: $json.comentarios
  },
  tags: [
    $json.tag,
    `sede_${$json.sedePreferida.toLowerCase()}`,
    'reserva_plaza',
    'otono_2025'
  ]
};
```

### 6. Email Automático de Confirmación
```html
<h2>🎉 ¡Plaza Reservada en {{ $json.curso }}!</h2>

<p>Hola {{ $json.nombre }},</p>

<p><strong>¡Gracias por reservar tu plaza!</strong> Hemos recibido correctamente tu solicitud para el curso de <strong>{{ $json.curso }}</strong> en <strong>CEP {{ $json.sedePreferida }}</strong>.</p>

<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>📋 Próximos pasos:</h3>
  <ul>
    <li>✅ Tu plaza ha sido reservada</li>
    <li>📞 Un asesor de CEP se pondrá en contacto contigo en las próximas 2 horas</li>
    <li>📚 Te enviaremos toda la documentación del curso</li>
    <li>💳 Te explicaremos las opciones de pago y matrícula</li>
  </ul>
</div>

<p><strong>Preferencias de contacto:</strong> {{ $json.preferenciasContacto }}</p>

<p>Si tienes alguna duda urgente, puedes contactarnos en:</p>
<ul>
  <li>📧 Email: info@cepcomunicacion.com</li>
  <li>📱 WhatsApp: [NÚMERO_WHATSAPP]</li>
</ul>

<p>¡Gracias por confiar en CEP Formación!</p>
```

### 7. WhatsApp Automático (15 minutos después)
```javascript
// Delay de 15 minutos
setTimeout(() => {
  const whatsappMessage = `
🎉 ¡Hola ${$json.nombre}!

Gracias por reservar tu plaza en *${$json.curso}* en CEP ${$json.sedePreferida}.

📋 *Próximos pasos:*
✅ Plaza reservada correctamente
📞 Un asesor te llamará hoy mismo
📚 Te enviaremos toda la info del curso

¿Tienes alguna duda? ¡Responde a este mensaje!

*CEP Formación - Tu futuro profesional*
  `;
  
  // Enviar vía API de WhatsApp
}, 900000); // 15 minutos
```

### 8. Asignación de Asesor
```javascript
// Lógica de asignación rotativa
const asesores = [
  { nombre: 'Ana García', email: 'ana@cepformacion.com', especialidad: 'sanitarios' },
  { nombre: 'Carlos López', email: 'carlos@cepformacion.com', especialidad: 'administracion' },
  { nombre: 'María Rodríguez', email: 'maria@cepformacion.com', especialidad: 'animales' }
];

// Asignar por especialidad o rotativo
let asesorAsignado;
if ($json.curso.includes('Veterinario') || $json.curso.includes('Adiestramiento')) {
  asesorAsignado = asesores.find(a => a.especialidad === 'animales');
} else {
  // Asignación rotativa basada en timestamp
  const index = Math.floor(Date.now() / 1000) % asesores.length;
  asesorAsignado = asesores[index];
}
```

### 9. Email al Asesor Asignado
```html
<h2>🎯 Nuevo Lead Asignado - {{ $json.curso }}</h2>

<p>Hola {{ asesorAsignado.nombre }},</p>

<p>Tienes un nuevo lead asignado para contactar en las próximas 2 horas.</p>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><strong>Nombre:</strong></td>
    <td>{{ $json.nombre }} {{ $json.apellidos }}</td>
  </tr>
  <tr>
    <td><strong>Teléfono:</strong></td>
    <td>{{ $json.telefono }}</td>
  </tr>
  <tr>
    <td><strong>Email:</strong></td>
    <td>{{ $json.email }}</td>
  </tr>
  <tr>
    <td><strong>Curso:</strong></td>
    <td>{{ $json.curso }}</td>
  </tr>
  <tr>
    <td><strong>Sede:</strong></td>
    <td>CEP {{ $json.sedePreferida }}</td>
  </tr>
  <tr>
    <td><strong>Comentarios:</strong></td>
    <td>{{ $json.comentarios || 'Sin comentarios' }}</td>
  </tr>
  <tr>
    <td><strong>Horario preferido:</strong></td>
    <td>{{ $json.preferenciasContacto }}</td>
  </tr>
</table>

<div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>📞 Guion sugerido:</h3>
  <p><em>"Hola {{ $json.nombre }}, te llamo de CEP Formación. Nos dejaste tus datos para el curso de {{ $json.curso }}. ¿Tienes un momento para contarte los detalles y resolver tus dudas?"</em></p>
</div>

<p><a href="[ENLACE_GOOGLE_SHEET]">Ver ficha completa en Google Sheet</a></p>
```

## 🔧 Implementación en CursoInscripcionModal.tsx

Reemplazar el comentario TODO con:

```typescript
const response = await fetch('https://tu-instancia-n8n.com/webhook/cep-inscripciones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TU_TOKEN_AQUI' // Opcional
  },
  body: JSON.stringify(submissionData),
});

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const result = await response.json();
console.log('✅ Lead enviado exitosamente:', result);
```

## 📊 Métricas y Logs

### Eventos a Trackear
- ✅ Lead recibido
- ✅ Email enviado
- ✅ WhatsApp enviado  
- ✅ Asesor asignado
- ✅ Primer contacto realizado
- ✅ Lead convertido a matrícula

### Dashboard N8N
- Total de leads por día/semana
- Conversión por curso
- Tiempo de respuesta promedio
- Leads por asesor
- Errores en el flujo

## 🚨 Gestión de Errores

```javascript
// Error handling
try {
  // Flujo principal
} catch (error) {
  // Log error
  console.error('Error en flujo CEP:', error);
  
  // Notificar a admin
  await fetch('https://hooks.slack.com/services/...', {
    method: 'POST',
    body: JSON.stringify({
      text: `❌ Error en lead CEP: ${error.message}`,
      channel: '#cep-alerts'
    })
  });
  
  // Email de respaldo
  await sendEmail({
    to: 'admin@cepformacion.com',
    subject: 'Error en flujo de leads',
    body: `Error procesando lead: ${JSON.stringify($json)}`
  });
}
```

## 🔄 Backup y Redundancia

- **Google Sheets**: Backup principal de todos los leads
- **Mailchimp**: Backup secundario con automatización de emails
- **Webhook logs**: Registro completo en n8n
- **Slack notifications**: Alertas en tiempo real

---

**⚡ Flujo optimizado para conversión máxima y seguimiento 100% automatizado** 