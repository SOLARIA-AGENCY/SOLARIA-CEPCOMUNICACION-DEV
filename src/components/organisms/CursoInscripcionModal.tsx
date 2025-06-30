import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Shield, Loader2 } from 'lucide-react';

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
    Sede_Preferida: curso?.sede || 'Cualquiera',
    Comentarios: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aceptaRgpd, setAceptaRgpd] = useState(false);

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

    const formSubmitEndpoint = 'https://formsubmit.co/agency.solaria@gmail.com';
    const campaignName = "Campaña Otoño 2025";
    const campaignTag = `otono-2025-${curso.slug}`;
    const timestamp = new Date().toLocaleString('es-ES', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
    const formOriginUrl = typeof window !== 'undefined' ? window.location.href : '';
    const emailSubject = `🎯 NUEVO LEAD - ${curso.nombre} - ${formData.Sede_Preferida} - ${campaignName}`;
    
    const fullMessage = `
    📋 NUEVA SOLICITUD DE INFORMACIÓN - CEP FORMACIÓN
    -------------------------------------------------
    👤 DATOS DEL LEAD:
    - Nombre Completo: ${formData.Nombre} ${formData.Apellidos}
    - Email: ${formData.Email}
    - Teléfono: ${formData.Telefono}
    - Sede de Preferencia: ${formData.Sede_Preferida}
    - Comentarios: ${formData.Comentarios || 'Sin comentarios.'}
    
    🎓 CURSO DE INTERÉS:
    - Curso: ${curso.nombre}
    
    📊 METADATOS DE SEGUIMIENTO:
    - Campaña: ${campaignName}
    - Tag de Campaña: ${campaignTag}
    - URL de Origen: ${formOriginUrl}
    - Timestamp de Envío: ${timestamp}
    
    🚀 ACCIONES REQUERIDAS (URGENCIA ALTA):
    1.  Contacto Inmediato: Llamar al lead.
    2.  Verificar Disponibilidad: Confirmar plazas.
    3.  Enviar Información: Proveer detalles del curso vía email.
    
    ⚡ URGENCIA: ALTA - Lead caliente esperando respuesta.
    `;

    const payload = {
      ...formData,
      _subject: emailSubject,
      _template: "table",
      _captcha: "false",
      _cc: "cepformacion.admi@hotmail.com",
      "MENSAJE COMPLETO": fullMessage,
      "URL Origen": formOriginUrl,
      "Tag Campaña": campaignTag,
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
        window.location.href = "/gracias-form-curso";
      } else {
        alert("Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde o contacta con nosotros directamente.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error de conexión. Por favor, revisa tu conexión a internet e inténtalo de nuevo.");
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
                    className="focus:ring-cep-primary h-5 w-5 text-cep-primary border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="aceptaRgpd" className="font-medium text-gray-700">
                    He leído y acepto la <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="text-cep-primary hover:underline">política de privacidad</a> *
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-gradient-to-r from-cep-primary to-pink-600 hover:from-cep-primary hover:to-pink-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !aceptaRgpd}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitud y Reservar Plaza'
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