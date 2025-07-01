# 📚 ÍNDICE MAESTRO DE DOCUMENTACIÓN
## CEP Formación - Sistema de Rutas Dobles

> **Navegación completa de toda la documentación técnica, guías de usuario y recursos del proyecto**

---

## 🗂️ **ESTRUCTURA DE DOCUMENTACIÓN**

### **📋 NIVEL 1: DOCUMENTACIÓN PRINCIPAL**

| 📄 Archivo | 🎯 Propósito | 👥 Audiencia | 🔄 Estado |
|-------------|--------------|---------------|-----------|
| [`README.md`](../README.md) | 📖 **Documento Principal** - Overview completo del sistema | Desarrolladores, PMs, Stakeholders | ✅ Actualizado |
| [`docs/INDEX.md`](INDEX.md) | 🗂️ **Índice Maestro** - Navegación de documentación | Todos los usuarios | ✅ Actual |

### **📊 NIVEL 2: ESTRATEGIA Y ASSETS**

| 📄 Archivo | 🎯 Propósito | 👥 Audiencia | 🔄 Estado |
|-------------|--------------|---------------|-----------|
| [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md) | 💎 **Inventario Estratégico** - Gestión de assets y campañas | Marketing, Growth, Desarrollo | ✅ Crítico |
| [`docs/FACEBOOK_CONVERSIONS_CONFIG.md`](FACEBOOK_CONVERSIONS_CONFIG.md) | 📱 **Facebook Conversions API** - Configuración pixel y eventos | Marketing Digital, Analistas | ✅ Implementado |

### **🔧 NIVEL 3: CONFIGURACIÓN TÉCNICA**

| 📄 Archivo | 🎯 Propósito | 👥 Audiencia | 🔄 Estado |
|-------------|--------------|---------------|-----------|
| [`docs/CEPCOMUNICACION_HOSTING_SETUP.md`](CEPCOMUNICACION_HOSTING_SETUP.md) | 🌐 **Setup Hosting** - Configuración Hostinger completa | DevOps, Desarrolladores | ✅ Documentado |
| [`docs/HOSTINGER_API_TECHNICAL_DOCUMENTATION.md`](HOSTINGER_API_TECHNICAL_DOCUMENTATION.md) | 🔌 **API Hostinger** - Integración técnica detallada | Desarrolladores Backend | ✅ Técnico |
| [`docs/SETUP_GUIDE_CEPFORMACION.md`](SETUP_GUIDE_CEPFORMACION.md) | ⚙️ **Guía Setup** - Configuración inicial del proyecto | Nuevos desarrolladores | ✅ Onboarding |

---

## 🛠️ **SCRIPTS Y AUTOMATIZACIÓN**

### **📜 SCRIPTS OPERACIONALES**

| 🗃️ Script | 🎯 Función | 💻 Comando | 📊 Impacto |
|-----------|-------------|-------------|-----------|
| [`scripts/manage-campaigns.cjs`](../scripts/manage-campaigns.cjs) | 🎛️ **Gestión Campañas** - Control total del sistema | `npm run campaigns:status` | 🔴 Crítico |
| [`scripts/pre-commit-validation.sh`](../scripts/pre-commit-validation.sh) | 🔒 **Validación Pre-Commit** - Seguridad automática | `npm run pre-deploy` | 🟠 Alto |
| [`scripts/configure-facebook-vars.sh`](../scripts/configure-facebook-vars.sh) | 📱 **Setup Facebook** - Variables de entorno | Ejecución manual | 🟡 Medio |

### **🤖 COMANDOS DISPONIBLES POR CATEGORÍA**

#### **🎛️ GESTIÓN DE CAMPAÑAS**
```bash
npm run campaigns:status      # 📊 Estado del sistema
npm run campaigns:list        # 📋 Listado de campañas  
npm run campaigns:analytics   # 📈 Reporte de tracking
npm run campaigns:help        # ❓ Ayuda del sistema
```

#### **🔒 FLUJO DE SEGURIDAD**
```bash
npm run pre-deploy           # ✅ Validación completa
npm run safe-push            # 🚀 Push seguro
npm run pre-commit           # 🔍 Validación básica
```

#### **🧪 TESTING Y DESARROLLO**
```bash
npm run dev                  # 🔥 Desarrollo local
npm run test:watch          # 👁️ Tests en vivo
npm run test:coverage       # 📊 Cobertura de tests
npm run lint:fix            # 🔧 Auto-corrección
```

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

### **📁 ESTRUCTURA DE ARCHIVOS CLAVE**

