#!/bin/bash

# ================================================================
# VPS COMPLETE SETUP - CEP COMUNICACIÓN
# Configuración completa desde cero para VPS Ubuntu 20.04
# ================================================================

set -e  # Salir si algún comando falla

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Variables de configuración
API_DIR="/var/www/cep-api"
DOMAIN="api.cepcomunicacion.com"
NODE_VERSION="20"
API_PORT="3001"

# Información del servidor
VPS_IP=$(curl -s ifconfig.me || echo "unknown")

# ================================================================
# FUNCIONES AUXILIARES
# ================================================================

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_section() {
    echo
    echo -e "${PURPLE}================================================================${NC}"
    echo -e "${PURPLE}🚀 $1${NC}"
    echo -e "${PURPLE}================================================================${NC}"
}

# ================================================================
# FASE 1: CONFIGURACIÓN BASE DEL SISTEMA
# ================================================================

setup_system_base() {
    log_section "CONFIGURACIÓN BASE DEL SISTEMA"
    
    log_info "Actualizando sistema base..."
    apt update -y
    apt upgrade -y
    
    log_info "Instalando herramientas esenciales..."
    apt install -y curl wget git unzip build-essential software-properties-common
    apt install -y htop nano vim ufw fail2ban
    
    log_info "Configurando zona horaria..."
    timedatectl set-timezone Europe/Madrid
    
    log_success "Sistema base configurado correctamente"
}

# ================================================================
# FASE 2: INSTALACIÓN NODE.JS Y NPM
# ================================================================

install_nodejs() {
    log_section "INSTALACIÓN NODE.JS $NODE_VERSION LTS"
    
    log_info "Agregando repositorio NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    
    log_info "Instalando Node.js..."
    apt install -y nodejs
    
    # Verificar instalación
    NODE_VER=$(node --version)
    NPM_VER=$(npm --version)
    
    log_success "Node.js $NODE_VER instalado"
    log_success "npm $NPM_VER instalado"
    
    # Configurar npm para mejor rendimiento
    npm config set fund false
    npm config set audit-level moderate
}

# ================================================================
# FASE 3: INSTALACIÓN PM2
# ================================================================

install_pm2() {
    log_section "INSTALACIÓN PM2 PROCESS MANAGER"
    
    log_info "Instalando PM2 globalmente..."
    npm install -g pm2
    
    # Configurar PM2 para inicio automático
    log_info "Configurando PM2 startup..."
    env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
    
    # Crear directorios de logs
    mkdir -p /var/log/pm2
    
    PM2_VER=$(pm2 --version)
    log_success "PM2 $PM2_VER instalado y configurado"
}

# ================================================================
# FASE 4: INSTALACIÓN Y CONFIGURACIÓN NGINX
# ================================================================

install_nginx() {
    log_section "INSTALACIÓN Y CONFIGURACIÓN NGINX"
    
    log_info "Instalando Nginx..."
    apt install -y nginx
    
    # Habilitar y iniciar Nginx
    systemctl enable nginx
    systemctl start nginx
    
    log_info "Configurando Nginx para la API..."
    
    # Crear configuración del sitio
    cat > /etc/nginx/sites-available/cep-api << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    location / {
        proxy_pass http://localhost:$API_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://localhost:$API_PORT/health;
        access_log off;
    }
}
EOF
    
    # Habilitar sitio
    ln -sf /etc/nginx/sites-available/cep-api /etc/nginx/sites-enabled/
    
    # Remover sitio por defecto
    rm -f /etc/nginx/sites-enabled/default
    
    # Verificar configuración
    nginx -t
    systemctl reload nginx
    
    log_success "Nginx configurado correctamente"
}

# ================================================================
# FASE 5: CONFIGURACIÓN FIREWALL Y SEGURIDAD
# ================================================================

