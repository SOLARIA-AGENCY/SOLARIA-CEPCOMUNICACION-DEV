import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Leer la clave API desde las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  // Aceptar solo peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
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
      formOriginUrl,
    } = req.body;

    if (!Nombre || !Email || !Telefono || !cursoNombre) {
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    const timestamp = new Date().toLocaleString('es-ES', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const emailSubject = `🎯 NUEVO LEAD - ${cursoNombre} - ${Sede_Preferida} - ${campaignName}`;

    // Cuerpo del email en HTML enriquecido
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
              <li><strong>Contacto Inmediato:</strong> Llamar al lead.</li>
              <li><strong>Verificar Disponibilidad:</strong> Confirmar plazas en la sede.</li>
              <li><strong>Enviar Información:</strong> Proveer detalles del curso vía email.</li>
            </ol>
        </div>
        <p style="text-align: center; margin-top: 20px; font-size: 1.2em;">
          <strong style="color: #d9534f;">⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.</strong>
        </p>
      </div>
    `;

    // Envío del correo
    const { data, error } = await resend.emails.send({
      from: 'CEP Formación Leads <onboarding@resend.dev>', // Dominio de Resend por defecto para pruebas
      to: ['agency.solaria@gmail.com'],
      cc: ['cepformacion.admi@hotmail.com'],
      subject: emailSubject,
      html: emailHtmlBody,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Error al enviar el correo.', details: error });
    }

    return res.status(200).json({ message: 'Correo enviado exitosamente.', details: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}; 