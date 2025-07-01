#!/bin/bash

# Script para configurar variables de Facebook Conversions API
# CEP FORMACIÓN - Solaria Agency

echo "🚀 Configurando Facebook Conversions API para CEP FORMACIÓN..."
echo ""

# Variables proporcionadas
FB_PIXEL_ID="1189071876088388"
FB_API_VERSION="v23.0"
FB_ACCESS_TOKEN="EAAHqi5Y9X4EBOyv9QDZCgkdl4iDTJY811G7Ua3BZCrhNjGgnXSgqdxjBZBvNZAFYk1VCj6QhTni8UnS4bGsa5FnPZAhZCtrdZCrJbJTte12mk8bWSiZA2gUHSdZAMa2GKZBTSvK5ZBn1dlqbxZBo9L5X2cM5vcvvEklcO4IJkczQi3FM4UpZCCIuUuULeczWkZCsNnlwZDZD"
FB_ENDPOINT="https://graph.facebook.com/v23.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}"

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📄 Creando archivo .env..."
    cp env.example .env
    echo "✅ Archivo .env creado desde env.example"
else
    echo "📄 Archivo .env ya existe, actualizando variables..."
fi

# Función para actualizar o agregar variable en .env
update_env_var() {
    local var_name=$1
    local var_value=$2
    
    if grep -q "^${var_name}=" .env; then
        # Variable existe, actualizarla
        sed -i.bak "s|^${var_name}=.*|${var_name}=${var_value}|" .env
        echo "🔄 Actualizada: ${var_name}"
    else
        # Variable no existe, agregarla
        echo "${var_name}=${var_value}" >> .env
        echo "➕ Agregada: ${var_name}"
    fi
}

echo ""
echo "🔧 Configurando variables de Facebook..."

# Configurar variables de Facebook
update_env_var "FB_PIXEL_ID" "$FB_PIXEL_ID"
update_env_var "FB_API_VERSION" "$FB_API_VERSION"
update_env_var "FB_ACCESS_TOKEN" "$FB_ACCESS_TOKEN"
update_env_var "FB_ENDPOINT" "$FB_ENDPOINT"

# Preguntar por webhook n8n
echo ""
echo "🌐 Configuración de n8n webhook:"
echo "URL actual: $(grep '^FB_N8N_WEBHOOK_URL=' .env 2>/dev/null || echo 'No configurada')"
read -p "¿Deseas configurar una nueva URL de webhook n8n? (y/N): " configure_webhook

if [[ $configure_webhook =~ ^[Yy]$ ]]; then
    read -p "Ingresa la URL del webhook n8n: " webhook_url
    if [ ! -z "$webhook_url" ]; then
        update_env_var "FB_N8N_WEBHOOK_URL" "$webhook_url"
    fi
else
    # Configurar URL por defecto si no existe
    if ! grep -q "^FB_N8N_WEBHOOK_URL=" .env; then
        update_env_var "FB_N8N_WEBHOOK_URL" "https://your-n8n-instance.com/webhook/facebook-conversions"
    fi
fi

# Limpiar archivos de backup
rm -f .env.bak

echo ""
echo "✅ Configuración de Facebook Conversions API completada!"
echo ""
echo "📋 Variables configuradas:"
echo "  - FB_PIXEL_ID: $FB_PIXEL_ID"
echo "  - FB_API_VERSION: $FB_API_VERSION"
echo "  - FB_ACCESS_TOKEN: [CONFIGURADO]"
echo "  - FB_ENDPOINT: [CONFIGURADO]"
echo "  - FB_N8N_WEBHOOK_URL: $(grep '^FB_N8N_WEBHOOK_URL=' .env | cut -d'=' -f2)"
echo ""
echo "🔍 Próximos pasos:"
echo "  1. Configurar webhook n8n con el flujo proporcionado en docs/"
echo "  2. Integrar trackCourseLeadEvent() en formularios"
echo "  3. Probar eventos en Facebook Events Manager"
echo ""
echo "📚 Ver documentación completa en: docs/FACEBOOK_CONVERSIONS_CONFIG.md"
echo "" 