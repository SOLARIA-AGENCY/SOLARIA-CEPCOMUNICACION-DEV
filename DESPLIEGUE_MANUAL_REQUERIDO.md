# 🚨 DESPLIEGUE MANUAL REQUERIDO - FIX CARRUSEL CEP

## ⚠️ IMPORTANTE: Acceso SSH Necesario

Este despliegue **NO puede ejecutarse desde el entorno actual** porque no tiene:
- ❌ SSH client
- ❌ SCP command
- ❌ Acceso directo al servidor

**SOLUCIÓN:** Ejecutar desde un sistema con acceso SSH al servidor `46.62.222.138`

---

## 📦 PAQUETE DE DESPLIEGUE PREPARADO

**Archivo:** `carousel-fix-deploy.tar.gz`

**Contenido:**
```
carousel-fix-deploy.tar.gz
├── public/slideshow-1.jpg.webp (47KB)
├── public/slideshow-2.jpg.webp (67KB)
├── public/slideshow-3.jpg.webp (71KB)
├── DEPLOY_CAROUSEL_FIX.sh (script automatizado)
└── DEPLOY_CAROUSEL_FIX_SIMPLE.md (documentación)
```

---

## 🚀 PASOS PARA DESPLEGAR

### Opción A: Desde tu máquina local (Recomendado)

1. **Descargar el paquete desde el repositorio:**
   ```bash
   git clone https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV.git
   cd SOLARIA-CEPCOMUNICACION-DEV
   git checkout claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX
   ```

2. **Extraer y ejecutar:**
   ```bash
   tar -xzf carousel-fix-deploy.tar.gz
   chmod +x DEPLOY_CAROUSEL_FIX.sh
   ./DEPLOY_CAROUSEL_FIX.sh
   ```

### Opción B: Comandos directos (Sin el paquete)

Si ya tienes el repositorio clonado:

```bash
# 1. Ir al directorio del proyecto
cd SOLARIA-CEPCOMUNICACION-DEV

# 2. Checkout a la rama con los cambios
git checkout claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX

# 3. Copiar imágenes al servidor (requiere SSH key)
scp -i /ruta/a/tu/ssh-key \
  public/slideshow-1.jpg.webp \
  public/slideshow-2.jpg.webp \
  public/slideshow-3.jpg.webp \
  root@46.62.222.138:/opt/frontend-new/

# 4. Conectar al servidor
ssh -i /ruta/a/tu/ssh-key root@46.62.222.138

# 5. Una vez conectado al servidor, ejecutar:
docker cp /opt/frontend-new/slideshow-1.jpg.webp cep-frontend:/usr/share/nginx/html/
docker cp /opt/frontend-new/slideshow-2.jpg.webp cep-frontend:/usr/share/nginx/html/
docker cp /opt/frontend-new/slideshow-3.jpg.webp cep-frontend:/usr/share/nginx/html/

# 6. Verificar que se copiaron
docker exec cep-frontend ls -lh /usr/share/nginx/html/slideshow-*.webp

# 7. Recargar nginx
docker exec cep-frontend nginx -s reload

# 8. Salir del servidor
exit

# 9. Verificar Content-Type (desde tu máquina local)
curl -I http://46.62.222.138/slideshow-1.jpg.webp | grep content-type
# Debe devolver: content-type: image/webp
```

### Opción C: Deploy completo con Build (Recomendado para producción)

```bash
# 1. Ir al proyecto
cd SOLARIA-CEPCOMUNICACION-DEV
git checkout claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX

# 2. Instalar dependencias y hacer build
npm install
npm run build

# 3. Deploy completo al servidor
rsync -avz -e "ssh -i /ruta/a/tu/ssh-key" \
  dist/ root@46.62.222.138:/opt/frontend-new/

# 4. Copiar al contenedor
ssh -i /ruta/a/tu/ssh-key root@46.62.222.138 << 'EOF'
  # Limpiar contenedor
  docker exec cep-frontend rm -rf /usr/share/nginx/html/*

  # Copiar nuevo build
  docker cp /opt/frontend-new/. cep-frontend:/usr/share/nginx/html/

  # Recargar nginx
  docker exec cep-frontend nginx -s reload

  # Verificar
  docker exec cep-frontend ls -lh /usr/share/nginx/html/slideshow-*.webp
EOF

# 5. Verificar desde tu máquina
for i in 1 2 3; do
  echo "Verificando slideshow-$i.jpg.webp..."
  curl -I http://46.62.222.138/slideshow-$i.jpg.webp | grep content-type
done
```

---

## ✅ VERIFICACIÓN POST-DESPLIEGUE

### 1. Verificar Content-Type