setup_firewall() {
    log_section "CONFIGURACIÓN FIREWALL Y SEGURIDAD"
    
    log_info "Configurando UFW firewall..."
    
    # Reiniciar UFW
    ufw --force reset
    
    # Políticas por defecto
    ufw default deny incoming
    ufw default allow outgoing
    
    # Permitir conexiones esenciales
    ufw allow ssh
    ufw allow 'Nginx Full'
    
    # Habilitar firewall
    ufw --force enable
    
    log_info "Configurando fail2ban..."
    
    # Configurar fail2ban para SSH
    cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
EOF
    
    systemctl enable fail2ban
    systemctl restart fail2ban
    
    log_success "Firewall y seguridad configurados"
}

# ================================================================
# FASE 6: DEPLOYMENT DE LA API
# ================================================================

deploy_api() {
    log_section "DEPLOYMENT DE LA API CEP COMUNICACIÓN"
    
    log_info "Creando directorio de la aplicación..."
    mkdir -p $API_DIR
    cd $API_DIR
    
    log_info "Clonando repositorio..."
    git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV.git .
    
    log_info "Instalando dependencias de producción..."
    npm install --production --no-audit --no-fund
    
    log_info "Configurando variables de entorno..."
    if [ -f ".env.production" ]; then
        cp .env.production .env
        log_success "Variables de entorno configuradas desde .env.production"
    else
        log_warning "Archivo .env.production no encontrado, creando básico..."
        cat > .env << EOF
NODE_ENV=production
PORT=$API_PORT
GMAIL_EMAIL=agency.solaria@gmail.com
GMAIL_APP_PASSWORD=kmmu kipu tmvt kpaz
EOF
    fi
    
    log_info "Configurando permisos..."
    chown -R root:root $API_DIR
    chmod -R 755 $API_DIR
    
    log_success "API deployada en $API_DIR"
}

# ================================================================
# FASE 7: CONFIGURACIÓN PM2 PARA PRODUCCIÓN
# ================================================================

setup_pm2_production() {
    log_section "CONFIGURACIÓN PM2 PARA PRODUCCIÓN"
    
    cd $API_DIR
    
    log_info "Iniciando aplicación con PM2..."
    
    # Verificar si ya existe
    if pm2 list | grep -q "cep-api"; then
        log_info "Aplicación existente encontrada, reiniciando..."
        pm2 restart ecosystem.config.js --env production
    else
        log_info "Iniciando nueva aplicación..."
        pm2 start ecosystem.config.js --env production
    fi
    
    # Guardar configuración PM2
    pm2 save
    
    log_success "PM2 configurado para producción"
}

# ================================================================
# FASE 8: CONFIGURACIÓN SSL CON LET'S ENCRYPT
# ================================================================

setup_ssl() {
    log_section "CONFIGURACIÓN SSL CON LET'S ENCRYPT"
    
    log_info "Instalando Certbot..."
    apt install -y certbot python3-certbot-nginx
    
    log_info "Obteniendo certificado SSL para $DOMAIN..."
    
    # Intentar obtener certificado
    if certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email agency.solaria@gmail.com; then
        log_success "Certificado SSL configurado correctamente"
        
        # Configurar renovación automática
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
        log_success "Renovación automática de SSL configurada"
    else
        log_warning "No se pudo obtener certificado SSL automáticamente"
        log_info "Será necesario configurar SSL manualmente después"
    fi
}

# ================================================================
# FASE 9: VERIFICACIÓN Y TESTS
# ================================================================

verify_installation() {
    log_section "VERIFICACIÓN DE INSTALACIÓN"
    
    log_info "Verificando servicios..."
    
    # Verificar servicios
    services=("nginx" "fail2ban")
    for service in "${services[@]}"; do
        if systemctl is-active --quiet $service; then
            log_success "$service está activo"
        else
            log_error "$service NO está activo"
        fi
    done
    
    # Verificar PM2
    if pm2 list | grep -q "online"; then
        log_success "Aplicación PM2 está corriendo"
    else
        log_error "Aplicación PM2 NO está corriendo"
    fi
    
    # Verificar API local
    log_info "Verificando API local..."
    sleep 5
    if curl -f http://localhost:$API_PORT/health > /dev/null 2>&1; then
        log_success "API responde correctamente en puerto $API_PORT"
    else
        log_error "API NO responde en puerto $API_PORT"
        pm2 logs cep-api --lines 10
    fi
    
    # Test externo
    log_info "Verificando acceso externo..."
    if curl -f http://$DOMAIN/health > /dev/null 2>&1; then
        log_success "API accesible externamente en http://$DOMAIN"
    else
        log_warning "API podría no ser accesible externamente aún"
    fi
}

