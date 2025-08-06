#!/bin/bash

# ================================================================
# CONSULTA API HOSTINGER PARA OBTENER CREDENCIALES FTP
# ================================================================

set -e

# Token API de Hostinger
API_TOKEN="57vN22k089rTuKpQJyxEeL2FeJLwhw43xcLbbijq39481824"
BASE_URL="https://api.hostinger.com"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Consultando API de Hostinger...${NC}"

# Función para hacer requests API
api_request() {
    local endpoint="$1"
    local method="${2:-GET}"
    
    echo -e "${YELLOW}📡 Consultando: $endpoint${NC}"
    
    curl -s -X "$method" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        "$BASE_URL$endpoint" || echo "API_ERROR"
}

# Intentar diferentes endpoints
echo -e "${BLUE}🔍 Intentando diferentes endpoints de la API...${NC}"

# Endpoint 1: Websites
echo -e "\n${YELLOW}1. Consultando websites...${NC}"
response1=$(api_request "/v1/websites")
echo "Response: $response1"

# Endpoint 2: Domains
echo -e "\n${YELLOW}2. Consultando dominios...${NC}"
response2=$(api_request "/v1/domains")
echo "Response: $response2"

# Endpoint 3: Hosting accounts
echo -e "\n${YELLOW}3. Consultando cuentas hosting...${NC}"
response3=$(api_request "/v1/hosting")
echo "Response: $response3"

# Endpoint 4: FTP accounts (si existe)
echo -e "\n${YELLOW}4. Consultando cuentas FTP...${NC}"
response4=$(api_request "/v1/ftp")
echo "Response: $response4"

# Endpoint alternativo
echo -e "\n${YELLOW}5. Consultando información general...${NC}"
response5=$(api_request "/v1/account")
echo "Response: $response5"

echo -e "\n${GREEN}✅ Consulta API completada${NC}"