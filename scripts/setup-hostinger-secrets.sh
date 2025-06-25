#!/bin/bash

# 🔐 Setup Hostinger Secrets for GitHub Actions
# Configuración automática de credenciales para cepcomunicacion.com

set -e

echo "🔐 Configurando secrets para GitHub Actions..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que GitHub CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI no está instalado${NC}"
    echo -e "${YELLOW}💡 Instalar con: brew install gh${NC}"
    exit 1
fi

# Verificar autenticación de GitHub
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ No estás autenticado en GitHub CLI${NC}"
    echo -e "${YELLOW}💡 Ejecutar: gh auth login${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Verificando repositorio actual...${NC}"

# Obtener información del repositorio
REPO_INFO=$(gh repo view --json owner,name)
REPO_OWNER=$(echo $REPO_INFO | jq -r '.owner.login')
REPO_NAME=$(echo $REPO_INFO | jq -r '.name')

echo -e "${GREEN}📁 Repositorio: ${REPO_OWNER}/${REPO_NAME}${NC}"

# Credenciales de Hostinger para cepcomunicacion.com
HOSTINGER_FTP_HOST="46.202.172.98"
HOSTINGER_FTP_USER="u882790918.cepcomunicacion.com"
HOSTINGER_API_TOKEN="57vN22k089rTuKpQJyxEeL2FeJLwhw43xcLbbijq39481824"

echo -e "${YELLOW}🔑 Configurando secrets de Hostinger...${NC}"

# Configurar secrets
echo -e "${BLUE}Setting HOSTINGER_FTP_PASSWORD...${NC}"
read -s -p "Ingresa la contraseña FTP para u882790918.cepcomunicacion.com: " FTP_PASSWORD
echo

# Validar que no esté vacía
if [ -z "$FTP_PASSWORD" ]; then
    echo -e "${RED}❌ La contraseña FTP no puede estar vacía${NC}"
    exit 1
fi

# Configurar todos los secrets
echo -e "${BLUE}📝 Configurando secrets en GitHub...${NC}"

# Secret para contraseña FTP
echo "$FTP_PASSWORD" | gh secret set HOSTINGER_FTP_PASSWORD --body -
echo -e "${GREEN}✅ HOSTINGER_FTP_PASSWORD configurado${NC}"

# Secret para API token (para futuras funcionalidades)
echo "$HOSTINGER_API_TOKEN" | gh secret set HOSTINGER_API_TOKEN --body -
echo -e "${GREEN}✅ HOSTINGER_API_TOKEN configurado${NC}"

# Secret para host FTP (por si cambia)
echo "$HOSTINGER_FTP_HOST" | gh secret set HOSTINGER_FTP_HOST --body -
echo -e "${GREEN}✅ HOSTINGER_FTP_HOST configurado${NC}"

# Secret para usuario FTP (por si cambia)
echo "$HOSTINGER_FTP_USER" | gh secret set HOSTINGER_FTP_USER --body -
echo -e "${GREEN}✅ HOSTINGER_FTP_USER configurado${NC}"

echo -e "${GREEN}🎉 Todos los secrets han sido configurados correctamente${NC}"

# Verificar secrets configurados
echo -e "${BLUE}🔍 Verificando secrets configurados...${NC}"
gh secret list

echo
echo -e "${GREEN}✅ Configuración completada${NC}"
echo -e "${YELLOW}📋 Siguiente paso: Hacer push para activar el deployment${NC}"
echo
echo -e "${BLUE}💡 Para ejecutar deployment manual:${NC}"
echo -e "${YELLOW}gh workflow run \"Deploy CEP Comunicación to Production\"${NC}"

# Crear archivo de verificación
cat > .github/deployment-info.md << EOF
# Información de Deployment

## Configuración Hostinger
- **Dominio**: cepcomunicacion.com
- **IP Servidor**: $HOSTINGER_FTP_HOST
- **Usuario FTP**: $HOSTINGER_FTP_USER
- **Directorio Web**: /public_html/

## URLs de Producción
- **Principal**: https://www.cepcomunicacion.com
- **Alternativa**: https://cepcomunicacion.com

## Workflow de Deployment
- **Archivo**: .github/workflows/deploy-cepcomunicacion.yml
- **Trigger**: Push a main branch
- **Manual**: GitHub Actions tab → "Deploy CEP Comunicación to Production"

## Secrets Configurados
- ✅ HOSTINGER_FTP_PASSWORD
- ✅ HOSTINGER_API_TOKEN  
- ✅ HOSTINGER_FTP_HOST
- ✅ HOSTINGER_FTP_USER

---
Configurado automáticamente por SOLARIA.AGENCY-ECO
$(date)
EOF

echo -e "${GREEN}📄 Archivo de información creado: .github/deployment-info.md${NC}" 