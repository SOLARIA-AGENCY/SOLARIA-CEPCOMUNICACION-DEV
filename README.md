# 🎯 CEP FORMACIÓN - Sistema de Rutas Dobles

> **Plataforma avanzada de gestión de campañas con tracking diferenciado desarrollada por SOLARIA.AGENCY**

## 🚀 **SISTEMA REVOLUCIONARIO IMPLEMENTADO**

CEP Formación utiliza un **sistema pionero de rutas dobles** que permite tracking diferenciado según la fuente de tráfico:

- **🎯 Rutas Directas** (`/curso-slug`) → Facebook Ads con pixel tracking específico
- **🌐 Rutas Semánticas** (`/cursos/curso-slug`) → SEO/Orgánico con analytics diferenciado

### **BENEFICIOS ESTRATÉGICOS**
✅ **ROI Medible por Canal** - Métricas separadas para Facebook vs Orgánico  
✅ **Conversión Optimizada** - Experiencias específicas por tipo de visitante  
✅ **Escalabilidad Total** - Sistema preparado para activar/desactivar campañas  
✅ **Assets Protegidos** - Slugs de cursos como recursos digitales estratégicos  

---

## 📚 **SISTEMA DE DOCUMENTACIÓN INDEXADO**

> 🗂️ **[ÍNDICE MAESTRO COMPLETO](docs/INDEX.md)** - Navegación avanzada por rol y función

### **🚀 NAVEGACIÓN RÁPIDA**

| 🎯 Rol | 📄 Documento Principal | 🔧 Comandos Clave |
|---------|------------------------|-------------------|
| **👨‍💻 Desarrollador** | [`docs/SETUP_GUIDE_CEPFORMACION.md`](docs/SETUP_GUIDE_CEPFORMACION.md) | `npm run dev` `npm run pre-deploy` |
| **📊 Marketing/Growth** | [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](docs/ASSETS_SLUGS_CURSOS_CEP.md) | `npm run campaigns:status` |
| **⚙️ DevOps** | [`docs/CEPCOMUNICACION_HOSTING_SETUP.md`](docs/CEPCOMUNICACION_HOSTING_SETUP.md) | GitHub Actions |
| **📱 Analytics** | [`docs/FACEBOOK_CONVERSIONS_CONFIG.md`](docs/FACEBOOK_CONVERSIONS_CONFIG.md) | `npm run campaigns:analytics` |
| **📧 Email/CRM** | [`docs/HOSTINGER_RESEND_CONFIG.md`](docs/HOSTINGER_RESEND_CONFIG.md) | `docs/PRUEBA_FORMULARIO_CEP.md` |

### **📋 DOCUMENTACIÓN ESTRATÉGICA**
- 💎 **[Inventario de Assets](docs/ASSETS_SLUGS_CURSOS_CEP.md)** - Gestión estratégica de slugs y campañas
- 📱 **[Facebook Conversions](docs/FACEBOOK_CONVERSIONS_CONFIG.md)** - Configuración pixel y eventos de tracking
- 🌐 **[Setup Hosting](docs/CEPCOMUNICACION_HOSTING_SETUP.md)** - Configuración completa Hostinger
- 🔌 **[API Hostinger](docs/HOSTINGER_API_TECHNICAL_DOCUMENTATION.md)** - Integración técnica detallada
- 📧 **[Sistema Resend](docs/HOSTINGER_RESEND_CONFIG.md)** - Configuración email avanzado con redundancia
- 🚀 **[Deployment Status](docs/DEPLOYMENT_READY.md)** - Estado y activación de producción

### **🛠️ SCRIPTS OPERACIONALES**
- 🎛️ **[Gestión de Campañas](scripts/manage-campaigns.cjs)** - Sistema completo → `npm run campaigns:status`
- 🔒 **[Validación Pre-Commit](scripts/pre-commit-validation.sh)** - Seguridad automática → `npm run pre-deploy`
- 📱 **[Setup Facebook](scripts/configure-facebook-vars.sh)** - Variables de entorno → Manual

### **🧪 SUITE DE TESTING**
- ✅ **Tests de Validación** (2/2) - Funcionalidad core
- 🎨 **Tests de Componentes** (3/3) - UI/UX  
- 🏠 **Tests de Homepage** (4/4) - Landing principal
- 📚 **Tests de Páginas** (4/4) - Páginas de cursos

