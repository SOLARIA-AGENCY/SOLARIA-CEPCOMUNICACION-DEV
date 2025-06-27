#!/bin/bash

echo "🚀 Iniciando despliegue CEP Comunicación..."

# Variables
FTP_HOST="46.202.172.98"
FTP_USER="u882790918.cepcomunicacion.com"

# Solicitar contraseña
echo "🔐 Introduce la contraseña FTP para CEP Comunicación:"
read -s FTP_PASS

echo "📦 Subiendo archivos..."

lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
lcd dist
cd public_html
mirror --reverse --delete --verbose --parallel=3
bye
"

echo "✅ Despliegue completado!"
echo "🌐 Verifica el sitio en: https://www.cepcomunicacion.com" 