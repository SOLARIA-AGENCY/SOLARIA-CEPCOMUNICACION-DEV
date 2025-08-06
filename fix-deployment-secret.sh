#!/bin/bash

# ================================================================
# SOLUCION RAPIDA - CONFIGURAR SECRET HOSTINGER_FTP_PASSWORD
# ================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${RED}❌ ERROR EN DEPLOYMENT FRONTEND DETECTADO${NC}"
echo -e "${YELLOW}⚠️  Falta configurar: HOSTINGER_FTP_PASSWORD${NC}"
echo

# Verificar repositorio
REPO="SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV"
echo -e "${BLUE}📋 Repositorio: $REPO${NC}"

# Verificar CLI GitHub
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI no está instalado${NC}"
    echo "Instalación: https://cli.github.com/"
    exit 1
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}🔐 Necesitas autenticarte con GitHub CLI${NC}"
    gh auth login
fi

echo -e "${BLUE}🔑 Configurando secret faltante...${NC}"
echo -e "${YELLOW}📝 Ingresa la contraseña FTP de Hostinger para el usuario:${NC}"
echo -e "${BLUE}   u882790918.cepcomunicacion.com${NC}"
echo

# Solicitar contraseña FTP de forma segura
read -s -p "Contraseña FTP de Hostinger: " FTP_PASSWORD
echo

# Verificar que no esté vacía
if [ -z "$FTP_PASSWORD" ]; then
    echo -e "${RED}❌ La contraseña no puede estar vacía${NC}"
    exit 1
fi

# Configurar secret
echo -e "${BLUE}📤 Configurando HOSTINGER_FTP_PASSWORD...${NC}"

if echo "$FTP_PASSWORD" | gh secret set HOSTINGER_FTP_PASSWORD -R $REPO --body -; then
    echo -e "${GREEN}✅ HOSTINGER_FTP_PASSWORD configurado exitosamente${NC}"
else
    echo -e "${RED}❌ Error configurando secret${NC}"
    exit 1
fi

echo
echo -e "${GREEN}🚀 ¡Secret configurado! Ahora puedes reintенtar el deployment${NC}"
echo -e "${BLUE}📋 Para reintенtar el deployment:${NC}"
echo "   gh workflow run deploy-cepcomunicacion.yml -R $REPO"
echo
echo -e "${YELLOW}📊 Verificar secrets configurados:${NC}"
gh secret list -R $REPO

echo
echo -e "${GREEN}✅ Listo para deployment automático${NC}"