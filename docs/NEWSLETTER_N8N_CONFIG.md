# Configuración Newsletter N8N - CEP Formación

## 📋 Estructura de Datos Newsletter

El formulario de newsletter envía los siguientes datos al webhook de n8n:

```json
{
  // DATOS DEL SUSCRIPTOR
  "email": "string",
  "timestamp": "ISO 8601",
  "ip_address": "string",
  "user_agent": "string",
  "page_origin": "string",
  "campaign_source": "newsletter-web",
  "subscription_type": "newsletter"
}
```

## 🔗 Configuración del Webhook

### URL del Webhook
```
https://tu-instancia-n8n.com/webhook/newsletter-subscription
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

## ⚙️ Flujo N8N Newsletter Recomendado

### 1. Webhook Trigger
- **Tipo**: HTTP Request
- **Path**: `/webhook/newsletter-subscription`
- **Método**: POST
- **Autenticación**: Bearer token recomendado

### 2. Validación de Datos
```javascript
// Validar email obligatorio
if (!$json.email) {
  throw new Error('Email es obligatorio');
}

// Validar formato de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test($json.email)) {
  throw new Error('Formato de email inválido');
}

// Verificar que no sea spam
const spamDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
const emailDomain = $json.email.split('@')[1];
if (spamDomains.includes(emailDomain)) {
  throw new Error('Dominio de email no permitido');
}
```

### 3. Enriquecimiento de Datos
```javascript
// Añadir datos calculados
const enrichedData = {
  ...input.all(),
  subscription_id: `NEWSLETTER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  fecha_suscripcion: new Date().toISOString(),
  estado: 'activo',
  origen: 'web-cepcomunicacion',
  tags: ['newsletter', 'web-subscription', 'cep-formacion'],
  preferencias: {
    frecuencia: 'semanal',
    contenido: ['cursos', 'ofertas', 'noticias']
  }
};
```

### 4. Google Sheets - Registro Suscriptor
```javascript
// Insertar en Google Sheets
const sheetData = [
  [
    $json.subscription_id,
    $json.timestamp,
    $json.email,
    $json.ip_address,
    $json.page_origin,
    $json.user_agent,
    'activo',
    '', // fecha_baja
    '', // motivo_baja
    $json.campaign_source
  ]
];
```

### 5. Mailchimp - Añadir Suscriptor
```javascript
// Configuración Mailchimp
const mailchimpData = {
  email_address: $json.email,
  status: 'subscribed',
  merge_fields: {
    ORIGEN: $json.page_origin,
    FECHA_SUB: new Date().toISOString().split('T')[0],
    IP_ADDRESS: $json.ip_address
  },
  tags: [
    'newsletter',
    'web-subscription',
    'cep-formacion',
    `origen-${$json.page_origin.replace(/[^a-zA-Z0-9]/g, '-')}`
  ],
  interests: {
    // IDs de intereses en Mailchimp
    'cursos_sanitarios': true,
    'ofertas_especiales': true,
    'noticias_cep': true
  }
};
```

### 6. Brevo - Añadir Contacto (Backup)
```javascript
// Configuración Brevo
const brevoData = {
  email: $json.email,
  attributes: {
    ORIGEN: $json.page_origin,
    FECHA_SUSCRIPCION: new Date().toISOString(),
    IP_SUSCRIPCION: $json.ip_address,
    TIPO_SUSCRIPCION: 'newsletter'
  },
  listIds: [1], // ID de lista newsletter en Brevo
  updateEnabled: true
};
```

### 7. Email de Bienvenida Automático
```html
<h2>🎉 ¡Bienvenido al Newsletter de CEP Formación!</h2>

<p>Hola,</p>

<p><strong>¡Gracias por suscribirte!</strong> Ahora formas parte de nuestra comunidad y recibirás las últimas novedades, ofertas exclusivas y contenido de valor directamente en tu bandeja de entrada.</p>

<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>📬 ¿Qué recibirás?</h3>
  <ul>
    <li>🎓 Información sobre nuevos cursos y fechas</li>
    <li>💰 Ofertas y descuentos exclusivos</li>
    <li>📚 Contenido educativo y tips profesionales</li>
    <li>🏆 Historias de éxito de nuestros alumnos</li>
  </ul>
</div>

<div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>📋 Próximos pasos:</h3>
  <ul>
    <li>✅ Añade <strong>info@cepcomunicacion.com</strong> a tus contactos</li>
    <li>📱 Síguenos en redes sociales para más contenido</li>
    <li>🔍 Explora nuestros cursos disponibles</li>
  </ul>
</div>

<p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
<ul>
  <li>📧 Email: info@cepcomunicacion.com</li>
  <li>🌐 Web: cepcomunicacion.com</li>
  <li>📱 Teléfono: [NÚMERO_TELÉFONO]</li>
</ul>

<p><strong>¡Gracias por confiar en CEP Formación para tu desarrollo profesional!</strong></p>

<hr>
<p style="font-size: 12px; color: #666;">
Si no deseas recibir más emails, puedes <a href="[UNSUBSCRIBE_LINK]">darte de baja aquí</a>.
</p>
```

### 8. Notificación Interna
```javascript
// Email a equipo CEP
const notificationData = {
  to: 'admin@cepcomunicacion.com',
  subject: '📧 Nueva suscripción al newsletter',
  html: `
    <h3>Nueva suscripción al newsletter</h3>
    <p><strong>Email:</strong> ${$json.email}</p>
    <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
    <p><strong>Página origen:</strong> ${$json.page_origin}</p>
    <p><strong>IP:</strong> ${$json.ip_address}</p>
    <p><strong>User Agent:</strong> ${$json.user_agent}</p>
  `
};
```

### 9. Slack Notification (Opcional)
```javascript
// Notificación a Slack
const slackMessage = {
  text: `🎉 Nueva suscripción al newsletter`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Nueva suscripción:* ${$json.email}\n*Página:* ${$json.page_origin}\n*Fecha:* ${new Date().toLocaleString('es-ES')}`
      }
    }
  ]
};
```

## 📊 Métricas y Logs

### Eventos a Trackear
- ✅ Suscripción recibida
- ✅ Email validado
- ✅ Añadido a Mailchimp
- ✅ Añadido a Brevo
- ✅ Email de bienvenida enviado
- ✅ Notificación interna enviada

### Dashboard N8N
- Total de suscripciones por día/semana
- Páginas de origen más efectivas
- Tasa de apertura de emails de bienvenida
- Errores en el flujo
- Dominios de email más comunes

## 🚨 Gestión de Errores

```javascript
// Error handling
try {
  // Proceso principal
} catch (error) {
  // Log del error
  console.error('Error en flujo newsletter:', error);
  
  // Notificación de error
  const errorNotification = {
    to: 'tech@cepcomunicacion.com',
    subject: '🚨 Error en flujo newsletter',
    text: `Error: ${error.message}\nEmail: ${$json.email}\nTimestamp: ${new Date().toISOString()}`
  };
  
  // Enviar notificación de error
  // ...
}
```

## 🔄 Backup y Redundancia

- **Google Sheets**: Backup principal de todas las suscripciones
- **Mailchimp**: Plataforma principal de email marketing
- **Brevo**: Backup secundario y segmentación adicional
- **Webhook logs**: Registro completo en n8n
- **Slack notifications**: Alertas en tiempo real

## 🎯 Automatizaciones Adicionales

### Secuencia de Bienvenida (7 días)
1. **Día 0**: Email de bienvenida inmediato
2. **Día 2**: Presentación de CEP Formación
3. **Día 4**: Cursos más populares
4. **Día 7**: Oferta especial para nuevos suscriptores

### Segmentación Automática
- Por página de origen
- Por horario de suscripción
- Por dispositivo (móvil/desktop)
- Por ubicación geográfica (si disponible)

---

**⚡ Flujo optimizado para máxima entregabilidad y engagement**