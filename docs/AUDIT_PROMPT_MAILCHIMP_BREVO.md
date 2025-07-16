# 🔍 PROMPT DE AUDITORÍA: CONFIGURACIÓN MAILCHIMP & BREVO

## 📋 CONTEXTO DEL PROYECTO

**Cliente**: CEP Formación (Centro de Estudios Profesionales)
**Dominio**: cepcomunicacion.com
**Email operativo**: info@cepcomunicacion.com
**Problema detectado**: Newsletter configurado incorrectamente con FormSubmit en lugar de flujo n8n + Mailchimp/Brevo

## 🎯 OBJETIVO DE LA AUDITORÍA

Realizar una auditoría completa y configuración de:
1. **Mailchimp** (plataforma principal)
2. **Brevo** (backup y segmentación adicional)
3. **Integración con n8n** para automatización
4. **Flujo de suscripción newsletter** completo

## 📊 ESTADO ACTUAL IDENTIFICADO

### ❌ Problemas Detectados
- Newsletter usa FormSubmit con email incorrecto (`agency.solaria@gmail.com`)
- No hay integración activa con Mailchimp/Brevo
- Falta flujo de bienvenida automatizado
- No se capturan datos adicionales (IP, página origen, timestamp)
- No hay sincronización entre plataformas

### ✅ Correcciones Aplicadas en Frontend
- ✅ Cambiado email a `info@cepcomunicacion.com` en todos los formularios
- ✅ Actualizado `NewsletterSection.tsx`
- ✅ Actualizado `GraciasSuscripcionPage.tsx`
- ✅ Actualizado `CursoPageComponent.tsx`
- ✅ Actualizado `config.json`
- ✅ Creado archivo `.env` con configuración correcta

## 🔧 TAREAS DE AUDITORÍA REQUERIDAS

### 1. AUDITORÍA MAILCHIMP

#### 1.1 Configuración de Cuenta
- [ ] Verificar cuenta activa de Mailchimp
- [ ] Validar API Key y permisos
- [ ] Confirmar dominio `cepcomunicacion.com` verificado
- [ ] Revisar configuración de remitente (`info@cepcomunicacion.com`)

#### 1.2 Audiencias y Listas
- [ ] Crear/verificar audiencia principal "Newsletter CEP Formación"
- [ ] Configurar campos personalizados:
  - `ORIGEN` (página de suscripción)
  - `FECHA_SUB` (fecha de suscripción)
  - `IP_ADDRESS` (IP de suscripción)
  - `TIPO_CURSO` (interés en cursos)
  - `SEDE_PREFERIDA` (Tenerife/Online)

#### 1.3 Tags y Segmentación
- [ ] Crear tags:
  - `newsletter`
  - `web-subscription`
  - `cep-formacion`
  - `origen-homepage`
  - `origen-curso-[nombre]`
  - `activo`
  - `nuevo-suscriptor`

#### 1.4 Automatizaciones
- [ ] Configurar secuencia de bienvenida:
  - Email inmediato de bienvenida
  - Email día 2: Presentación CEP
  - Email día 4: Cursos populares
  - Email día 7: Oferta especial
- [ ] Configurar triggers por tags
- [ ] Configurar segmentación automática

### 2. AUDITORÍA BREVO

#### 2.1 Configuración de Cuenta
- [ ] Verificar cuenta activa de Brevo
- [ ] Validar API Key y permisos
- [ ] Confirmar dominio verificado
- [ ] Revisar configuración de remitente

#### 2.2 Listas y Contactos
- [ ] Crear lista "Newsletter CEP Formación"
- [ ] Configurar atributos personalizados:
  - `ORIGEN`
  - `FECHA_SUSCRIPCION`
  - `IP_SUSCRIPCION`
  - `TIPO_SUSCRIPCION`
  - `ESTADO_SUSCRIPCION`

#### 2.3 Automatizaciones Brevo
- [ ] Configurar workflow de bienvenida
- [ ] Configurar sincronización con Mailchimp
- [ ] Configurar backup automático

### 3. INTEGRACIÓN N8N

#### 3.1 Configuración Webhook
- [ ] Crear webhook endpoint: `/webhook/newsletter-subscription`
- [ ] Configurar autenticación Bearer token
- [ ] Validar recepción de datos del frontend

#### 3.2 Flujo de Datos
- [ ] Implementar validación de email
- [ ] Configurar enriquecimiento de datos
- [ ] Implementar manejo de errores
- [ ] Configurar logs y métricas

#### 3.3 Integraciones
- [ ] Conectar con Mailchimp API
- [ ] Conectar con Brevo API
- [ ] Conectar con Google Sheets (backup)
- [ ] Configurar notificaciones Slack (opcional)

### 4. TESTING Y VALIDACIÓN

#### 4.1 Tests de Integración
- [ ] Test suscripción desde homepage
- [ ] Test suscripción desde páginas de curso
- [ ] Test validación de emails
- [ ] Test manejo de duplicados
- [ ] Test manejo de errores

