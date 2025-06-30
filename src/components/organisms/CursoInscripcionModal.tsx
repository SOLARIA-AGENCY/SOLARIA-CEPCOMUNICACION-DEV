import React, { useState, useEffect } from 'react';
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

    const payload = {
      ...formData,
      cursoNombre: curso.nombre,
      campaignName: "Campaña Otoño 2025",
      campaignTag: `otono-2025-${curso.slug}`,
      formOriginUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.location.href = "/gracias-form-curso";
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        alert(`Hubo un error al enviar tu solicitud: ${errorData.message}. Por favor, inténtalo de nuevo más tarde.`);
      }
    } catch (error) {
      console.error("Error de red o de envío:", error);
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