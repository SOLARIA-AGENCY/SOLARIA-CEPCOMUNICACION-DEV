import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Sede_Preferida: '',
    Comentarios: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Construir datos del envío
    const timestamp = new Date().toLocaleString('es-ES', { 
      timeZone: 'Atlantic/Canary',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const campaignTag = `otono-2025-${curso.slug}`;
    const currentUrl = window.location.href;
    
    // Email HTML profesional para Resend
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #1e40af; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        .data-row { display: flex; margin-bottom: 8px; }
        .data-row span:first-child { font-weight: 600; color: #374151; min-width: 140px; }
        .data-row span:last-child { color: #6b7280; flex: 1; }
        .highlight { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; }
        .script { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; }
        .script p { margin: 10px 0; line-height: 1.6; }
        .script em { background: #fef3c7; padding: 2px 6px; border-radius: 4px; font-style: italic; }
        .urgent { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; }
        .urgent h3 { color: #dc2626; margin-top: 0; }
        ul { margin: 10px 0; padding-left: 20px; }
        li { margin-bottom: 6px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 NUEVA INSCRIPCIÓN CEP FORMACIÓN</h1>
            <p>Plaza reservada - Procesar con prioridad ALTA</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <h3>👤 DATOS DEL NUEVO INSCRITO</h3>
                <div class="data-row"><span><strong>Nombre Completo:</strong></span><span>${formData.Nombre} ${formData.Apellidos}</span></div>
                <div class="data-row"><span><strong>Email:</strong></span><span>${formData.Email}</span></div>
                <div class="data-row"><span><strong>Teléfono:</strong></span><span>${formData.Telefono}</span></div>
                <div class="data-row"><span><strong>Sede Preferida:</strong></span><span>${formData.Sede_Preferida}</span></div>
                <div class="data-row"><span><strong>Comentarios:</strong></span><span>${formData.Comentarios || 'Sin comentarios especiales'}</span></div>
            </div>
            
            <div class="section">
                <h3>🎓 CURSO - PLAZA RESERVADA</h3>
                <div class="data-row"><span><strong>Curso:</strong></span><span>${curso.nombre}</span></div>
                <div class="data-row"><span><strong>Sede:</strong></span><span>${formData.Sede_Preferida}</span></div>
                <div class="data-row"><span><strong>Campaña:</strong></span><span>Otoño 2025</span></div>
                <div class="data-row"><span><strong>Tag Sistema:</strong></span><span>${campaignTag}</span></div>
                <div class="data-row"><span><strong>Timestamp:</strong></span><span>${timestamp}</span></div>
                <div class="data-row"><span><strong>URL Origen:</strong></span><span>${currentUrl}</span></div>
            </div>
            
            <div class="script">
                <h3>🔥 GUIÓN PERSONALIZADO DE CONTACTO</h3>
                <p><strong>Saludo inicial:</strong></p>
                <p><em>"Hola, ¿${formData.Nombre}? Te llamo desde CEP Formación. Has reservado tu plaza para nuestro curso de ${curso.nombre} en la sede de ${formData.Sede_Preferida}. ¿Es buen momento para confirmarte los detalles?"</em></p>
                
                <p><strong>Desarrollo de la llamada:</strong></p>
                <p><em>"Perfecto, quería confirmarte que tu plaza está reservada y explicarte los próximos pasos. Tenemos toda tu información y en breve recibirás el email con el temario completo y los detalles de inicio."</em></p>
                
                <p><strong>Cierre comercial:</strong></p>
                <p><em>"Para formalizar completamente tu inscripción, solo necesitamos confirmar la modalidad de pago que prefieres. ¿Te gustaría que te explique las opciones disponibles ahora mismo?"</em></p>
            </div>
            
            <div class="highlight">
                <h3>✅ OBJETIVOS DE LA LLAMADA DE CONFIRMACIÓN</h3>
                <ul>
                    <li><strong>Confirmar reserva de plaza:</strong> El usuario ya mostró interés activo</li>
                    <li><strong>Explicar próximos pasos:</strong> Email de bienvenida, documentación</li>
                    <li><strong>Formalizar inscripción:</strong> Opciones de pago y modalidades</li>
                    <li><strong>Resolver dudas:</strong> Horarios, metodología, certificación</li>
                    <li><strong>Cerrar matrícula:</strong> Si hay interés confirmado, procesar inscripción</li>
                </ul>
            </div>
            
            <div class="urgent">
                <h3>⚡ ACCIÓN INMEDIATA REQUERIDA</h3>
                <p><strong>📞 LLAMAR EN MENOS DE 1 HORA</strong></p>
                <ul>
                    <li><strong>Teléfono:</strong> ${formData.Telefono}</li>
                    <li><strong>Prioridad:</strong> ALTA (plaza reservada activamente)</li>
                    <li><strong>Objetivo:</strong> Confirmar y formalizar inscripción</li>
                    <li><strong>Si no responde:</strong> Reintentar cada 2 horas (máximo 3 intentos/día)</li>
                    <li><strong>Whatsapp backup:</strong> Enviar mensaje profesional si no responde</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>📋 RESUMEN EJECUTIVO: ${formData.Nombre} ${formData.Apellidos} | ${curso.nombre} | ${formData.Sede_Preferida} | ${formData.Telefono}</p>
            <p>Sistema automático CEP Formación - ${timestamp}</p>
        </div>
    </div>
</body>
</html>
    `;

    // Mensaje texto para FormSubmit (backup)
    const mensajeTexto = `
📋 NUEVA INSCRIPCIÓN CEP FORMACIÓN - PLAZA RESERVADA

👤 DATOS DEL NUEVO INSCRITO:
- Nombre Completo: ${formData.Nombre} ${formData.Apellidos}
- Email: ${formData.Email}
- Teléfono: ${formData.Telefono}
- Sede Preferida: ${formData.Sede_Preferida}
- Comentarios: ${formData.Comentarios || 'Sin comentarios especiales'}

🎓 CURSO - PLAZA RESERVADA:
- Curso: ${curso.nombre}
- Sede: ${formData.Sede_Preferida}
- Campaña: Otoño 2025
- Tag Sistema: ${campaignTag}
- Timestamp: ${timestamp}
- URL Origen: ${currentUrl}

🔥 GUIÓN PERSONALIZADO DE CONTACTO:

"Hola, ¿${formData.Nombre}? Te llamo desde CEP Formación. Has reservado tu plaza para nuestro curso de ${curso.nombre} en la sede de ${formData.Sede_Preferida}. ¿Es buen momento para confirmarte los detalles?"

✅ OBJETIVOS DE LA LLAMADA:
• Confirmar reserva de plaza (usuario mostró interés activo)
• Explicar próximos pasos y documentación
• Formalizar inscripción con opciones de pago
• Resolver dudas sobre horarios y metodología
• Cerrar matrícula si hay interés confirmado

⚡ ACCIÓN INMEDIATA - LLAMAR EN MENOS DE 1 HORA
📞 Teléfono: ${formData.Telefono}
🎯 Prioridad: ALTA (plaza reservada activamente)
⚠️ Si no responde: Reintentar cada 2 horas (máximo 3 intentos/día)

📋 RESUMEN: ${formData.Nombre} ${formData.Apellidos} | ${curso.nombre} | ${formData.Sede_Preferida} | ${formData.Telefono}
    `.trim();

    try {
      console.log('🎯 INTENTANDO RESEND VIA ENDPOINT PHP (NUEVA INSCRIPCIÓN)...');
      console.log('📧 URL endpoint:', window.location.origin + '/api/resend-email.php');
      
      // INTENTAR RESEND PRIMERO (vía endpoint PHP)
      const resendResponse = await fetch('/api/resend-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: ['agency.solaria@gmail.com', 'cepformacion.admi@hotmail.com'],
          subject: `🎓 NUEVA INSCRIPCIÓN: ${curso.nombre} - ${formData.Nombre} ${formData.Apellidos} (${formData.Sede_Preferida})`,
          html: htmlEmail,
          from: 'CEP Formación <noreply@cepcomunicacion.com>'
        }),
      });

      console.log('📊 Respuesta Resend status:', resendResponse.status);
      
      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error('❌ Resend response error:', errorText);
        throw new Error(`HTTP ${resendResponse.status}: ${errorText}`);
      }

      const resendData = await resendResponse.json();
      console.log('📦 Resend response data:', resendData);
      
      if (resendData.success) {
        console.log('✅ ¡INSCRIPCIÓN ENVIADA VIA RESEND!', resendData);
        setIsLoading(false);
        setIsSent(true);
        
        // Redirigir a página de gracias después de 2 segundos
        setTimeout(() => {
          onClose();
          navigate('/gracias-inscripcion', { 
            state: { 
              curso: curso.nombre,
              nombre: formData.Nombre,
              sede: formData.Sede_Preferida,
              provider: 'resend'
            }
          });
        }, 2000);
        return;
      } else {
        throw new Error(`Resend API falló: ${resendData.error}`);
      }
      
    } catch (resendError) {
      console.warn('⚠️ RESEND FALLÓ, usando FormSubmit como backup:', resendError);
      
      // FALLBACK: FormSubmit
      try {
        console.log('🔄 USANDO FORMSUBMIT COMO BACKUP (NUEVA INSCRIPCIÓN)...');
        
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
            message: mensajeTexto,
            _cc: 'cepformacion.admi@hotmail.com',
            _subject: `🎓 NUEVA INSCRIPCIÓN: ${curso.nombre} - ${formData.Nombre} ${formData.Apellidos} (${formData.Sede_Preferida})`,
            _captcha: 'false',
            _template: 'basic'
          }),
        });

        if (formSubmitResponse.ok) {
          console.log('✅ ¡INSCRIPCIÓN ENVIADA VIA FORMSUBMIT!');
          setIsLoading(false);
          setIsSent(true);
          
          // Redirigir a página de gracias después de 2 segundos
          setTimeout(() => {
            onClose();
            navigate('/gracias-inscripcion', { 
              state: { 
                curso: curso.nombre,
                nombre: formData.Nombre,
                sede: formData.Sede_Preferida,
                provider: 'formsubmit'
              }
            });
          }, 2000);
        } else {
          throw new Error('FormSubmit también falló');
        }
        
      } catch (formSubmitError) {
        console.error('❌ AMBOS PROVIDERS FALLARON:', formSubmitError);
        alert('Error al procesar la inscripción. Por favor, intenta de nuevo o contacta directamente al centro.');
        setIsLoading(false);
      }
    }
  };

  // Estado de envío exitoso
  if (isSent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">¡Plaza Reservada!</h2>
          <p className="text-gray-600 mb-6">
            Tu inscripción para <strong>{curso.nombre}</strong> ha sido procesada exitosamente.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              ✅ Recibirás una llamada de confirmación en las próximas horas
            </p>
            <p className="text-green-700 text-sm mt-2">
              Nuestro equipo te contactará para finalizar el proceso de inscripción
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirigiendo a página de confirmación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header con imagen del curso */}
        <div className="relative">
          {/* Imagen de fondo del curso */}
          <div 
            className="h-32 bg-cover bg-center bg-gray-300"
            style={{
              backgroundImage: curso.imagen ? `url(${curso.imagen})` : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Contenido del header */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">{curso.nombre}</h2>
            <div className="flex items-center text-blue-100">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Reserva tu plaza - Sin compromiso</span>
            </div>
          </div>
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
              placeholder="922 123 456"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-cep-primary" />
              Sede de Preferencia *
            </label>
            <select
              name="Sede_Preferida"
              value={formData.Sede_Preferida}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors"
              disabled={isLoading}
            >
              <option value="">Selecciona una sede</option>
              <option value="CEP NORTE - La Orotava">CEP NORTE - La Orotava</option>
              <option value="CEP SUR - Santa Cruz">CEP SUR - Santa Cruz</option>
              <option value="Cualquiera">Sin preferencia</option>
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors resize-none"
              placeholder="Cuéntanos sobre tu interés en el curso, horarios preferidos, etc."
              disabled={isLoading}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-cep-primary border-gray-300 rounded focus:ring-cep-primary mt-0.5"
                disabled={isLoading}
              />
              <label className="ml-3 text-sm text-gray-700">
                Acepto la <a href="/politica-privacidad" className="text-cep-primary hover:underline" target="_blank">política de privacidad</a> y el tratamiento de mis datos para contacto comercial por parte de CEP Formación. *
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cep-primary to-blue-700 hover:from-blue-700 hover:to-cep-primary text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Procesando inscripción...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                🎯 RESERVAR MI PLAZA AHORA
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Al reservar tu plaza, nuestro equipo se pondrá en contacto contigo para confirmar todos los detalles y finalizar la inscripción.
          </p>
        </form>
      </div>
    </div>
  );
} 