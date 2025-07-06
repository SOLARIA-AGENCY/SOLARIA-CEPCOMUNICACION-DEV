import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Resend de forma condicional
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('ADVERTENCIA: RESEND_API_KEY no encontrada. El envío de correos estará deshabilitado.');
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

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'CEP Development Email Server' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${port}`);
  if (resend) {
    console.log(`📧 Endpoint de correo activo: http://localhost:${port}/api/send-email`);
    console.log(`💼 Resend API configurado para: agency.solaria@gmail.com`);
  } else {
    console.log('🔌 Endpoint de correo INACTIVO. Configure RESEND_API_KEY para habilitarlo.');
  }
}); 