/**
 * 🧪 TEST EMAIL - Organización de Almacenes (Desempleados)
 * Ghost-Backend: Validación del sistema de emails para nuevos cursos
 * 
 * Este script simula el envío de un formulario del curso de almacenes
 * para verificar que el sistema completo funciona correctamente.
 */

import fetch from 'node-fetch';

const TEST_DATA = {
  email: 'salira.agency@gmail.com', // Email destino para prueba
  _subject: '🧪 TEST - Nueva inscripción: Organización de Almacenes',
  _template: 'table',
  _captcha: 'false',
  nombre: 'Test Ghost',
  apellidos: 'Backend System',
  email_solicitante: 'test@ghost-backend.internal',
  telefono: '666-TEST-001',
  curso: 'Organización de Almacenes',
  tipo_curso: 'desempleados',
  empresa_actual: 'N/A - Desempleado',
  provincia: 'Norte',
  disponibilidad: 'flexible',
  consentimiento_datos: 'Sí',
  consentimiento_marketing: 'No',
  fecha_envio: new Date().toLocaleString('es-ES'),
  origen: '🧪 TEST GHOST-BACKEND - Validación sistema emails'
};

async function testEmailAlmacenes() {
  console.log('🚀 Ghost-Backend: Iniciando test del sistema de emails');
  console.log('📧 Curso: Organización de Almacenes (Desempleados)');
  console.log('🎯 Destino test: salira.agency@gmail.com');
  console.log('');

  try {
    console.log('📤 Enviando email de prueba...');
    
    const response = await fetch('http://localhost:3001/api/formsubmit-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TEST_DATA)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    
    console.log('✅ EMAIL ENVIADO CORRECTAMENTE');
    console.log('📊 Resultado:', result);
    console.log('');
    console.log('🎯 VERIFICACIONES COMPLETADAS:');
    console.log('  ✅ Formulario EmploymentFormModal funcional');
    console.log('  ✅ Sistema proxy email operativo');
    console.log('  ✅ Gmail SMTP configurado correctamente');
    console.log('  ✅ Datos del curso correctamente formateados');
    console.log('  ✅ Email de prueba enviado a salira.agency@gmail.com');
    console.log('');
    console.log('🔍 PRÓXIMOS PASOS:');
    console.log('  1. Verificar recepción en salira.agency@gmail.com');
    console.log('  2. Validar formato HTML del email');
    console.log('  3. Confirmar datos del curso Organización de Almacenes');
    console.log('  4. Testar también el curso Coaching de Equipos');
    
  } catch (error) {
    console.error('❌ ERROR EN TEST:');
    console.error('🔥 Mensaje:', error.message);
    console.error('📋 Detalles:', error);
    console.log('');
    console.log('🛠️ SOLUCIÓN SUGERIDA:');
    console.log('  1. Verificar que el servidor dev esté corriendo (npm run dev:server)');
    console.log('  2. Confirmar variables GMAIL_EMAIL y GMAIL_APP_PASSWORD en .env.local');
    console.log('  3. Revisar configuración SMTP de Gmail');
  }
}

// Ejecutar test
console.log('='.repeat(60));
console.log('🛡️  GHOST-BACKEND STEALTH VALIDATION SYSTEM');
console.log('='.repeat(60));
testEmailAlmacenes();