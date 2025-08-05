import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testNodeMailer() {
  console.log('🧪 Iniciando test de NodeMailer...');
  
  // Verificar variables de entorno
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Error: GMAIL_EMAIL y GMAIL_APP_PASSWORD deben estar configuradas en .env.local');
    process.exit(1);
  }
  
  if (process.env.GMAIL_APP_PASSWORD === 'replace_with_app_password') {
    console.error('❌ Error: Debes reemplazar GMAIL_APP_PASSWORD con tu App Password real');
    console.log('📋 Ver instrucciones en: setup-gmail-smtp.md');
    process.exit(1);
  }
  
  // Configurar transporter
  const transporter = nodemailer.createTransport({
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
  
  try {
    // Verificar conexión
    console.log('🔄 Verificando conexión SMTP...');
    await transporter.verify();
    console.log('✅ Conexión SMTP exitosa');
    
    // Enviar email de prueba
    console.log('📨 Enviando email de prueba...');
    const mailOptions = {
      from: `"CEP Formación Test" <${process.env.GMAIL_EMAIL}>`,
      to: 'agency.solaria@gmail.com', // Solo a nosotros para testing
      subject: '🧪 Test NodeMailer CEP - ' + new Date().toLocaleString('es-ES'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #28A745, #20C997); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🧪 TEST NODEMAILER EXITOSO</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Sistema de emails CEP funcionando correctamente</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #dee2e6;">
            <h3 style="color: #28A745; margin-top: 0;">✅ Configuración Verificada</h3>
            <ul style="color: #6c757d;">
              <li><strong>Gmail SMTP:</strong> Conectado correctamente</li>
              <li><strong>Desde:</strong> ${process.env.GMAIL_EMAIL}</li>
              <li><strong>Destinatario principal:</strong> cep.ocupados@gmail.com (en producción)</li>
              <li><strong>Copia:</strong> agency.solaria@gmail.com</li>
              <li><strong>Timestamp:</strong> ${new Date().toLocaleString('es-ES')}</li>
            </ul>
            
            <div style="background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 15px; margin-top: 20px;">
              <h4 style="color: #0c5460; margin-top: 0;">🎯 Próximo paso</h4>
              <p style="color: #0c5460; margin-bottom: 0;">
                El sistema está listo para recibir leads de empleos desde cepcomunicacion.com
              </p>
            </div>
          </div>
          
          <div style="background: #e9ecef; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              <strong>Sistema NodeMailer CEP</strong> • Test automático • 
              <span style="color: #28A745; font-weight: bold;">FUNCIONANDO CORRECTAMENTE</span>
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado exitosamente!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Enviado a:', mailOptions.to);
    console.log('');
    console.log('🎉 NodeMailer configurado y funcionando correctamente');
    console.log('📋 El sistema está listo para recibir leads de empleos');
    
  } catch (error) {
    console.error('❌ Error en test NodeMailer:', error);
    console.log('');
    console.log('🔧 Posibles soluciones:');
    console.log('1. Verificar que 2FA esté activado en Gmail');
    console.log('2. Generar nuevo App Password');
    console.log('3. Verificar que GMAIL_APP_PASSWORD no tenga espacios');
    console.log('4. Ver instrucciones completas en: setup-gmail-smtp.md');
  }
}

testNodeMailer();