#### 4.2 Tests de Email
- [ ] Test email de bienvenida
- [ ] Test secuencia automatizada
- [ ] Test deliverability
- [ ] Test renderizado en diferentes clientes

#### 4.3 Tests de Sincronización
- [ ] Test sincronización Mailchimp ↔ Brevo
- [ ] Test backup en Google Sheets
- [ ] Test notificaciones internas

## 📋 ESTRUCTURA DE DATOS REQUERIDA

### Datos del Suscriptor
```json
{
  "email": "usuario@ejemplo.com",
  "timestamp": "2024-01-15T10:30:00Z",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "page_origin": "https://cepcomunicacion.com/cursos/auxiliar-enfermeria",
  "campaign_source": "newsletter-web",
  "subscription_type": "newsletter",
  "subscription_id": "NEWSLETTER-1705312200-abc123",
  "estado": "activo",
  "origen": "web-cepcomunicacion",
  "tags": ["newsletter", "web-subscription", "cep-formacion"]
}
```

## 🔗 ENDPOINTS Y CONFIGURACIÓN

### Variables de Entorno Requeridas
```bash
# Mailchimp
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=your_audience_id_here

# Brevo
BREVO_API_KEY=your_brevo_api_key_here

# N8N
N8N_NEWSLETTER_WEBHOOK_URL=https://your-n8n.com/webhook/newsletter-subscription
```

### URLs de Webhook
- **Newsletter**: `https://n8n-instance.com/webhook/newsletter-subscription`
- **Backup**: `https://n8n-instance.com/webhook/newsletter-backup`
- **Unsubscribe**: `https://n8n-instance.com/webhook/newsletter-unsubscribe`

## 📈 MÉTRICAS Y KPIs A CONFIGURAR

### Métricas de Suscripción
- Total de suscriptores por día/semana/mes
- Tasa de crecimiento de la lista
- Páginas de origen más efectivas
- Horarios de mayor suscripción
- Dispositivos más utilizados

### Métricas de Email
- Tasa de apertura
- Tasa de clics
- Tasa de conversión
- Tasa de baja
- Deliverability score

### Métricas Técnicas
- Tiempo de respuesta del webhook
- Errores en sincronización
- Fallos en envío de emails
- Uptime del sistema

## 🚨 CRITERIOS DE ÉXITO

### ✅ Funcionalidad Básica
- [ ] Suscripción funciona desde todas las páginas
- [ ] Emails de bienvenida se envían automáticamente
- [ ] Datos se sincronizan en Mailchimp y Brevo
- [ ] Backup en Google Sheets funciona
- [ ] No hay emails duplicados

### ✅ Funcionalidad Avanzada
- [ ] Segmentación automática funciona
- [ ] Secuencia de bienvenida completa
- [ ] Métricas y analytics configurados
- [ ] Manejo de errores robusto
- [ ] Notificaciones internas funcionan

### ✅ Calidad y Rendimiento
- [ ] Tiempo de respuesta < 2 segundos
- [ ] Deliverability > 95%
- [ ] Tasa de error < 1%
- [ ] Logs completos y útiles
- [ ] Documentación actualizada

## 📋 ENTREGABLES ESPERADOS

1. **Configuración Mailchimp**
   - Audiencia configurada
   - Campos personalizados
   - Tags y segmentos
   - Automatizaciones activas

2. **Configuración Brevo**
   - Lista configurada
   - Atributos personalizados
   - Workflows activos

3. **Flujo N8N**
   - Webhook funcional
   - Integraciones configuradas
   - Manejo de errores
   - Logs y métricas

4. **Documentación**
   - Manual de configuración
   - Guía de troubleshooting
   - Métricas y KPIs
   - Procedimientos de backup

5. **Testing Report**
   - Resultados de todos los tests
   - Evidencias de funcionamiento
   - Recomendaciones de optimización

## ⚡ PRIORIDADES

### 🔥 CRÍTICO (Hacer primero)
1. Configurar webhook n8n funcional
2. Integrar Mailchimp como plataforma principal
3. Implementar email de bienvenida
4. Configurar backup en Google Sheets

### 🟡 IMPORTANTE (Hacer después)
1. Integrar Brevo como backup
2. Configurar secuencia de bienvenida completa
3. Implementar segmentación avanzada
4. Configurar métricas y analytics

### 🟢 OPCIONAL (Si hay tiempo)
1. Notificaciones Slack
2. Dashboard personalizado
3. A/B testing de emails
4. Integración con CRM

---

**🎯 OBJETIVO FINAL**: Newsletter completamente funcional con doble redundancia (Mailchimp + Brevo), automatización completa, y métricas detalladas para CEP Formación.

**⏰ TIEMPO ESTIMADO**: 4-6 horas de configuración + 2 horas de testing

**🔧 HERRAMIENTAS NECESARIAS**: Acceso a Mailchimp, Brevo, n8n, Google Sheets, y credenciales de API correspondientes.