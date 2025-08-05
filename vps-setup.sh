#!/bin/bash

# ================================================================
# SCRIPT DE CONFIGURACIÓN VPS HOSTINGER PARA CEPCOMUNICACION.COM
# Automatiza la instalación completa del backend NodeMailer
# ================================================================

echo "🚀 Iniciando configuración VPS Hostinger..."
echo "================================================"

# Actualizar sistema
echo "📦 Actualizando sistema Ubuntu..."
apt update && apt upgrade -y

# Instalar Node.js 18 LTS
echo "📦 Instalando Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verificar instalación
echo "✅ Verificando instalación Node.js..."
node --version
npm --version

# Instalar PM2 para gestión de procesos
echo "📦 Instalando PM2..."
npm install -g pm2

# Instalar Nginx como reverse proxy
echo "📦 Instalando Nginx..."
apt install -y nginx

# Configurar firewall
echo "🔒 Configurando firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Crear usuario para la aplicación
echo "👤 Creando usuario cepapp..."
adduser --disabled-password --gecos "" cepapp
usermod -aG sudo cepapp

# Crear directorio para la aplicación
echo "📁 Creando estructura de directorios..."
mkdir -p /var/www/cepapi
chown -R cepapp:cepapp /var/www/cepapi

echo "✅ Configuración base completada!"
echo "================================================"
echo "Próximos pasos:"
echo "1. Conectar vía SSH como usuario cepapp"
echo "2. Clonar repositorio en /var/www/cepapi"
echo "3. Configurar variables de entorno"
echo "4. Configurar Nginx reverse proxy"
echo "5. Iniciar aplicación con PM2"