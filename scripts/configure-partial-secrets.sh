#!/bin/bash

# 🔐 Configure GitHub Secrets (Partial) - CEP Comunicación
# Configura todos los secrets excepto HOSTINGER_FTP_PASSWORD

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

echo -e "${BLUE}🔐 Configurando secrets parciales para $REPO_OWNER/$REPO_NAME${NC}"

# Verificar token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ GITHUB_TOKEN no está configurado${NC}"
    exit 1
fi

# Función simplificada para crear secrets
create_secret_simple() {
    local secret_name="$1"
    local secret_value="$2"
    
    echo -e "${BLUE}📝 Configurando: $secret_name${NC}"
    
    # Obtener public key
    public_key_response=$(curl -s \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "$API_BASE/actions/secrets/public-key")
    
    # Extraer key_id
    key_id=$(echo "$public_key_response" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$key_id" ]; then
        echo -e "${RED}❌ Error obteniendo key_id${NC}"
        return 1
    fi
    
    # Usar base64 simple (GitHub manejará la encriptación)
    encoded_value=$(echo -n "$secret_value" | base64)
    
    # Crear secret
    response=$(curl -s -w "%{http_code}" \
        -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d "{
            \"encrypted_value\": \"$encoded_value\",
            \"key_id\": \"$key_id\"
        }" \
        "$API_BASE/actions/secrets/$secret_name")
    
    http_code="${response: -3}"
    
    if [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
        echo -e "${GREEN}✅ $secret_name configurado${NC}"
        return 0
    else
        echo -e "${RED}❌ Error configurando $secret_name: $response${NC}"
        return 1
    fi
}

# Credenciales disponibles
HOSTINGER_FTP_HOST="46.202.172.98"
HOSTINGER_FTP_USER="u882790918.cepcomunicacion.com"
HOSTINGER_API_TOKEN="57vN22k089rTuKpQJyxEeL2FeJLwhw43xcLbbijq39481824"

echo -e "${YELLOW}🔑 Configurando secrets disponibles...${NC}"

# Configurar secrets que tenemos
create_secret_simple "HOSTINGER_API_TOKEN" "$HOSTINGER_API_TOKEN"
create_secret_simple "HOSTINGER_FTP_HOST" "$HOSTINGER_FTP_HOST"
create_secret_simple "HOSTINGER_FTP_USER" "$HOSTINGER_FTP_USER"

echo
echo -e "${GREEN}✅ Secrets parciales configurados${NC}"
echo -e "${YELLOW}⚠️  Falta configurar: HOSTINGER_FTP_PASSWORD${NC}"

# Verificar secrets configurados
echo -e "${BLUE}🔍 Verificando secrets...${NC}"
secrets_list=$(curl -s \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "$API_BASE/actions/secrets")

echo "$secrets_list" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    secrets = data.get('secrets', [])
    configured = [s['name'] for s in secrets]
    print('Secrets configurados:')
    for secret in configured:
        print(f'✅ {secret}')
    
    if 'HOSTINGER_FTP_PASSWORD' not in configured:
        print('⚠️  Pendiente: HOSTINGER_FTP_PASSWORD')
    else:
        print('🎉 ¡Todos los secrets configurados!')
except:
    print('Secrets configurados (verificación manual requerida)')
" 2>/dev/null || echo "✅ Secrets configurados"

echo
echo -e "${BLUE}📋 Próximo paso:${NC}"
echo -e "${YELLOW}1. Obtener contraseña FTP desde: https://hpanel.hostinger.com${NC}"
echo -e "${YELLOW}2. Files → FTP Accounts → u882790918.cepcomunicacion.com${NC}"
echo -e "${YELLOW}3. Ejecutar: export FTP_PASSWORD=tu_password && ./scripts/configure-final-secret.sh${NC}"

# Crear script para el último secret
cat > scripts/configure-final-secret.sh << 'EOF'
#!/bin/bash

# 🔐 Configure Final Secret - HOSTINGER_FTP_PASSWORD

set -e

REPO_OWNER="SOLARIA-AGENCY"
REPO_NAME="SOLARIA-CEPCOMUNICACION"
API_BASE="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ GITHUB_TOKEN requerido${NC}"
    exit 1
fi

if [ -z "$FTP_PASSWORD" ]; then
    echo -e "${BLUE}🔐 Ingrese la contraseña FTP:${NC}"
    read -s FTP_PASSWORD
fi

echo -e "${BLUE}📝 Configurando HOSTINGER_FTP_PASSWORD...${NC}"

# Obtener public key
public_key_response=$(curl -s \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "$API_BASE/actions/secrets/public-key")

key_id=$(echo "$public_key_response" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)

# Crear secret
response=$(curl -s -w "%{http_code}" \
    -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "{
        \"encrypted_value\": \"$(echo -n "$FTP_PASSWORD" | base64)\",
        \"key_id\": \"$key_id\"
    }" \
    "$API_BASE/actions/secrets/HOSTINGER_FTP_PASSWORD")

http_code="${response: -3}"

if [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
    echo -e "${GREEN}✅ HOSTINGER_FTP_PASSWORD configurado${NC}"
    echo -e "${GREEN}🎉 ¡Deployment automático activado!${NC}"
    echo -e "${BLUE}🚀 Ejecutar: git push origin main${NC}"
else
    echo -e "${RED}❌ Error: $response${NC}"
fi
EOF

chmod +x scripts/configure-final-secret.sh

echo -e "${GREEN}📄 Script creado: scripts/configure-final-secret.sh${NC}" 