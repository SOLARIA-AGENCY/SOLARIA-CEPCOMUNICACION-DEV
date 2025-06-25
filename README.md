# SOLARIA - CEP Comunicación

Sitio web institucional para **CEP Comunicación** desarrollado por **SOLARIA.AGENCY**.

## 🚀 Deployment Automatizado

### Configuración de Producción
- **Dominio**: www.cepcomunicacion.com
- **Hosting**: Hostinger (IP: 46.202.172.98)
- **Deployment**: GitHub Actions con FTP automatizado
- **SSL**: Let's Encrypt (automático)

### 🔧 Configuración Inicial

#### 1. Configurar Secrets de GitHub
```bash
# Ejecutar script de configuración
./scripts/setup-hostinger-secrets.sh
```

#### 2. Validar DNS
```bash
# Verificar configuración DNS
./scripts/dns-validation.sh
```

### 📦 Build y Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### 🚀 Deployment

#### Automático
El deployment se ejecuta automáticamente en cada push a la rama `main`.

#### Manual
```bash
# Via GitHub CLI
gh workflow run "Deploy CEP Comunicación to Production"

# O desde GitHub Actions tab en el repositorio
```

### 📊 Monitoreo

El workflow incluye:
- ✅ Validación de build
- ✅ Deployment via FTP
- ✅ Verificación DNS
- ✅ Health checks
- ✅ Validación SSL
- ✅ Performance checks

### 🔍 Estructura del Proyecto

```
SOLARIA-CEPCOMUNICACION/
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas de la aplicación
│   ├── config/           # Configuración de cursos y features
│   └── utils/            # Utilidades
├── public/
│   └── images/           # Assets estáticos
├── .github/
│   └── workflows/        # GitHub Actions
├── scripts/              # Scripts de automatización
└── docs/                 # Documentación técnica
```

### 📋 Features Principales

- 🎨 **Diseño Moderno**: Interface responsive con Tailwind CSS
- 📱 **Mobile First**: Optimizado para dispositivos móviles
- ⚡ **Performance**: Build optimizado con Vite
- 🔒 **Seguro**: HTTPS y headers de seguridad
- 📊 **SEO Ready**: Meta tags y structured data
- 🚀 **CI/CD**: Deployment automatizado

### 🛠️ Tecnologías

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **Testing**: Vitest
- **Deployment**: GitHub Actions + FTP
- **Hosting**: Hostinger Shared Hosting

### 📄 Documentación

- [Configuración Hosting](docs/CEPCOMUNICACION_HOSTING_SETUP.md)
- [API de Hostinger](docs/HOSTINGER_API_TECHNICAL_DOCUMENTATION.md)
- [Guía de Setup](docs/SETUP_GUIDE_CEPFORMACION.md)

### 🎯 URLs de Producción

- **Principal**: https://www.cepcomunicacion.com
- **Alternativa**: https://cepcomunicacion.com

---

## Desarrollo por SOLARIA.AGENCY

**Transformación empresarial mediante IA y automatización**

- 🌐 **Web**: solaria.agency
- 📧 **Email**: info@solaria.agency
- 📱 **Sedes**: Barcelona, Guayaquil, Miami

## 🚀 Características

- Portal de cursos con información detallada
- Diseño responsive y moderno
- Integración con sistema de inscripciones
- Optimizado para SEO

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm run test
```

## 📦 Deployment

El sitio se despliega automáticamente en Netlify desde la rama main.

URL: https://solaria-cepcomunicacion.netlify.app

## 🎨 Personalización

1. Actualiza el contenido en `src/pages/WelcomePage.tsx`
2. Modifica los estilos en `src/index.css`
3. Añade nuevas páginas en `src/pages/`

## 📄 Licencia

Desarrollado por **SOLARIA.AGENCY** - 2025

---

*Proyecto generado el 6/23/2025 usando SOLARIA Template*

<!-- Force deploy trigger -->
