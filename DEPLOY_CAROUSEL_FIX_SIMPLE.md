# 🎯 FIX CARRUSEL CEP FORMACIÓN - GUÍA RÁPIDA

## 📊 DIAGNÓSTICO COMPLETADO

### Problema Identificado
Las imágenes del carrusel NO existen físicamente en el servidor de producción.
Las URLs retornan HTML (fallback SPA) en lugar de imágenes WebP.

**URLs afectadas:**
- `http://46.62.222.138/slideshow-1.jpg.webp` → Devuelve HTML (❌ debería ser imagen WebP)
- `http://46.62.222.138/slideshow-2.jpg.webp` → Devuelve HTML (❌ debería ser imagen WebP)
- `http://46.62.222.138/slideshow-3.jpg.webp` → Devuelve HTML (❌ debería ser imagen WebP)

**Content-Type recibido:** `text/html`
**Content-Type esperado:** `image/webp`

---

## ✅ SOLUCIÓN IMPLEMENTADA

### Cambios Realizados

1. ✅ **Código actualizado en HomePage.tsx**
   - Rutas cambiadas de `/images/slideshow-X.jpg` → `/slideshow-X.jpg.webp`
   - Commit: `fix: Corregir rutas de imágenes del carrusel homepage`
   - Push: Rama `claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX`

2. ✅ **Imágenes optimizadas creadas**
   - `public/slideshow-1.jpg.webp` (47K)
   - `public/slideshow-2.jpg.webp` (67K)
   - `public/slideshow-3.jpg.webp` (71K)

---

## 🚀 DESPLIEGUE MANUAL REQUERIDO

**⚠️ NOTA:** No se pudo hacer build automático por problemas de red con dependencias (Puppeteer, Cypress).

### Opción 1: Script Automatizado (Recomendado)

Ejecutar desde la raíz del proyecto:

\`\`\`bash
cd /home/user/SOLARIA-CEPCOMUNICACION-DEV
./DEPLOY_CAROUSEL_FIX.sh
\`\`\`

### Opción 2: Comandos Manuales

\`\`\`bash
# 1. Copiar imágenes al servidor
scp -i /backup-server-keys/cepcomunicacion -o StrictHostKeyChecking=no \
  public/slideshow-1.jpg.webp \
  public/slideshow-2.jpg.webp \
  public/slideshow-3.jpg.webp \
  root@46.62.222.138:/opt/frontend-new/

# 2. Conectar al servidor
ssh -i /backup-server-keys/cepcomunicacion root@46.62.222.138

# 3. Copiar imágenes al contenedor
docker cp /opt/frontend-new/slideshow-1.jpg.webp cep-frontend:/usr/share/nginx/html/
docker cp /opt/frontend-new/slideshow-2.jpg.webp cep-frontend:/usr/share/nginx/html/
docker cp /opt/frontend-new/slideshow-3.jpg.webp cep-frontend:/usr/share/nginx/html/

# 4. Verificar archivos
docker exec cep-frontend ls -lh /usr/share/nginx/html/slideshow-*.webp

# 5. Recargar nginx
docker exec cep-frontend nginx -s reload

# 6. Verificar Content-Type
curl -I http://46.62.222.138/slideshow-1.jpg.webp | grep -i content-type
# Debería devolver: content-type: image/webp
\`\`\`

### Opción 3: Build + Deploy Completo (Cuando haya conexión)

\`\`\`bash
# 1. Instalar dependencias (requiere conexión a internet)
npm install

# 2. Build del proyecto
npm run build

# 3. Deploy completo al servidor
rsync -avz -e "ssh -i /backup-server-keys/cepcomunicacion -o StrictHostKeyChecking=no" \
  dist/ root@46.62.222.138:/opt/frontend-new/

# 4. Copiar al contenedor
ssh -i /backup-server-keys/cepcomunicacion root@46.62.222.138 \
  "docker cp /opt/frontend-new/. cep-frontend:/usr/share/nginx/html/"

# 5. Recargar nginx
ssh -i /backup-server-keys/cepcomunicacion root@46.62.222.138 \
  "docker exec cep-frontend nginx -s reload"
\`\`\`

---

## 🔍 VERIFICACIÓN POST-DESPLIEGUE

### 1. Verificar Content-Type de las imágenes

\`\`\`bash
curl -I http://46.62.222.138/slideshow-1.jpg.webp | grep -i content-type
curl -I http://46.62.222.138/slideshow-2.jpg.webp | grep -i content-type
curl -I http://46.62.222.138/slideshow-3.jpg.webp | grep -i content-type
\`\`\`

**Esperado:** `content-type: image/webp` o `content-type: image/*`
**❌ Incorrecto:** `content-type: text/html`

### 2. Verificar que se sirven como imágenes

\`\`\`bash
curl -s http://46.62.222.138/slideshow-1.jpg.webp | file -
\`\`\`

**Esperado:** `WebP image data` o similar
**❌ Incorrecto:** `HTML document`

### 3. Verificar en navegador

1. Abrir: http://46.62.222.138
2. **Limpiar caché:** Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)
3. Verificar que el carrusel muestra las 3 imágenes correctamente
4. Abrir DevTools (F12) → Red → Filtrar por imágenes
5. Verificar que `slideshow-*.webp` se descargan como tipo `webp`

---

## 📊 RESUMEN TÉCNICO

| Item | Estado |
|------|--------|
| Código actualizado | ✅ Completado |
| Imágenes optimizadas creadas | ✅ Completado |
| Commit realizado | ✅ Completado |
| Push a repositorio | ✅ Completado |
| Imágenes en servidor | ⏳ **Pendiente deploy** |
| Build proyecto | ⚠️ Bloqueado (falta conexión) |
| Verificación funcionamiento | ⏳ **Pendiente deploy** |

---

## 🎯 PRÓXIMOS PASOS

1. **Ejecutar despliegue manual** (Opción 1 o 2)
2. **Verificar Content-Type** de las imágenes
3. **Probar en navegador** con caché limpia
4. **Cuando haya conexión estable:**
   - Hacer build completo del proyecto
   - Deploy completo usando Opción 3

---

## 🆘 TROUBLESHOOTING

### Problema: Las imágenes siguen devolviendo HTML

**Causa:** Las imágenes no están en la ubicación correcta del contenedor
**Solución:**
\`\`\`bash
ssh -i /backup-server-keys/cepcomunicacion root@46.62.222.138
docker exec cep-frontend ls -lh /usr/share/nginx/html/
# Verificar que slideshow-*.webp estén listados
\`\`\`

### Problema: Content-Type sigue siendo text/html

**Causa:** nginx no reconoce la extensión .webp o archivo no existe
**Solución:**
\`\`\`bash
# Verificar configuración mime types en nginx
docker exec cep-frontend cat /etc/nginx/mime.types | grep webp
# Debería aparecer: image/webp webp;
\`\`\`

### Problema: El carrusel no muestra imágenes después del deploy

**Causa:** Caché del navegador
**Solución:**
1. Hard refresh: Ctrl+Shift+R
2. Modo incógnito/privado
3. Limpiar caché completa del navegador

---

**Última actualización:** 2025-11-19
**Responsable:** Claude ECO - SOLARIA AGENCY
