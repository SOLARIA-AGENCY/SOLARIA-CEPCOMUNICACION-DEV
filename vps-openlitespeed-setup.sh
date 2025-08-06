#!/bin/bash

# ================================================================
# VPS OPENLITESPEED SETUP - CEP COMUNICACIÓN
# Configuración optimizada para OpenLiteSpeed + Node.js
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
API_DIR="/usr/local/lsws/Example/html/cep-api"
DOMAIN="api.cepcomunicacion.com"
API_PORT="3001"
LSWS_PORT="7080"  # Puerto admin OpenLiteSpeed

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
    log_section "CONFIGURACIÓN BASE DEL SISTEMA (Ubuntu 24.04)"
    
    log_info "Actualizando sistema base..."
    apt update -y
    apt upgrade -y
    
    log_info "Instalando herramientas esenciales..."
    apt install -y curl wget git unzip build-essential software-properties-common
    apt install -y htop nano vim ufw fail2ban
    
    log_info "Configurando zona horaria..."
    timedatectl set-timezone Europe/Madrid
    
    log_success "Sistema base Ubuntu 24.04 configurado correctamente"
}

# ================================================================
# FASE 2: CONFIGURACIÓN OPENLITESPEED
# ================================================================

configure_openlitespeed() {
    log_section "CONFIGURACIÓN OPENLITESPEED + NODE.JS"
    
    log_info "OpenLiteSpeed ya está preinstalado en esta imagen"
    
    # Verificar que está corriendo
    systemctl status lsws || systemctl start lsws
    systemctl enable lsws
    
    log_info "Configurando OpenLiteSpeed para la API..."
    
    # Crear directorio para la API
    mkdir -p $API_DIR
    chown -R lsadm:lsadm $API_DIR
    
    # Configurar virtual host para la API
    log_info "Configurando Virtual Host..."
    
    # Nota: OpenLiteSpeed se configura via WebAdmin
    log_warning "Configuración adicional requerida via WebAdmin:"
    log_info "1. Acceder a: http://$VPS_IP:$LSWS_PORT"
    log_info "2. Usuario: admin"
    log_info "3. Configurar Virtual Host para $DOMAIN"
    
    log_success "OpenLiteSpeed base configurado"
}

# ================================================================
# FASE 3: INSTALACIÓN PM2 PARA NODE.JS
# ================================================================

install_pm2() {
    log_section "INSTALACIÓN PM2 PROCESS MANAGER"
    
    log_info "Node.js ya está disponible en esta imagen"
    node --version
    npm --version
    
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
# FASE 4: CONFIGURACIÓN FIREWALL Y SEGURIDAD
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
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    ufw allow 7080/tcp  # OpenLiteSpeed Admin
    ufw allow $API_PORT/tcp  # API Node.js
    
    # Habilitar firewall
    ufw --force enable
    
    log_info "Configurando fail2ban..."
    
    # Configurar fail2ban
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
# FASE 5: DEPLOYMENT DE LA API
# ================================================================

deploy_api() {
    log_section "DEPLOYMENT DE LA API CEP COMUNICACIÓN"
    
    log_info "Clonando repositorio en $API_DIR..."
    cd $API_DIR
    git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV.git .
    
    log_info "Instalando dependencias de producción..."
    npm install --production --no-audit --no-fund
    
    log_info "Configurando variables de entorno..."
    if [ -f ".env.production" ]; then
        cp .env.production .env
        log_success "Variables de entorno configuradas desde .env.production"
    else
        log_warning "Creando archivo .env básico..."
        cat > .env << EOF
NODE_ENV=production
PORT=$API_PORT
GMAIL_EMAIL=agency.solaria@gmail.com
GMAIL_APP_PASSWORD=kmmu kipu tmvt kpaz
EOF
    fi
    
    log_info "Configurando permisos..."
    chown -R lsadm:lsadm $API_DIR
    chmod -R 755 $API_DIR
    
    log_success "API deployada en $API_DIR"
}

# ================================================================
# FASE 6: CONFIGURACIÓN PM2 PARA PRODUCCIÓN
# ================================================================

setup_pm2_production() {
    log_section "CONFIGURACIÓN PM2 PARA PRODUCCIÓN"
    
    cd $API_DIR
    
    log_info "Creando configuración PM2 optimizada para OpenLiteSpeed..."
    
    # Crear ecosystem.config.js específico para OpenLiteSpeed
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'cep-api',
    script: './server-production.js',
    instances: 1,
    exec_mode: 'fork',
    env_production: {
      NODE_ENV: 'production',
      PORT: $API_PORT
    },
    log_file: '/var/log/pm2/cep-api-combined.log',
    out_file: '/var/log/pm2/cep-api-out.log',
    error_file: '/var/log/pm2/cep-api-error.log',
    max_memory_restart: '256M',
    node_args: '--max-old-space-size=256',
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    restart_delay: 4000
  }]
};
EOF
    
    log_info "Iniciando aplicación con PM2..."
    
    # Verificar si ya existe
    if pm2 list | grep -q "cep-api"; then
        log_info "Reiniciando aplicación existente..."
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
# FASE 7: CONFIGURACIÓN SSL
# ================================================================

