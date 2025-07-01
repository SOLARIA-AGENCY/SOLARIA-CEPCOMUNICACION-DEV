# 🔧 Configuración Resend en Hostinger - CEP Formación

## 🎯 OBJETIVO
Configurar **VITE_RESEND_API_KEY** en Hostinger para que Resend sea el provider principal de emails (en lugar de FormSubmit fallback).

---

## 🔑 **PASO 1: OBTENER CLAVE API DE RESEND**

### **1.1 Crear/Acceder cuenta Resend**
```
1. Ve a: https://resend.com
2. Registra nueva cuenta con email corporativo (ej: agency.solaria@gmail.com)
3. Verifica tu email
4. Si ya tienes cuenta, solo inicia sesión
```

### **1.2 Generar API Key**
```
1. Una vez logueado, ve a: https://resend.com/api-keys
2. Clic en "Create API Key"
3. Configuración recomendada:
   - Name: "CEP Formación Production"
   - Permissions: "Full access" o "Send emails"
   - Domain: cepcomunicacion.com (si tienes dominio verificado)
4. Clic "Create"
5. ⚠️ COPIA LA CLAVE INMEDIATAMENTE (empieza con "re_")
```

**EJEMPLO DE CLAVE**: `re_AbCdEfGh123456789IjKlMnOpQrStUvWxYz`

---

## ⚙️ **PASO 2: CONFIGURAR EN HOSTINGER**

### **2.1 Acceder a Hostinger Panel**
```
1. Ve a: https://hpanel.hostinger.com
2. Inicia sesión con tus credenciales
3. Selecciona tu hosting donde está cepcomunicacion.com
```

### **2.2 Encontrar Variables de Entorno**
La ubicación puede variar según la interfaz de Hostinger. Busca en:
```
📍 OPCIONES POSIBLES:
• Website → Environment Variables
• Advanced → Environment Variables  
• Developer Tools → Environment Variables
• Settings → Environment Variables
• Build & Deploy → Environment Variables
```

### **2.3 Agregar Variable**
```
1. Clic en "Add Environment Variable" o "Create Variable"
2. Configurar:
   - Variable Name: VITE_RESEND_API_KEY
   - Variable Value: [tu_clave_de_resend_aquí]
   - Environment: Production (si hay opción)
3. Save/Guardar
```

### **2.4 Rebuild (si es necesario)**
```
Si Hostinger requiere rebuild:
1. Deploy → Trigger Rebuild
2. O simplemente espera el próximo deploy automático desde GitHub
```

---

## 🔍 **PASO 3: VERIFICAR CONFIGURACIÓN**

### **3.1 Probar Formulario**
```
1. Ve a: https://www.cepcomunicacion.com/quiromasaje-nivel2-norte
2. Llena el formulario de prueba
3. Envía
4. Verifica qué email llega:
   - ✅ Si llega email HTML completo con guión = RESEND funcionando
   - ❌ Si llega texto simple = FormSubmit (VITE_RESEND_API_KEY no configurado)
```

### **3.2 Debugging en Browser**
```
1. Abre Developer Tools (F12)
2. Ve a Console tab
3. Llena y envía formulario
4. Busca logs:
   - "🎯 Using Resend..." = Resend configurado ✅
   - "⚠️ Using FormSubmit..." = Falta configuración ❌
```

---

## 📧 **DIFERENCIAS ENTRE PROVIDERS**

### **Resend (PRIORITARIO) ✅**
- **Email HTML completo** con guión personalizado
- **Formato profesional** con branding
- **Campos dinámicos** sustituidos automáticamente
- **Logging detallado** para debugging
- **Mayor control** sobre entrega

### **FormSubmit (FALLBACK) ⚠️**
- **Texto simple** (ahora con guión completo)
- **Formato básico** sin diseño
- **Funcional pero limitado**
- **Backup garantizado** si Resend falla

---

## 🚨 **TROUBLESHOOTING**

### **Problema: Sigue llegando desde FormSubmit**
```
SOLUCIONES:
1. Verificar que variable se llame exactamente: VITE_RESEND_API_KEY
2. Verificar que la clave API sea válida (empiece con "re_")
3. Hacer rebuild manual en Hostinger si es necesario
4. Esperar 5-10 minutos para propagación
5. Limpiar cache del navegador y probar de nuevo
```

### **Problema: Resend da error**
```
SOLUCIONES:
1. Verificar que la cuenta Resend esté verificada
2. Verificar límites de la cuenta Resend (free tier = 100 emails/día)
3. Verificar que el dominio "from" esté configurado
4. El fallback FormSubmit se activará automáticamente
```

---

## ✅ **ESTADO ACTUAL**

### **✅ FUNCIONANDO AHORA:**
- FormSubmit con guión personalizado completo
- Sistema dual (Resend + FormSubmit)
- Logging detallado
- Emails llegan a: agency.solaria@gmail.com + cepformacion.admi@hotmail.com

### **⏳ PENDIENTE:**
- Configurar VITE_RESEND_API_KEY en Hostinger
- Una vez configurado, Resend será prioritario
- FormSubmit seguirá como backup automático

---

## 📋 **CHECKLIST DE VERIFICACIÓN**

```
□ Cuenta Resend creada/verificada
□ API Key generada y copiada
□ VITE_RESEND_API_KEY configurado en Hostinger  
□ Rebuild ejecutado (si necesario)
□ Formulario probado en producción
□ Email HTML completo recibido
□ Console logs verificados
□ Sistema funcionando 100%
```

---

## 📞 **CONTACTO PARA SOPORTE**
- **Email**: agency.solaria@gmail.com
- **Sistema**: Funcional con FormSubmit mientras se configura Resend
- **Urgencia**: Media - sistema actual funciona, Resend es mejora 