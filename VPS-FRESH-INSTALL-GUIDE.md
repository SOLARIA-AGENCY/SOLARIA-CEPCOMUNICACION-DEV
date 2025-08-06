# 🚀 GUÍA INSTALACIÓN FRESCA VPS - CEP COMUNICACIÓN

## 📋 PLAN DE INSTALACIÓN COMPLETA

**Objetivo**: Configurar VPS desde cero con stack completo optimizado

**VPS Target**: 148.230.118.124  
**Dominio**: api.cepcomunicacion.com  
**Stack**: Ubuntu 20.04 + Node.js + PM2 + Nginx + SSL

---

## 🔄 FASE 1: REINSTALACIÓN VPS

### Pasos en Panel Hostinger:
1. **Ir a hPanel**: https://hpanel.hostinger.com
2. **Sección VPS**: Buscar VPS activo
3. **Reinstalar OS**: Ubuntu 20.04 LTS (recomendado)
4. **Obtener credenciales**: Usuario root + nueva contraseña
5. **Esperar**: ~5-10 minutos para reinstalación

### Información Post-Reinstalación:
```bash
VPS_IP=148.230.118.124
VPS_USER=root
VPS_PASSWORD=[nueva_contraseña_del_panel]
SSH_PORT=22
```

---

## 🔧 FASE 2: CONFIGURACIÓN AUTOMATIZADA

### Script de Configuración Completa:
He creado un script que automatiza toda la configuración:

```bash
# Una vez reinstalado el VPS, ejecutar:
ssh root@148.230.118.124
wget https://raw.githubusercontent.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV/main/vps-complete-setup.sh
chmod +x vps-complete-setup.sh
./vps-complete-setup.sh
```

### Lo que instalará automáticamente:
- ✅ **Sistema base**: Actualizaciones + herramientas esenciales
- ✅ **Node.js 20 LTS**: Version estable más reciente
- ✅ **PM2**: Gestor de procesos para aplicaciones Node.js
- ✅ **Nginx**: Servidor web + proxy reverso
- ✅ **UFW Firewall**: Seguridad optimizada
- ✅ **Git**: Para deployment desde repositorio
- ✅ **SSL/TLS**: Certificados automáticos con Let's Encrypt
- ✅ **Monitoreo**: Logs estructurados y health checks

---

## 🚀 FASE 3: DEPLOYMENT API

### Deployment Automatizado:
```bash
# El script incluye deployment completo de la API
cd /var/www/cep-api
git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV.git .
npm install --production
pm2 start ecosystem.config.js --env production
```

### Configuración Nginx:
```nginx
server {
    listen 80;
    server_name api.cepcomunicacion.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ FASE 4: VERIFICACIÓN

### Tests Automáticos Post-Instalación:
```bash
# Health check API
curl http://api.cepcomunicacion.com/health

# Test endpoint principal
curl -X POST http://api.cepcomunicacion.com/api/formsubmit-proxy \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","email_solicitante":"test@test.com","telefono":"123456","curso":"Test Course"}'

# Test SSL (después de configuración)
curl https://api.cepcomunicacion.com/health
```

### Puertos que estarán abiertos:
- **22**: SSH (solo desde IPs específicas)
- **80**: HTTP (redirige a HTTPS)
- **443**: HTTPS/SSL
- **3001**: API Node.js (solo localhost)

---

## 🔒 CONFIGURACIÓN DE SEGURIDAD

### Firewall UFW:
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

### PM2 Configuración Producción:
```javascript
module.exports = {
  apps: [{
    name: 'cep-api',
    script: './server-production.js',
    instances: 1,
    exec_mode: 'fork',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    log_file: '/var/log/pm2/cep-api-combined.log',
    out_file: '/var/log/pm2/cep-api-out.log',
    error_file: '/var/log/pm2/cep-api-error.log',
    max_memory_restart: '512M',
    node_args: '--max-old-space-size=512'
  }]
};
```

---

## ⏰ TIMELINE ESTIMADO

1. **Reinstalación VPS**: 5-10 minutos
2. **Script configuración**: 10-15 minutos
3. **Deployment API**: 3-5 minutos
4. **Verificación SSL**: 2-3 minutos
5. **Tests completos**: 2-3 minutos

**Total**: ~25-40 minutos para stack completo

---

## 🎯 RESULTADO FINAL

Al completar todos los pasos tendremos:

### Frontend (ya funcionando):
- ✅ **https://www.cepcomunicacion.com** - Sitio web completo

### Backend (nuevo):
- ✅ **https://api.cepcomunicacion.com** - API con SSL
- ✅ **Health check**: `/health`
- ✅ **Endpoint principal**: `/api/formsubmit-proxy`

### Arquitectura Completa:
```
Frontend (Hostinger) ←→ API (VPS Ubuntu) ←→ Gmail SMTP
     ↓                        ↓                  ↓
  Static Files           Node.js + PM2      Email Delivery
  GitHub Actions         Nginx + SSL       Resend + Fallback
```

---

## 🚨 PRÓXIMO PASO CRÍTICO

**ACCIÓN REQUERIDA**: 

1. **Reinstalar VPS** desde hPanel Hostinger
2. **Obtener nuevas credenciales** SSH
3. **Ejecutar script** de configuración automática

¿Estás listo para proceder con la reinstalación del VPS?

---

*🤖 Configuración preparada por ECO-NAZCAMEDIA*  
*📅 6 agosto 2025*  
*⚡ Stack: Ubuntu + Node.js + PM2 + Nginx + SSL*