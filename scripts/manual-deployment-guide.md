# Guía de Deployment Manual CEP Comunicación

## 🚀 Configuración Manual de Secrets

Como GitHub CLI requiere autenticación interactiva, aquí tienes la guía manual para configurar los secrets y activar el deployment.

### 📋 Paso 1: Configurar Secrets en GitHub

1. **Ir a GitHub Repository Settings**
   ```
   https://github.com/nazcamedia/SOLARIA-CEPCOMUNICACION/settings/secrets/actions
   ```

2. **Hacer click en "New repository secret"**

3. **Configurar estos 4 secrets:**

#### Secret 1: HOSTINGER_FTP_PASSWORD
```
Name: HOSTINGER_FTP_PASSWORD
Value: [CONTRASEÑA_FTP_DE_HOSTINGER]
```

#### Secret 2: HOSTINGER_API_TOKEN
```
Name: HOSTINGER_API_TOKEN
Value: 57vN22k089rTuKpQJyxEeL2FeJLwhw43xcLbbijq39481824
```

#### Secret 3: HOSTINGER_FTP_HOST
```
Name: HOSTINGER_FTP_HOST
Value: 46.202.172.98
```

#### Secret 4: HOSTINGER_FTP_USER
```
Name: HOSTINGER_FTP_USER
Value: u882790918.cepcomunicacion.com
```

### 🔐 Obtener Contraseña FTP

Si no tienes la contraseña FTP:

1. **Login a hPanel**: https://hpanel.hostinger.com
2. **Navegar a**: Files → FTP Accounts
3. **Usuario**: u882790918.cepcomunicacion.com
4. **Copiar o reset** la contraseña

### 🚀 Paso 2: Activar Deployment

#### Opción A: Push Automático
```bash
git add .
git commit -m "🚀 Deploy CEP Comunicación to production"
git push origin main
```

#### Opción B: GitHub Actions Manual
1. Ir a: https://github.com/nazcamedia/SOLARIA-CEPCOMUNICACION/actions
2. Click en "Deploy CEP Comunicación to Production"
3. Click en "Run workflow" → "Run workflow"

### 📊 Verificar Deployment

1. **GitHub Actions**: Verificar que el workflow se ejecute sin errores
2. **Site Check**: Visitar https://www.cepcomunicacion.com
3. **Content Check**: Verificar que aparezca el contenido nuevo

### 🔍 Status Actual

#### ✅ Build Verificado
```
✓ Build size: 380.83 kB JS + 47.14 kB CSS
✓ Gzip compression: 104.39 kB JS + 8.02 kB CSS
✓ Files generated correctly in dist/
✓ Dependencies installed
```

#### ✅ DNS Configuración
```
✓ A Record: 46.202.172.98
✓ CNAME www: cepcomunicacion.com
✓ SSL: Active
✓ HTTP: 301 → HTTPS 200
```

## 🚨 Troubleshooting

### Si el Workflow Falla

#### Error: FTP Authentication Failed
- Verificar que `HOSTINGER_FTP_PASSWORD` esté correcto
- Ir a hPanel y verificar credenciales FTP

#### Error: Build Failed
```bash
# Limpiar y rebuild local
rm -rf node_modules dist
npm install
npm run build
```

#### Error: File Upload Failed
- Verificar que el directorio `/public_html/` exista en Hostinger
- Verificar permisos de escritura

### Verificación Manual via FTP

Si quieres verificar la conexión FTP manualmente:

```bash
# Instalar lftp si no está disponible
brew install lftp

# Conectar via FTP
lftp ftp://u882790918.cepcomunicacion.com@46.202.172.98
# Introducir contraseña cuando se solicite

# Una vez conectado:
ls                    # Listar archivos
cd public_html        # Navegar al directorio web
ls                    # Verificar contenido actual
```

## 🎯 Próximos Pasos

### Una vez configurado:
1. **Push automático** activará deployment en cada cambio
2. **Monitoring automático** verificará el status del site
3. **Performance tracking** analizará métricas

### Mejoras futuras:
- [ ] Slack/Discord notifications
- [ ] Staging environment
- [ ] Automated testing
- [ ] Performance budgets

---

**Preparado por**: SOLARIA.AGENCY-ECO  
**Status**: ✅ READY FOR MANUAL CONFIGURATION 