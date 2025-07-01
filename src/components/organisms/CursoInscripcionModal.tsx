import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Shield, Loader2 } from 'lucide-react';
import { trackCourseLeadEvent } from '../../utils/facebookConversionsAPI';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  curso: {
    nombre: string;
    sede: string;
    slug: string;
  } | null;
}

const CursoInscripcionModal: React.FC<Props> = ({ isOpen, onClose, curso }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Sede_Preferida: '',
    Comentarios: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aceptaRgpd, setAceptaRgpd] = useState(false);

  useEffect(() => {
    if (isOpen && curso) {
      setFormData(prev => ({ ...prev, Sede_Preferida: curso.sede || 'Cualquiera' }));
    }
  }, [isOpen, curso]);

  if (!isOpen || !curso) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aceptaRgpd) {
      alert("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    setIsSubmitting(true);

    // Preparar payload para tracking
    const campaignTag = `otono-2025-${curso.slug}`;
    const timestamp = new Date().toLocaleString('es-ES', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const emailSubject = `🎯 NUEVO LEAD - ${curso.nombre} - ${formData.Sede_Preferida} - Campaña Otoño 2025`;
    
    // Crear mensaje estructurado
    const mensaje = `
NUEVA SOLICITUD DE INFORMACIÓN - CEP FORMACIÓN

👤 DATOS DEL LEAD:
- Nombre Completo: ${formData.Nombre} ${formData.Apellidos || ''}
- Email: ${formData.Email}
- Teléfono: ${formData.Telefono}
- Sede de Preferencia: ${formData.Sede_Preferida}
- Comentarios: ${formData.Comentarios || 'Sin comentarios.'}

🎓 CURSO DE INTERÉS:
- Curso: ${curso.nombre}

📊 METADATOS DE SEGUIMIENTO:
- Campaña: Campaña Otoño 2025
- Tag de Campaña: ${campaignTag}
- URL de Origen: ${typeof window !== 'undefined' ? window.location.href : ''}
- Timestamp: ${timestamp}

⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.
    `;

    // HTML para Resend
    const emailHtmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #003366;">📋 NUEVA SOLICITUD DE INFORMACIÓN - CEP FORMACIÓN</h2>
        <hr>
        <h3>👤 DATOS DEL LEAD:</h3>
        <ul>
          <li><strong>Nombre Completo:</strong> ${formData.Nombre} ${formData.Apellidos || ''}</li>
          <li><strong>Email:</strong> ${formData.Email}</li>
          <li><strong>Teléfono:</strong> ${formData.Telefono}</li>
          <li><strong>Sede de Preferencia:</strong> ${formData.Sede_Preferida}</li>
          <li><strong>Comentarios:</strong> ${formData.Comentarios || 'Sin comentarios.'}</li>
        </ul>
        <h3>🎓 CURSO DE INTERÉS:</h3>
        <ul>
          <li><strong>Curso:</strong> ${curso.nombre}</li>
        </ul>
        <h3>📊 METADATOS DE SEGUIMIENTO:</h3>
        <ul>
          <li><strong>Campaña:</strong> Campaña Otoño 2025</li>
          <li><strong>Tag de Campaña:</strong> ${campaignTag}</li>
          <li><strong>URL de Origen:</strong> ${typeof window !== 'undefined' ? window.location.href : ''}</li>
          <li><strong>Timestamp:</strong> ${timestamp}</li>
        </ul>
        
        <div style="background-color: #ff4757; color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h2 style="color: white; margin-top: 0;">🚀 ACCIONES REQUERIDAS – LLAMADA AL LEAD (URGENCIA ALTA)</h2>
          
          <p style="font-size: 16px; font-weight: bold;">📞 Llamar al lead en menos de 2 horas al número: <span style="background-color: white; color: #ff4757; padding: 4px 8px; border-radius: 4px;">${formData.Telefono}</span></p>
          
          <h3 style="color: white;">🗣️ Guion sugerido de contacto:</h3>
          
          <div style="background-color: white; color: #333; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p><strong>Hola, ¿${formData.Nombre}?</strong><br>
            Te llamo desde CEP Formación, nos dejaste tus datos para recibir información sobre el curso de <strong>${curso.nombre}</strong> en nuestra sede de <strong>${formData.Sede_Preferida}</strong>. ¿Es buen momento para hablar un minuto?</p>
            
            <p>Solo quería darte la bienvenida y asegurarme de que hayas recibido el email con el temario y toda la información.<br>
            ¿Tuviste oportunidad de verlo ya?</p>
            
            <p><em>(Escuchar. Si responde que sí o muestra interés, continuar:)</em></p>
            
            <p><strong>Perfecto.</strong> Como las plazas son limitadas y estamos justo en fase de inscripción, te llamo para saber si te gustaría reservar tu plaza ahora mismo con una preinscripción sin compromiso.</p>
            
            <p>Es muy sencillo, te acompaño si lo necesitas y así te aseguras un hueco en el grupo.<br>
            ¿Te viene bien hacerlo ahora o prefieres que lo dejemos agendado para más tarde?</p>
          </div>
          
          <h3 style="color: white;">✅ Tu objetivo como operador:</h3>
          <ul style="color: white;">
            <li>Confirmar que recibió la info (email + WhatsApp)</li>
            <li>Medir interés real</li>
            <li>Ofrecer ayuda para la preinscripción directa</li>
            <li>Registrar el resultado (interesado / pendiente / no contesta)</li>
          </ul>
          
          <h3 style="color: white;">⚠️ Si no responde:</h3>
          <ul style="color: white;">
            <li>Reintentar más tarde (mínimo 2 intentos en el día)</li>
            <li>Marcar como "sin respuesta" en la hoja de control</li>
          </ul>
          
          <p style="font-size: 18px; font-weight: bold; text-align: center; color: white; margin-top: 20px;">
            ⚡ Este lead ha mostrado alto interés (formulario enviado activamente). ¡Prioriza esta llamada!
          </p>
        </div>
        
        <div style="background-color: #f0f8ff; border-left: 5px solid #003366; padding: 15px; margin-top: 20px;">
          <h3 style="color: #003366; margin-top: 0;">📋 RESUMEN RÁPIDO:</h3>
          <ul>
            <li><strong>Lead:</strong> ${formData.Nombre} ${formData.Apellidos || ''}</li>
            <li><strong>Teléfono:</strong> ${formData.Telefono}</li>
            <li><strong>Email:</strong> ${formData.Email}</li>
            <li><strong>Curso:</strong> ${curso.nombre}</li>
            <li><strong>Sede:</strong> ${formData.Sede_Preferida}</li>
            <li><strong>Prioridad:</strong> ALTA</li>
          </ul>
        </div>
      </div>
    `;

    let emailSent = false;
    let emailProvider = '';

    try {
      // VERIFICACIÓN PRIORITARIA DE RESEND
      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
      console.log('🔍 Verificando configuración Resend...');
      console.log('📋 VITE_RESEND_API_KEY configurado:', resendApiKey ? 'SÍ' : 'NO');

      // OPCIÓN 1: RESEND TIENE PRIORIDAD ABSOLUTA
      if (resendApiKey && resendApiKey.trim() !== '') {
        try {
          console.log('🚀 INICIANDO ENVÍO VIA RESEND (PRIORIDAD)...');
          
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'CEP Formación Leads <onboarding@resend.dev>',
              to: ['agency.solaria@gmail.com'],
              cc: ['cepformacion.admi@hotmail.com'],
              subject: emailSubject,
              html: emailHtmlBody,
            }),
          });

          console.log('📡 Respuesta Resend status:', resendResponse.status);

          if (resendResponse.ok) {
            const resendData = await resendResponse.json();
            emailSent = true;
            emailProvider = 'Resend';
            console.log('✅ ¡EMAIL ENVIADO VIA RESEND! ID:', resendData.id);
            console.log('🎯 RESEND FUNCIONÓ CORRECTAMENTE - NO SE USA FORMSUBMIT');
          } else {
            const errorData = await resendResponse.text();
            console.error('❌ ERROR RESEND Status:', resendResponse.status);
            console.error('❌ ERROR RESEND Response:', errorData);
            throw new Error(`Resend failed with status: ${resendResponse.status}`);
          }
        } catch (resendError) {
          console.error('❌ RESEND FALLÓ COMPLETAMENTE:', resendError);
          console.log('🔄 ACTIVANDO FORMSUBMIT COMO FALLBACK...');
        }
      } else {
        console.warn('⚠️ VITE_RESEND_API_KEY NO CONFIGURADO');
        console.log('📝 Para usar Resend como primario, configurar VITE_RESEND_API_KEY en variables de entorno');
        console.log('🔄 USANDO FORMSUBMIT COMO ÚNICO PROVEEDOR...');
      }

      // OPCIÓN 2: FORMSUBMIT SOLO SI RESEND FALLA O NO ESTÁ CONFIGURADO
      if (!emailSent) {
        console.log('🔄 INICIANDO ENVÍO VIA FORMSUBMIT...');
        const formDataSubmit = new FormData();
        formDataSubmit.append('message', mensaje);
        formDataSubmit.append('_subject', emailSubject);
        formDataSubmit.append('_captcha', 'false');
        formDataSubmit.append('_template', 'box');
        formDataSubmit.append('_cc', 'cepformacion.admi@hotmail.com');

        const formSubmitResponse = await fetch('https://formsubmit.co/ajax/agency.solaria@gmail.com', {
          method: 'POST',
          body: formDataSubmit
        });

        console.log('📡 Respuesta FormSubmit status:', formSubmitResponse.status);

        if (formSubmitResponse.ok) {
          emailSent = true;
          emailProvider = 'FormSubmit';
          console.log('✅ Email enviado via FormSubmit (fallback)');
        } else {
          console.error('❌ FormSubmit también falló:', formSubmitResponse.status);
          throw new Error('FormSubmit también falló');
        }
      }

      if (emailSent) {
        // Trackear el lead en Facebook Conversions API
        try {
          await trackCourseLeadEvent({
            email: formData.Email,
            phone: formData.Telefono,
            name: `${formData.Nombre} ${formData.Apellidos}`.trim(),
            curso: curso.nombre,
            modalidad: 'presencial'
          });
          console.log('✅ Lead trackeado en Facebook Conversions API');
        } catch (trackingError) {
          console.error('⚠️ Error al trackear en Facebook:', trackingError);
          // No interrumpir el flujo del usuario por errores de tracking
        }

        console.log(`🎉 FORMULARIO ENVIADO EXITOSAMENTE VIA ${emailProvider.toUpperCase()}`);
        console.log(`📧 Destinatarios: agency.solaria@gmail.com + cepformacion.admi@hotmail.com`);
        window.location.href = "/gracias-form-curso";
      } else {
        throw new Error('Todos los proveedores fallaron');
      }

    } catch (error) {
      console.error("❌ ERROR CRÍTICO EN ENVÍO:", error);
      alert("Error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde o contáctanos directamente al 922 219 257.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-cep-primary mb-3">Solicita Información</h2>
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-lg font-semibold text-gray-800">
                {curso.nombre} - {formData.Sede_Preferida}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Un asesor se pondrá en contacto contigo para resolver todas tus dudas.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-cep-primary" />
                  Nombre *
                </label>
                <input
                  type="text"
                  name="Nombre"
                  required
                  value={formData.Nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                  placeholder="Tu nombre"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-cep-primary" />
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="Apellidos"
                  required
                  value={formData.Apellidos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                  placeholder="Tus apellidos"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-cep-primary" />
                  Email *
                </label>
                <input
                  type="email"
                  name="Email"
                  required
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                  placeholder="tu@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-cep-primary" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="Telefono"
                  required
                  value={formData.Telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                  placeholder="Tu teléfono"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-cep-primary" />
                Sede de Preferencia
              </label>
              <select
                name="Sede_Preferida"
                value={formData.Sede_Preferida}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors bg-white"
                disabled={isSubmitting}
              >
                <option value="Cualquiera">Cualquiera</option>
                <option value="CEP NORTE (La Orotava)">CEP NORTE (La Orotava)</option>
                <option value="CEP SANTA CRUZ">CEP SANTA CRUZ</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 mr-2 text-cep-primary" />
                Comentarios (Opcional)
              </label>
              <textarea
                name="Comentarios"
                rows={3}
                value={formData.Comentarios}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                placeholder="¿Tienes alguna pregunta?"
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="aceptaRgpd"
                    name="Acepta_RGPD"
                    type="checkbox"
                    required
                    checked={aceptaRgpd}
                    onChange={(e) => setAceptaRgpd(e.target.checked)}
                    className="focus:ring-cep-primary h-4 w-4 text-cep-primary border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="aceptaRgpd" className="text-gray-600">
                    Acepto la <a href="/politica-privacidad" target="_blank" className="font-medium text-cep-primary hover:underline">política de privacidad</a> y el tratamiento de mis datos.
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-cep-primary hover:bg-cep-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cep-primary transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting || !aceptaRgpd}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Shield className="mr-3 h-5 w-5" />
                    Enviar Solicitud de Información
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CursoInscripcionModal; 