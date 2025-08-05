# 🚀 GUÍA COMPLETA DESPLIEGUE VPS HOSTINGER
## CEP Comunicación - Backend NodeMailer API

---

**Versión**: 1.0  
**Fecha**: Agosto 2025  
**Preparado por**: ECO-NAZCAMEDIA  
**Target**: VPS Hostinger Ubuntu 20.04

---

## 📋 PRERREQUISITOS

### ✅ VPS Hostinger Contratado
- **Plan**: VPS 1 ($3.99/mes) o superior
- **OS**: Ubuntu 20.04 LTS
- **Recursos mínimos**: 1GB RAM, 20GB SSD

### ✅ Datos de Acceso VPS
```bash
VPS_IP=xxx.xxx.xxx.xxx        # IP pública del VPS
VPS_USER=root                 # Usuario inicial
VPS_PASSWORD=xxxxxxxxxx       # Contraseña del VPS
```

### ✅ Subdominio Configurado
- **Subdominio**: `api.cepcomunicacion.com`
- **DNS A Record**: Apuntando a `VPS_IP`

---

## 🚀 FASE 1: CONFIGURACIÓN INICIAL VPS

### Paso 1: Conectar al VPS
```bash
# Conectar via SSH
ssh root@VPS_IP

# O usando la consola web de Hostinger hPanel
```

### Paso 2: Ejecutar Script de Configuración Base
```bash
# Descargar y ejecutar script de configuración
wget https://raw.githubusercontent.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION/main/vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh
```

**El script instalará automáticamente:**
- ✅ Node.js 18 LTS
- ✅ NPM actualizado
- ✅ PM2 (Process Manager)
- ✅ Nginx (Reverse Proxy)
- ✅ Firewall UFW configurado
- ✅ Usuario `cepapp` creado
- ✅ Estructura de directorios

---

## 🚀 FASE 2: CONFIGURACIÓN DNS Y SUBDOMINIO

### Paso 1: Configurar DNS en Hostinger
1. **Ir a hPanel → Dominios → cepcomunicacion.com**
2. **Gestión DNS → Agregar registro:**
   ```
   Tipo: A
   Nombre: api
   Contenido: VPS_IP
   TTL: 3600
   ```
3. **Guardar cambios**

### Paso 2: Verificar Propagación DNS
```bash
# Verificar desde local (esperar 5-10 minutos)
nslookup api.cepcomunicacion.com
ping api.cepcomunicacion.com
```

---

## 🚀 FASE 3: DESPLIEGUE DE LA APLICACIÓN

### Paso 1: Cambiar a Usuario Aplicación
```bash
# Cambiar a usuario cepapp
su - cepapp
cd /var/www/cepapi
```

### Paso 2: Clonar Repositorio
```bash
# Clonar repositorio GitHub
git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION.git .

# O alternativamente, subir archivos via SCP/SFTP
```

### Paso 3: Configurar Variables de Entorno
```bash
# Copiar archivo de entorno
cp .env.production .env

# Editar con valores reales
nano .env
```

**Configurar estas variables:**
```bash
NODE_ENV=production
PORT=3001
GMAIL_EMAIL=agency.solaria@gmail.com
GMAIL_APP_PASSWORD=kmmu kipu tmvt kpaz  # ✅ Ya tienes este valor
ALLOWED_ORIGINS=https://www.cepcomunicacion.com,https://cepcomunicacion.com
```

### Paso 4: Instalar Dependencias de Producción
```bash
# Copiar package.json de producción
cp package-production.json package.json

# Instalar dependencias
npm install --production
```

### Paso 5: Probar Aplicación Localmente
```bash
# Probar que funciona
node server-production.js

# Debe mostrar:
# 🚀 CEP API NodeMailer - Servidor Iniciado
# ✅ Gmail SMTP configurado correctamente
```

**Ctrl+C para parar y continuar con PM2**

---

## 🚀 FASE 4: CONFIGURACIÓN NGINX

### Paso 1: Configurar Nginx
```bash
# Volver a usuario root
sudo su -

# Copiar configuración Nginx
cp /var/www/cepapi/nginx-cepapi.conf /etc/nginx/sites-available/cepapi

# Activar sitio
ln -s /etc/nginx/sites-available/cepapi /etc/nginx/sites-enabled/

# Probar configuración
nginx -t

# Recargar Nginx
systemctl reload nginx
```

### Paso 2: Verificar Nginx
```bash
# Verificar estado
systemctl status nginx

# Ver logs si hay problemas
tail -f /var/log/nginx/error.log
```

---

## 🚀 FASE 5: INICIAR CON PM2

### Paso 1: Volver a Usuario Aplicación
```bash
su - cepapp
cd /var/www/cepapi
```

### Paso 2: Iniciar con PM2
```bash
# Iniciar aplicación con PM2
npm run pm2:start

# Verificar estado
pm2 status

# Ver logs
pm2 logs cep-api

# Debe mostrar la aplicación corriendo
```

### Paso 3: Configurar PM2 Startup
```bash
# Generar script de startup
pm2 startup

# Seguir las instrucciones que aparezcan
# Normalmente será algo como:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u cepapp --hp /home/cepapp

# Guardar configuración actual
pm2 save
```

---

## 🚀 FASE 6: CONFIGURAR SSL (HTTPS)

### Paso 1: Instalar Certbot
```bash
# Volver a root
sudo su -

# Instalar Certbot
apt install certbot python3-certbot-nginx -y
```

### Paso 2: Obtener Certificado SSL
```bash
# Obtener certificado para api.cepcomunicacion.com
certbot --nginx -d api.cepcomunicacion.com

# Seguir instrucciones interactivas
# Elegir redirección HTTPS automática
```