```bash
curl -I http://46.62.222.138/slideshow-1.jpg.webp
```

**Esperado:**
```
HTTP/1.1 200 OK
content-type: image/webp
content-length: 47xxx
```

**❌ INCORRECTO:**
```
HTTP/1.1 200 OK
content-type: text/html
```

### 2. Verificar que es una imagen real

```bash
curl -s http://46.62.222.138/slideshow-1.jpg.webp | file -
```

**Esperado:** `WebP image data, ...`
**❌ INCORRECTO:** `HTML document`

### 3. Verificar en navegador

1. Abrir: **http://46.62.222.138**
2. **Hard refresh:** `Ctrl + Shift + R` (Windows/Linux) o `Cmd + Shift + R` (Mac)
3. Verificar que el carrusel muestra 3 imágenes rotando cada 5 segundos
4. Abrir DevTools (F12) → Network → Filter images
5. Verificar que `slideshow-*.webp` se descargan como tipo `webp` (no `html`)

---

## 🔍 TROUBLESHOOTING

### Problema: "content-type: text/html"

**Causa:** Las imágenes no están en la ubicación correcta del contenedor

**Solución:**
```bash
ssh -i /ruta/a/tu/ssh-key root@46.62.222.138
docker exec cep-frontend ls -lh /usr/share/nginx/html/ | grep slideshow
# Si no aparecen, repetir el paso de docker cp
```

### Problema: El carrusel muestra un área gris/vacía

**Causa:** Caché del navegador

**Solución:**
1. Hard refresh: `Ctrl + Shift + R`
2. Abrir en modo incógnito
3. Limpiar caché del navegador completamente

### Problema: "Permission denied" al copiar archivos

**Causa:** SSH key incorrecta o sin permisos

**Solución:**
```bash
# Verificar permisos de la SSH key
chmod 600 /ruta/a/tu/ssh-key

# Verificar que la key funciona
ssh -i /ruta/a/tu/ssh-key root@46.62.222.138 "echo OK"
# Debe devolver: OK
```

---

## 📊 RESUMEN TÉCNICO

### Cambios Realizados en el Código

**Archivo:** `src/pages/HomePage.tsx` (líneas 17-33)

**Antes:**
```javascript
image: "/images/slideshow-1.jpg"
image: "/images/slideshow-2.jpg"
image: "/images/slideshow-3.jpg"
```

**Después:**
```javascript
image: "/slideshow-1.jpg.webp"
image: "/slideshow-2.jpg.webp"
image: "/slideshow-3.jpg.webp"
```

### Imágenes Creadas

| Archivo | Tamaño | Resolución | Optimización |
|---------|--------|------------|--------------|
| slideshow-1.jpg.webp | 47KB | 1366x630 | WebP + compresión |
| slideshow-2.jpg.webp | 67KB | 1366x630 | WebP + compresión |
| slideshow-3.jpg.webp | 71KB | 1366x630 | WebP + compresión |

### Commits Realizados

1. **`b54a324`** - `fix: Corregir rutas de imágenes del carrusel homepage`
2. **`13fa3fb`** - `docs: Agregar script y documentación para fix carrusel`

**Branch:** `claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX` ✅

---

## 🎯 ESTADO ACTUAL

| Item | Estado |
|------|--------|
| Código corregido | ✅ Completado |
| Imágenes optimizadas | ✅ Completado |
| Commits & Push | ✅ Completado |
| Paquete de despliegue | ✅ Preparado |
| Despliegue al servidor | ⏳ **PENDIENTE - REQUIERE SSH** |

---

## 📞 SIGUIENTES PASOS

1. ✅ **Código listo** - No requiere más cambios
2. ⏳ **Ejecutar despliegue** - Desde sistema con acceso SSH
3. ⏳ **Verificar funcionamiento** - Probar en navegador con caché limpia

**Tiempo estimado de despliegue:** 2-3 minutos

---

**Fecha:** 2025-11-19
**Responsable:** Claude ECO - SOLARIA AGENCY
**Branch:** `claude/audit-cep-website-01C2Aj8MpXyE4jJYAQ1QkbJX`

---

## 🔗 RECURSOS ADICIONALES

- **Script automatizado:** `DEPLOY_CAROUSEL_FIX.sh`
- **Guía detallada:** `DEPLOY_CAROUSEL_FIX_SIMPLE.md`
- **Paquete completo:** `carousel-fix-deploy.tar.gz`
- **Repositorio:** https://github.com/SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION-DEV

---

**¿Necesitas ayuda con el despliegue?**

Si encuentras problemas durante el despliegue, revisa la sección **TROUBLESHOOTING** o consulta el archivo `DEPLOY_CAROUSEL_FIX_SIMPLE.md` para más detalles.
