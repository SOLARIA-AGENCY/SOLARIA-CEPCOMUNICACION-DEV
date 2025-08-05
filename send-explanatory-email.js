import { Resend } from 'resend';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendExplanatoryEmail() {
  try {
    const emailHtml = fs.readFileSync('./email-explicativo-equipo.html', 'utf8');
    
    const { data, error } = await resend.emails.send({
      from: 'CEP Formación Sistema <onboarding@resend.dev>',
      to: ['agency.solaria@gmail.com'],
      subject: '🚀 NUEVO SISTEMA DE LEADS ACTIVADO - CEP Formación',
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return;
    }

    console.log('✅ Email explicativo enviado exitosamente!');
    console.log('📧 Email ID:', data.id);
    console.log('📬 Enviado a: agency.solaria@gmail.com');
    console.log('📋 NOTA: Reenvía manualmente a cep.ocupados@gmail.com');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

sendExplanatoryEmail();