### Paso 3: Verificar Renovación Automática
```bash
# Probar renovación automática
certbot renew --dry-run

# Debe mostrar "Congratulations, all renewals succeeded"
```

---

## 🚀 FASE 7: VERIFICACIÓN FINAL

### Paso 1: Verificar API Funcionando
```bash
# Desde el VPS
curl -I http://localhost:3001/health

# Desde internet
curl -I https://api.cepcomunicacion.com/health

# Ambos deben retornar 200 OK
```

### Paso 2: Verificar Logs
```bash
# Ver logs de la aplicación
pm2 logs cep-api

# Ver logs de Nginx
tail -f /var/log/nginx/cepapi_access.log
tail -f /var/log/nginx/cepapi_error.log
```

### Paso 3: Probar Endpoint Principal
```bash
# Test desde local con curl
curl -X POST https://api.cepcomunicacion.com/api/formsubmit-proxy \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "_subject": "Test desde VPS",
    "nombre": "Test",
    "apellidos": "Usuario",
    "email_solicitante": "test@test.com",
    "telefono": "622123456",
    "curso": "Test Course",
    "tipo_curso": "ocupados",
    "empresa_actual": "Test Company",
    "provincia": "Santa Cruz de Tenerife",
    "disponibilidad": "flexible",
    "consentimiento_datos": "Sí",
    "consentimiento_marketing": "No"
  }'

# Debe retornar success: true
```

---

## 🚀 FASE 8: ACTUALIZAR FRONTEND

### Archivo a Modificar: `src/components/molecules/EmploymentFormModal.tsx`

**Cambiar línea 109:**
```javascript
// ANTES (desarrollo)
const proxyUrl = 'http://localhost:3001/api/formsubmit-proxy';

// DESPUÉS (producción)
const proxyUrl = 'https://api.cepcomunicacion.com/api/formsubmit-proxy';
```

### Commit y Deploy Frontend
```bash
# Desde tu máquina local
git add .
git commit -m "feat: Actualizar URL API para producción VPS Hostinger

- Cambiar localhost:3001 a api.cepcomunicacion.com
- Sistema NodeMailer completamente desplegado en VPS

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin main

# El frontend se desplegará automáticamente via GitHub Actions
```

---

## 🚀 COMANDOS ÚTILES PARA MANTENIMIENTO

### PM2 Management
```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs cep-api

# Reiniciar aplicación
pm2 restart cep-api

# Recargar sin downtime
pm2 reload cep-api

# Parar aplicación
pm2 stop cep-api

# Eliminar aplicación
pm2 delete cep-api
```

### Logs y Debugging
```bash
# Logs de aplicación
tail -f /var/log/pm2/cep-api-combined.log

# Logs de Nginx
tail -f /var/log/nginx/cepapi_access.log
tail -f /var/log/nginx/cepapi_error.log

# Ver procesos que usan puerto 3001
lsof -i :3001

# Ver uso de recursos
htop
df -h
free -h
```

### Backup y Actualización
```bash
# Backup de configuración
cp /var/www/cepapi/.env /var/www/cepapi/.env.backup.$(date +%Y%m%d)

# Actualizar aplicación
cd /var/www/cepapi
git pull origin main
npm install --production
pm2 reload cep-api
```

---

## 🎯 VERIFICACIÓN DE ÉXITO

### ✅ Checklist Final
- [ ] VPS configurado y funcionando
- [ ] DNS `api.cepcomunicacion.com` resuelve a VPS IP
- [ ] Node.js y PM2 instalados
- [ ] Nginx configurado como reverse proxy
- [ ] SSL/HTTPS funcionando con Let's Encrypt
- [ ] Aplicación corriendo en PM2
- [ ] Health check responde: `https://api.cepcomunicacion.com/health`
- [ ] Frontend actualizado con nueva URL
- [ ] Emails de prueba funcionando correctamente

### 🎉 URLs Finales
- **API Health Check**: https://api.cepcomunicacion.com/health
- **API Endpoint Principal**: https://api.cepcomunicacion.com/api/formsubmit-proxy
- **Frontend**: https://www.cepcomunicacion.com

---

## 🆘 TROUBLESHOOTING

### Error: Cannot connect to VPS
```bash
# Verificar IP y firewall
ping VPS_IP
telnet VPS_IP 22
```

### Error: DNS not resolving
```bash
# Verificar propagación DNS
nslookup api.cepcomunicacion.com
dig api.cepcomunicacion.com
```

### Error: Nginx 502 Bad Gateway
```bash
# Verificar que la aplicación corre en puerto 3001
lsof -i :3001
pm2 status
pm2 logs cep-api
```

### Error: SSL Certificate
```bash
# Renovar certificado manualmente
certbot renew
systemctl reload nginx
```

### Error: Application not starting
```bash
# Verificar variables de entorno
cat /var/www/cepapi/.env

# Verificar permisos
ls -la /var/www/cepapi/
chown -R cepapp:cepapp /var/www/cepapi/

# Verificar logs
pm2 logs cep-api --lines 50
```

---

## 📞 SOPORTE

Si encuentras problemas durante el despliegue:

1. **Verificar logs**: Siempre revisar logs primero
2. **Verificar conectividad**: DNS, firewall, puertos
3. **Verificar permisos**: Usuario, archivos, directorios
4. **Verificar variables**: .env correctamente configurado

**Éxito esperado**: API funcionando en `https://api.cepcomunicacion.com` con emails enviándose correctamente a `cep.ocupados@gmail.com`.

---

**🎉 ¡VPS Hostinger configurado correctamente para CEP Comunicación!**