---

## ⚡ **COMANDOS DISPONIBLES**

### **🎛️ GESTIÓN DE CAMPAÑAS**
```bash
# Ver estado actual del sistema
npm run campaigns:status

# Listar todas las campañas disponibles  
npm run campaigns:list

# Reporte de tracking configurado
npm run campaigns:analytics

# Ayuda del sistema
npm run campaigns:help
```

### **🔒 FLUJO DE SEGURIDAD PRE-DEPLOY**
```bash
# Validación completa (tests + lint + build)
npm run pre-deploy

# Push seguro tras validación exitosa
npm run safe-push
```

### **🧪 TESTING Y DESARROLLO**
```bash
# Desarrollo local
npm run dev

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Linting con auto-fix
npm run lint:fix
```

### **🚀 BUILD Y DEPLOYMENT**
```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Deploy automático (GitHub Actions)
git push origin main
```

---

## 🎯 **CAMPAÑAS ACTIVAS - EJEMPLO DE USO**

### **CAMPAÑA 1: QUIROMASAJE NIVEL 2 NORTE** 🔴 ACTIVA
```bash
# URL Directa (Facebook Ads)
https://cepcomunicacion.com/quiromasaje-nivel2-norte

# URL Semántica (SEO/Orgánico)  
https://cepcomunicacion.com/cursos/quiromasaje-nivel2-norte

# Tracking Configurado
✅ Facebook Pixel: quiromasaje-nivel2-norte-direct
✅ Analytics Goal: quiromasaje-nivel2-norte-organic
✅ Tag Manager: course_quiromasaje_nivel2_norte
```

### **CAMPAÑA 2: AUXILIAR FARMACIA DERMO NORTE** 🔴 ACTIVA
```bash
# URL Directa (Facebook Ads)
https://cepcomunicacion.com/auxiliar-farmacia-dermo-norte

# URL Semántica (SEO/Orgánico)
https://cepcomunicacion.com/cursos/auxiliar-farmacia-dermo-norte

# Tracking Configurado  
✅ Facebook Pixel: auxiliar-farmacia-dermo-norte-direct
✅ Analytics Goal: auxiliar-farmacia-dermo-norte-organic
✅ Tag Manager: course_auxiliar_farmacia_dermo_norte
```

---

## 🏗️ **ARQUITECTURA TÉCNICA**

### **COMPONENTES CLAVE**
```typescript
// DirectCourseWrapper → Rutas Facebook /slug
src/components/templates/DirectCourseWrapper.tsx

// SemanticCourseWrapper → Rutas SEO /cursos/slug  
src/components/templates/SemanticCourseWrapper.tsx

// Routing Principal
src/App.tsx - Rutas dobles implementadas

// Configuración de Cursos
src/config/cursos-maestro.ts - Base de datos de cursos
src/config/cursos-otono-2025.ts - Campañas activas
```

### **CONFIGURACIÓN DE SERVIDOR**
```apache
# Apache .htaccess - Rutas directas y semánticas
public/.htaccess

# Netlify redirects - Backup deployment  
public/_redirects
```

---

## 📊 **MÉTRICAS Y ANALYTICS**

### **FACEBOOK ADS (Rutas Directas)**
- **Event Tracking:** `ViewContent` con source `facebook_direct`
- **Conversión:** Formularios completados desde `/curso-slug`
- **Optimización:** CTR, CPL, Quality Score

### **SEO/ORGÁNICO (Rutas Semánticas)**  
- **Event Tracking:** `course_view_organic` con source `organic_semantic`
- **Conversión:** Navegación desde `/cursos/curso-slug`
- **Optimización:** Bounce Rate, Time on Page, Pages per Session

### **DATOS COMBINADOS**
- **Attribution:** Último click vs primer contacto
- **Customer Journey:** Mapping completo por fuente
- **ROI:** Medición independiente por canal

---

## 📧 **SISTEMA DE FORMULARIOS AVANZADO**

### **ARQUITECTURA DUAL DE EMAIL**
El sistema implementa una **arquitectura híbrida** con redundancia garantizada:

```bash
# FLUJO PRINCIPAL (Prioritario)
Frontend → /api/resend-email.php → Resend API → Email enviado

# FLUJO FALLBACK (Backup automático)  
Frontend → FormSubmit.co → Email de respaldo
```

