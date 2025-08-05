# 🚀 Setup CI/CD Pipeline - Guía de Implementación

## 📋 Prerrequisitos

### 1. Repositorios GitHub
- ✅ `solaria-cepcomunicacion-dev` (desarrollo)
- ⏳ `solaria-cepcomunicacion` (producción) - **Pendiente de crear**

### 2. Servidores
- ⏳ **Staging**: staging.cepformacion.com
- ⏳ **Production**: cepformacion.com (Hostinger VPS)

### 3. Herramientas Requeridas
- Node.js 20.x
- npm 8.x+
- Playwright
- GitHub CLI (opcional)

## 🔧 Configuración Paso a Paso

### Paso 1: Instalar Dependencias de Testing

```bash
# Instalar Playwright para E2E testing
npm install -D @playwright/test
npm run install:playwright

# Instalar Lighthouse CI para performance testing
npm install -D @lhci/cli

# Verificar instalación
npm run test:e2e:ui
```

### Paso 2: Configurar GitHub Secrets

#### En `solaria-cepcomunicacion-dev`:
```bash
# Navegar a Settings > Secrets and variables > Actions
# Agregar los siguientes secrets:

STAGING_HOST=staging.cepformacion.com
STAGING_USER=deploy
STAGING_SSH_KEY=<contenido_de_la_clave_privada>
PROD_SYNC_TOKEN=<github_personal_access_token>
```

#### Generar GitHub Personal Access Token:
1. GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Scopes necesarios:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:packages` (Upload packages to GitHub Package Registry)

### Paso 3: Configurar Servidor de Staging

```bash
# Conectar al servidor staging
ssh deploy@staging.cepformacion.com

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para process management
sudo npm install -g pm2

# Crear directorio de aplicación
sudo mkdir -p /var/www/staging.cepformacion.com
sudo chown deploy:deploy /var/www/staging.cepformacion.com

# Configurar Nginx
sudo nano /etc/nginx/sites-available/staging.cepformacion.com
```

#### Configuración Nginx para Staging:
```nginx
server {
    listen 80;
    server_name staging.cepformacion.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/staging.cepformacion.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Paso 4: Crear Repositorio de Producción

```bash
# Usando GitHub CLI
gh repo create SOLARIA-AGENCY/solaria-cepcomunicacion --private --description "CEP Comunicación - Production Repository"

# O manualmente en GitHub:
# 1. Ir a https://github.com/new
# 2. Owner: SOLARIA-AGENCY
# 3. Repository name: solaria-cepcomunicacion
# 4. Private repository
# 5. No inicializar con README (se sincronizará desde dev)
```

### Paso 5: Configurar Branch Protection Rules

#### En repositorio de desarrollo:
```bash
# Proteger rama main
gh api repos/SOLARIA-AGENCY/solaria-cepcomunicacion-dev/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test","lighthouse"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

#### En repositorio de producción:
```bash
# Proteger rama main (más estricto)
gh api repos/SOLARIA-AGENCY/solaria-cepcomunicacion/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test","lighthouse","security-scan"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2}' \
  --field restrictions=null
```

### Paso 6: Configurar SSH Keys para Deployment

```bash
# Generar par de claves SSH
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Copiar clave pública al servidor
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub deploy@staging.cepformacion.com

# Agregar clave privada a GitHub Secrets
cat ~/.ssh/github_actions_deploy | pbcopy
# Pegar en STAGING_SSH_KEY secret
```

### Paso 7: Configurar Entornos en GitHub

#### Staging Environment:
1. Ir a Settings > Environments
2. Crear "staging" environment
3. Configurar:
   - Deployment branches: `staging`
   - Environment secrets: `STAGING_HOST`, `STAGING_USER`, `STAGING_SSH_KEY`
   - URL: `https://staging.cepformacion.com`

#### Production Environment:
1. Crear "production" environment
2. Configurar:
   - Required reviewers: 2 personas
   - Deployment branches: `main` only
   - Wait timer: 5 minutos
   - Environment secrets: `PROD_HOST`, `PROD_USER`, `PROD_SSH_KEY`

## 🧪 Testing del Pipeline

### Test 1: Development CI
```bash
# Crear feature branch
git checkout -b test/ci-pipeline
echo "// Test CI pipeline" >> src/test-file.ts
git add .
git commit -m "test: validate CI pipeline"
git push origin test/ci-pipeline

# Crear PR y verificar que CI pasa
gh pr create --title "Test CI Pipeline" --body "Testing automated CI pipeline"
```

### Test 2: Staging Deployment
```bash
# Merge a staging
git checkout staging
git merge main
git push origin staging

# Verificar deployment
curl -f https://staging.cepformacion.com/health
```

### Test 3: Production Sync
```bash
# Verificar que se crea PR automático en repo de producción
gh pr list --repo SOLARIA-AGENCY/solaria-cepcomunicacion
```

## 🔍 Troubleshooting

### Error: "SSH connection failed"
```bash
# Verificar conectividad SSH
ssh -i ~/.ssh/github_actions_deploy deploy@staging.cepformacion.com

# Verificar permisos de clave
chmod 600 ~/.ssh/github_actions_deploy
```

### Error: "Tests failing in CI"
```bash
# Ejecutar tests localmente
npm run ci:test

# Verificar coverage
npm run test:coverage

# Debug E2E tests
npm run test:e2e:debug
```

### Error: "Lighthouse CI failing"
```bash
# Ejecutar Lighthouse localmente
npm run build
npx serve -s dist -p 3000 &
npx lhci autorun
```

### Error: "Production sync not working"
```bash
# Verificar GitHub token permisos
gh auth status

# Verificar secrets configurados
gh secret list --repo SOLARIA-AGENCY/solaria-cepcomunicacion-dev
```

## 📊 Monitoreo Post-Setup

### Verificar Health Checks
```bash
# Staging
curl -f https://staging.cepformacion.com/health

# Production (cuando esté configurado)
curl -f https://cepformacion.com/health
```

### Verificar Métricas de Performance
```bash
# Ejecutar audit completo
npm run ci:build

# Verificar coverage
open coverage/index.html
```

### Verificar Logs de Deployment
```bash
# En servidor staging
sudo journalctl -u nginx -f
pm2 logs
```

## ✅ Checklist de Validación

### Pre-Production Checklist:
- [ ] ✅ GitHub Actions workflows configurados
- [ ] ✅ Secrets configurados correctamente
- [ ] ⏳ Servidor staging configurado
- [ ] ⏳ Repositorio producción creado
- [ ] ⏳ Branch protection rules aplicadas
- [ ] ⏳ SSH keys configuradas
- [ ] ⏳ Environments configurados
- [ ] ⏳ Tests E2E funcionando
- [ ] ⏳ Lighthouse CI configurado
- [ ] ⏳ Production sync testeado

### Post-Production Checklist:
- [ ] ⏳ Servidor producción configurado
- [ ] ⏳ Blue-green deployment implementado
- [ ] ⏳ Monitoring y alertas configuradas
- [ ] ⏳ Rollback strategy testeada
- [ ] ⏳ Team training completado
- [ ] ⏳ Documentation finalizada

## 🆘 Contacto de Emergencia

**ECO-NAZCAMEDIA DevOps Team**
- 🚨 **Emergency**: Slack #devops-emergency
- 📧 **Support**: devops@solaria.agency
- 📱 **On-call**: +1-XXX-XXX-XXXX

---

*Setup guide generado por ECO-NAZCAMEDIA*  
*Última actualización: 2024-01-15*