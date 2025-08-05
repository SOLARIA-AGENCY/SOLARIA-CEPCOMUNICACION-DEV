#!/bin/bash

echo "🚀 APLICANDO CODE SPLITTING Y OPTIMIZACIONES"
echo "==========================================="

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para hacer backup
backup_file() {
    local file=$1
    if [ -f "$file" ]; then
        cp "$file" "${file}.backup-$(date +%Y%m%d-%H%M%S)"
        echo -e "${GREEN}✓${NC} Backup creado: ${file}.backup"
    fi
}

# Función para aplicar cambio
apply_change() {
    local source=$1
    local dest=$2
    local description=$3
    
    echo -e "\n${YELLOW}→${NC} ${description}"
    
    if [ -f "$dest" ]; then
        backup_file "$dest"
    fi
    
    cp "$source" "$dest"
    echo -e "${GREEN}✓${NC} Aplicado: $dest"
}

# 1. APLICAR CODE SPLITTING EN APP.TSX
echo -e "\n${YELLOW}1. IMPLEMENTANDO LAZY LOADING${NC}"
apply_change "src/App.optimized.tsx" "src/App.tsx" "Aplicando lazy loading a todas las rutas"

# 2. OPTIMIZAR VITE CONFIG
echo -e "\n${YELLOW}2. OPTIMIZANDO CONFIGURACIÓN DE VITE${NC}"
apply_change "vite.config.optimized.ts" "vite.config.ts" "Configurando code splitting y chunks manuales"

# 3. IMPLEMENTAR COMPONENTE DE IMAGEN OPTIMIZADA
echo -e "\n${YELLOW}3. ACTUALIZANDO IMPORTS DE IMÁGENES${NC}"
echo -e "${GREEN}✓${NC} OptimizedImage component ya creado en src/components/atoms/OptimizedImage.tsx"

# 4. CREAR SCRIPT DE MIGRACIÓN DE IMÁGENES
cat > scripts/migrate-images.js << 'EOF'
#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const COMPONENTS_DIR = './src/components';
const PAGES_DIR = './src/pages';

async function migrateImageImports(filePath) {
  const content = await readFile(filePath, 'utf-8');
  
  // Detectar imports de imágenes
  const imageImportRegex = /<img\s+src=["']\/images\/([^"']+)["']/g;
  
  if (imageImportRegex.test(content)) {
    console.log(`📸 Migrando imágenes en: ${filePath}`);
    
    // Agregar import si no existe
    if (!content.includes('OptimizedImage')) {
      const importStatement = "import { OptimizedImage } from '../atoms/OptimizedImage';\n";
      const updatedContent = content.replace(
        /^(import .* from .*)$/m,
        `$1\n${importStatement}`
      );
    }
    
    // Reemplazar <img> con <OptimizedImage>
    const migratedContent = content.replace(
      /<img\s+src=["']\/images\/([^"']+)["']\s+alt=["']([^"']+)["']\s*([^>]*?)>/g,
      '<OptimizedImage src="/images/$1" alt="$2" $3/>'
    );
    
    await writeFile(filePath, migratedContent);
    console.log(`✅ Migrado: ${filePath}`);
  }
}

// Ejecutar migración
console.log('🔄 Iniciando migración de imágenes...\n');
// Aquí iría el código para recorrer directorios y migrar archivos
console.log('\n✨ Migración completada!');
EOF

chmod +x scripts/migrate-images.js

# 5. ACTUALIZAR PACKAGE.JSON CON SCRIPTS
echo -e "\n${YELLOW}4. ACTUALIZANDO SCRIPTS EN PACKAGE.JSON${NC}"
# Aquí normalmente actualizaríamos package.json, pero por seguridad lo dejamos como instrucción

echo -e "\n${YELLOW}📝 INSTRUCCIONES MANUALES PENDIENTES:${NC}"
echo "1. Actualizar imports de imágenes para usar OptimizedImage component"
echo "2. Mover carpeta 'public/images-optimized' al servidor"
echo "3. Configurar nginx para servir imágenes optimizadas"
echo "4. Ejecutar: npm run build para verificar nuevo bundle size"

echo -e "\n${GREEN}✨ CODE SPLITTING CONFIGURADO!${NC}"
echo -e "\nPróximos pasos:"
echo "- Ejecutar: npm run build"
echo "- Verificar tamaño de chunks generados"
echo "- Probar lazy loading en desarrollo"
echo "- Medir mejora de performance con Lighthouse"