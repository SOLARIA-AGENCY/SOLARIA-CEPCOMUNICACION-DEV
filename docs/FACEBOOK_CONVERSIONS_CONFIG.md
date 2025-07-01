# Facebook Conversions API - Configuración Específica CEP FORMACIÓN

## 🔧 Variables de Entorno Configuradas

### Variables de Facebook para producción:
```bash
# Facebook Pixel & Conversions API Configuration  
FB_PIXEL_ID=1189071876088388
FB_API_VERSION=v23.0
FB_ACCESS_TOKEN=EAAHqi5Y9X4EBOyv9QDZCgkdl4iDTJY811G7Ua3BZCrhNjGgnXSgqdxjBZBvNZAFYk1VCj6QhTni8UnS4bGsa5FnPZAhZCtrdZCrJbJTte12mk8bWSiZA2gUHSdZAMa2GKZBTSvK5ZBn1dlqbxZBo9L5X2cM5vcvvEklcO4IJkczQi3FM4UpZCCIuUuULeczWkZCsNnlwZDZD
FB_ENDPOINT=https://graph.facebook.com/v23.0/1189071876088388/events?access_token=${FB_ACCESS_TOKEN}
```

## 📱 Estado de la Implementación

### ✅ COMPLETADO - Lado Cliente (Facebook Pixel)
- Pixel ID: `1189071876088388` implementado en `index.html`
- Gestión de consentimiento RGPD implementada
- Tracking automático de PageView con consentimiento

### ✅ COMPLETADO - Utilidad de Conversions API
- Archivo: `src/utils/facebookConversionsAPI.ts`
- Funciones principales implementadas
- Hashing SHA256 implementado

### 🔄 PENDIENTE - Configuración n8n
- Webhook URL a configurar según instancia de n8n

## 🚀 Cómo Usar en los Formularios

```typescript
import { trackCourseLeadEvent } from '../utils/facebookConversionsAPI';

const handleSubmit = async (formData) => {
  await trackCourseLeadEvent({
    email: formData.email,
    phone: formData.telefono,
    name: formData.nombre,
    curso: formData.curso,
    modalidad: formData.modalidad
  });
};
```

**Estado:** ✅ Configuración lista para producción 