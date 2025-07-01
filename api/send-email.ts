import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Leer la clave API desde las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// Función de fallback usando FormSubmit
const sendViaFormSubmit = async (payload: any) => {
  const formData = new FormData();
  
  // Crear el contenido del mensaje para FormSubmit
  const mensaje = `
NUEVA SOLICITUD DE INFORMACIÓN - CEP FORMACIÓN

👤 DATOS DEL LEAD:
- Nombre Completo: ${payload.Nombre} ${payload.Apellidos || ''}
- Email: ${payload.Email}
- Teléfono: ${payload.Telefono}
- Sede de Preferencia: ${payload.Sede_Preferida}
- Comentarios: ${payload.Comentarios || 'Sin comentarios.'}

🎓 CURSO DE INTERÉS:
- Curso: ${payload.cursoNombre}

📊 METADATOS DE SEGUIMIENTO:
- Campaña: ${payload.campaignName}
- Tag de Campaña: ${payload.campaignTag}
- URL de Origen: ${payload.formOriginUrl}
- Timestamp: ${new Date().toLocaleString('es-ES')}

⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.
  `;

  formData.append('message', mensaje);
  formData.append('_subject', `🎯 NUEVO LEAD - ${payload.cursoNombre} - ${payload.Sede_Preferida}`);
  formData.append('_captcha', 'false');
  formData.append('_template', 'box');

  const response = await fetch('https://formsubmit.co/ajax/agency.solaria@gmail.com', {
    method: 'POST',
    body: formData
  });

  return response;
};

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

    // Intentar envío con Resend primero
    let emailSent = false;
    let emailProvider = '';
    
    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'CEP Formación Leads <onboarding@resend.dev>', // Dominio de Resend por defecto para pruebas
          to: ['agency.solaria@gmail.com'],
          cc: ['cepformacion.admi@hotmail.com'],
          subject: emailSubject,
          html: emailHtmlBody,
        });

        if (!error) {
          emailSent = true;
          emailProvider = 'Resend';
          console.log('✅ Email enviado via Resend:', data);
        } else {
          console.error('❌ Error con Resend:', error);
          throw new Error('Resend failed');
        }
      } catch (resendError) {
        console.error('❌ Resend falló, intentando FormSubmit...', resendError);
      }
    }

    // Fallback a FormSubmit si Resend no funciona
    if (!emailSent) {
      try {
        const formSubmitResponse = await sendViaFormSubmit({
          Nombre, Apellidos, Email, Telefono, Sede_Preferida, 
          Comentarios, cursoNombre, campaignName, campaignTag, formOriginUrl
        });

        if (formSubmitResponse.ok) {
          emailSent = true;
          emailProvider = 'FormSubmit';
          console.log('✅ Email enviado via FormSubmit');
        } else {
          throw new Error('FormSubmit failed');
        }
      } catch (formSubmitError) {
        console.error('❌ FormSubmit también falló:', formSubmitError);
      }
    }

    if (emailSent) {
      return res.status(200).json({ 
        message: 'Correo enviado exitosamente.',
        provider: emailProvider,
        timestamp: timestamp
      });
    } else {
      return res.status(500).json({ 
        message: 'Error: No se pudo enviar el correo con ningún proveedor.',
        error: 'Tanto Resend como FormSubmit fallaron' 
      });
    }

  } catch (error) {
    console.error('❌ Error general del servidor:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}; 