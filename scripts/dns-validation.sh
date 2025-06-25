#!/bin/bash

# 🌐 DNS Validation Script for cepcomunicacion.com
# Verifica y valida la configuración DNS completa

set -e

# Configuración
DOMAIN="cepcomunicacion.com"
EXPECTED_IP="46.202.172.98"
TARGET_HOST="www.cepcomunicacion.com"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${BLUE}🌐 Validación DNS para $DOMAIN${NC}"
echo "=================================================="

# Función para verificar comando
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 no está instalado${NC}"
        return 1
    fi
    return 0
}

# Verificar herramientas necesarias
echo -e "${YELLOW}🔍 Verificando herramientas...${NC}"
TOOLS_OK=true

if ! check_command "dig"; then
    echo -e "${YELLOW}💡 Instalar con: brew install bind${NC}"
    TOOLS_OK=false
fi

if ! check_command "nslookup"; then
    echo -e "${YELLOW}💡 nslookup debería estar disponible por defecto${NC}"
    TOOLS_OK=false
fi

if ! check_command "curl"; then
    echo -e "${YELLOW}💡 curl debería estar disponible por defecto${NC}"
    TOOLS_OK=false
fi

if [ "$TOOLS_OK" = false ]; then
    echo -e "${RED}❌ Faltan herramientas necesarias${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Todas las herramientas están disponibles${NC}"
echo

# 1. Verificar registro A principal
echo -e "${BLUE}1. 🔍 Verificando registro A de $DOMAIN${NC}"
A_RECORD=$(dig +short A $DOMAIN | head -1)

if [ -z "$A_RECORD" ]; then
    echo -e "${RED}❌ No se encontró registro A${NC}"
    A_STATUS="ERROR"
else
    echo -e "${GREEN}📍 Registro A: $A_RECORD${NC}"
    if [ "$A_RECORD" = "$EXPECTED_IP" ]; then
        echo -e "${GREEN}✅ IP correcta${NC}"
        A_STATUS="OK"
    else
        echo -e "${YELLOW}⚠️  IP inesperada (esperada: $EXPECTED_IP)${NC}"
        A_STATUS="WARNING"
    fi
fi

echo

# 2. Verificar registro CNAME para www
echo -e "${BLUE}2. 🔍 Verificando registro CNAME para www.$DOMAIN${NC}"
WWW_RECORD=$(dig +short CNAME www.$DOMAIN)

if [ -z "$WWW_RECORD" ]; then
    # Verificar si www tiene un registro A directo
    WWW_A_RECORD=$(dig +short A www.$DOMAIN)
    if [ -z "$WWW_A_RECORD" ]; then
        echo -e "${RED}❌ No se encontró registro CNAME ni A para www${NC}"
        WWW_STATUS="ERROR"
    else
        echo -e "${YELLOW}⚠️  www tiene registro A directo: $WWW_A_RECORD${NC}"
        if [ "$WWW_A_RECORD" = "$EXPECTED_IP" ]; then
            echo -e "${GREEN}✅ IP de www correcta${NC}"
            WWW_STATUS="OK"
        else
            echo -e "${YELLOW}⚠️  IP de www inesperada${NC}"
            WWW_STATUS="WARNING"
        fi
    fi
else
    echo -e "${GREEN}📍 CNAME www: $WWW_RECORD${NC}"
    if [ "$WWW_RECORD" = "$DOMAIN." ] || [ "$WWW_RECORD" = "$DOMAIN" ]; then
        echo -e "${GREEN}✅ CNAME correcto${NC}"
        WWW_STATUS="OK"
    else
        echo -e "${YELLOW}⚠️  CNAME inesperado${NC}"
        WWW_STATUS="WARNING"
    fi
fi

echo

# 3. Verificar nameservers
echo -e "${BLUE}3. 🔍 Verificando nameservers${NC}"
NAMESERVERS=$(dig +short NS $DOMAIN)

