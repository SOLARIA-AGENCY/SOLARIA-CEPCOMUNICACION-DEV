#!/bin/bash

# ================================================================
# SCRIPT DEPLOYMENT API CEP COMUNICACIÓN - VPS HOSTINGER
# Ejecutar en el VPS para deployar/actualizar la API NodeMailer
# ================================================================

set -e  # Salir si algún comando falla

VPS_IP="148.230.118.124"
API_DIR="/var/www/cep-api"
PM2_APP_NAME="cep-api"

echo "🚀 Iniciando deployment API CEP Comunicación..."
echo "📍 VPS: $VPS_IP"
echo "📁 Directorio: $API_DIR"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# ================================================================
# VERIFICAR PRERREQUISITOS
# ================================================================

check_prerequisites() {
    log_info "Verificando prerrequisitos..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js no está instalado"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    log_success "Node.js: $NODE_VERSION"
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        log_error "npm no está instalado"
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    log_success "npm: $NPM_VERSION"
    
    # Verificar PM2
    if ! command -v pm2 &> /dev/null; then
        log_warning "PM2 no está instalado, instalando..."
        npm install -g pm2
    fi
    
    PM2_VERSION=$(pm2 --version)
    log_success "PM2: $PM2_VERSION"
    
    # Verificar git
    if ! command -v git &> /dev/null; then
        log_error "Git no está instalado"
        exit 1
    fi
    
    log_success "Todos los prerrequisitos están disponibles"
}

# ================================================================
# PREPARAR DIRECTORIO
# ================================================================

prepare_directory() {
    log_info "Preparando directorio de la aplicación..."
    
    # Crear directorio si no existe
    if [ ! -d "$API_DIR" ]; then
        log_info "Creando directorio $API_DIR"
        sudo mkdir -p $API_DIR
        sudo chown $USER:$USER $API_DIR
    fi
    
    log_success "Directorio preparado: $API_DIR"
}

# ================================================================
# DESCARGAR/ACTUALIZAR CÓDIGO
# ================================================================

deploy_code() {
    log_info "Deployando código desde GitHub..."
    
    cd $API_DIR
    
    if [ -d ".git" ]; then
        log_info "Actualizando código existente..."
        git pull origin main
    else
        log_info "Clonando repositorio por primera vez..."
        git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV.git .
    fi
    
    log_success "Código actualizado"
}

# ================================================================
# INSTALAR DEPENDENCIAS
# ================================================================

install_dependencies() {
    log_info "Instalando dependencias Node.js..."
    
    cd $API_DIR
    
    # Instalar dependencias de producción
    npm install --production --no-audit --no-fund
    
    log_success "Dependencias instaladas"
}

# ================================================================
# CONFIGURAR VARIABLES DE ENTORNO
# ================================================================

setup_environment() {
    log_info "Configurando variables de entorno..."
    
    cd $API_DIR
    
    # Verificar si existe .env
    if [ ! -f ".env" ]; then
        log_warning "Archivo .env no existe, creando desde .env.production"
        if [ -f ".env.production" ]; then
            cp .env.production .env
        else
            log_error "No se encuentra archivo de configuración de entorno"
            exit 1
        fi
    fi
    
    log_success "Variables de entorno configuradas"
}

# ================================================================
# CONFIGURAR FIREWALL/PUERTOS
# ================================================================

configure_firewall() {
    log_info "Configurando firewall para puerto 3001..."
    
    # Verificar si ufw está instalado y activo
    if command -v ufw &> /dev/null; then
        sudo ufw allow 3001/tcp
        log_success "Puerto 3001 permitido en firewall"
    else
        log_warning "UFW no está disponible, omitiendo configuración de firewall"
    fi
}

# ================================================================
# DEPLOYAR CON PM2
# ================================================================

deploy_with_pm2() {
    log_info "Deployando aplicación con PM2..."
    
    cd $API_DIR
    
    # Verificar si ya existe la app en PM2
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        log_info "Aplicación existente encontrada, recargando..."
        pm2 reload ecosystem.config.js --env production
    else
        log_info "Aplicación nueva, iniciando..."
        pm2 start ecosystem.config.js --env production
    fi
    
    # Configurar PM2 para iniciar automáticamente
    pm2 startup
    pm2 save
    
    log_success "Aplicación deployada con PM2"
}

# ================================================================
# VERIFICAR DEPLOYMENT
# ================================================================

verify_deployment() {
    log_info "Verificando deployment..."
    
    # Esperar un momento para que la aplicación inicie
    sleep 5
    
    # Verificar status PM2
    pm2 status | grep "$PM2_APP_NAME"
    
    # Verificar health endpoint
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log_success "API respondiendo correctamente en puerto 3001"
    else
        log_error "API no está respondiendo en puerto 3001"
        pm2 logs $PM2_APP_NAME --lines 10
        exit 1
    fi
    
    log_success "Deployment verificado correctamente"
}

# ================================================================
# CONFIGURAR NGINX (OPCIONAL)
# ================================================================

setup_nginx_reverse_proxy() {
    log_info "Configurando proxy reverso con Nginx..."
    
    if command -v nginx &> /dev/null; then
        # Crear configuración Nginx
        sudo tee /etc/nginx/sites-available/cep-api > /dev/null <<EOF
server {
    listen 80;
    server_name api.cepcomunicacion.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
        
        # Activar sitio
        sudo ln -sf /etc/nginx/sites-available/cep-api /etc/nginx/sites-enabled/
        
        # Verificar configuración y recargar
        sudo nginx -t && sudo systemctl reload nginx
        
        log_success "Nginx configurado como proxy reverso"
    else
        log_warning "Nginx no está instalado, omitiendo configuración de proxy"
    fi
}

# ================================================================
# FUNCIÓN PRINCIPAL
# ================================================================

main() {
    echo
    echo "================================================================"
    echo "🚀 DEPLOYMENT API CEP COMUNICACIÓN - VPS HOSTINGER"
    echo "================================================================"
    echo
    
    check_prerequisites
    prepare_directory
    deploy_code
    install_dependencies
    setup_environment
    configure_firewall
    deploy_with_pm2
    verify_deployment
    setup_nginx_reverse_proxy
    
    echo
    echo "================================================================"
    echo "🎉 DEPLOYMENT COMPLETADO EXITOSAMENTE"
    echo "================================================================"
    echo
    log_success "API CEP Comunicación deployada en: http://$VPS_IP:3001"
    log_success "Health check: http://$VPS_IP:3001/health"
    log_success "Endpoint principal: http://$VPS_IP:3001/api/formsubmit-proxy"
    echo
    echo "📋 Comandos útiles:"
    echo "   pm2 status           - Ver estado de procesos"
    echo "   pm2 logs $PM2_APP_NAME    - Ver logs de la aplicación"
    echo "   pm2 restart $PM2_APP_NAME - Reiniciar aplicación"
    echo "   pm2 stop $PM2_APP_NAME    - Detener aplicación"
    echo
}

# ================================================================
# EJECUTAR SCRIPT
# ================================================================

# Verificar si se ejecuta con sudo para tareas que lo requieran
if [[ $EUID -ne 0 ]] && [[ "$1" != "--no-sudo-check" ]]; then
    log_warning "Algunas tareas requieren privilegios sudo"
    log_info "El script solicitará sudo cuando sea necesario"
fi

main "$@"