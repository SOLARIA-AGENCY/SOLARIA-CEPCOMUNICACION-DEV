# Configuración Resend API en Hostinger

## ⚡ URGENTE: Para que Resend sea el proveedor primario de emails

### 🔑 **Variable Requerida:**
```env
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

### 📋 **Pasos en Hostinger:**

1. **Acceder al Panel de Control**
   - Ir a hpanel.hostinger.com
   - Buscar sección "Variables de Entorno" o "Environment Variables"

2. **Agregar Variable**
   - **Nombre**: `VITE_RESEND_API_KEY`
   - **Valor**: Tu clave API de Resend (empieza con `re_`)

3. **Obtener Clave Resend**
   - Ir a https://resend.com/api-keys
   - Crear nueva API Key si no tienes
   - Copiar la clave completa

### 🚨 **Estado Actual:**
- **Sin VITE_RESEND_API_KEY**: Solo FormSubmit funciona
- **Con VITE_RESEND_API_KEY**: Resend (primario) + FormSubmit (fallback)

### 🧪 **Verificación:**
Cuando envíes un formulario, en las herramientas de desarrollador (F12) verás:

**✅ Con Resend configurado:**
```
🔍 Verificando configuración Resend...
📋 VITE_RESEND_API_KEY configurado: SÍ
🚀 INICIANDO ENVÍO VIA RESEND (PRIORIDAD)...
✅ ¡EMAIL ENVIADO VIA RESEND! ID: xxx
```

**❌ Sin Resend configurado:**
```
🔍 Verificando configuración Resend...
📋 VITE_RESEND_API_KEY configurado: NO
⚠️ VITE_RESEND_API_KEY NO CONFIGURADO
🔄 USANDO FORMSUBMIT COMO ÚNICO PROVEEDOR...
```

### 🎯 **Resultado:**
- **Resend**: Email HTML profesional con guión personalizado
- **FormSubmit**: Email texto simple como fallback

---
**Configurar VITE_RESEND_API_KEY para emails profesionales prioritarios** 🚀 