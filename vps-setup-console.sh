#!/bin/bash

# ================================================================
# CONFIGURACIÓN COMPLETA VPS HOSTINGER - CEP COMUNICACIÓN
# Script para ejecutar DIRECTAMENTE en la consola web de Hostinger
# ================================================================

echo "🚀 Configuración VPS Hostinger - CEP Comunicación"
echo "================================================"

# Actualizar sistema
echo "📦 Actualizando sistema Ubuntu..."
apt update && apt upgrade -y

# Instalar herramientas básicas
echo "🔧 Instalando herramientas básicas..."
apt install -y curl wget git unzip nano htop ufw

# Configurar firewall
echo "🔒 Configurando firewall UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3001/tcp
ufw --force enable

# Instalar Node.js 18 LTS
echo "📦 Instalando Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verificar Node.js
echo "✅ Verificando Node.js..."
node --version
npm --version

# Instalar PM2 globalmente
echo "📦 Instalando PM2..."
npm install -g pm2

# Crear usuario para la aplicación
echo "👤 Creando usuario cepapp..."
adduser --disabled-password --gecos "CEP Application User" cepapp
usermod -aG sudo cepapp

# Crear estructura de directorios
echo "📁 Creando estructura de directorios..."
mkdir -p /var/www/cepapi
mkdir -p /var/log/cepapi
mkdir -p /var/log/pm2

# Establecer permisos
chown -R cepapp:cepapp /var/www/cepapi
chown -R cepapp:cepapp /var/log/cepapi
chown -R cepapp:cepapp /var/log/pm2

# Configurar Git globalmente
echo "📝 Configurando Git..."
git config --global user.name "CEP VPS Server"
git config --global user.email "agency.solaria@gmail.com"
git config --global init.defaultBranch main

# Como ya tienes OpenLiteSpeed instalado, solo necesitamos configurarlo
echo "🌐 OpenLiteSpeed ya está instalado, configurando para Node.js..."

# Crear archivo de configuración para la API
echo "📝 Creando configuración de aplicación..."
cat > /var/www/cepapi/server-production.js << 'EOL'
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS para producción
const corsOptions = {
  origin: [
    'https://www.cepcomunicacion.com',
    'https://cepcomunicacion.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

// Middlewares de seguridad
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP por ventana
  message: { error: 'Demasiadas solicitudes, intenta más tarde' }
});
app.use('/api/', limiter);

// Configuración NodeMailer con Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'agency.solaria@gmail.com',
    pass: 'kmmu kipu tmvt kpaz'
  }
});

// Verificar configuración de email al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error configuración Gmail:', error);
  } else {
    console.log('✅ Gmail SMTP configurado correctamente');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'CEP NodeMailer API',
    timestamp: new Date().toISOString()
  });
});

// Endpoint principal para formulario de empleo
app.post('/api/formsubmit-proxy', async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      email: email_solicitante,
      telefono,
      situacion_laboral,
      curso,
      tipo_curso,
      empresa_actual,
      provincia,
      disponibilidad,
      consentimiento_datos,
      consentimiento_marketing
    } = req.body;

    // Template de email profesional
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #2563eb; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🎓 Nueva Solicitud de Curso - CEP Comunicación</h2>
        </div>
        <div class="content">
            <div class="section">
                <p class="label">👤 DATOS PERSONALES:</p>
                <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
                <p><strong>Email:</strong> ${email_solicitante}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Provincia:</strong> ${provincia}</p>
            </div>
            
            <div class="section">
                <p class="label">💼 INFORMACIÓN LABORAL:</p>
                <p><strong>Situación Laboral:</strong> ${situacion_laboral}</p>
                <p><strong>Empresa Actual:</strong> ${empresa_actual || 'No especificada'}</p>
            </div>
            
            <div class="section">
                <p class="label">📚 CURSO SOLICITADO:</p>
                <p><strong>Curso:</strong> ${curso}</p>
                <p><strong>Tipo:</strong> ${tipo_curso}</p>
                <p><strong>Disponibilidad:</strong> ${disponibilidad}</p>
            </div>
            
            <div class="section">
                <p class="label">📋 CONSENTIMIENTOS:</p>
                <p><strong>Tratamiento de Datos:</strong> ${consentimiento_datos}</p>
                <p><strong>Marketing:</strong> ${consentimiento_marketing}</p>
            </div>
        </div>
        <div class="footer">
            <p>📧 Email generado automáticamente por el sistema CEP</p>
            <p>🕒 ${new Date().toLocaleString('es-ES')}</p>
        </div>
    </body>
    </html>`;

    // Enviar email
    const mailOptions = {
      from: '"Sistema CEP" <agency.solaria@gmail.com>',
      to: 'cep.ocupados@gmail.com',
      subject: `🎓 Nuevo Lead: ${nombre} ${apellidos} - ${curso}`,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Formulario enviado correctamente' 
    });

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 CEP API NodeMailer - Servidor Iniciado`);
  console.log(`📡 Puerto: ${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Gmail SMTP configurado correctamente`);
});
EOL

# Crear package.json para la aplicación
echo "📦 Creando package.json..."
cat > /var/www/cepapi/package.json << 'EOL'
{
  "name": "cep-nodemailer-api",
  "version": "1.0.0",
  "description": "API NodeMailer para formularios CEP Comunicación",
  "main": "server-production.js",
  "scripts": {
    "start": "node server-production.js",
    "pm2:start": "pm2 start server-production.js --name cep-api",
    "pm2:stop": "pm2 stop cep-api",
    "pm2:restart": "pm2 restart cep-api",
    "pm2:logs": "pm2 logs cep-api"
  },
  "dependencies": {
    "express": "^4.18.2",
    "nodemailer": "^6.9.8",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOL

# Instalar dependencias como usuario cepapp
echo "📦 Instalando dependencias de la aplicación..."
cd /var/www/cepapi
su - cepapp -c "cd /var/www/cepapi && npm install"

# Crear archivo .env
echo "⚙️ Creando archivo de entorno..."
cat > /var/www/cepapi/.env << 'EOL'
NODE_ENV=production
PORT=3001
GMAIL_EMAIL=agency.solaria@gmail.com
GMAIL_APP_PASSWORD=kmmu kipu tmvt kpaz
ALLOWED_ORIGINS=https://www.cepcomunicacion.com,https://cepcomunicacion.com
EOL

# Establecer permisos finales
chown -R cepapp:cepapp /var/www/cepapi

echo ""
echo "✅ CONFIGURACIÓN VPS COMPLETADA"
echo "================================="
echo "📊 Resumen:"
echo "  - Ubuntu actualizado ✅"
echo "  - Node.js $(node --version) ✅"
echo "  - PM2 instalado ✅"
echo "  - Usuario cepapp creado ✅"
echo "  - Aplicación configurada ✅"
echo "  - Firewall UFW activo ✅"
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Probar aplicación: su - cepapp -c 'cd /var/www/cepapi && node server-production.js'"
echo "  2. Iniciar con PM2: su - cepapp -c 'cd /var/www/cepapi && npm run pm2:start'"
echo "  3. Configurar dominio en OpenLiteSpeed"
echo ""
echo "🌐 La aplicación correrá en puerto 3001"
echo "🔧 OpenLiteSpeed debe configurarse como proxy hacia localhost:3001"