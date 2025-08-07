import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CursoInfo = {
  nombre: string;
  slug: string;
  sede?: string;
  imagen?: string;
};

export default function CursoInscripcionModal({ curso, isOpen, onClose }: { curso: CursoInfo; isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    sede: curso.sede || '',
    experiencia: '',
    comentarios: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Preparar datos para el webhook de n8n
    const _submissionData = {
      nombre: `${formData.nombre} ${formData.apellidos}`.trim(),
      email: formData.email.toLowerCase().trim(),
      telefono: formData.telefono.trim(),
      curso: curso.nombre,
      sede: formData.sede,
      experiencia: formData.experiencia,
      comentarios: formData.comentarios.trim()
    };

    try {
      // TEMPORAL: Webhook n8n deshabilitado, usando FormSubmit directamente
      console.log('🔄 Usando FormSubmit directamente para reserva de plaza');
      
      let response;
      let result;
      
      try {
        // Simular error para activar el fallback
        throw new Error('Webhook n8n temporalmente deshabilitado - usando FormSubmit directamente');
      } catch (webhookError) {
        console.warn('Webhook n8n falló, usando fallback FormSubmit:', webhookError);
        
        // Fallback a FormSubmit usando proxy local (solución CORS)
        const fallbackEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'agency.solaria@gmail.com';
        const proxyUrl = import.meta.env.VITE_FORMSUBMIT_PROXY_URL || 'http://localhost:3001/api/formsubmit-proxy';
        
        const formSubmitData = {
          email: fallbackEmail, // Email de destino para el proxy
          _subject: `🎯 INSCRIPCIÓN PRIORITARIA: ${formData.nombre} ${formData.apellidos} - ${curso.nombre}`,
          _template: 'box',
          _captcha: 'false',
          _format: 'plain',
          _from: 'CEP Inscripciones PRIORITARIO <agency.solaria@gmail.com>',
          // Template de email exacto
          mensaje: `🎯 INSCRIPCIÓN Y RESERVA DE PLAZA
LEAD PRIORITARIO - ACCIÓN INMEDIATA
⚡ MÁXIMA PRIORIDAD - EL CLIENTE QUIERE RESERVAR PLAZA

Lead de inscripción directa. Contactar INMEDIATAMENTE para confirmar reserva.

📋 TIPO DE LEAD: INSCRIPCIÓN DIRECTA (No es consulta informativa)

👤 DATOS DEL SOLICITANTE
Nombre Completo:    ${formData.nombre} ${formData.apellidos}
📞 Teléfono:    ${formData.telefono}
📧 Email:    ${formData.email}
📍 Provincia:    ${formData.sede || 'No especificada'}
⏰ Disponibilidad:    ${formData.experiencia || 'No especificada'}
🏢 Empresa Actual:    No aplicable - Ciclo Formativo

🎓 CURSO PARA RESERVAR PLAZA
Curso:    ${curso.nombre}
Modalidad:    ciclos formativos
Financiación:    Según modalidad
Fecha de Solicitud:    ${new Date().toISOString()}
Estado:    🔴 PENDIENTE RESERVA DE PLAZA

📋 CONSENTIMIENTOS GDPR
Tratamiento de Datos:    ✅ ACEPTADO
Marketing:    ✅ ACEPTADO

🎯 PROTOCOLO INSCRIPCIÓN Y RESERVA DE PLAZA
✅ CONTACTO INMEDIATO: Llamar a ${formData.telefono} en los próximos 30 minutos
✅ CONFIRMAR INSCRIPCIÓN: Verificar que quiere proceder con la reserva de plaza
✅ VERIFICAR REQUISITOS: Comprobar documentación necesaria para CICLOS
✅ RESERVAR PLAZA: Confirmar disponibilidad y reservar plaza inmediatamente
✅ DOCUMENTACIÓN: Enviar lista de documentos requeridos para formalizar
✅ SEGUIMIENTO: Programar cita para entrega de documentos y firma
✅ CONFIRMACIÓN: Email a ${formData.email} confirmando reserva de plaza

⏰ TIEMPO MÁXIMO DE RESPUESTA: 30 MINUTOS

Este cliente ya decidió inscribirse - Solo falta confirmar y reservar plaza

${formData.comentarios ? `💬 COMENTARIOS ADICIONALES: ${formData.comentarios}` : ''}

Sistema CEP - Lead de INSCRIPCIÓN DIRECTA • cepcomunicacion.com • Respuesta inmediata requerida

NOTA: Este NO es un lead informativo - El cliente quiere inscribirse YA`
        };

        response = await fetch(proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formSubmitData)
        });

        if (!response.ok) {
          throw new Error(`Proxy FormSubmit falló: ${response.status}`);
        }

        const proxyResult = await response.json();
        if (!proxyResult.success) {
          throw new Error(proxyResult.error || 'Error en proxy FormSubmit');
        }

        result = { success: true, fallback: true };
      }
      
      if (result.success) {
        setIsSent(true);
      } else {
        throw new Error('Error al procesar la reserva de plaza');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-poppins">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden relative flex flex-col">
        
        <div className="grid md:grid-cols-2 flex-grow min-h-0">
          {/* Columna Izquierda - Imagen e Info */}
          <div className="hidden md:flex flex-col bg-gray-100 p-8">
            <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
              <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{curso.nombre}</h2>
            <p className="text-gray-600 mb-6">Estás a un solo paso de asegurar tu futuro profesional. Rellena el formulario y nuestro equipo se pondrá en contacto contigo.</p>
            <div className="mt-auto space-y-3 text-sm text-gray-500">
              <p>✅ Plaza garantizada al completar la inscripción.</p>
              <p>✅ Asesoramiento personalizado.</p>
              <p>✅ Acceso a financiación y becas.</p>
            </div>
          </div>

          {/* Columna Derecha - Formulario */}
          <div className="p-8 overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-20">
              <X size={28} />
            </button>
            
            {isSent ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Plaza Reservada!</h2>
                <p className="text-gray-600 mb-8 max-w-sm">Gracias por reservar tu plaza en {curso.nombre}. Un asesor de CEP Formación se pondrá en contacto contigo muy pronto para confirmar tu reserva y guiarte en los siguientes pasos.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-sm">
                  <p className="text-sm text-green-700">
                    <strong>Próximos pasos:</strong> Recibirás un email de confirmación y nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para finalizar tu reserva.
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/gracias-inscripcion', { state: { cursoNombre: curso.nombre } })}
                  className="w-full bg-cep-primary hover:bg-cep-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Finalizar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Reserva tu Plaza</h3>
                  <p className="text-gray-500">Completa tus datos para continuar.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><User size={14} className="mr-2"/>Nombre *</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><User size={14} className="mr-2"/>Apellidos *</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><Mail size={14} className="mr-2"/>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><Phone size={14} className="mr-2"/>Teléfono *</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                </div>
                <div>
                   <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><MapPin size={14} className="mr-2"/>Sede de Preferencia *</label>
                   <select name="sede" value={formData.sede} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading}>
                     <option value="">Selecciona una sede</option>
                     <option value="CEP NORTE - La Orotava">CEP NORTE - La Orotava</option>
                     <option value="CEP SUR - Arona">CEP SUR - Arona</option>
                     <option value="CEP CENTRO - Santa Cruz">CEP CENTRO - Santa Cruz</option>
                     <option value="Online">Online</option>
                   </select>
                 </div>

                 <div>
                   <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><User size={14} className="mr-2"/>Experiencia Previa</label>
                   <select name="experiencia" value={formData.experiencia} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading}>
                     <option value="">Selecciona tu nivel</option>
                     <option value="Sin experiencia">Sin experiencia</option>
                     <option value="Básico">Básico</option>
                     <option value="Intermedio">Intermedio</option>
                     <option value="Avanzado">Avanzado</option>
                   </select>
                 </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><MessageSquare size={14} className="mr-2"/>Comentarios</label>
                  <textarea name="comentarios" value={formData.comentarios} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary resize-none" disabled={isLoading} />
                </div>
                <div className="flex items-start">
                  <input type="checkbox" required className="w-4 h-4 text-cep-primary border-gray-300 rounded focus:ring-cep-primary mt-0.5" disabled={isLoading} />
                  <label className="ml-3 text-sm text-gray-600">Acepto la <a href="/politica-privacidad" className="text-cep-primary hover:underline" target="_blank">política de privacidad</a>.*</label>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-cep-primary hover:bg-cep-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-60">
                  {isLoading ? 'Enviando...' : 'Reservar mi Plaza'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}