if [ -z "$NAMESERVERS" ]; then
    echo -e "${RED}❌ No se encontraron nameservers${NC}"
    NS_STATUS="ERROR"
else
    echo -e "${GREEN}📍 Nameservers:${NC}"
    echo "$NAMESERVERS" | while read ns; do
        echo -e "${GREEN}  - $ns${NC}"
    done
    
    # Verificar si son de Hostinger
    if echo "$NAMESERVERS" | grep -q "dns-parking.com"; then
        echo -e "${GREEN}✅ Nameservers de Hostinger detectados${NC}"
        NS_STATUS="OK"
    else
        echo -e "${YELLOW}⚠️  Nameservers no reconocidos como de Hostinger${NC}"
        NS_STATUS="WARNING"
    fi
fi

echo

# 4. Verificar registros MX (email)
echo -e "${BLUE}4. 📧 Verificando registros MX${NC}"
MX_RECORDS=$(dig +short MX $DOMAIN)

if [ -z "$MX_RECORDS" ]; then
    echo -e "${YELLOW}⚠️  No se encontraron registros MX${NC}"
    MX_STATUS="WARNING"
else
    echo -e "${GREEN}📍 Registros MX:${NC}"
    echo "$MX_RECORDS" | while read mx; do
        echo -e "${GREEN}  - $mx${NC}"
    done
    echo -e "${GREEN}✅ Email configurado${NC}"
    MX_STATUS="OK"
fi

echo

# 5. Verificar propagación DNS global
echo -e "${BLUE}5. 🌍 Verificando propagación DNS global${NC}"

# Servidores DNS para verificar
DNS_SERVERS=(
    "8.8.8.8"          # Google
    "1.1.1.1"          # Cloudflare
    "208.67.222.222"   # OpenDNS
    "9.9.9.9"          # Quad9
)

PROPAGATION_OK=true

for dns in "${DNS_SERVERS[@]}"; do
    result=$(dig @$dns +short A $DOMAIN 2>/dev/null | head -1)
    if [ "$result" = "$EXPECTED_IP" ]; then
        echo -e "${GREEN}✅ $dns: $result${NC}"
    else
        echo -e "${RED}❌ $dns: $result (esperado: $EXPECTED_IP)${NC}"
        PROPAGATION_OK=false
    fi
done

if [ "$PROPAGATION_OK" = true ]; then
    PROPAGATION_STATUS="OK"
    echo -e "${GREEN}✅ Propagación DNS global correcta${NC}"
else
    PROPAGATION_STATUS="WARNING"
    echo -e "${YELLOW}⚠️  Propagación DNS incompleta${NC}"
fi

echo

# 6. Verificar conectividad HTTP/HTTPS
echo -e "${BLUE}6. 🔒 Verificando conectividad web${NC}"

# Test HTTP
echo -e "${YELLOW}Testing HTTP...${NC}"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 http://$DOMAIN || echo "000")
echo -e "${BLUE}HTTP Status: $HTTP_STATUS${NC}"

# Test HTTPS
echo -e "${YELLOW}Testing HTTPS...${NC}"
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://$DOMAIN || echo "000")
echo -e "${BLUE}HTTPS Status: $HTTPS_STATUS${NC}"

# Test WWW HTTPS
echo -e "${YELLOW}Testing WWW HTTPS...${NC}"
WWW_HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://www.$DOMAIN || echo "000")
echo -e "${BLUE}WWW HTTPS Status: $WWW_HTTPS_STATUS${NC}"

