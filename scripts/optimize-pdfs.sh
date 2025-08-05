#!/bin/bash

# Script para optimizar PDFs usando ghostscript
# Requiere: brew install ghostscript (macOS) o apt-get install ghostscript (Linux)

SOURCE_DIR="./public/docs/brochures"
OUTPUT_DIR="./public/docs-optimized/brochures"
TOTAL_ORIGINAL=0
TOTAL_OPTIMIZED=0

# Crear directorio de salida
mkdir -p "$OUTPUT_DIR"

echo "🔍 Analizando PDFs en $SOURCE_DIR..."
echo ""

# Función para optimizar PDF
optimize_pdf() {
    local input_file="$1"
    local output_file="$2"
    local filename=$(basename "$input_file")
    
    # Obtener tamaño original
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    local original_mb=$(echo "scale=2; $original_size / 1048576" | bc)
    
    echo "📄 Procesando: $filename"
    echo "   Tamaño original: ${original_mb}MB"
    
    # Optimizar con ghostscript
    # -dPDFSETTINGS=/ebook = calidad media, buen balance tamaño/calidad
    # Otras opciones: /screen (baja), /printer (alta), /prepress (muy alta)
    gs -sDEVICE=pdfwrite \
       -dCompatibilityLevel=1.4 \
       -dPDFSETTINGS=/ebook \
       -dNOPAUSE \
       -dQUIET \
       -dBATCH \
       -sOutputFile="$output_file" \
       "$input_file" 2>/dev/null
    
    # Obtener tamaño optimizado
    local optimized_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    local optimized_mb=$(echo "scale=2; $optimized_size / 1048576" | bc)
    local saved_mb=$(echo "scale=2; $original_mb - $optimized_mb" | bc)
    local reduction=$(echo "scale=1; ($saved_mb / $original_mb) * 100" | bc)
    
    echo "   Tamaño optimizado: ${optimized_mb}MB"
    echo "   Ahorro: ${saved_mb}MB (${reduction}%)"
    echo ""
    
    # Actualizar totales
    TOTAL_ORIGINAL=$(echo "$TOTAL_ORIGINAL + $original_size" | bc)
    TOTAL_OPTIMIZED=$(echo "$TOTAL_OPTIMIZED + $optimized_size" | bc)
}

# Verificar si ghostscript está instalado
if ! command -v gs &> /dev/null; then
    echo "❌ Error: Ghostscript no está instalado"
    echo "Instalar con:"
    echo "  macOS: brew install ghostscript"
    echo "  Ubuntu/Debian: sudo apt-get install ghostscript"
    echo "  RHEL/CentOS: sudo yum install ghostscript"
    exit 1
fi

# Procesar todos los PDFs
for pdf in "$SOURCE_DIR"/*.pdf; do
    if [ -f "$pdf" ]; then
        filename=$(basename "$pdf")
        optimize_pdf "$pdf" "$OUTPUT_DIR/$filename"
    fi
done

# Mostrar resumen
echo "✨ Optimización completada!"
echo ""
echo "📊 RESUMEN:"
total_original_mb=$(echo "scale=2; $TOTAL_ORIGINAL / 1048576" | bc)
total_optimized_mb=$(echo "scale=2; $TOTAL_OPTIMIZED / 1048576" | bc)
total_saved_mb=$(echo "scale=2; $total_original_mb - $total_optimized_mb" | bc)
total_reduction=$(echo "scale=1; ($total_saved_mb / $total_original_mb) * 100" | bc)

echo "Tamaño original total: ${total_original_mb}MB"
echo "Tamaño optimizado total: ${total_optimized_mb}MB"
echo "Ahorro total: ${total_saved_mb}MB (${total_reduction}%)"
echo ""
echo "📁 PDFs optimizados guardados en: $OUTPUT_DIR"

# Crear archivo de configuración para servir PDFs externamente
cat > "$OUTPUT_DIR/../pdf-config.json" <<EOF
{
  "pdf_strategy": "external_links",
  "comment": "PDFs deben ser servidos desde CDN o almacenamiento externo",
  "cdn_base_url": "https://cdn.cepformacion.com/brochures/",
  "original_sizes": {
    "total_mb": $total_original_mb,
    "files": $(find "$SOURCE_DIR" -name "*.pdf" | wc -l)
  },
  "optimized_sizes": {
    "total_mb": $total_optimized_mb,
    "reduction_percent": $total_reduction
  },
  "recommendation": "Subir PDFs optimizados a CDN y actualizar enlaces en el sitio"
}
EOF

echo "💡 RECOMENDACIÓN: Subir los PDFs optimizados a un CDN o almacenamiento externo"
echo "   y actualizar los enlaces en el sitio para no servir desde el VPS."