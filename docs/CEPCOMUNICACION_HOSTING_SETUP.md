# Configuración Hosting CEP Comunicación
## Despliegue completo en Hostinger para www.cepcomunicacion.com

---

**Dominio**: cepcomunicacion.com  
**Target URL**: www.cepcomunicacion.com  
**Hosting**: Hostinger  
**Tecnología**: React/Vite (Sitio estático)  
**Preparado por**: SOLARIA.AGENCY-ECO

---

## 🚨 ANÁLISIS SITUACIÓN ACTUAL

### Estado DNS Detectado
```dns
❌ PROBLEMAS IDENTIFICADOS:
- A Record: 46.202.72.198 (hosting anterior)
- A Record: 148.105.251.19 (servidor desconocido)  
- CNAME www: *.pages.mailchimp (redirige a Mailchimp)
- Nameservers: dns-parking.com (funcional pero subóptimo)

✅ CONFIGURACIÓN CORRECTA:
- Registros MX, TXT (email) configurados
- DKIM, DMARC, SPF activos
- Certificados CAA configurados
```

### Problemática Actual
1. **Conflicto de IPs**: Múltiples A records apuntando a servidores diferentes
2. **Redirección Mailchimp**: www.cepcomunicacion.com → Mailchimp landing
3. **Hosting Inactivo**: IPs no responden o apuntan a servicios discontinuados

---

## 🛠️ PLAN DE CONFIGURACIÓN COMPLETO

### Fase 1: Limpieza DNS (CRÍTICO)
### Fase 2: Configuración Hosting Hostinger  
### Fase 3: Despliegue del Sitio Web
### Fase 4: Configuración SSL y Optimización
### Fase 5: Automatización de Despliegues

---

## 📋 FASE 1: LIMPIEZA DNS

### 1.1 Acceso al Panel DNS
```bash
URL: https://hpanel.hostinger.com
Ruta: Dominios → cepcomunicacion.com → DNS Zone Editor
```

### 1.2 Registros a ELIMINAR
```dns
# ELIMINAR estos registros problemáticos:
❌ A @ 46.202.72.198 
❌ A @ 148.105.251.19
❌ CNAME www *.pages.mailchimp.com

# CONSERVAR estos registros (email y seguridad):
✅ MX records (email funcionando)
✅ TXT _dmarc, _dkim (autenticación email)
✅ SPF records (antispam)
✅ CAA records (certificados SSL)
```

### 1.3 Procedimiento de Limpieza
```bash
1. En DNS Zone Editor, localizar registros problemáticos
2. Click "Editar" en cada registro a eliminar
3. Click "Borrar" → Confirmar eliminación
4. Verificar que solo queden registros email/seguridad
```

---

## 🏗️ FASE 2: CONFIGURACIÓN HOSTING

### 2.1 Obtener IP del Hosting Hostinger
```bash
# En hPanel:
Hosting → Plan Details → Server IP
# Ejemplo de IP: 185.185.185.185 (variable según datacenter)
```

### 2.2 Crear Nuevos Registros DNS
```dns
# Registro Principal
Tipo: A
Nombre: @
Apunta a: [IP_HOSTINGER_OBTENIDA]
TTL: 14400

# Registro WWW  
Tipo: CNAME
Nombre: www
Apunta a: cepcomunicacion.com
TTL: 14400
```

### 2.3 Configurar Document Root
```bash
# Verificar en hPanel:
Files → File Manager → public_html/

# Estructura esperada:
public_html/
├── index.html (página principal)
├── assets/ (CSS, JS, imágenes)
├── .htaccess (reescritura URLs)
└── robots.txt, sitemap.xml (SEO)
```

---

## 🚀 FASE 3: DESPLIEGUE DEL SITIO WEB

### 3.1 Preparación del Build
```bash
# En tu proyecto local:
npm install
npm run build

# Verificar archivos generados:
ls -la dist/
# Debe contener:
# - index.html
# - assets/
# - favicon.ico
```

