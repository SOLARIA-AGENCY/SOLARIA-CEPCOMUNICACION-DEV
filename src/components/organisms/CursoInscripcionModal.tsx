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
        <div style="background-color: #f0f8ff; border-left: 5px solid #003366; padding: 15px; margin-top: 20px;">
            <h3 style="color: #003366; margin-top: 0;">🚀 ACCIONES REQUERIDAS (URGENCIA ALTA):</h3>
            <ol>
              <li><strong>Contacto Inmediato:</strong> Llamar al lead en ${formData.Telefono}.</li>
              <li><strong>Verificar Disponibilidad:</strong> Confirmar plazas en ${formData.Sede_Preferida}.</li>
              <li><strong>Enviar Información:</strong> Proveer detalles del curso vía email a ${formData.Email}.</li>
            </ol>
        </div>
        <p style="text-align: center; margin-top: 20px; font-size: 1.2em;">
          <strong style="color: #d9534f;">⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.</strong>
        </p>
      </div>
    `;

    let emailSent = false;
    let emailProvider = '';

    try {
      // OPCIÓN 1: Intentar Resend primero (si está configurado)
      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
      if (resendApiKey) {
        try {
          console.log('🔄 Intentando envío via Resend...');
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

          if (resendResponse.ok) {
            const resendData = await resendResponse.json();
            emailSent = true;
            emailProvider = 'Resend';
            console.log('✅ Email enviado via Resend:', resendData.id);
          } else {
            console.error('❌ Error con Resend:', resendResponse.status, resendResponse.statusText);
            throw new Error('Resend failed');
          }
        } catch (resendError) {
          console.error('❌ Resend falló, intentando FormSubmit...', resendError);
        }
      } else {
        console.log('⚠️ RESEND_API_KEY no configurado, usando FormSubmit...');
      }

      // OPCIÓN 2: Fallback a FormSubmit si Resend no funciona
      if (!emailSent) {
        console.log('🔄 Enviando via FormSubmit...');
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

        if (formSubmitResponse.ok) {
          emailSent = true;
          emailProvider = 'FormSubmit';
          console.log('✅ Email enviado via FormSubmit');
        } else {
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

        console.log(`✅ Formulario enviado exitosamente via ${emailProvider}`);
        window.location.href = "/gracias-form-curso";
      } else {
        throw new Error('Todos los proveedores fallaron');
      }

    } catch (error) {
      console.error("❌ Error crítico en envío:", error);
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