# ================================================================
# FASE 10: INFORMACIÓN FINAL Y COMANDOS ÚTILES
# ================================================================

show_final_info() {
    log_section "INSTALACIÓN COMPLETADA"
    
    echo -e "${GREEN}"
    echo "================================================================"
    echo "🎉 VPS CONFIGURADO EXITOSAMENTE"
    echo "================================================================"
    echo -e "${NC}"
    
    echo -e "${BLUE}📊 INFORMACIÓN DEL SERVIDOR:${NC}"
    echo "   🌐 IP: $VPS_IP"
    echo "   🔗 Dominio: $DOMAIN"
    echo "   📡 API Puerto: $API_PORT"
    echo "   📁 Directorio: $API_DIR"
    
    echo
    echo -e "${BLUE}🔍 ENDPOINTS DISPONIBLES:${NC}"
    echo "   Health Check: http://$DOMAIN/health"
    echo "   API Principal: http://$DOMAIN/api/formsubmit-proxy"
    if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
        echo "   HTTPS: https://$DOMAIN/health"
    fi
    
    echo
    echo -e "${BLUE}📋 COMANDOS ÚTILES:${NC}"
    echo "   pm2 status           - Estado de procesos"
    echo "   pm2 logs cep-api     - Ver logs"
    echo "   pm2 restart cep-api  - Reiniciar API"
    echo "   nginx -t             - Verificar config Nginx"
    echo "   systemctl reload nginx - Recargar Nginx"
    echo "   ufw status           - Estado firewall"
    
    echo
    echo -e "${BLUE}🔧 ARCHIVOS DE CONFIGURACIÓN:${NC}"
    echo "   API: $API_DIR"
    echo "   Nginx: /etc/nginx/sites-available/cep-api"
    echo "   Logs PM2: /var/log/pm2/"
    echo "   SSL: /etc/letsencrypt/live/$DOMAIN/"
    
    echo
    echo -e "${GREEN}✅ PRÓXIMO PASO: Verificar que la API funciona correctamente${NC}"
    echo -e "${YELLOW}📝 Para actualizar: cd $API_DIR && git pull && pm2 restart cep-api${NC}"
    
    echo
    echo -e "${PURPLE}🚀 VPS listo para producción!${NC}"
}

# ================================================================
# FUNCIÓN PRINCIPAL
# ================================================================

main() {
    echo
    echo -e "${PURPLE}================================================================${NC}"
    echo -e "${PURPLE}🚀 VPS COMPLETE SETUP - CEP COMUNICACIÓN${NC}"
    echo -e "${PURPLE}   Ubuntu 20.04 + Node.js + PM2 + Nginx + SSL${NC}"
    echo -e "${PURPLE}================================================================${NC}"
    echo
    
    # Verificar que somos root
    if [[ $EUID -ne 0 ]]; then
        log_error "Este script debe ejecutarse como root"
        exit 1
    fi
    
    # Ejecutar todas las fases
    setup_system_base
    install_nodejs
    install_pm2
    install_nginx
    setup_firewall
    deploy_api
    setup_pm2_production
    setup_ssl
    verify_installation
    show_final_info
    
    log_success "Configuración completa finalizada exitosamente"
}

# ================================================================
# EJECUCIÓN
# ================================================================

# Verificar conexión a internet
if ! ping -c 1 google.com &> /dev/null; then
    log_error "Sin conexión a internet"
    exit 1
fi

# Ejecutar configuración principal
main "$@"