```
CEP-FORMACION/
├── 📚 docs/                          # DOCUMENTACIÓN
│   ├── 📋 ASSETS_SLUGS_CURSOS_CEP.md      # Inventario estratégico
│   ├── 📱 FACEBOOK_CONVERSIONS_CONFIG.md   # Setup Facebook
│   ├── 🌐 CEPCOMUNICACION_HOSTING_SETUP.md # Configuración hosting
│   ├── 🔌 HOSTINGER_API_TECHNICAL_DOC.md   # API técnica
│   ├── ⚙️ SETUP_GUIDE_CEPFORMACION.md      # Guía setup
│   └── 🗂️ INDEX.md                         # Este índice
├── 🛠️ scripts/                       # AUTOMATIZACIÓN
│   ├── 🎛️ manage-campaigns.cjs             # Gestión campañas
│   ├── 🔒 pre-commit-validation.sh         # Validación seguridad
│   └── 📱 configure-facebook-vars.sh       # Setup Facebook
├── 🧩 src/
│   ├── 🏠 components/
│   │   └── 📄 templates/
│   │       ├── 🎯 DirectCourseWrapper.tsx       # Rutas Facebook
│   │       └── 🌐 SemanticCourseWrapper.tsx     # Rutas SEO
│   ├── ⚙️ config/
│   │   ├── 📚 cursos-maestro.ts               # Base de datos cursos
│   │   └── 🔥 cursos-otono-2025.ts            # Campañas activas
│   └── 🧪 tests/                    # TESTING
│       ├── ✅ validation.test.ts              # Tests validación
│       ├── 🎨 CursoCard.test.tsx             # Tests componentes
│       ├── 🏠 homepage.test.tsx              # Tests homepage
│       └── 📚 TodosLosCursosPage.test.tsx    # Tests páginas
└── 🌐 public/
    ├── 🔧 .htaccess                         # Configuración Apache
    └── 📄 _redirects                        # Configuración Netlify
```

---

## 🎯 **GUÍAS DE NAVEGACIÓN POR ROL**

### **👨‍💻 PARA DESARROLLADORES**

**🚀 Setup Inicial:**
1. [`docs/SETUP_GUIDE_CEPFORMACION.md`](SETUP_GUIDE_CEPFORMACION.md) - Configuración inicial
2. [`README.md`](../README.md) - Arquitectura y comandos
3. [`scripts/pre-commit-validation.sh`](../scripts/pre-commit-validation.sh) - Flujo de seguridad

**🔧 Desarrollo Diario:**
```bash
npm run dev                    # Desarrollo local
npm run pre-deploy             # Antes de commit
npm run test:watch             # Testing continuo
```

### **📊 PARA MARKETING/GROWTH**

**📈 Gestión de Campañas:**
1. [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md) - Inventario completo
2. [`docs/FACEBOOK_CONVERSIONS_CONFIG.md`](FACEBOOK_CONVERSIONS_CONFIG.md) - Configuración tracking
3. [`scripts/manage-campaigns.cjs`](../scripts/manage-campaigns.cjs) - Herramientas gestión

**🎛️ Comandos de Gestión:**
```bash
npm run campaigns:status       # Estado actual
npm run campaigns:list         # Inventario completo
npm run campaigns:analytics    # Métricas tracking
```

### **⚙️ PARA DEVOPS/INFRAESTRUCTURA**

**🌐 Configuración Hosting:**
1. [`docs/CEPCOMUNICACION_HOSTING_SETUP.md`](CEPCOMUNICACION_HOSTING_SETUP.md) - Setup Hostinger
2. [`docs/HOSTINGER_API_TECHNICAL_DOCUMENTATION.md`](HOSTINGER_API_TECHNICAL_DOCUMENTATION.md) - API técnica
3. [`scripts/configure-facebook-vars.sh`](../scripts/configure-facebook-vars.sh) - Variables entorno

**🔒 Monitoreo y Seguridad:**
```bash
npm run pre-deploy             # Validación completa
# GitHub Actions automático     # CI/CD pipeline
```

---

## 📋 **CHECKLISTS DE VERIFICACIÓN**

### **✅ CHECKLIST: NUEVO DESARROLLADOR**

- [ ] Leer [`README.md`](../README.md) completo
- [ ] Seguir [`docs/SETUP_GUIDE_CEPFORMACION.md`](SETUP_GUIDE_CEPFORMACION.md)
- [ ] Ejecutar `npm install && npm run pre-deploy`
- [ ] Probar `npm run campaigns:status`
- [ ] Entender [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md)
- [ ] Revisar arquitectura en `src/components/templates/`

### **✅ CHECKLIST: NUEVA CAMPAÑA**

- [ ] Revisar [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md)
- [ ] Definir slug en matriz de assets
- [ ] Configurar rutas en `src/App.tsx`
- [ ] Actualizar `public/.htaccess` y `public/_redirects`
- [ ] Configurar tracking en wrappers
- [ ] Ejecutar `npm run pre-deploy`
- [ ] Verificar `npm run campaigns:status`

### **✅ CHECKLIST: DEPLOYMENT**

