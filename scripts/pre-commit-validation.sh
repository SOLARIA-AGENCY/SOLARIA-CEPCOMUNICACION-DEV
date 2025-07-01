#!/bin/bash

# Pre-commit validation script
# Este script se ejecuta antes de cada commit para garantizar calidad del código

echo "🔍 Iniciando validación pre-commit..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar errores
show_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para mostrar éxito
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar warning
show_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# 1. Ejecutar tests
echo "📋 Ejecutando tests..."
if npm run test:run; then
    show_success "Todos los tests pasaron"
else
    show_error "Tests fallaron - commit cancelado"
    echo ""
    echo "💡 Para corregir:"
    echo "   - npm test -- -u (actualizar snapshots si es necesario)"
    echo "   - Revisar y corregir tests fallidos"
    exit 1
fi

echo ""

# 2. Ejecutar linting
echo "🔍 Ejecutando linting..."
if npm run lint; then
    show_success "Linting pasó sin errores"
else
    show_warning "Errores de linting encontrados"
    echo ""
    echo "💡 Para corregir:"
    echo "   - npm run lint:fix (auto-corregir cuando sea posible)"
    echo "   - Revisar manualmente errores restantes"
    
    # Preguntar si continuar
    read -p "¿Continuar con el commit? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        show_error "Commit cancelado por errores de linting"
        exit 1
    fi
fi

echo ""

# 3. Verificar que el build funciona
echo "🏗️ Verificando build..."
if npm run build; then
    show_success "Build completado exitosamente"
else
    show_error "Build falló - commit cancelado"
    echo ""
    echo "💡 Para corregir:"
    echo "   - Revisar errores de TypeScript/compilación"
    echo "   - Verificar imports y sintaxis"
    exit 1
fi

echo ""
show_success "🎉 Validación pre-commit completada exitosamente!"
echo ""
echo "📝 Resumen de validaciones:"
echo "   ✅ Tests: PASARON"
echo "   ✅ Linting: OK"
echo "   ✅ Build: EXITOSO"
echo ""
echo "🚀 Código listo para commit y despliegue!" 