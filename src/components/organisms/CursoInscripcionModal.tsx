import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Shield, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  curso: {
    nombre: string;
    sede: string;
    slug: string;
  };
}

const CursoInscripcionModal: React.FC<Props> = ({ isOpen, onClose, curso }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Sede_Preferida: curso.sede || 'Cualquiera',
    Comentarios: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aceptaRgpd, setAceptaRgpd] = useState(false);

  if (!isOpen) return null;

  const formSubmitEndpoint = 'https://formsubmit.co/agency.solaria@gmail.com';
  const thankYouUrl = `${window.location.origin}/thank-you`;
  const campaignName = "Campaña Otoño 2025";
  const campaignTag = `otono-2025-${curso.slug}`;
  const timestamp = new Date().toLocaleString('es-ES', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });
  const formOriginUrl = typeof window !== 'undefined' ? window.location.href : '';
  const emailSubject = `🎯 NUEVO LEAD - ${curso.nombre} - ${curso.sede} - ${campaignName}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    const fullMessage = `
📋 NUEVA INSCRIPCIÓN - CEP FORMACIÓN

👤 DATOS DEL LEAD:
- Nombre Completo: ${formData.Nombre} ${formData.Apellidos}
- Email: ${formData.Email}
- Teléfono: ${formData.Telefono}
- Sede de Preferencia: ${formData.Sede_Preferida}
- Comentarios: ${formData.Comentarios || 'Sin comentarios adicionales.'}

🎓 CURSO SOLICITADO:
- Curso de Interés: ${curso.nombre}
- Sede del Curso: ${curso.sede}
- Tag de Campaña: ${campaignTag}

📊 METADATOS DE SEGUIMIENTO:
- Campaña: ${campaignName}
- URL de Origen: ${formOriginUrl}
- Timestamp de Envío: ${timestamp}

🚀 ACCIONES REQUERIDAS (URGENCIA ALTA):
1.  **Contacto Inmediato:** Llamar al lead en menos de 30 minutos.
2.  **Verificar Disponibilidad:** Confirmar plazas en la sede solicitada.
3.  **Enviar Información:** Proveer detalles completos del curso vía email.
4.  **Agendar Cita:** Programar visita al centro o entrevista si es necesario.

⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.

---
📧 Copia enviada a: Solaria Agency y CEP Formación.
`;
    
    const payload = {
      ...formData,
      _cc: "cepformacion.admi@hotmail.com",
      _subject: emailSubject,
      _captcha: "false",
      "MENSAJE_COMPLETO": fullMessage,
    };

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        window.location.href = thankYouUrl;
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error de red al enviar el formulario:', error);
      alert('Hubo un error de red al enviar el formulario. Por favor, comprueba tu conexión e inténtalo de nuevo.');
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
                <strong>📞 Un asesor se pondrá en contacto contigo</strong> para formalizar la matrícula.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* --- CAMPOS VISIBLES Y CONTROLADOS POR REACT --- */}
            
            {/* Datos personales */}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="Tus apellidos"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Contacto */}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="Tu teléfono"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Sede y Comentarios */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-cep-primary" />
                Sede de Preferencia
              </label>
              <select
                name="Sede_Preferida"
                value={formData.Sede_Preferida}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base bg-white"
                disabled={isSubmitting}
              >
                <option value="Cualquiera">Cualquiera</option>
                <option value="CEP NORTE">CEP NORTE (La Orotava)</option>
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                placeholder="¿Tienes alguna pregunta o preferencia de horario para contactarte?"
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* RGPD y Botón */}
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
                    className="focus:ring-cep-primary h-5 w-5 text-cep-primary border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="aceptaRgpd" className="font-medium text-gray-700">
                    He leído y acepto la <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="text-cep-primary hover:underline">política de privacidad</a> *
                  </label>
                  <p className="text-gray-500 text-xs mt-1">
                    <Shield size={12} className="inline mr-1"/> Tus datos están seguros y solo se usarán para contactarte sobre este curso.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-opacity"
                disabled={!aceptaRgpd || isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                {isSubmitting ? 'Enviando...' : 'RESERVAR MI PLAZA AHORA'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CursoInscripcionModal; 