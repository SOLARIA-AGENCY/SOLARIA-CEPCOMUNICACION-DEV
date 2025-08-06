// ================================================================
// SERVIDOR PRODUCCIÓN CEPCOMUNICACION.COM API
// Backend NodeMailer optimizado para VPS Hostinger
// ================================================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ================================================================
// CONFIGURACIÓN SEGURIDAD Y MIDDLEWARE
// ================================================================

// Helmet para headers de seguridad
app.use(helmet());

// Rate limiting - máximo 10 requests por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 requests por windowMs
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos.'
  }
});

// CORS configurado específicamente para cepcomunicacion.com
const corsOptions = {
  origin: [
    'https://www.cepcomunicacion.com',
    'https://cepcomunicacion.com',
    'http://localhost:5173', // Para desarrollo local
    'http://localhost:3000'  // Para desarrollo local
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Aplicar rate limiting solo a endpoints críticos
app.use('/api/', limiter);

// ================================================================
// CONFIGURACIÓN NODEMAILER GMAIL SMTP
// ================================================================

console.log('🔧 Configurando NodeMailer Gmail SMTP...');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  pool: true, // Pool de conexiones para mejor rendimiento
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10 // máximo 10 emails por segundo
});

// Verificar configuración SMTP al inicio
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error configuración Gmail SMTP:', error);
    process.exit(1);
  } else {
    console.log('✅ Gmail SMTP configurado correctamente');
  }
});

// ================================================================
// HEALTH CHECK ENDPOINT
// ================================================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'CEP API NodeMailer',
    version: '1.0.0'
  });
});

// ================================================================
// ENDPOINT PRINCIPAL - FORMULARIOS EMPLEO CEP
// ================================================================

app.post('/api/formsubmit-proxy', async (req, res) => {
  console.log('📥 Proxy FormSubmit recibido:', req.body);
  
  try {
    const {
      email,
      _subject,
      nombre,
      apellidos,
      email_solicitante,
      telefono,
      curso,
      tipo_curso,
      empresa_actual,
      provincia,
      disponibilidad,
      consentimiento_datos,
      consentimiento_marketing,
      fecha_envio,
      origen
    } = req.body;

    // Validación básica
    if (!nombre || !email_solicitante || !telefono || !curso) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes'
      });
    }

    // Preparar email HTML profesional
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Inscripción CEP Formación</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #28A745, #20C997); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">🚨 NUEVO LEAD - ACCIÓN INMEDIATA REQUERIDA</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">CURSO DE EMPLEO SUBVENCIONADO</p>
            </div>

            <!-- Contenido Principal -->
            <div style="padding: 30px;">
                <h2 style="color: #28A745; margin-top: 0;">👤 DATOS DEL SOLICITANTE</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Nombre Completo:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${nombre} ${apellidos || ''}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">📞 Teléfono:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6; color: #dc3545; font-weight: bold;">
                            <a href="tel:${telefono}" style="color: #dc3545;">${telefono}</a>
                        </td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">📧 Email:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">
                            <a href="mailto:${email_solicitante}">${email_solicitante}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">🏢 Empresa Actual:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${empresa_actual || 'No especificada'}</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">📍 Provincia:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${provincia}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">⏰ Disponibilidad:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${disponibilidad}</td>
                    </tr>
                </table>

                <h2 style="color: #007bff;">🎓 INFORMACIÓN DEL CURSO</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background: #e3f2fd;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #90caf9;">Curso:</td>
                        <td style="padding: 12px; border: 1px solid #90caf9; font-weight: bold;">${curso}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #90caf9;">Tipo:</td>
                        <td style="padding: 12px; border: 1px solid #90caf9;">${tipo_curso === 'ocupados' ? 'Trabajadores Ocupados' : 'Desempleados'}</td>
                    </tr>
                </table>

                <h2 style="color: #6f42c1;">📋 CONSENTIMIENTOS GDPR</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Tratamiento de datos:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6; color: #28a745; font-weight: bold;">${consentimiento_datos}</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Marketing:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${consentimiento_marketing}</td>
                    </tr>
                </table>

                <div style="background: #dc3545; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
                    <h2 style="color: white; margin-top: 0;">⚡ PROTOCOLO DE ACCIÓN INMEDIATA</h2>
                    <p style="margin-bottom: 0; font-size: 16px;">
                        <strong>TIEMPO MÁXIMO DE RESPUESTA: 2 HORAS</strong><br>
                        1. Contacto telefónico inmediato<br>
                        2. Verificar disponibilidad y requisitos<br>
                        3. Agendar cita para inscripción formal
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #6c757d; font-size: 14px;">
                    <strong>Sistema Automatizado CEP Formación</strong><br>
                    Lead desde <span style="color: #007bff; font-weight: bold;">${origen || 'cepcomunicacion.com'}</span><br>
                    Fecha: ${fecha_envio || new Date().toLocaleString('es-ES')}
                </p>
            </div>
        </div>
    </body>
    </html>`;

    // Configurar opciones del email
    const mailOptions = {
      from: `"CEP Formación Sistema" <${process.env.GMAIL_EMAIL}>`,
      to: 'cep.ocupados@gmail.com',
      cc: 'agency.solaria@gmail.com',
      subject: _subject || `Nueva inscripción: ${curso}`,
      html: emailHTML
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email de empleo enviado via NodeMailer - ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email enviado exitosamente',
      messageId: info.messageId,
      provider: 'NodeMailer-Gmail'
    });

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// ================================================================
// MIDDLEWARE DE MANEJO DE ERRORES
// ================================================================

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado'
  });
});

// ================================================================
// INICIAR SERVIDOR
// ================================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n================================================');
  console.log('🚀 CEP API NodeMailer - Servidor Iniciado');
  console.log('================================================');
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Gmail: ${process.env.GMAIL_EMAIL}`);
  console.log(`📨 Endpoint principal: /api/formsubmit-proxy`);
  console.log(`🔍 Health check: /health`);
  console.log('================================================\n');
});

// Manejo elegante de cierre
process.on('SIGTERM', () => {
  console.log('📴 Cerrando servidor gracefully...');
  transporter.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 Cerrando servidor gracefully...');
  transporter.close();
  process.exit(0);
});