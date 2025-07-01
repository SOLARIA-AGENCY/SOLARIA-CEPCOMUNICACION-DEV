## Guía Oficial de Integración: Facebook Pixel + API de Conversiones para CEP FORMACIÓN – Solaria Agency

### 🔢 Datos Generales del Proyecto
- **Cliente:** CEP FORMACIÓN
- **Agencia responsable:** Solaria Agency
- **Pixel de Facebook:** CEP COMUNICACION Pixel
- **Pixel ID:** 1189071876088388
- **Versión API:** v23.0 (actualizada a julio 2025)
- **Modo de integración:** Autoalojado (n8n)
- **Token de acceso:** [CONFIDENCIAL, guardado en entorno seguro]
- **Tipo de eventos integrados:** Leads educativos (Contactar, Completar registro, Enviar solicitud)

---

### 🔧 Objetivo
Garantizar una trazabilidad completa de los eventos clave en la web de CEP FORMACIÓN mediante el uso conjunto de:
- Facebook Pixel (cliente)
- Facebook Conversions API (servidor)

Esto permite:
- Medir conversiones aunque el navegador bloquee cookies.
- Optimizar campañas por evento real.
- Garantizar cumplimiento con privacidad y matching.

---

### ✅ Configuración Realizada
#### 1. Creación de App Meta
- Nombre: `CEP COMUNICACION - CAPI`
- Propietario: Solaria Agency
- Tipo: App sin caso de uso predeterminado
- Asociada al Business Manager de CEP FORMACIÓN

#### 2. Activación del producto: Conversions API
- Vía Meta Events Manager
- Asociado al Pixel: 1189071876088388
- Eventos configurados: `CompleteRegistration`, `Lead`, `Contact` (educación)

#### 3. Generación de Token de acceso
- Tipo: Server Token (con Dataset Quality API habilitado)
- Token guardado en entorno seguro

#### 4. Selección de parámetros recomendados
- Datos de usuario: `em`, `ph`, `name`, `city`, `zip`, `lead_id`
- Detalles del evento: `event_name`, `event_time`, `action_source`, `event_source_url`, `custom_data`

---

### 🔌 Integración con n8n (autoalojado)
#### Flujo base:
1. **Webhook (POST)**: recibe datos del formulario (email, teléfono, URL, curso, etc.)
2. **Function node**:
   - Hashea `email` y `teléfono` en SHA256
   - Genera el `event_time` UNIX
   - Arma el payload con estructura:
```json
{
  "data": [
    {
      "event_name": "CompleteRegistration",
      "event_time": 1751362524,
      "action_source": "website",
      "event_source_url": "https://www.cepcomunicacion.com/gracias",
      "user_data": {
        "em": ["HASH_EMAIL"],
        "ph": ["HASH_PHONE"]
      },
      "custom_data": {
        "event_source": "crm",
        "lead_event_source": "n8n"
      }
    }
  ]
}
```
3. **HTTP Request Node**:
   - URL:
     `https://graph.facebook.com/v23.0/1189071876088388/events?access_token=TOKEN`
   - Método: POST
   - Body: RAW (Content-Type: application/json)
   - Autenticación vía token

---

### 🌍 Eventos para CRM (opcional)
En caso de sincronización con cambios de estado de CRM:
- `action_source`: "system_generated"
- `event_name`: "Lead"
- `custom_data`: `{ event_source: "crm", lead_event_source: "HubSpot" }`
- `lead_id`: ID generado por Facebook en formularios Lead Ads

---

### 🚨 Validación y prueba
- Eventos de prueba se pueden enviar con `test_event_code`
- Verificación en Events Manager > Pixel > Probar eventos

---

### 🕵️ Consideraciones técnicas
- Todos los datos sensibles deben estar hasheados con SHA256
- Usar HTTPS para todas las llamadas
- No enviar campos `null`
- Se recomienda deduplicación vía `event_id` si también se envía desde el pixel cliente

---

### ⚖️ Normativa y privacidad
- CAPI está alineado con RGPD / LOPDGDD
- El hashing en servidor garantiza protección de datos
- Se debe informar en la política de cookies y privacidad del sitio que se utilizan herramientas de seguimiento con fines analíticos y de mejora de servicios

---

### 📅 Mantenimiento recomendado
- Verificar cada 15 días en la pestaña **Diagnóstico del Pixel**
- Comparar coincidencias en la pestaña de Eventos recibidos
- Actualizar token sólo si se revoca acceso a la app

---

### 📄 Referencias
- [Guía oficial Meta Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Graph API Explorer (para tests)](https://developers.facebook.com/tools/explorer/)

---

### ✅ Estado final de integración: COMPLETADA
Este documento está preparado para su consulta interna o para que cualquier agente técnico pueda replicar, mantener o escalar la integración de Facebook Pixel + CAPI en el ecosistema CEP FORMACIÓN.

