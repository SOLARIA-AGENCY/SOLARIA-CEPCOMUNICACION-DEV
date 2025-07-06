import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
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
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Sede_Preferida: curso.sede || '',
    Comentarios: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const timestamp = new Date().toLocaleString('es-ES', { timeZone: 'Atlantic/Canary', hour12: false });
    const campaignTag = `otono-2025-${curso.slug}`;
    const currentUrl = window.location.href;
    
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #D81B60 0%, #8E24AA 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { padding: 30px; }
            .section { margin-bottom: 25px; }
            .section h3 { color: #D81B60; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
            .data-row { display: flex; margin-bottom: 8px; }
            .data-row span:first-child { font-weight: 600; color: #374151; min-width: 140px; }
            .data-row span:last-child { color: #6b7280; flex: 1; }
            .highlight { background: #fdf2f8; border-left: 4px solid #D81B60; padding: 20px; border-radius: 0 8px 8px 0; }
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
                </div>
                <div class="section">
                    <h3>ℹ️ DETALLES DE LA INSCRIPCIÓN</h3>
                    <div class="data-row"><span><strong>Curso de Interés:</strong></span><span>${curso.nombre}</span></div>
                    <div class="data-row"><span><strong>Sede de Preferencia:</strong></span><span>${formData.Sede_Preferida}</span></div>
                    <div class="data-row"><span><strong>Comentarios:</strong></span><span>${formData.Comentarios || 'Sin comentarios'}</span></div>
                </div>
                <div class="section">
                    <h3>📈 DATOS DE CAMPAÑA Y SEGUIMIENTO</h3>
                    <div class="data-row"><span><strong>Campaña:</strong></span><span>${campaignTag}</span></div>
                    <div class="data-row"><span><strong>URL de Origen:</strong></span><span><a href="${currentUrl}">${currentUrl}</a></span></div>
                    <div class="data-row"><span><strong>Fecha y Hora:</strong></span><span>${timestamp}</span></div>
                </div>
            </div>
            <div class="footer">
                <p>Este es un correo automático generado por el Sistema de Gestión de Leads de CEP Formación.</p>
            </div>
        </div>
    </body>
    </html>`;

    const submissionData = {
      ...formData,
      Curso: curso.nombre,
      Sede_Curso: curso.sede || 'No especificada',
      Slug_Curso: curso.slug,
      Timestamp: timestamp,
      Campaign_Tag: campaignTag,
      Source_URL: currentUrl,
      access_key: '92602954-023b-4835-a589-b433430560f2',
      subject: `🎓 NUEVA INSCRIPCIÓN: ${curso.nombre} - ${formData.Nombre} ${formData.Apellidos}`,
      replyto: formData.Email,
      html: htmlEmail
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (result.success) {
        setIsSent(true);
      } else {
        throw new Error(result.message || 'Error desconocido en el envío');
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
                <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Inscripción Recibida!</h2>
                <p className="text-gray-600 mb-8 max-w-sm">Gracias por tu interés. Un asesor de CEP Formación se pondrá en contacto contigo muy pronto para guiarte en los siguientes pasos.</p>
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
                    <input type="text" name="Nombre" onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><User size={14} className="mr-2"/>Apellidos *</label>
                    <input type="text" name="Apellidos" onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><Mail size={14} className="mr-2"/>Email *</label>
                  <input type="email" name="Email" onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><Phone size={14} className="mr-2"/>Teléfono *</label>
                  <input type="tel" name="Telefono" onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><MapPin size={14} className="mr-2"/>Sede de Preferencia *</label>
                  <select name="Sede_Preferida" value={formData.Sede_Preferida} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary" disabled={isLoading}>
                    <option value="">Selecciona una sede</option>
                    <option value="CEP NORTE - La Orotava">CEP NORTE - La Orotava</option>
                    <option value="CEP SUR - Santa Cruz">CEP SUR - Santa Cruz</option>
                    <option value="Cualquiera">Sin preferencia</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1"><MessageSquare size={14} className="mr-2"/>Comentarios</label>
                  <textarea name="Comentarios" onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary resize-none" disabled={isLoading} />
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