### **PROVIDER PRINCIPAL: RESEND**
- **API Endpoint:** `/public/api/resend-email.php`
- **Ventajas:** Templates HTML profesionales, tracking avanzado
- **Configuración:** Clave API segura en servidor (compatible Hostinger)
- **Email Templates:** Diseño corporativo con CSS completo

### **PROVIDER BACKUP: FORMSUBMIT**
- **Función:** Redundancia automática si Resend falla
- **Ventajas:** 100% confiable, sin configuración de servidor
- **Formato:** Texto estructurado con mismo contenido

### **GUIÓN PERSONALIZADO AUTOMATIZADO** 🎯
Ambos providers incluyen guión completo para equipos de ventas:

```markdown
🔥 GUIÓN PERSONALIZADO DE CONTACTO:

"Hola, ¿[Nombre]?

Te llamo de CEP Formación. Has solicitado información sobre 
nuestro curso de [Curso] en la sede de [Sede_Preferida].

¿Tienes un minuto para contarte los detalles?"

📋 OBJETIVOS DE LA LLAMADA:
• Confirmar interés en el curso específico
• Explicar modalidad y fechas de inicio  
• Resolver dudas sobre temario y prácticas
• Ofrecer facilidades de pago personalizadas
• Reservar plaza si hay interés confirmado

⚠️ SI NO RESPONDE: Dejar WhatsApp profesional
```

### **CONFIGURACIÓN TÉCNICA**
```bash
# Documentación completa
docs/HOSTINGER_RESEND_CONFIG.md

# Testing de formularios
docs/PRUEBA_FORMULARIO_CEP.md

# Ventajas clave
✅ Compatible hosting compartido Hostinger
✅ Sin variables de entorno necesarias  
✅ Doble redundancia garantizada
✅ Templates profesionales con CSS
✅ Guión de ventas automatizado
✅ Logging completo para debugging
```

---

## 🚀 **DEPLOYMENT Y HOSTING**

### **PRODUCCIÓN**
- **Dominio Principal:** https://www.cepcomunicacion.com
- **Hosting:** Hostinger (IP: 46.202.172.98)
- **SSL:** Let's Encrypt automático
- **Deployment:** GitHub Actions + FTP

### **STAGING/BACKUP**
- **Netlify:** https://solaria-cepcomunicacion.netlify.app
- **Auto-deploy:** Desde rama `main`
- **Testing:** Preview deployments

### **MONITOREO AUTOMATIZADO**
✅ Validación de build  
✅ Health checks  
✅ Verificación DNS  
✅ SSL validation  
✅ Performance checks  

---

## 🔐 **FLUJO DE SEGURIDAD IMPLEMENTADO**

### **PRE-COMMIT OBLIGATORIO**
```bash
# Ejecutado automáticamente antes de cada commit
1. ✅ Tests (13/13 pasando)
2. ✅ Linting (máximo 20 warnings)  
3. ✅ Build validation
4. ✅ Type checking
```

### **CONTINUOUS INTEGRATION**
```bash
# GitHub Actions workflow
1. ✅ Install dependencies
2. ✅ Run test suite  
3. ✅ Build for production
4. ✅ Deploy via FTP
5. ✅ Post-deploy validation
```

---

## 🎛️ **GESTIÓN AVANZADA DE CAMPAÑAS**

### **ESTADO ACTUAL DEL SISTEMA**
```bash
npm run campaigns:status
```
🔴 CAMPAÑAS ACTIVAS: 2
   • Quiromasaje Nivel 2 Norte (Norte)
   • Auxiliar Farmacia Dermocosmética Norte (Norte)

🟡 CAMPAÑAS PREPARADAS: 2  
   • Adiestramiento Canino Norte (Norte)
   • Agente Funerario Santa Cruz (Santa Cruz)
