#!/bin/bash
# ============================================================================
# SCRIPT DE DESPLIEGUE - FIX CARRUSEL CEP FORMACIÓN
# ============================================================================
# Descripción: Copiar imágenes .webp del carrusel al servidor de producción
# Servidor: 46.62.222.138
# Contenedor: cep-frontend
# ============================================================================

echo "🚀 INICIANDO DESPLIEGUE FIX CARRUSEL..."
echo ""

# Configuración
SERVER="46.62.222.138"
SSH_KEY="/backup-server-keys/cepcomunicacion"
SERVER_DIR="/opt/frontend-new"
CONTAINER="cep-frontend"
NGINX_DIR="/usr/share/nginx/html"

echo "📋 Configuración:"
echo "   Servidor: $SERVER"
echo "   Directorio servidor: $SERVER_DIR"
echo "   Contenedor: $CONTAINER"
echo ""

# Paso 1: Copiar imágenes .webp al servidor
echo "📦 PASO 1: Copiando imágenes .webp al servidor..."
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no \
  public/slideshow-1.jpg.webp \
  public/slideshow-2.jpg.webp \
  public/slideshow-3.jpg.webp \
  root@$SERVER:$SERVER_DIR/

if [ $? -eq 0 ]; then
  echo "✅ Imágenes copiadas exitosamente al servidor"
else
  echo "❌ Error al copiar imágenes al servidor"
  exit 1
fi
echo ""

# Paso 2: Copiar imágenes dentro del contenedor Docker
echo "📦 PASO 2: Copiando imágenes al contenedor nginx..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no root@$SERVER << 'ENDSSH'
  # Copiar imágenes al contenedor
  docker cp /opt/frontend-new/slideshow-1.jpg.webp cep-frontend:/usr/share/nginx/html/
  docker cp /opt/frontend-new/slideshow-2.jpg.webp cep-frontend:/usr/share/nginx/html/
  docker cp /opt/frontend-new/slideshow-3.jpg.webp cep-frontend:/usr/share/nginx/html/

  # Verificar que se copiaron correctamente
  echo "Verificando archivos en contenedor:"
  docker exec cep-frontend ls -lh /usr/share/nginx/html/slideshow-*.webp
ENDSSH

if [ $? -eq 0 ]; then
  echo "✅ Imágenes copiadas al contenedor exitosamente"
else
  echo "❌ Error al copiar imágenes al contenedor"
  exit 1
fi
echo ""

# Paso 3: Recargar nginx (opcional, pero recomendado)
echo "🔄 PASO 3: Recargando nginx..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no root@$SERVER \
  "docker exec $CONTAINER nginx -s reload"

if [ $? -eq 0 ]; then
  echo "✅ Nginx recargado exitosamente"
else
  echo "⚠️  Warning: No se pudo recargar nginx (puede no ser crítico)"
fi
echo ""

# Paso 4: Verificar que las imágenes se sirven correctamente
echo "🔍 PASO 4: Verificando que las imágenes se sirven correctamente..."
echo ""

for i in 1 2 3; do
  echo "Verificando slideshow-$i.jpg.webp..."
  CONTENT_TYPE=$(curl -s -I http://$SERVER/slideshow-$i.jpg.webp | grep -i "content-type" | tr -d '\r')
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVER/slideshow-$i.jpg.webp)

  echo "  HTTP Code: $HTTP_CODE"
  echo "  Content-Type: $CONTENT_TYPE"

  if [[ "$CONTENT_TYPE" == *"image"* ]] || [[ "$CONTENT_TYPE" == *"webp"* ]]; then
    echo "  ✅ OK - Imagen servida correctamente"
  else
    echo "  ❌ ERROR - No se está sirviendo como imagen"
  fi
  echo ""
done

echo "============================================================================"
echo "✅ DESPLIEGUE COMPLETADO"
echo "============================================================================"
echo ""
echo "🌐 Verificar en navegador:"
echo "   http://46.62.222.138"
echo ""
echo "🔍 URLs de imágenes:"
echo "   http://46.62.222.138/slideshow-1.jpg.webp"
echo "   http://46.62.222.138/slideshow-2.jpg.webp"
echo "   http://46.62.222.138/slideshow-3.jpg.webp"
echo ""
echo "💡 Si las imágenes aún no se ven:"
echo "   1. Limpiar caché del navegador (Ctrl+Shift+R)"
echo "   2. Verificar consola del navegador (F12)"
echo "   3. Verificar que las imágenes se descarguen como WebP, no HTML"
echo ""
