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
app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitado para desarrollo
}));

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
// ENDPOINT CURSOS PRIVADOS - PRE-INSCRIPCIONES CEP
// ================================================================

app.post('/api/curso-preinscripcion', async (req, res) => {
  console.log('📝 Pre-inscripción curso privado recibida:', req.body);
  
  try {
    const {
      nombre,
      apellidos,
      email,
      telefono,
      curso,
      sede,
      experiencia,
      comentarios
    } = req.body;

    // Validación básica
    if (!nombre || !email || !telefono || !curso) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes'
      });
    }

    // Preparar email HTML profesional para pre-inscripciones
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pre-inscripción Curso Privado CEP</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6f42c1, #5a31a3); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">📋 PRE-INSCRIPCIÓN Y SOLICITUD DE INFORMACIÓN</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">LEAD DE PRE-INSCRIPCIÓN - CONTACTAR PARA INFORMAR</p>
            </div>

            <!-- Contenido Principal -->
            <div style="padding: 30px;">
                <div style="background: #f3e5ff; border-left: 4px solid #6f42c1; padding: 15px; margin-bottom: 20px;">
                    <p style="margin: 0; font-weight: bold; color: #6f42c1; font-size: 14px;">💼 CLIENTE INTERESADO - REQUIERE INFORMACIÓN Y FORMALIZACIÓN</p>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Cliente solicita información completa y proceso de formalización.</p>
                </div>

                <div style="background: #6f42c1; color: white; padding: 12px; margin-bottom: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 13px; font-weight: bold;">📋 TIPO DE LEAD: PRE-INSCRIPCIÓN (Requiere información y formalización)</p>
                </div>

                <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; font-size: 14px; border-left: 3px solid #6f42c1;">👤 DATOS DEL CLIENTE</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; line-height: 1.6;">
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6; width: 140px;">Nombre Completo:</td>
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
                            <a href="mailto:${email}">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">📍 Sede:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${sede || 'No especificada'}</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">🎓 Experiencia:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">${experiencia || 'No especificada'}</td>
                    </tr>
                </table>

                <h3 style="background: #f5f5f5; padding: 10px; margin: 20px 0 15px 0; font-size: 14px; border-left: 3px solid #6f42c1;">🎓 CURSO DE INTERÉS</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; line-height: 1.6;">
                    <tr style="background: #f3e5ff;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #c084fc; width: 140px;">Curso:</td>
                        <td style="padding: 12px; border: 1px solid #c084fc; font-weight: bold;">${curso}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #c084fc;">Modalidad:</td>
                        <td style="padding: 12px; border: 1px solid #c084fc;">Privado/Ciclo Formativo</td>
                    </tr>
                    <tr style="background: #f3e5ff;">
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #c084fc;">Financiación:</td>
                        <td style="padding: 12px; border: 1px solid #c084fc;">Consultar condiciones y precios</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; border: 1px solid #c084fc;">Estado:</td>
                        <td style="padding: 12px; border: 1px solid #c084fc; color: #f59e0b; font-weight: bold;">🟡 PENDIENTE INFORMACIÓN Y FORMALIZACIÓN</td>
                    </tr>
                </table>

                ${comentarios ? `
                <h3 style="background: #f5f5f5; padding: 10px; margin: 20px 0 15px 0; font-size: 14px; border-left: 3px solid #6f42c1;">💬 COMENTARIOS ADICIONALES</h3>
                <div style="background: #f8f9fa; padding: 15px; border-left: 3px solid #6c757d; margin-bottom: 20px;">
                    <p style="margin: 0; font-style: italic;">${comentarios}</p>
                </div>
                ` : ''}

                <div style="background: #6f42c1; color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h2 style="color: white; margin-top: 0;">📞 PROTOCOLO PRE-INSCRIPCIÓN</h2>
                    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.8;">
                        <li><strong>CONTACTO:</strong> Llamar a ${telefono} en las próximas 2 horas</li>
                        <li><strong>INFORMAR CONDICIONES:</strong> Explicar programa, duración, precios y modalidades de pago</li>
                        <li><strong>VERIFICAR REQUISITOS:</strong> Comprobar documentación y requisitos de acceso</li>
                        <li><strong>ENVIAR INFORMACIÓN:</strong> Email con programa completo, precios y condiciones</li>
                        <li><strong>PROGRAMAR CITA:</strong> Agendar visita para formalización si está interesado</li>
                        <li><strong>SEGUIMIENTO:</strong> Llamada de seguimiento en 3-5 días laborables</li>
                        <li><strong>FORMALIZACIÓN:</strong> Proceso de matrícula una vez confirmado interés</li>
                    </ul>
                </div>

                <div style="background: #f59e0b; color: white; padding: 15px; border-radius: 5px; text-align: center; margin-top: 15px;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold;">⏰ TIEMPO MÁXIMO DE RESPUESTA: 2 HORAS LABORABLES</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px;">Este cliente necesita información completa antes de formalizar</p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #6c757d; font-size: 14px;">
                    <strong>Sistema Automatizado CEP Formación - Pre-inscripciones</strong><br>
                    Lead desde <span style="color: #6f42c1; font-weight: bold;">cepcomunicacion.com</span><br>
                    Fecha: ${new Date().toLocaleString('es-ES')}
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #dc3545; font-weight: bold;">
                    NOTA: Cliente en fase de información - Requiere asesoramiento personalizado
                </p>
            </div>
        </div>
    </body>
    </html>`;

    // Configurar opciones del email
    const mailOptions = {
      from: `"CEP Pre-inscripciones" <${process.env.GMAIL_EMAIL}>`,
      to: 'agency.solaria@gmail.com',
      subject: `📋 PRE-INSCRIPCIÓN PENDIENTE: ${nombre} ${apellidos || ''} - ${curso}`,
      html: emailHTML
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email de pre-inscripción enviado via NodeMailer - ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Pre-inscripción enviada exitosamente',
      messageId: info.messageId,
      provider: 'NodeMailer-Gmail'
    });

  } catch (error) {
    console.error('❌ Error enviando pre-inscripción:', error);
    
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
  console.log(`📨 Endpoint empleo: /api/formsubmit-proxy`);
  console.log(`📋 Endpoint pre-inscripciones: /api/curso-preinscripcion`);
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