- [ ] Tests pasando (13/13 ✅)
- [ ] Linting sin errores críticos
- [ ] Build exitoso
- [ ] Validación pre-commit completada
- [ ] GitHub Actions ejecutado
- [ ] Verificación post-deploy

---

## 🔄 **FLUJOS DE TRABAJO DOCUMENTADOS**

### **🚀 FLUJO: DESARROLLO DIARIO**

1. **Setup Local:** `npm run dev`
2. **Desarrollo:** Modificar código
3. **Testing:** `npm run test:watch`
4. **Validación:** `npm run pre-deploy`
5. **Commit:** Git commit/push
6. **Deploy:** GitHub Actions automático

### **🎯 FLUJO: GESTIÓN DE CAMPAÑAS**

1. **Análisis:** Revisar matriz de assets
2. **Planificación:** Definir nueva campaña
3. **Implementación:** Configurar rutas dobles
4. **Tracking:** Configurar eventos específicos
5. **Validación:** `npm run pre-deploy`
6. **Monitoreo:** `npm run campaigns:analytics`

### **🔧 FLUJO: MANTENIMIENTO**

1. **Monitoreo:** GitHub Actions automático
2. **Actualizaciones:** Dependencias npm
3. **Seguridad:** ESLint + Tests automáticos
4. **Documentación:** Actualización continua
5. **Backup:** Dual deployment (Hostinger + Netlify)

---

## 🎯 **MÉTRICAS Y KPIs DOCUMENTADOS**

### **📊 MÉTRICAS TÉCNICAS**

| Métrica | Objetivo | Estado Actual | Documento |
|---------|----------|---------------|-----------|
| **Tests Coverage** | >90% | 13/13 ✅ | Tests automáticos |
| **Build Time** | <30s | ~25s ✅ | GitHub Actions |
| **Deploy Time** | <2min | ~90s ✅ | CI/CD Pipeline |
| **Linting Errors** | 0 errores | 0 ✅ | ESLint estricto |

### **📈 MÉTRICAS DE NEGOCIO**

| Métrica | Tracking | Documento de Referencia |
|---------|----------|-------------------------|
| **CTR Facebook** | DirectCourseWrapper | [`FACEBOOK_CONVERSIONS_CONFIG.md`](FACEBOOK_CONVERSIONS_CONFIG.md) |
| **Conversión Orgánica** | SemanticCourseWrapper | [`ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md) |
| **ROI por Canal** | Analytics diferenciado | Sistema de rutas dobles |

---

## 🆘 **RECURSOS DE AYUDA**

### **🔗 ENLACES RÁPIDOS**

- 🏠 **Home:** [`README.md`](../README.md)
- 📋 **Assets:** [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md)
- 🎛️ **Gestión:** `npm run campaigns:help`
- 🔧 **Setup:** [`docs/SETUP_GUIDE_CEPFORMACION.md`](SETUP_GUIDE_CEPFORMACION.md)

### **❓ RESOLUCIÓN DE PROBLEMAS**

| Problema | Comando Diagnóstico | Documento |
|----------|---------------------|-----------|
| **Tests Fallando** | `npm run test:watch` | [`README.md`](../README.md) |
| **Build Error** | `npm run build` | Logs de error |
| **Campaña No Visible** | `npm run campaigns:status` | [`ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md) |
| **Deploy Fallido** | GitHub Actions logs | [`CEPCOMUNICACION_HOSTING_SETUP.md`](CEPCOMUNICACION_HOSTING_SETUP.md) |

### **🚨 CONTACTOS DE EMERGENCIA**

- **Desarrollo:** Issues de GitHub
- **Hosting:** [`docs/CEPCOMUNICACION_HOSTING_SETUP.md`](CEPCOMUNICACION_HOSTING_SETUP.md)
- **Marketing:** [`docs/ASSETS_SLUGS_CURSOS_CEP.md`](ASSETS_SLUGS_CURSOS_CEP.md)

---

## 📈 **ROADMAP DE DOCUMENTACIÓN**

### **✅ FASE 1: COMPLETADA**
- [x] README principal actualizado
- [x] Índice maestro creado
- [x] Documentación de assets
- [x] Scripts de gestión documentados

### **🔄 FASE 2: EN PROGRESO**
- [ ] Guías de usuario específicas por rol
- [ ] Documentación de API interna
- [ ] Troubleshooting avanzado
- [ ] Video tutoriales

### **🔮 FASE 3: FUTURO**
- [ ] Documentación automatizada
- [ ] Wikis interactivas
- [ ] Documentación de arquitectura avanzada
- [ ] Onboarding automatizado

---

**📝 Última actualización:** Enero 2025  
**👨‍💻 Mantenido por:** SOLARIA.AGENCY  
**🎯 Versión:** 1.0 - Sistema Operativo  

---

> **💡 TIP:** Usa este índice como punto de partida para cualquier tarea relacionada con CEP Formación. Cada documento está optimizado para audiencias específicas y casos de uso particulares. 