```

### **ACTIVACIÓN DE NUEVAS CAMPAÑAS**
1. **Identificar Oportunidad** → Análisis de demanda
2. **Configurar Rutas** → Añadir a `App.tsx`
3. **Actualizar Servidor** → `.htaccess` y `_redirects`
4. **Implementar Tracking** → Eventos específicos
5. **Validar Sistema** → `npm run pre-deploy`

---

## 📚 **RECURSOS PARA DESARROLLADORES**

### **DOCUMENTACIÓN TÉCNICA COMPLETA**
- 📋 [**Inventario de Assets**](docs/ASSETS_SLUGS_CURSOS_CEP.md) - Gestión estratégica de slugs
- 📊 [**Facebook Conversions**](docs/FACEBOOK_CONVERSIONS_CONFIG.md) - Configuración pixel y eventos  
- 🌐 [**Setup Hosting**](docs/CEPCOMUNICACION_HOSTING_SETUP.md) - Configuración Hostinger
- 🔌 [**API Documentation**](docs/HOSTINGER_API_TECHNICAL_DOCUMENTATION.md) - Integración técnica

### **SCRIPTS UTILITARIOS**
- 🎛️ [`manage-campaigns.cjs`](scripts/manage-campaigns.cjs) - Gestión completa de campañas
- 🔒 [`pre-commit-validation.sh`](scripts/pre-commit-validation.sh) - Validación automática
- 📱 [`configure-facebook-vars.sh`](scripts/configure-facebook-vars.sh) - Setup Facebook

### **GUÍAS RÁPIDAS**
```bash
# Setup inicial completo
npm install && npm run pre-deploy

# Desarrollo local con hot reload
npm run dev

# Validación antes de commit
npm run pre-deploy

# Estado del sistema de campañas  
npm run campaigns:status
```

---

## 🌟 **TECNOLOGÍAS Y STACK**

### **FRONTEND AVANZADO**
- **React 18** con TypeScript estricto
- **Vite** para build ultra-rápido  
- **Tailwind CSS** para diseño moderno
- **React Router 7** para routing avanzado

### **TESTING ROBUSTO**
- **Vitest** para tests unitarios (13/13 ✅)
- **Testing Library** para tests de componentes
- **ESLint** con reglas estrictas TypeScript
- **Pre-commit hooks** para validación automática

### **DEPLOYMENT PROFESIONAL**
- **GitHub Actions** para CI/CD automático
- **Hostinger** para hosting profesional
- **Netlify** para staging y previews
- **FTP Sync** para deployment robusto

---

## 🚀 **ROADMAP Y FUTURO**

### **FASE 1: CONSOLIDACIÓN** ✅ **COMPLETADA**
- [x] Sistema de rutas dobles implementado
- [x] Tracking diferenciado configurado  
- [x] Campañas activas funcionando
- [x] Documentación completa

### **FASE 2: EXPANSIÓN** 🔄 **EN PROGRESO**
- [ ] Activación de campañas preparadas
- [ ] Dashboard avanzado de métricas
- [ ] A/B testing automatizado
- [ ] Attribution modeling

### **FASE 3: AUTOMATIZACIÓN** 🔮 **FUTURO**
- [ ] Machine Learning para predicción de demanda
- [ ] Personalización dinámica por fuente
- [ ] Auto-scaling de campañas
- [ ] Optimización automática de conversión

---

## 👥 **DESARROLLO Y MANTENIMIENTO**

### **DESARROLLADO POR SOLARIA.AGENCY**
- 🌐 **Web:** solaria.agency
- 📧 **Email:** info@solaria.agency  
- 📱 **Sedes:** Barcelona, Guayaquil, Miami
- 🏆 **Especialización:** Transformación empresarial mediante IA y automatización

### **EQUIPO TÉCNICO**
- **Arquitectura:** Sistema de rutas dobles innovador
- **Desarrollo:** React/TypeScript con best practices
- **DevOps:** CI/CD automatizado y robusto
- **Analytics:** Tracking avanzado multi-canal

### **SOPORTE Y ACTUALIZACIONES**
- 🔧 **Mantenimiento:** Automático via GitHub Actions
- 📊 **Monitoreo:** 24/7 con alertas automáticas  
- 🚀 **Updates:** Deploy automático en cada push
- 📞 **Soporte:** A través de issues de GitHub

---

---

## 🏗️ **ARQUITECTURA DE DEPLOYMENT COMPLETA**

### **🚀 SISTEMA DUAL OPERATIVO**
**Estado**: ✅ **COMPLETAMENTE FUNCIONAL**  
**Fecha Implementación**: 2025-08-06

#### **Frontend Layer**
- **URL Principal**: `https://www.cepcomunicacion.com`
- **Servidor**: LiteSpeed (Hostinger)
- **Tecnología**: React 18 + TypeScript + Vite
- **Deploy**: GitHub Actions → SFTP
- **SSL**: Let's Encrypt (compartido)