### 3.2 Método A: Despliegue via FTP (RECOMENDADO)

#### Obtener Credenciales FTP
```bash
# En hPanel:
Files → FTP Accounts → View Details

Datos requeridos:
- Host: ftp.hostinger.com
- Username: u[número]
- Password: [generar si es necesario]
- Port: 21
```

#### Configurar GitHub Actions
```yaml
# .github/workflows/deploy-cepcomunicacion.yml
name: 🚀 Deploy CEP Comunicación

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install & Build
        run: |
          npm ci
          npm run build
          
      - name: Deploy to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ftp.hostinger.com
          username: ${{ secrets.HOSTINGER_FTP_USERNAME }}
          password: ${{ secrets.HOSTINGER_FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

### 3.3 Método B: Subida Manual via File Manager
```bash
1. Comprimir carpeta dist/ → cepcomunicacion.zip
2. hPanel → Files → File Manager
3. Upload cepcomunicacion.zip a public_html/
4. Click derecho → Extract → Extract to current directory
5. Mover archivos de dist/ a public_html/ directamente
6. Eliminar carpeta dist/ vacía y archivo zip
```

### 3.4 Configuración .htaccess para SPA
```apache
# /public_html/.htaccess
RewriteEngine On

# Redirección HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Single Page Application (SPA) routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Cache optimization
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## 🔒 FASE 4: CONFIGURACIÓN SSL

### 4.1 Activar SSL Gratuito
```bash
# En hPanel:
SSL → Let's Encrypt → Enable

# Verificar certificado:
curl -I https://www.cepcomunicacion.com
# Debe mostrar: HTTP/2 200
```

### 4.2 Forzar HTTPS
```bash
# En hPanel:
Advanced → Force HTTPS → Enable

# Verificar redirección:
curl -I http://www.cepcomunicacion.com
# Debe mostrar: 301 Moved Permanently → HTTPS
```

### 4.3 Configurar HSTS
```apache
# Agregar a .htaccess:
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

---

## 📊 FASE 5: VERIFICACIÓN Y TESTING

### 5.1 Checklist DNS
```bash
# Verificar propagación DNS:
dig A cepcomunicacion.com
dig CNAME www.cepcomunicacion.com

# Verificar desde múltiples ubicaciones:
https://www.whatsmydns.net/
```

### 5.2 Checklist Funcionalidad
```bash
# Tests básicos:
✅ https://cepcomunicacion.com → Carga correctamente
✅ https://www.cepcomunicacion.com → Carga correctamente  
✅ http://cepcomunicacion.com → Redirige a HTTPS
✅ SSL certificate válido y activo
✅ Navegación SPA funciona (rutas internas)
✅ Assets (CSS/JS/imágenes) cargan correctamente
✅ Responsive design en móvil
```

### 5.3 Performance Check
```bash
# Herramientas de testing:
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- SSL Labs: https://www.ssllabs.com/ssltest/