if [ "$HTTPS_STATUS" = "200" ] && [ "$WWW_HTTPS_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Conectividad web correcta${NC}"
    WEB_STATUS="OK"
elif [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${YELLOW}⚠️  Solo HTTP funciona, HTTPS no configurado${NC}"
    WEB_STATUS="WARNING"
else
    echo -e "${RED}❌ Conectividad web fallando${NC}"
    WEB_STATUS="ERROR"
fi

echo

# 7. Verificar certificado SSL
echo -e "${BLUE}7. 🔐 Verificando certificado SSL${NC}"

ssl_info=$(echo | timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null)

if echo "$ssl_info" | grep -q "CONNECTED"; then
    # Extraer información del certificado
    cert_subject=$(echo "$ssl_info" | openssl x509 -noout -subject 2>/dev/null | sed 's/subject=//')
    cert_issuer=$(echo "$ssl_info" | openssl x509 -noout -issuer 2>/dev/null | sed 's/issuer=//')
    cert_dates=$(echo "$ssl_info" | openssl x509 -noout -dates 2>/dev/null)
    
    echo -e "${GREEN}✅ Certificado SSL activo${NC}"
    echo -e "${BLUE}Subject: $cert_subject${NC}"
    echo -e "${BLUE}Issuer: $cert_issuer${NC}"
    echo -e "${BLUE}$cert_dates${NC}"
    
    SSL_STATUS="OK"
else
    echo -e "${RED}❌ No se pudo conectar via SSL${NC}"
    SSL_STATUS="ERROR"
fi

echo

# Resumen final
echo -e "${PURPLE}=================================================${NC}"
echo -e "${PURPLE}📊 RESUMEN DE VALIDACIÓN DNS${NC}"
echo -e "${PURPLE}=================================================${NC}"

print_status() {
    case $2 in
        "OK")
            echo -e "${GREEN}✅ $1: CORRECTO${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $1: ATENCIÓN REQUERIDA${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $1: ERROR${NC}"
            ;;
        *)
            echo -e "${BLUE}❓ $1: DESCONOCIDO${NC}"
            ;;
    esac
}

print_status "Registro A" "$A_STATUS"
print_status "Registro WWW" "$WWW_STATUS"
print_status "Nameservers" "$NS_STATUS"
print_status "Registros MX" "$MX_STATUS"
print_status "Propagación Global" "$PROPAGATION_STATUS"
print_status "Conectividad Web" "$WEB_STATUS"
print_status "Certificado SSL" "$SSL_STATUS"

echo
echo -e "${BLUE}📋 Recomendaciones:${NC}"

if [ "$A_STATUS" != "OK" ]; then
    echo -e "${YELLOW}• Configurar registro A apuntando a $EXPECTED_IP${NC}"
fi

if [ "$WWW_STATUS" != "OK" ]; then
    echo -e "${YELLOW}• Configurar CNAME para www apuntando a $DOMAIN${NC}"
fi

if [ "$PROPAGATION_STATUS" != "OK" ]; then
    echo -e "${YELLOW}• Esperar hasta 24h para propagación completa${NC}"
fi

if [ "$WEB_STATUS" != "OK" ]; then
    echo -e "${YELLOW}• Verificar configuración del servidor web${NC}"
fi

if [ "$SSL_STATUS" != "OK" ]; then
    echo -e "${YELLOW}• Activar SSL desde el panel de Hostinger${NC}"
fi

# Generar reporte
REPORT_FILE="dns-validation-report-$(date +%Y%m%d-%H%M%S).txt"
cat > "$REPORT_FILE" << EOF
DNS Validation Report for $DOMAIN
Generated: $(date)

CONFIGURATION:
- Expected IP: $EXPECTED_IP
- Target Host: $TARGET_HOST

RESULTS:
- A Record: $A_STATUS ($A_RECORD)
- WWW Record: $WWW_STATUS
- Nameservers: $NS_STATUS
- MX Records: $MX_STATUS
- Global Propagation: $PROPAGATION_STATUS
- Web Connectivity: $WEB_STATUS
- SSL Certificate: $SSL_STATUS

HTTP Status Codes:
- HTTP: $HTTP_STATUS
- HTTPS: $HTTPS_STATUS
- WWW HTTPS: $WWW_HTTPS_STATUS

---
Generated by SOLARIA.AGENCY-ECO DNS Validator
EOF

echo
echo -e "${GREEN}📄 Reporte guardado en: $REPORT_FILE${NC}" 