#### **API Backend Layer**  
- **URL API**: `https://api.cepcomunicacion.com`
- **VPS**: Ubuntu 24.04 (148.230.118.124)
- **Web Server**: OpenLiteSpeed
- **Runtime**: Node.js + PM2 (puerto 3001)
- **SSL**: Let's Encrypt (independiente)
- **Auto-renovación**: Crontab cada 12 horas

### **📋 DOCUMENTACIÓN TÉCNICA COMPLETA**
📚 **[DEPLOYMENT ARCHITECTURE COMPLETE](DEPLOYMENT-ARCHITECTURE-COMPLETE.md)** - Documentación técnica detallada

### **🔧 VERIFICACIÓN DE ENDPOINTS**
```bash
# Frontend
curl -I https://www.cepcomunicacion.com
# Expected: 200 OK, Server: LiteSpeed

# API Health Check  
curl -s https://api.cepcomunicacion.com/health
# Expected: {"status":"OK","timestamp":"...","service":"CEP API"}
```

### **🛡️ CI/CD PIPELINE CONFIGURADO**
- **Trigger**: Push a rama `main`
- **Validación**: Build, tests, linting, security
- **Deploy**: SFTP (primario) + GitHub Pages (backup)
- **Verificación**: DNS, SSL, health checks, performance
- **Monitoreo**: Logs automáticos, alertas de fallos

---

## 📄 **LICENCIA Y TÉRMINOS**

**© 2025 SOLARIA.AGENCY - Todos los derechos reservados**

*Proyecto desarrollado para CEP Formación con arquitectura dual frontend/backend, tracking diferenciado y deployment automatizado de nivel empresarial.*

---

### 🎯 **PROYECTO ESTRATÉGICO DE ÚLTIMA GENERACIÓN**

> *Sistema completo de marketing digital educativo con arquitectura dual, tracking inteligente, automatización avanzada, deployment robusto y monitoreo 24/7 para maximizar el ROI de cada canal.*

**Última actualización:** Agosto 2025 - Sistema Frontend + Backend 100% operativo ✅

---

## 📧 **VARIABLES DE ENTORNO**

- **`FB_N8N_WEBHOOK_URL`**: URL del webhook en n8n para la integración con la API de Conversiones.
- **`VITE_SUPERMEMORY_API_KEY`**: Clave para el servicio Supermemory.
- **`MAILCHIMP_API_KEY`**: Clave de API para la integración con Mailchimp.
- **`MAILCHIMP_SERVER_PREFIX`**: Prefijo del servidor de Mailchimp (ej. `us7`).
- **`MAILCHIMP_AUDIENCE_ID`**: ID de la audiencia/lista de Mailchimp.
- **`BREVO_API_KEY`**: Clave de API para la integración con Brevo (anteriormente Sendinblue).

### Estructura de Assets

- **Imágenes de Cursos**: Ubicadas en `public/images/cursos/`.
- **Logos**: En `public/images/logos/`.
- **Logo para Email**: Se ha creado una versión específica para plantillas de email en `public/assets/images/email/logo-cep-email.jpg` para optimizar la entrega y el control.

## 🚀 Deployment y Monitoreo

Este proyecto utiliza **arquitectura dual** con deployment completamente automatizado:

### **Frontend Deployment**
```bash
# Trigger automático en push a main
git push origin main

# GitHub Actions → Build React → SFTP deploy → Verificación
```

### **API Backend Management** 
```bash
# SSH Access al VPS
ssh cep-vps

# Verificar API
pm2 status
curl -s https://api.cepcomunicacion.com/health

# Restart si necesario
pm2 restart cep-api
```

### Protocolo de Seguridad Pre-Despliegue

**Es mandatorio** ejecutar el script de validación local antes de hacer `push`:

```bash
npm run pre-deploy
```

### **🔍 Monitoreo Continuo**
- **Health Checks**: Automáticos cada deploy
- **SSL Monitoring**: Renovación automática
- **Performance**: Response time tracking
- **Security**: Headers validation
- **Logs**: Centralizados en VPS y GitHub Actions
