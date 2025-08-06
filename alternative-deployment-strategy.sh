#!/bin/bash

# ================================================================
# ESTRATEGIA ALTERNATIVA DE DEPLOYMENT
# Usar GitHub Pages o configuración temporal
# ================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 ESTRATEGIA ALTERNATIVA DE DEPLOYMENT${NC}"
echo -e "${YELLOW}⚠️  API Hostinger no accesible, usando métodos alternativos${NC}"
echo

# Opción 1: Usar contraseña temporal y updatear después
echo -e "${BLUE}📋 OPCIÓN 1: Contraseña temporal para testing${NC}"
echo "1. Configurar secret temporal"
echo "2. Intentar deployment"
echo "3. Si falla, updatear con contraseña real desde hPanel"
echo

# Opción 2: GitHub Pages
echo -e "${BLUE}📋 OPCIÓN 2: GitHub Pages (temporal)${NC}"
echo "1. Configurar GitHub Pages"
echo "2. Deploy automático desde dist/"
echo "3. URL temporal: username.github.io/repo"
echo

# Opción 3: Configuración manual del secret
echo -e "${BLUE}📋 OPCIÓN 3: Configuración manual${NC}"
echo "1. Ir a hPanel Hostinger"
echo "2. Buscar 'File Manager' o 'Website'"
echo "3. Obtener credenciales FTP"
echo "4. Configurar secret manualmente"
echo

echo -e "${YELLOW}🤔 ¿Cuál opción prefieres?${NC}"
echo "1) Probar con contraseña temporal"
echo "2) Configurar GitHub Pages"
echo "3) Configuración manual paso a paso"
echo "4) Intentar acceso directo a hPanel"

read -p "Selecciona (1-4): " option

case $option in
    1)
        echo -e "${BLUE}🔄 Configurando contraseña temporal...${NC}"
        # Usar contraseña común temporal
        TEMP_PASSWORD="temp_password_123"
        echo "$TEMP_PASSWORD" | gh secret set HOSTINGER_FTP_PASSWORD -R SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV --body -
        echo -e "${GREEN}✅ Secret temporal configurado${NC}"
        echo -e "${YELLOW}⚠️  Si el deployment falla, updatear con contraseña real${NC}"
        
        # Intentar deployment
        echo -e "${BLUE}🚀 Intentando deployment con contraseña temporal...${NC}"
        gh workflow run deploy-cepcomunicacion.yml -R SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV
        ;;
        
    2)
        echo -e "${BLUE}🔄 Configurando GitHub Pages...${NC}"
        # Crear workflow para GitHub Pages
        mkdir -p .github/workflows
        cat > .github/workflows/github-pages.yml << 'EOF'
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci --legacy-peer-deps
      - run: npm run build
      - uses: actions/configure-pages@v3
      - uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      - uses: actions/deploy-pages@v2
EOF
        echo -e "${GREEN}✅ GitHub Pages workflow creado${NC}"
        echo -e "${BLUE}📋 Próximo paso: Habilitar Pages en GitHub repo settings${NC}"
        ;;
        
    3)
        echo -e "${BLUE}📋 INSTRUCCIONES PASO A PASO:${NC}"
        echo
        echo "1. Ir a: https://hpanel.hostinger.com"
        echo "2. Login con tus credenciales"
        echo "3. Buscar sección 'Websites' o 'File Manager'"
        echo "4. Seleccionar 'cepcomunicacion.com'"
        echo "5. Buscar 'FTP Access' o 'FTP Accounts'"
        echo "6. Usuario: u882790918.cepcomunicacion.com"
        echo "7. Copiar/resetear contraseña"
        echo "8. Ejecutar:"
        echo "   gh secret set HOSTINGER_FTP_PASSWORD -R SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV"
        ;;
        
    4)
        echo -e "${BLUE}🌐 Abriendo hPanel Hostinger...${NC}"
        # Intentar abrir el panel en el navegador
        if command -v open &> /dev/null; then
            open "https://hpanel.hostinger.com"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "https://hpanel.hostinger.com"
        else
            echo "Ir a: https://hpanel.hostinger.com"
        fi
        echo
        echo -e "${YELLOW}📋 Una vez en hPanel:${NC}"
        echo "1. Websites → cepcomunicacion.com"
        echo "2. File Manager → FTP Accounts"
        echo "3. Usuario: u882790918.cepcomunicacion.com"
        echo "4. Copiar contraseña"
        ;;
        
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

echo
echo -e "${GREEN}✅ Estrategia ejecutada${NC}"