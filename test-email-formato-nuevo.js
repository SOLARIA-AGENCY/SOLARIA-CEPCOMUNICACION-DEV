import fetch from 'node-fetch';

async function testEmailForm() {
  console.log('🧪 Probando nuevo formato de email de inscripción...\n');

  const testData = {
    email: 'agency.solaria@gmail.com',
    _subject: '🎯 INSCRIPCIÓN PRIORITARIA: Carlos Pérez López - Gestión Administrativa y Comercial',
    _template: 'box',
    _captcha: 'false',
    _format: 'plain',
    _from: 'CEP Inscripciones PRIORITARIO <agency.solaria@gmail.com>',
    mensaje: `🎯 INSCRIPCIÓN Y RESERVA DE PLAZA
LEAD PRIORITARIO - ACCIÓN INMEDIATA
⚡ MÁXIMA PRIORIDAD - EL CLIENTE QUIERE RESERVAR PLAZA

Lead de inscripción directa. Contactar INMEDIATAMENTE para confirmar reserva.

📋 TIPO DE LEAD: INSCRIPCIÓN DIRECTA (No es consulta informativa)

👤 DATOS DEL SOLICITANTE
Nombre Completo:    Carlos Pérez López
📞 Teléfono:    628987654
📧 Email:    carlos.test@cepcomunicacion.com
📍 Provincia:    Santa Cruz de Tenerife
⏰ Disponibilidad:    mañanas
🏢 Empresa Actual:    Empresa Prueba S.L.

🎓 CURSO PARA RESERVAR PLAZA
Curso:    Gestión Administrativa y Comercial
Modalidad:    ocupados
Financiación:    100% SEPE (Gratuito)
Fecha de Solicitud:    ${new Date().toISOString()}
Estado:    🔴 PENDIENTE RESERVA DE PLAZA

📋 CONSENTIMIENTOS GDPR
Tratamiento de Datos:    ✅ ACEPTADO
Marketing:    ✅ ACEPTADO

🎯 PROTOCOLO INSCRIPCIÓN Y RESERVA DE PLAZA
✅ CONTACTO INMEDIATO: Llamar a 628987654 en los próximos 30 minutos
✅ CONFIRMAR INSCRIPCIÓN: Verificar que quiere proceder con la reserva de plaza
✅ VERIFICAR REQUISITOS: Comprobar documentación necesaria para OCUPADOS
✅ RESERVAR PLAZA: Confirmar disponibilidad y reservar plaza inmediatamente
✅ DOCUMENTACIÓN: Enviar lista de documentos requeridos para formalizar
✅ SEGUIMIENTO: Programar cita para entrega de documentos y firma
✅ CONFIRMACIÓN: Email a carlos.test@cepcomunicacion.com confirmando reserva de plaza

⏰ TIEMPO MÁXIMO DE RESPUESTA: 30 MINUTOS

Este cliente ya decidió inscribirse - Solo falta confirmar y reservar plaza

💬 COMENTARIOS ADICIONALES: Prueba del nuevo sistema de emails prioritarios

Sistema CEP - Lead de INSCRIPCIÓN DIRECTA • cepcomunicacion.com • Respuesta inmediata requerida

NOTA: Este NO es un lead informativo - El cliente quiere inscribirse YA`
  };

  try {
    console.log('📤 Enviando email de prueba...');
    
    const response = await fetch('http://localhost:3001/api/formsubmit-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ EMAIL ENVIADO EXITOSAMENTE!');
      console.log(`📧 Método utilizado: ${result.method || 'proxy'}`);
      console.log('📬 Destino: agency.solaria@gmail.com');
      console.log('📋 Formato: INSCRIPCIÓN PRIORITARIA');
      console.log('\n🎯 El email debería llegar en unos segundos con el nuevo formato.');
      console.log('✨ Revisa tu bandeja de entrada en agency.solaria@gmail.com');
    } else {
      console.error('❌ Error al enviar:', result.error);
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

testEmailForm();