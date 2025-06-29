import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Shield, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  curso: {
    nombre: string;
    sede: string;
    tag: string;
  };
}

const CursoInscripcionModal: React.FC<Props> = ({ isOpen, onClose, curso }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    sedePreferida: curso.sede || '',
    comentarios: '',
    preferenciasContacto: 'cualquier_hora',
    aceptaRgpd: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre || !formData.apellidos || !formData.email || !formData.telefono) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    if (!formData.aceptaRgpd) {
      setError('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    const submissionData = {
      // Datos del lead
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      sedePreferida: formData.sedePreferida,
      comentarios: formData.comentarios,
      preferenciasContacto: formData.preferenciasContacto,
      
      // Datos del curso
      curso: curso.nombre,
      sede: curso.sede,
      tag: curso.tag,
      
      // CAMPOS OCULTOS PARA TRAZABILIDAD CAMPAÑA OTOÑO 2025
      campana: 'otono-2025',
      tag_mailchimp: curso.tag, // Formato: otono-2025-[curso]-[sede]
      fuente: 'landing_web_modal',
      canal: 'organico_web',
      utm_campaign: 'cep-formacion-otono-2025',
      utm_source: 'cepcomunicacion.com',
      utm_medium: 'landing-page',
      utm_content: `${curso.nombre.toLowerCase().replace(/\s+/g, '-')}-${curso.sede.toLowerCase()}`,
      
      // Metadatos técnicos
      procedencia: 'landing_web_modal',
      tipo: 'reserva_plaza',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      
      // IDENTIFICADORES META ADS (se rellenarán automáticamente cuando vengan de FB)
      fb_lead_id: null, // Se completará si viene de Meta Ads
      ad_id: null, // Se completará si viene de Meta Ads  
      adset_id: null, // Se completará si viene de Meta Ads
      campaign_id: null, // Se completará si viene de Meta Ads
    };

    try {
      // 📧 ENVÍO A SOLARIA AGENCY (PRUEBA) usando FormSubmit.co
      const notificationEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'agency.solaria@gmail.com';
      const cepEmail = 'cepformacion.admi@hotmail.com';
      const formSubmitEndpoint = import.meta.env.VITE_FORMSUBMIT_ENDPOINT || `https://formsubmit.co/ajax/${notificationEmail}`;
      
      const formData_email = new FormData();
      formData_email.append('_to', notificationEmail);
      formData_email.append('_subject', `🎯 PRUEBA FORMULARIO - ${curso.nombre} - ${curso.sede} - Campaña Otoño 2025`);
      // formData_email.append('_cc', cepEmail); // COMENTADO PARA PRUEBAS - Descomentar en producción
      formData_email.append('_template', 'table');
      formData_email.append('_captcha', 'false');
      
      // Datos del lead
      formData_email.append('Nombre', formData.nombre);
      formData_email.append('Apellidos', formData.apellidos);
      formData_email.append('Email', formData.email);
      formData_email.append('Telefono', formData.telefono);
      formData_email.append('Sede_Preferida', formData.sedePreferida);
      formData_email.append('Horario_Contacto', formData.preferenciasContacto);
      formData_email.append('Comentarios', formData.comentarios || 'Sin comentarios adicionales');
      
      // Datos del curso
      formData_email.append('Curso', curso.nombre);
      formData_email.append('Sede_Curso', curso.sede);
      formData_email.append('Tag_Campana', curso.tag);
      formData_email.append('Campana', 'otono-2025');
      
      // Metadatos
      formData_email.append('Timestamp', new Date().toLocaleString('es-ES', { 
        timeZone: 'Atlantic/Canary',
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
      formData_email.append('URL_Origen', window.location.href);
      
      // Mensaje completo formateado
      formData_email.append('MENSAJE_COMPLETO', `
📋 🧪 PRUEBA FORMULARIO CEP FORMACIÓN

👤 DATOS DEL LEAD:
- Nombre: ${formData.nombre} ${formData.apellidos}
- Email: ${formData.email}
- Teléfono: ${formData.telefono}
- Sede preferida: ${formData.sedePreferida}
- Horario contacto: ${formData.preferenciasContacto}
- Comentarios: ${formData.comentarios || 'Sin comentarios'}

🎓 CURSO SOLICITADO:
- Curso: ${curso.nombre}
- Sede: ${curso.sede}
- Tag campaña: ${curso.tag}

📊 INFORMACIÓN DE CAMPAÑA:
- Campaña: Otoño 2025
- Origen: ${window.location.href}
- Fecha/Hora: ${new Date().toLocaleString('es-ES', { timeZone: 'Atlantic/Canary' })}

🚀 ACCIÓN REQUERIDA:
1. Contactar al lead en menos de 30 minutos
2. Verificar disponibilidad en la sede preferida  
3. Enviar información detallada del curso
4. Programar visita/entrevista si es necesario

⚡ URGENCIA: ALTA - Lead esperando respuesta inmediata

📧 ENVIADO A: 
- Solaria Agency: agency.solaria@gmail.com
- ⚠️ PRUEBA: No se envía a CEP Formación durante las pruebas
      `);

      // Enviar email usando FormSubmit.co
      const emailResponse = await fetch(formSubmitEndpoint, {
        method: 'POST',
        body: formData_email
      });

      if (!emailResponse.ok) {
        throw new Error('Error enviando email');
      }

      console.log('📤 Email de PRUEBA enviado a agency.solaria@gmail.com:', submissionData);
      
      // TODO: Implementar webhook a n8n (mantener para implementación futura)
      // const response = await fetch('https://tu-instancia-n8n.com/webhook/cep-inscripciones', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(submissionData),
      // });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('❌ Error enviando formulario:', error);
      setError('Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            {/* Header optimizado para conversión */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cep-primary to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-cep-primary mb-3">¡Reserva tu Plaza!</h2>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  🏆 {curso.nombre} - {curso.sede}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>✅ Esta inscripción es para separar tu plaza</strong><br/>
                  <strong>📞 Un operador de CEP Formación se pondrá en contacto contigo</strong> para formalizar la matrícula y resolver todas tus dudas
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Datos personales */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-cep-primary" />
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-cep-primary" />
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    required
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-cep-primary" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-cep-primary" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="922 000 000"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-cep-primary" />
                  Sede preferida *
                </label>
                <select
                  name="sedePreferida"
                  required
                  value={formData.sedePreferida}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                >
                  <option value="">Seleccionar sede</option>
                  <option value="Norte">CEP NORTE - La Orotava</option>
                  <option value="Santa Cruz">CEP SANTA CRUZ</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-cep-primary" />
                  ¿Cuándo prefieres que te contactemos?
                </label>
                <select
                  name="preferenciasContacto"
                  value={formData.preferenciasContacto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                >
                  <option value="cualquier_hora">Cualquier hora (9:00 - 20:00)</option>
                  <option value="mananas">Solo mañanas (9:00 - 14:00)</option>
                  <option value="tardes">Solo tardes (14:00 - 20:00)</option>
                  <option value="fines_semana">Fines de semana</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 mr-2 text-cep-primary" />
                  Comentarios adicionales (opcional)
                </label>
                <textarea
                  name="comentarios"
                  rows={3}
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="Cuéntanos si tienes alguna duda específica o preferencia..."
                />
              </div>

              {/* RGPD */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="aceptaRgpd"
                    id="aceptaRgpd"
                    required
                    checked={formData.aceptaRgpd}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 w-4 h-4 text-cep-primary border-gray-300 rounded focus:ring-cep-primary"
                  />
                  <label htmlFor="aceptaRgpd" className="text-sm text-gray-700">
                    <Shield className="w-4 h-4 inline mr-1 text-blue-600" />
                    <strong>Acepto la política de privacidad</strong> y autorizo a CEP Formación a contactarme por email, teléfono o WhatsApp para fines informativos relacionados con este curso. 
                    <a href="/politica-privacidad" target="_blank" className="text-cep-primary underline ml-1">Ver política completa</a>
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-gray-900 font-bold py-4 px-6 rounded-lg text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando solicitud...
                  </span>
                ) : (
                  '🎯 RESERVAR MI PLAZA AHORA'
                )}
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                ⚡ <strong>¡Respuesta inmediata!</strong> Te contactaremos en menos de 30 minutos para confirmar tu plaza
              </p>
            </form>
          </div>
        ) : (
          // Pantalla de confirmación
          <div className="p-6 sm:p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">¡Plaza Reservada!</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold text-green-800 mb-3">
                🎉 ¡Gracias {formData.nombre}!
              </p>
              <p className="text-green-700 mb-4">
                Tu plaza en <strong>{curso.nombre} - {curso.sede}</strong> ha sido reservada exitosamente.
              </p>
              
              <div className="bg-white rounded-lg p-4 text-left">
                <h4 className="font-bold text-green-800 mb-2">📋 Próximos pasos:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Recibirás un email de confirmación</li>
                  <li>✅ Te enviaremos un WhatsApp con información adicional</li>
                  <li>📞 Un operador de CEP se pondrá en contacto contigo para formalizar la matrícula</li>
                  <li>📚 Te enviaremos el temario completo y toda la documentación</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="bg-cep-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-cep-primary/90 transition-colors"
            >
              Cerrar
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              ⏰ Te contactaremos en las próximas 2 horas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursoInscripcionModal; 