setup_ssl() {
    log_section "CONFIGURACIÓN SSL"
    
    log_info "SSL se configurará via OpenLiteSpeed WebAdmin"
    log_warning "Pasos manuales requeridos:"
    log_info "1. Acceder a WebAdmin: http://$VPS_IP:$LSWS_PORT"
    log_info "2. Listeners → SSL → Configurar certificado"
    log_info "3. O usar Let's Encrypt integration de OpenLiteSpeed"
    
    # Instalar certbot como backup
    log_info "Instalando Certbot como backup..."
    apt install -y certbot
    
    log_success "SSL tools preparados"
}

# ================================================================
# FASE 8: VERIFICACIÓN
# ================================================================

verify_installation() {
    log_section "VERIFICACIÓN DE INSTALACIÓN"
    
    log_info "Verificando servicios..."
    
    # Verificar OpenLiteSpeed
    if systemctl is-active --quiet lsws; then
        log_success "OpenLiteSpeed está activo"
    else
        log_error "OpenLiteSpeed NO está activo"
    fi
    
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
    
    log_success "Verificación básica completada"
}

# ================================================================
# INFORMACIÓN FINAL
# ================================================================

show_final_info() {
    log_section "CONFIGURACIÓN OPENLITESPEED COMPLETADA"
    
    echo -e "${GREEN}"
    echo "================================================================"
    echo "🚀 VPS OPENLITESPEED CONFIGURADO"
    echo "================================================================"
    echo -e "${NC}"
    
    echo -e "${BLUE}📊 INFORMACIÓN DEL SERVIDOR:${NC}"
    echo "   🌐 IP: $VPS_IP"
    echo "   🔗 Dominio: $DOMAIN"
    echo "   📡 API Puerto: $API_PORT"
    echo "   🔧 OpenLiteSpeed Admin: http://$VPS_IP:$LSWS_PORT"
    echo "   📁 Directorio API: $API_DIR"
    
    echo
    echo -e "${BLUE}🔍 ENDPOINTS:${NC}"
    echo "   Health Check: http://$VPS_IP:$API_PORT/health"
    echo "   API Principal: http://$VPS_IP:$API_PORT/api/formsubmit-proxy"
    
    echo
    echo -e "${BLUE}⚠️  CONFIGURACIÓN MANUAL REQUERIDA:${NC}"
    echo "   1. Acceder a WebAdmin: http://$VPS_IP:$LSWS_PORT"
    echo "   2. Usuario: admin / Contraseña: [generada automáticamente]"
    echo "   3. Configurar Virtual Host para $DOMAIN"
    echo "   4. Configurar SSL/TLS"
    echo "   5. Configurar proxy para puerto $API_PORT"
    
    echo
    echo -e "${BLUE}📋 COMANDOS ÚTILES:${NC}"
    echo "   pm2 status           - Estado de procesos"
    echo "   pm2 logs cep-api     - Ver logs"
    echo "   systemctl status lsws - Estado OpenLiteSpeed"
    echo "   /usr/local/lsws/bin/lshttpd -t - Test config"
    
    echo
    echo -e "${YELLOW}📝 PRÓXIMOS PASOS CRÍTICOS:${NC}"
    echo "   1. Configurar Virtual Host en WebAdmin"
    echo "   2. Configurar SSL certificates"  
    echo "   3. Configurar proxy reverso para la API"
    echo "   4. Test completo del stack"
    
    echo
    echo -e "${PURPLE}🚀 OpenLiteSpeed + Node.js configurado!${NC}"
}

# ================================================================
# FUNCIÓN PRINCIPAL
# ================================================================

main() {
    echo
    echo -e "${PURPLE}================================================================${NC}"
    echo -e "${PURPLE}🚀 VPS OPENLITESPEED SETUP - CEP COMUNICACIÓN${NC}"
    echo -e "${PURPLE}   Ubuntu 24.04 + OpenLiteSpeed + Node.js${NC}"
    echo -e "${PURPLE}================================================================${NC}"
    echo
    
    # Verificar que somos root
    if [[ $EUID -ne 0 ]]; then
        log_error "Este script debe ejecutarse como root"
        exit 1
    fi
    
    # Ejecutar todas las fases
    setup_system_base
    configure_openlitespeed
    install_pm2
    setup_firewall
    deploy_api
    setup_pm2_production
    setup_ssl
    verify_installation
    show_final_info
    
    log_success "Configuración OpenLiteSpeed finalizada"
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