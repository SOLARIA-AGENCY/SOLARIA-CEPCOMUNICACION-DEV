import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Loader2, Send } from 'lucide-react';

type CursoInfo = {
  nombre: string;
  slug: string;
  sede?: string;
  descripcion?: string;
  modalidad?: string[];
  duracion?: string;
  metodologia?: string;
  dirigidoA?: string[];
  objetivos?: string[];
  temario?: string[];
  salidas?: string[];
  fechas?: {
    norte?: string;
    sur?: string;
  };
  precio?: string;
  horarios?: string[];
  evaluacion?: string;
  imagen?: string;
};

export default function CursoInscripcionModal({ curso, isOpen, onClose }: { curso: CursoInfo; isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Sede_Preferida: '',
    Comentarios: ''
  });

  const [aceptaRgpd, setAceptaRgpd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isOpen && curso) {
      // El usuario selecciona manualmente su sede preferida
      setFormData(prev => ({ ...prev, Sede_Preferida: 'Cualquiera' }));
    }
  }, [isOpen, curso]);

  if (!isOpen || !curso) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aceptaRgpd) {
      alert("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    
    setIsLoading(true);
    setIsSent(false);
    
    console.log('🚀 INICIANDO ENVÍO DE FORMULARIO...');
    
    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'Atlantic/Canary',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Tag de campaña dinámico
    const campaignTag = `otono-2025-${curso.slug}`;
    
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

🚀 ACCIONES REQUERIDAS – LLAMADA AL LEAD (URGENCIA ALTA)

📞 Llamar al lead en menos de 2 horas al número: ${formData.Telefono}

🗣️ Guion sugerido de contacto:

Hola, ¿${formData.Nombre}?
Te llamo desde CEP Formación, nos dejaste tus datos para recibir información sobre el curso de ${curso.nombre} en nuestra sede de ${formData.Sede_Preferida}. ¿Es buen momento para hablar un minuto?

Solo quería darte la bienvenida y asegurarme de que hayas recibido el email con el temario y toda la información.
¿Tuviste oportunidad de verlo ya?

(Escuchar. Si responde que sí o muestra interés, continuar:)

Perfecto. Como las plazas son limitadas y estamos justo en fase de inscripción, te llamo para saber si te gustaría reservar tu plaza ahora mismo con una preinscripción sin compromiso.

Es muy sencillo, te acompaño si lo necesitas y así te aseguras un hueco en el grupo.
¿Te viene bien hacerlo ahora o prefieres que lo dejemos agendado para más tarde?

✅ Tu objetivo como operador:
• Confirmar que recibió la info (email + WhatsApp)
• Medir interés real
• Ofrecer ayuda para la preinscripción directa
• Registrar el resultado (interesado / pendiente / no contesta)

⚠️ Si no responde:
• Reintentar más tarde (mínimo 2 intentos en el día)
• Marcar como "sin respuesta" en la hoja de control

⚡ Este lead ha mostrado alto interés (formulario enviado activamente). ¡Prioriza esta llamada!

📋 RESUMEN RÁPIDO:
- Lead: ${formData.Nombre} ${formData.Apellidos || ''}
- Teléfono: ${formData.Telefono}
- Email: ${formData.Email}
- Curso: ${curso.nombre}
- Sede: ${formData.Sede_Preferida}
- Prioridad: ALTA
    `;

    // Email HTML para Resend
    const htmlEmail = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Solicitud CEP Formación</title>
    <style>
        body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 15px 0; }
        .urgent { background: #fff3e0; padding: 15px; border-left: 4px solid #ff9800; margin: 15px 0; }
        .script { background: #f3e5f5; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .data-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .phone { font-size: 1.2em; font-weight: bold; color: #2196f3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 NUEVA SOLICITUD CEP FORMACIÓN</h1>
            <p>Lead generado desde: ${typeof window !== 'undefined' ? window.location.href : ''}</p>
        </div>
        
        <div class="content">
            <div class="urgent">
                <h2>🚨 ACCIÓN INMEDIATA REQUERIDA</h2>
                <p><strong>Llamar al lead en menos de 2 horas</strong></p>
                <p class="phone">📞 ${formData.Telefono}</p>
            </div>
            
            <div class="highlight">
                <h3>👤 DATOS DEL LEAD</h3>
                <div class="data-row"><span><strong>Nombre:</strong></span><span>${formData.Nombre} ${formData.Apellidos || ''}</span></div>
                <div class="data-row"><span><strong>Email:</strong></span><span>${formData.Email}</span></div>
                <div class="data-row"><span><strong>Teléfono:</strong></span><span>${formData.Telefono}</span></div>
                <div class="data-row"><span><strong>Sede:</strong></span><span>${formData.Sede_Preferida}</span></div>
                <div class="data-row"><span><strong>Comentarios:</strong></span><span>${formData.Comentarios || 'Sin comentarios'}</span></div>
            </div>
            
            <div class="highlight">
                <h3>🎓 CURSO DE INTERÉS</h3>
                <div class="data-row"><span><strong>Curso:</strong></span><span>${curso.nombre}</span></div>
                <div class="data-row"><span><strong>Campaña:</strong></span><span>${campaignTag}</span></div>
                <div class="data-row"><span><strong>Timestamp:</strong></span><span>${timestamp}</span></div>
            </div>
            
            <div class="script">
                <h3>🗣️ GUIÓN PERSONALIZADO DE CONTACTO</h3>
                <p><strong>Saludo inicial:</strong></p>
                <p><em>"Hola, ¿${formData.Nombre}? Te llamo desde CEP Formación, nos dejaste tus datos para recibir información sobre el curso de ${curso.nombre} en nuestra sede de ${formData.Sede_Preferida}. ¿Es buen momento para hablar un minuto?"</em></p>
                
                <p><strong>Continuación:</strong></p>
                <p><em>"Solo quería darte la bienvenida y asegurarme de que hayas recibido el email con el temario y toda la información. ¿Tuviste oportunidad de verlo ya?"</em></p>
                
                <p><strong>Cierre (si muestra interés):</strong></p>
                <p><em>"Perfecto. Como las plazas son limitadas y estamos justo en fase de inscripción, te llamo para saber si te gustaría reservar tu plaza ahora mismo con una preinscripción sin compromiso. Es muy sencillo, te acompaño si lo necesitas y así te aseguras un hueco en el grupo. ¿Te viene bien hacerlo ahora o prefieres que lo dejemos agendado para más tarde?"</em></p>
            </div>
            
            <div class="highlight">
                <h3>✅ OBJETIVOS DE LA LLAMADA</h3>
                <ul>
                    <li>Confirmar que recibió la información (email + WhatsApp)</li>
                    <li>Medir interés real en el curso</li>
                    <li>Ofrecer ayuda para preinscripción directa</li>
                    <li>Registrar resultado: interesado / pendiente / no contesta</li>
                </ul>
            </div>
            
            <div class="urgent">
                <h3>⚠️ SI NO RESPONDE</h3>
                <ul>
                    <li>Reintentar más tarde (mínimo 2 intentos en el día)</li>
                    <li>Marcar como "sin respuesta" en hoja de control</li>
                    <li>Este lead ha mostrado ALTO interés (formulario activo)</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    try {
      console.log('🎯 INTENTANDO RESEND VIA ENDPOINT PHP...');
      
      // INTENTAR RESEND PRIMERO (vía endpoint PHP)
      const resendResponse = await fetch('/api/resend-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: ['agency.solaria@gmail.com', 'cepformacion.admi@hotmail.com'],
          subject: `🎓 NUEVA SOLICITUD: ${curso.nombre} - ${formData.Nombre} (${formData.Sede_Preferida})`,
          html: htmlEmail,
          from: 'CEP Formación <noreply@cepcomunicacion.com>'
        }),
      });

      const resendData = await resendResponse.json();
      
      if (resendData.success) {
        console.log('✅ ¡EMAIL ENVIADO VIA RESEND!', resendData);
        setIsLoading(false);
        setIsSent(true);
        
        // Reset form después de envío exitoso
        setTimeout(() => {
          setFormData({
            Nombre: '',
            Apellidos: '',
            Email: '',
            Telefono: '',
            Sede_Preferida: '',
            Comentarios: ''
          });
          setIsSent(false);
          onClose();
        }, 3000);
        return;
      } else {
        throw new Error(`Resend falló: ${resendData.error}`);
      }
      
    } catch (resendError) {
      console.warn('⚠️ RESEND FALLÓ, usando FormSubmit:', resendError);
      
      // FALLBACK: FormSubmit
      try {
        console.log('🔄 USANDO FORMSUBMIT COMO FALLBACK...');
        
        const formSubmitResponse = await fetch('https://formsubmit.co/ajax/agency.solaria@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nombre: formData.Nombre,
            Apellidos: formData.Apellidos,
            Email: formData.Email,
            Telefono: formData.Telefono,
            Sede_Preferida: formData.Sede_Preferida,
            Comentarios: formData.Comentarios,
            Curso: curso.nombre,
            message: mensaje,
            _cc: 'cepformacion.admi@hotmail.com',
            _subject: `🎓 NUEVA SOLICITUD: ${curso.nombre} - ${formData.Nombre} (${formData.Sede_Preferida})`,
            _captcha: 'false',
            _template: 'basic'
          }),
        });

        if (formSubmitResponse.ok) {
          console.log('✅ ¡EMAIL ENVIADO VIA FORMSUBMIT!');
          setIsLoading(false);
          setIsSent(true);
          
          // Reset form después de envío exitoso
          setTimeout(() => {
            setFormData({
              Nombre: '',
              Apellidos: '',
              Email: '',
              Telefono: '',
              Sede_Preferida: '',
              Comentarios: ''
            });
            setIsSent(false);
            onClose();
          }, 3000);
        } else {
          throw new Error('FormSubmit también falló');
        }
        
      } catch (formSubmitError) {
        console.error('❌ AMBOS PROVIDERS FALLARON:', formSubmitError);
        alert('Error al enviar el formulario. Por favor, intenta de nuevo o contacta directamente.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-cep-primary to-blue-700 text-white p-6 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-2">{curso.nombre}</h2>
          <p className="text-blue-100">Solicita información sin compromiso</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-cep-primary" />
                Nombre *
              </label>
              <input
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                placeholder="Tu nombre"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-cep-primary" />
                Apellidos
              </label>
              <input
                type="text"
                name="Apellidos"
                value={formData.Apellidos}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
                placeholder="Tus apellidos"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-cep-primary" />
              Email *
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-cep-primary" />
              Teléfono *
            </label>
            <input
              type="tel"
              name="Telefono"
              value={formData.Telefono}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
              placeholder="Tu teléfono"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-cep-primary" />
              Sede de preferencia
            </label>
            <select
              name="Sede_Preferida"
              value={formData.Sede_Preferida}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors bg-white"
              disabled={isLoading}
            >
              <option value="Cualquiera">Cualquiera</option>
              <option value="Norte">Norte</option>
              <option value="Santa Cruz">Santa Cruz</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-cep-primary" />
              Comentarios
            </label>
            <textarea
              name="Comentarios"
              value={formData.Comentarios}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
              placeholder="¿Tienes alguna pregunta?"
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="rgpd"
                type="checkbox"
                checked={aceptaRgpd}
                onChange={(e) => setAceptaRgpd(e.target.checked)}
                className="focus:ring-cep-primary h-4 w-4 text-cep-primary border-gray-300 rounded"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="rgpd" className="text-gray-700">
                Acepto la{' '}
                <a href="/politica-privacidad" target="_blank" className="text-cep-primary hover:underline">
                  política de privacidad
                </a>{' '}
                y el tratamiento de mis datos para recibir información. *
              </label>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-cep-primary hover:bg-cep-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cep-primary transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading || !aceptaRgpd}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Enviando solicitud...
                </>
              ) : isSent ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  ¡Enviado correctamente!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Solicitar información
                </>
              )}
            </button>
            
            {isSent && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="text-green-800 font-semibold">¡Solicitud enviada correctamente!</p>
                    <p className="text-green-700 text-sm">Te contactaremos pronto para proporcionarte toda la información.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 