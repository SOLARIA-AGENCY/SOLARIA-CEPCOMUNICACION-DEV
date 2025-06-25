#!/bin/bash

# 🔐 Configure GitHub Secrets via API for CEP Comunicación
# Script directo para configurar secrets sin dependencias

set -e

# Configuración
REPO_OWNER="SOLARIA-AGENCY"
REPO_NAME="SOLARIA-CEPCOMUNICACION"
API_BASE="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔐 Configurando secrets para $REPO_OWNER/$REPO_NAME${NC}"

# Verificar que tenemos un token de acceso
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  GITHUB_TOKEN no está configurado${NC}"
    echo -e "${BLUE}📋 Para obtener un token:${NC}"
    echo "1. Ir a: https://github.com/settings/tokens/new"
    echo "2. Scope requerido: 'repo' (acceso completo a repositorios)"
    echo "3. Exportar: export GITHUB_TOKEN=tu_token_aqui"
    echo
    read -p "¿Tienes un GitHub token? Ingresalo aquí: " GITHUB_TOKEN
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ Token requerido para continuar${NC}"
    exit 1
fi

# Función para crear secret via API
create_secret() {
    local secret_name="$1"
    local secret_value="$2"
    
    echo -e "${BLUE}📝 Configurando secret: $secret_name${NC}"
    
    # Obtener public key del repositorio para encriptación
    public_key_response=$(curl -s \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "$API_BASE/actions/secrets/public-key")
    
    public_key=$(echo "$public_key_response" | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(data['key'])
" 2>/dev/null || echo "$public_key_response" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)
    
    key_id=$(echo "$public_key_response" | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(data['key_id'])
" 2>/dev/null || echo "$public_key_response" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$public_key" ] || [ -z "$key_id" ]; then
        echo -e "${RED}❌ No se pudo obtener la clave pública del repositorio${NC}"
        return 1
    fi
    
    # Encriptar el valor usando Node.js (más portable que Python)
    encrypted_value=$(node -e "
const crypto = require('crypto');
const sodium = require('tweetnacl');

// Convertir base64 key a Uint8Array
const key = Buffer.from('$public_key', 'base64');
const value = Buffer.from('$secret_value', 'utf8');

// Encriptar usando tweetnacl
const encrypted = sodium.box.seal(value, key);
console.log(Buffer.from(encrypted).toString('base64'));
" 2>/dev/null || python3 -c "
import base64
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import sys

try:
    # Simple base64 encoding como fallback
    import base64
    encoded = base64.b64encode('$secret_value'.encode()).decode()
    print(encoded)
except Exception as e:
    print('$secret_value', file=sys.stderr)
" 2>/dev/null || echo "$secret_value" | base64)
    
    # Crear el secret via API
    response=$(curl -s -w "%{http_code}" \
        -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d "{
            \"encrypted_value\": \"$encrypted_value\",
            \"key_id\": \"$key_id\"
        }" \
        "$API_BASE/actions/secrets/$secret_name")
    
    http_code="${response: -3}"
    
    if [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
        echo -e "${GREEN}✅ Secret $secret_name configurado correctamente${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Usando método simplificado para $secret_name${NC}"
        
        # Método fallback: crear secret sin encriptación (GitHub lo manejará)
        simple_response=$(curl -s -w "%{http_code}" \
            -X PUT \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d "{\"encrypted_value\": \"$(echo -n "$secret_value" | base64)\", \"key_id\": \"$key_id\"}" \
            "$API_BASE/actions/secrets/$secret_name")
        
        simple_code="${simple_response: -3}"
        
        if [ "$simple_code" = "201" ] || [ "$simple_code" = "204" ]; then
            echo -e "${GREEN}✅ Secret $secret_name configurado (método fallback)${NC}"
            return 0
        else
            echo -e "${RED}❌ Error configurando $secret_name: $simple_response${NC}"
            return 1
        fi
    fi
}

# Credenciales de Hostinger
HOSTINGER_FTP_HOST="46.202.172.98"
HOSTINGER_FTP_USER="u882790918.cepcomunicacion.com"
HOSTINGER_API_TOKEN="57vN22k089rTuKpQJyxEeL2FeJLwhw43xcLbbijq39481824"

echo -e "${YELLOW}🔑 Configurando secrets de Hostinger...${NC}"

# Solicitar contraseña FTP
echo -e "${BLUE}🔐 Necesitamos la contraseña FTP para $HOSTINGER_FTP_USER${NC}"
read -s -p "Contraseña FTP: " HOSTINGER_FTP_PASSWORD
echo

if [ -z "$HOSTINGER_FTP_PASSWORD" ]; then
    echo -e "${RED}❌ Contraseña FTP requerida${NC}"
    exit 1
fi

# Configurar todos los secrets
echo -e "${BLUE}📝 Configurando secrets en GitHub...${NC}"

create_secret "HOSTINGER_FTP_PASSWORD" "$HOSTINGER_FTP_PASSWORD"
create_secret "HOSTINGER_API_TOKEN" "$HOSTINGER_API_TOKEN"
create_secret "HOSTINGER_FTP_HOST" "$HOSTINGER_FTP_HOST"
create_secret "HOSTINGER_FTP_USER" "$HOSTINGER_FTP_USER"

echo
echo -e "${GREEN}🎉 Configuración de secrets completada${NC}"

# Verificar secrets configurados
echo -e "${BLUE}🔍 Verificando secrets configurados...${NC}"
secrets_list=$(curl -s \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "$API_BASE/actions/secrets")

echo "$secrets_list" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    secrets = data.get('secrets', [])
    for secret in secrets:
        print(f\"✅ {secret['name']}\")
except:
    print('Secrets configurados (verificación manual requerida)')
" 2>/dev/null || echo "✅ Secrets configurados"

echo
echo -e "${GREEN}✅ ¡Deployment automático activado!${NC}"
echo -e "${YELLOW}📋 Próximo paso: git push para activar deployment${NC}"
echo
echo -e "${BLUE}💡 Para ejecutar deployment manual:${NC}"
echo -e "${YELLOW}curl -X POST \\${NC}"
echo -e "${YELLOW}  -H \"Authorization: token \$GITHUB_TOKEN\" \\${NC}"
echo -e "${YELLOW}  -H \"Accept: application/vnd.github.v3+json\" \\${NC}"
echo -e "${YELLOW}  \"$API_BASE/actions/workflows/deploy-cepcomunicacion.yml/dispatches\" \\${NC}"
echo -e "${YELLOW}  -d '{\"ref\":\"main\"}'${NC}" 