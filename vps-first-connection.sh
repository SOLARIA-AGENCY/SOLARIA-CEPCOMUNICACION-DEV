#!/bin/bash

# ================================================================
# PRIMERA CONEXIÓN Y CONFIGURACIÓN VPS HOSTINGER
# Script para ejecutar en el VPS la primera vez
# ================================================================

echo "🚀 Configuración inicial VPS Hostinger - CEP Comunicación"
echo "========================================================"

# Actualizar sistema primero
echo "📦 Actualizando sistema Ubuntu..."
apt update && apt upgrade -y

echo "🔐 Configurando acceso SSH sin contraseña..."

# Crear directorio .ssh si no existe
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# La clave pública se agregará manualmente
echo "📋 Configuración SSH preparada"

# Configurar firewall básico
echo "🔒 Configurando firewall UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3001/tcp  # Para la API
ufw --force enable

echo "🔧 Instalando software base..."

# Instalar herramientas básicas
apt install -y curl wget git unzip nano htop

# Instalar Node.js 18 LTS
echo "📦 Instalando Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verificar instalación Node.js
echo "✅ Verificando Node.js..."
node --version
npm --version

# Instalar PM2 globalmente
echo "📦 Instalando PM2..."
npm install -g pm2

# Instalar Nginx
echo "📦 Instalando Nginx..."
apt install -y nginx

# Crear usuario para la aplicación
echo "👤 Creando usuario cepapp..."
adduser --disabled-password --gecos "CEP Application User" cepapp
usermod -aG sudo cepapp

# Crear estructura de directorios
echo "📁 Creando estructura de directorios..."
mkdir -p /var/www/cepapi
mkdir -p /var/log/cepapi
mkdir -p /var/log/pm2

# Establecer permisos
chown -R cepapp:cepapp /var/www/cepapi
chown -R cepapp:cepapp /var/log/cepapi
chown -R cepapp:cepapp /var/log/pm2

# Configurar Git globalmente
echo "📝 Configurando Git..."
git config --global user.name "CEP VPS Server"
git config --global user.email "agency.solaria@gmail.com"
git config --global init.defaultBranch main

echo ""
echo "✅ CONFIGURACIÓN INICIAL COMPLETADA"
echo "========================================"
echo "📊 Resumen de lo instalado:"
echo "  - Ubuntu actualizado"
echo "  - Node.js $(node --version)"
echo "  - NPM $(npm --version)" 
echo "  - PM2 $(pm2 --version)"
echo "  - Nginx $(nginx -v 2>&1)"
echo "  - Usuario cepapp creado"
echo "  - Firewall UFW configurado"
echo "  - Directorios de aplicación creados"
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Configurar clave SSH"
echo "  2. Configurar DNS para server.cepcomunicacion.com"
echo "  3. Clonar repositorio de la aplicación"
echo "  4. Configurar Nginx reverse proxy"
echo "  5. Desplegar aplicación con PM2"
echo ""