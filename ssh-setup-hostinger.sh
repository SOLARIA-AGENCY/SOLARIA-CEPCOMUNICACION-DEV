#!/bin/bash

# ================================================================
# CONFIGURACIÓN SSH PARA VPS HOSTINGER - CEPCOMUNICACION.COM
# Automatiza la configuración segura de acceso SSH
# ================================================================

VPS_IP="148.230.118.124"
VPS_USER="root"
SSH_KEY_PATH="$HOME/.ssh/hostinger_cep_vps"

echo "🔐 Configurando acceso SSH para VPS Hostinger..."
echo "================================================"

# Verificar que la clave existe
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "❌ Clave SSH no encontrada en $SSH_KEY_PATH"
    exit 1
fi

echo "✅ Clave SSH encontrada"
echo "📡 Conectando a VPS: $VPS_IP"

# Mostrar la clave pública para copiar
echo ""
echo "🔑 CLAVE PÚBLICA SSH (copia esta línea completa):"
echo "================================================"
cat ${SSH_KEY_PATH}.pub
echo "================================================"
echo ""

echo "📋 INSTRUCCIONES:"
echo "1. Copia la clave pública de arriba (línea completa)"
echo "2. La configuraremos en el VPS en el siguiente paso"
echo ""

# Crear configuración SSH local
echo "⚙️  Configurando SSH config local..."
cat >> ~/.ssh/config << EOF

# Hostinger VPS - CEP Comunicación
Host cep-vps
    HostName $VPS_IP
    User $VPS_USER
    IdentityFile $SSH_KEY_PATH
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 3

EOF

echo "✅ Configuración SSH local creada"
echo "🚀 Ahora puedes conectar con: ssh cep-vps"
echo ""
echo "⚠️  IMPORTANTE: Aún necesitas configurar la clave en el servidor"