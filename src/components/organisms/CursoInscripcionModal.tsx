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

    try {
      // Usar API NodeMailer profesional para pre-inscripciones
      console.log('📝 Enviando pre-inscripción via API NodeMailer profesional');
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://www.cepcomunicacion.com';
      
      const response = await fetch(`${apiUrl}/api/curso-preinscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          curso: curso.nombre,
          sede: formData.sede,
          experiencia: formData.experiencia,
          comentarios: formData.comentarios
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Pre-inscripción enviada via API NodeMailer:', result);
      
      // Éxito - mostrar confirmación
      setIsSent(true);

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isSent) {
      navigate('/gracias-inscripcion');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {isSent ? (
          <div className="p-6 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tu solicitud de información ha sido enviada correctamente. 
              Nos pondremos en contacto contigo en las próximas 2 horas laborables.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Continuar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  📝 Pre-inscripción
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {curso.nombre}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Sede de Preferencia
                  </label>
                  <select
                    name="sede"
                    value={formData.sede}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una sede</option>
                    <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                    <option value="Norte (Puerto de la Cruz)">Norte (Puerto de la Cruz)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiencia Previa
                  </label>
                  <input
                    type="text"
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="¿Tienes experiencia en este área?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Comentarios Adicionales
                  </label>
                  <textarea
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="¿Alguna pregunta o comentario específico?"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Solicitar Información'
                  )}
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Al enviar este formulario solicitas información sobre el curso.
                  Te contactaremos en las próximas 2 horas laborables.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}