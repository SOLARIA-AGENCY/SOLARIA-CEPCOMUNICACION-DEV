import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Inicializar Resend de forma condicional (solo para cursos generales)
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('ADVERTENCIA: RESEND_API_KEY no encontrada. El envío de correos Resend estará deshabilitado.');
}

// Configurar NodeMailer para CEP (emails empleo)
let gmailTransporter;
if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
  gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    secure: true,
    tls: {
      rejectUnauthorized: false
    }
  });
  
  // Verificar conexión Gmail
  gmailTransporter.verify((error, success) => {
    if (error) {
      console.error('Error configurando Gmail:', error);
    } else {
      console.log('✅ Gmail SMTP configurado correctamente');
    }
  });
} else {
  console.warn('ADVERTENCIA: GMAIL_EMAIL y GMAIL_APP_PASSWORD no encontradas. El envío via Gmail estará deshabilitado.');
}

// Endpoint para envío de correos
app.post('/api/send-email', async (req, res) => {
  if (!resend) {
    console.error('Intento de envío de correo sin RESEND_API_KEY configurada.');
    return res.status(503).json({
      message: 'El servicio de correo no está configurado en el servidor de desarrollo.',
    });
  }

  try {
    const {
      Nombre,
      Apellidos,
      Email,
      Telefono,
      Sede_Preferida,
      Comentarios,
      cursoNombre,
      campaignName,
      campaignTag,
      formOriginUrl
    } = req.body;

    // Validación básica
    if (!Nombre || !Email || !Telefono || !cursoNombre) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios: Nombre, Email, Telefono, cursoNombre'
      });
    }

    const timestamp = new Date().toLocaleString('es-ES', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const emailSubject = `🎯 NUEVO LEAD - ${cursoNombre} - ${Sede_Preferida} - ${campaignName}`;

    const emailHtmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #003366;">📋 NUEVA SOLICITUD DE INFORMACIÓN - CEP FORMACIÓN</h2>
        <hr>
        <h3>👤 DATOS DEL LEAD:</h3>
        <ul>
          <li><strong>Nombre Completo:</strong> ${Nombre} ${Apellidos || ''}</li>
          <li><strong>Email:</strong> ${Email}</li>
          <li><strong>Teléfono:</strong> ${Telefono}</li>
          <li><strong>Sede de Preferencia:</strong> ${Sede_Preferida}</li>
          <li><strong>Comentarios:</strong> ${Comentarios || 'Sin comentarios.'}</li>
        </ul>
        <h3>🎓 CURSO DE INTERÉS:</h3>
        <ul>
          <li><strong>Curso:</strong> ${cursoNombre}</li>
        </ul>
        <h3>📊 METADATOS DE SEGUIMIENTO:</h3>
        <ul>
          <li><strong>Campaña:</strong> ${campaignName}</li>
          <li><strong>Tag de Campaña:</strong> ${campaignTag}</li>
          <li><strong>URL de Origen:</strong> ${formOriginUrl}</li>
          <li><strong>Timestamp de Envío:</strong> ${timestamp}</li>
        </ul>
        <div style="background-color: #f0f8ff; border-left: 5px solid #003366; padding: 15px; margin-top: 20px;">
            <h3 style="color: #003366; margin-top: 0;">🚀 ACCIONES REQUERIDAS (URGENCIA ALTA):</h3>
            <ol>
              <li><strong>Contacto Inmediato:</strong> Llamar al lead en ${Telefono}.</li>
              <li><strong>Verificar Disponibilidad:</strong> Confirmar plazas en ${Sede_Preferida}.</li>
              <li><strong>Enviar Información:</strong> Proveer detalles del curso vía email a ${Email}.</li>
            </ol>
        </div>
        <p style="text-align: center; margin-top: 20px; font-size: 1.2em;">
          <strong style="color: #d9534f;">⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.</strong>
        </p>
      </div>
    `;

    // Enviar correo con Resend
    const { data, error } = await resend.emails.send({
      from: 'CEP Formación Leads <onboarding@resend.dev>',
      to: ['agency.solaria@gmail.com'],
      cc: ['cepformacion.admi@hotmail.com'],
      subject: emailSubject,
      html: emailHtmlBody,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return res.status(500).json({
        message: 'Error al enviar el correo',
        error: error.message
      });
    }

    console.log(`✅ Correo enviado exitosamente - ID: ${data.id}`);
    console.log(`📧 Lead: ${Nombre} ${Apellidos} - ${Email} - Curso: ${cursoNombre}`);

    res.status(200).json({
      message: 'Correo enviado exitosamente',
      emailId: data.id
    });

  } catch (error) {
    console.error('Error en servidor de desarrollo:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Endpoint proxy para FormSubmit (formularios de empleo)
app.post('/api/formsubmit-proxy', async (req, res) => {
  try {
    console.log('📥 Proxy FormSubmit recibido:', req.body);
    
    const {
      email: destinationEmail,
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
      fecha_envio
    } = req.body;

    // Usar NodeMailer para envío directo a CEP
    if (gmailTransporter) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #28A745, #20C997); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🚨 NUEVO LEAD - ACCIÓN INMEDIATA REQUERIDA</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">CURSO DE EMPLEO SUBVENCIONADO</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-left: 5px solid #dc3545;">
            <h2 style="color: #dc3545; margin-top: 0; font-size: 20px;">⚡ URGENCIA MÁXIMA - CONTACTAR HOY</h2>
            <p style="font-size: 16px; font-weight: bold; margin: 10px 0;">
              Lead caliente esperando confirmación de plaza. <span style="color: #dc3545;">Llamar en las próximas 2 horas.</span>
            </p>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #dee2e6;">
            <h3 style="color: #28A745; border-bottom: 2px solid #28A745; padding-bottom: 10px;">👤 DATOS DEL SOLICITANTE</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">Nombre Completo:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${nombre} ${apellidos}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">📞 Teléfono:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6; color: #dc3545; font-weight: bold; font-size: 16px;">
                  <a href="tel:${telefono}" style="color: #dc3545; text-decoration: none;">${telefono}</a>
                </td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">📧 Email:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <a href="mailto:${email_solicitante}" style="color: #007bff;">${email_solicitante}</a>
                </td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">📍 Provincia:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${provincia}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">⏰ Disponibilidad:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${disponibilidad}</td>
              </tr>
              ${empresa_actual ? `
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">🏢 Empresa Actual:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${empresa_actual}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #dee2e6; margin-top: 20px;">
            <h3 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">🎓 CURSO SOLICITADO</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #e3f2fd;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Curso:</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; color: #007bff; font-size: 16px;">${curso}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Tipo:</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-transform: uppercase;">${tipo_curso}</td>
              </tr>
              <tr style="background: #e3f2fd;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Financiación:</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">100% SEPE (Gratuito)</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Fecha de Solicitud:</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${fecha_envio}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #dee2e6; margin-top: 20px;">
            <h3 style="color: #6f42c1; border-bottom: 2px solid #6f42c1; padding-bottom: 10px;">📋 CONSENTIMIENTOS GDPR</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">Tratamiento de Datos:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <span style="color: ${consentimiento_datos === 'Sí' ? '#28a745' : '#dc3545'}; font-weight: bold;">
                    ${consentimiento_datos === 'Sí' ? '✅ ACEPTADO' : '❌ NO ACEPTADO'}
                  </span>
                </td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; font-weight: bold; border: 1px solid #dee2e6;">Marketing:</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <span style="color: ${consentimiento_marketing === 'Sí' ? '#28a745' : '#6c757d'}; font-weight: bold;">
                    ${consentimiento_marketing === 'Sí' ? '✅ ACEPTADO' : '⚪ NO ACEPTADO'}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #dc3545, #c82333); padding: 20px; margin-top: 20px; border-radius: 8px; color: white;">
            <h3 style="color: white; margin-top: 0; text-align: center;">🎯 PROTOCOLO DE ACCIÓN INMEDIATA</h3>
            <ol style="font-size: 16px; line-height: 1.8;">
              <li><strong>CONTACTO TELEFÓNICO INMEDIATO:</strong> Llamar a <a href="tel:${telefono}" style="color: #fff; font-weight: bold; text-decoration: underline;">${telefono}</a> en las próximas 2 horas</li>
              <li><strong>CONFIRMAR INTERÉS:</strong> Verificar motivación y disponibilidad para el curso</li>
              <li><strong>VERIFICAR REQUISITOS:</strong> Comprobar que cumple criterios de ${tipo_curso.toUpperCase()}</li>
              <li><strong>INFORMAR PROCESO:</strong> Explicar pasos de inscripción y documentación necesaria</li>
              <li><strong>AGENDAR CITA:</strong> Programar reunión para completar inscripción formal</li>
              <li><strong>ENVIAR CONFIRMACIÓN:</strong> Email a ${email_solicitante} con detalles del curso</li>
            </ol>
          </div>

          <div style="background: #e9ecef; padding: 15px; margin-top: 20px; border-radius: 6px; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              <strong>Sistema Automatizado CEP Formación</strong> • Lead generado desde <span style="color: #007bff; font-weight: bold;">cepcomunicacion.com</span> • 
              Tiempo de respuesta objetivo: <span style="color: #dc3545; font-weight: bold;">2 horas máximo</span>
            </p>
          </div>
        </div>
      `;

      try {
        const mailOptions = {
          from: `"CEP Formación Empleos" <${process.env.GMAIL_EMAIL}>`,
          to: 'cep.ocupados@gmail.com',
          cc: 'agency.solaria@gmail.com',
          subject: _subject,
          html: emailHtml,
        };

        const info = await gmailTransporter.sendMail(mailOptions);
        console.log(`✅ Email de empleo enviado via NodeMailer - ID: ${info.messageId}`);
        return res.json({ success: true, method: 'nodemailer', emailId: info.messageId });
      } catch (nodemailerError) {
        console.error('Error de NodeMailer, usando FormSubmit como fallback:', nodemailerError);
        // Continuar con FormSubmit como fallback si falla NodeMailer
      }
    }
    
    // FormSubmit como fallback principal
    {
      // Fallback a FormSubmit directo
      const formSubmitUrl = 'https://formsubmit.co/' + (destinationEmail || 'agency.solaria@gmail.com');
      
      // Convertir a formato URLSearchParams para FormSubmit
      const formData = new URLSearchParams();
      Object.keys(req.body).forEach(key => {
        formData.append(key, req.body[key]);
      });

      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`FormSubmit error: ${response.status}`);
      }

      console.log('✅ Email de empleo enviado via FormSubmit directo');
      res.json({ success: true, method: 'formsubmit' });
    }

  } catch (error) {
    console.error('Error en proxy FormSubmit:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'CEP Development Email Server' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${port}`);
  
  if (resend) {
    console.log(`📧 Endpoint Resend activo: http://localhost:${port}/api/send-email`);
    console.log(`💼 Resend configurado para: agency.solaria@gmail.com`);
  } else {
    console.log('🔌 Resend INACTIVO. Configure RESEND_API_KEY para habilitarlo.');
  }
  
  if (gmailTransporter) {
    console.log(`📨 Endpoint Gmail/NodeMailer activo: http://localhost:${port}/api/formsubmit-proxy`);
    console.log(`💼 Gmail configurado para CEP: cep.ocupados@gmail.com + cc: agency.solaria@gmail.com`);
  } else {
    console.log('🔌 Gmail/NodeMailer INACTIVO. Configure GMAIL_EMAIL y GMAIL_APP_PASSWORD para habilitarlo.');
  }
}); 