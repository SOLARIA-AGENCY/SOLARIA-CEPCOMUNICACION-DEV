# Instrucciones de Integración - Sistema Email Bienvenida

## 1. PREPARACIÓN DEL ENTORNO

### Requisitos Previos
- Servidor N8N activo (versión 1.0+)
- Acceso a APIs de Brevo y Mailchimp
- Dominio configurado: www.cepcomunicacion.com
- Certificado SSL activo

### Variables de Entorno Requeridas
Crear archivo `.env` en el directorio raíz:

```bash
# APIs Principales
BREVO_API_KEY=tu_api_key_brevo
MAILCHIMP_API_KEY=tu_api_key_mailchimp
MAILCHIMP_SERVER_PREFIX=us21  # Ajustar según tu cuenta

# Configuración N8N
N8N_HOST=https://n8n.cepcomunicacion.com
N8N_API_KEY=tu_api_key_n8n

# Configuración Email
BREVO_TEMPLATE_ID=7
BREVO_LIST_ID=2
MAILCHIMP_LIST_ID=tu_list_id_mailchimp

# Configuración Webhook
WEBHOOK_PATH=newsletter-signup
WEBHOOK_CORS_ORIGIN=https://www.cepcomunicacion.com
```

## 2. INSTALACIÓN PASO A PASO

### Paso 1: Copiar Archivos
```bash
# En el repositorio de www.cepcomunicacion.com
cp -r INTEGRACION_CEP_COMUNICACION/ ./newsletter-system/
cd newsletter-system/
```

### Paso 2: Configurar Credenciales
```bash
# Copiar y editar archivo de configuración
cp config/credenciales.env.example .env
nano .env  # Editar con tus credenciales reales
```

### Paso 3: Instalar Dependencias Python
```bash
# Crear entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install requests python-dotenv
```

### Paso 4: Importar Workflow N8N

#### Opción A: Importación Manual
1. Acceder a tu instancia N8N
2. Ir a "Workflows" → "Import from file"
3. Seleccionar `workflows/workflow_email_bienvenida.json`
4. Configurar credenciales en cada nodo

#### Opción B: Importación Automática
```bash
# Ejecutar script de configuración
python scripts/configurador_workflow.py
```

## 3. CONFIGURACIÓN DE NODOS N8N

### Nodo 1: Newsletter_Subscription_Webhook
```json
{
  "httpMethod": "POST",
  "path": "newsletter-signup",
  "responseMode": "responseNode",
  "options": {
    "allowedOrigins": "https://www.cepcomunicacion.com"
  }
}
```

### Nodo 2: Email_Validator_Sanitizer
```javascript
// Código de validación incluido en el workflow
const email = $json.email;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  throw new Error('Email inválido');
}

return {
  email: email.toLowerCase().trim(),
  firstName: $json.firstName || '',
  lastName: $json.lastName || ''
};
```

### Nodo 4: Brevo_Contact_Registration
```json
{
  "url": "https://api.brevo.com/v3/contacts",
  "method": "POST",
  "headers": {
    "api-key": "={{$env.BREVO_API_KEY}}",
    "Content-Type": "application/json"
  },
  "body": {
    "email": "={{$json.email}}",
    "attributes": {
      "FIRSTNAME": "={{$json.firstName}}",
      "LASTNAME": "={{$json.lastName}}"
    },
    "listIds": [2]
  }
}
```

## 4. CONFIGURACIÓN DEL FRONTEND

### HTML del Formulario
```html
<form id="newsletter-form" action="https://n8n.cepcomunicacion.com/webhook/newsletter-signup" method="POST">
  <input type="email" name="email" placeholder="Tu email" required>
  <input type="text" name="firstName" placeholder="Nombre">
  <input type="text" name="lastName" placeholder="Apellidos">
  <button type="submit">Suscribirse</button>
</form>

<script>
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch(this.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('¡Suscripción exitosa! Revisa tu email.');
      this.reset();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    alert('Error de conexión. Inténtalo de nuevo.');
  }
});
</script>
```

## 5. TESTING Y VALIDACIÓN

### Test Manual
```bash
# Test básico del webhook
curl -X POST https://n8n.cepcomunicacion.com/webhook/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@cepcomunicacion.com",
    "firstName": "Test",
    "lastName": "Usuario"
  }'
```

### Test Automatizado
```bash
# Ejecutar validador de integración
python scripts/validador_integracion.py
```

### Casos de Prueba
1. **Email válido**: Debe registrar en ambos CRMs y enviar email
2. **Email inválido**: Debe retornar error 400
3. **API caída**: Debe usar sistema de respaldo
4. **Datos incompletos**: Debe manejar graciosamente

## 6. MONITOREO Y MANTENIMIENTO

### Logs de Sistema
```bash
# Ver logs de N8N
tail -f /var/log/n8n/workflow.log

# Ejecutar backup automático
python scripts/sistema_respaldo.py
```

### Métricas Clave
- Tiempo de respuesta < 5 segundos
- Tasa de éxito > 95%
- Emails entregados > 98%
- Registros duplicados < 1%

### Mantenimiento Semanal
1. Revisar logs de errores
2. Verificar métricas de performance
3. Ejecutar backup de workflows
4. Validar templates de email

## 7. SOLUCIÓN DE PROBLEMAS

### Problemas Comunes

#### Error: "Webhook no responde"
```bash
# Verificar estado de N8N
sudo systemctl status n8n

# Reiniciar si es necesario
sudo systemctl restart n8n
```

#### Error: "API Brevo falla"
- Verificar API key en variables de entorno
- Comprobar límites de rate limiting
- El sistema automáticamente usará Mailchimp como respaldo

#### Error: "Emails no se envían"
- Verificar template ID en Brevo
- Comprobar configuración SMTP
- Revisar logs de delivery en Brevo dashboard

### Contacto de Soporte
- Documentación técnica: `documentacion/`
- Scripts de diagnóstico: `scripts/validador_integracion.py`
- Logs del sistema: `/var/log/n8n/`

## 8. SEGURIDAD

### Configuración CORS
```javascript
// En el nodo Webhook
{
  "options": {
    "allowedOrigins": "https://www.cepcomunicacion.com",
    "allowedMethods": ["POST"],
    "allowedHeaders": ["Content-Type"]
  }
}
```

### Validación de Datos
- Sanitización automática de inputs
- Validación de formato de email
- Rate limiting por IP
- Logs de seguridad activados

### Backup y Recuperación
- Backup automático diario de workflows
- Versionado en Git
- Configuración de rollback rápido

---

**¡Integración completada!** El sistema está listo para producción.

**Próximos pasos:**
1. Activar el workflow en N8N
2. Configurar monitoreo
3. Realizar pruebas finales
4. Documentar en wiki interno