# Métricas objetivo:
- Core Web Vitals: > 90
- First Contentful Paint: < 2s
- SSL Rating: A+
```

---

## 🤖 AUTOMATIZACIÓN AVANZADA

### GitHub Secrets Requeridos
```bash
# En repository Settings → Secrets:
HOSTINGER_FTP_USERNAME = u123456789
HOSTINGER_FTP_PASSWORD = secure_password_123
```

### Workflow Completo con Validación
```yaml
name: 🚀 Deploy CEP Comunicación with Validation

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build Application
        run: npm run build
        
      - name: Validate Build
        run: |
          if [ ! -f "dist/index.html" ]; then
            echo "❌ Build failed: index.html missing"
            exit 1
          fi
          echo "✅ Build validation passed"
          
      - name: Deploy to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ftp.hostinger.com
          username: ${{ secrets.HOSTINGER_FTP_USERNAME }}
          password: ${{ secrets.HOSTINGER_FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            
      - name: Health Check
        run: |
          sleep 15 # Esperar propagación
          for i in {1..5}; do
            status=$(curl -s -o /dev/null -w "%{http_code}" https://www.cepcomunicacion.com)
            if [ $status -eq 200 ]; then
              echo "✅ Site is live and responding"
              break
            else
              echo "⚠️ Attempt $i: Status $status"
              sleep 10
            fi
          done
          
      - name: Notify Success
        run: |
          echo "🎉 Deployment completed!"
          echo "📍 Live URL: https://www.cepcomunicacion.com"
          echo "📅 Deployed: $(date)"
```

---

## 🐛 TROUBLESHOOTING

### Problema: DNS no propaga
```bash
# Solución:
1. Verificar TTL configurado (máximo 14400)
2. Usar flush DNS local: ipconfig /flushdns
3. Probar desde diferentes ubicaciones
4. Tiempo estimado: 10-60 minutos
```

### Problema: 403 Forbidden
```bash
# Solución:
1. hPanel → Files → Fix File Ownership
2. Verificar que index.html esté en public_html/
3. Verificar permisos: folders 755, files 644
```

### Problema: SSL no activo
```bash
# Solución:
1. hPanel → SSL → Let's Encrypt → Force Re-issue
2. Verificar que domain apunte a IP correcta
3. Esperar 5-10 minutos para propagación
```

### Problema: www no funciona
```bash
# Verificar CNAME:
dig CNAME www.cepcomunicacion.com
# Debe responder: www.cepcomunicacion.com CNAME cepcomunicacion.com
```

---

## 📞 CONTACTOS DE SOPORTE

### Hostinger Support
- **Live Chat**: Desde hPanel (24/7)
- **Email**: support@hostinger.com
- **Knowledge Base**: support.hostinger.com

### DNS Propagation Tools
- **Global DNS Checker**: https://www.whatsmydns.net/
- **DNS Lookup**: https://dnschecker.org/
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## ✅ CRONOGRAMA DE IMPLEMENTACIÓN

### Día 1: Preparación (30 min)
- [ ] Backup configuración DNS actual
- [ ] Obtener credenciales FTP Hostinger
- [ ] Configurar GitHub Secrets

### Día 1: Limpieza DNS (15 min)
- [ ] Eliminar registros A conflictivos
- [ ] Eliminar CNAME Mailchimp
- [ ] Agregar nuevos registros A y CNAME

### Día 1: Despliegue (20 min)
- [ ] Build local del proyecto
- [ ] Subida via FTP o GitHub Actions
- [ ] Configurar .htaccess

### Día 1: Configuración SSL (10 min)
- [ ] Activar Let's Encrypt
- [ ] Forzar HTTPS
- [ ] Verificar certificado

### Día 2: Verificación (30 min)
- [ ] Testing completo funcionalidad
- [ ] Performance testing
- [ ] SEO básico verification

---

## 🎯 RESULTADOS ESPERADOS

### Métricas de Éxito
- **Uptime**: 99.9%
- **Load Time**: < 3 segundos
- **SSL Score**: A+
- **SEO Score**: > 90
- **Mobile Friendly**: Sí

### URLs Funcionales
- ✅ https://cepcomunicacion.com
- ✅ https://www.cepcomunicacion.com  
- ✅ http://cepcomunicacion.com (→ redirect HTTPS)
- ✅ http://www.cepcomunicacion.com (→ redirect HTTPS)

---

**🚀 PRÓXIMO PASO**: Obtener credenciales FTP de Hostinger y ejecutar limpieza DNS según este protocolo.

---

*Documento preparado por SOLARIA.AGENCY-ECO*  
*Validación técnica: NAZCAMEDIA-Σ + NAZCAMEDIA-Δ*  
*Control calidad: NAZCAMEDIA-Ψ* 