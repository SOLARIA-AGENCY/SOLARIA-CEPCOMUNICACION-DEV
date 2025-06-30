import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Shield } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  curso: {
    nombre: string;
    sede: string;
    slug: string; // Añadir slug para usar en los campos ocultos
  };
}

const CursoInscripcionModal: React.FC<Props> = ({ isOpen, onClose, curso }) => {
  const [aceptaRgpd, setAceptaRgpd] = useState(false);

  if (!isOpen) return null;

  // --- Lógica para datos dinámicos y de campaña ---
  const formSubmitEndpoint = 'https://formsubmit.co/agency.solaria@gmail.com';
  const thankYouUrl = `${window.location.origin}/thank-you`;
  const campaignName = "Campaña Otoño 2025";
  const campaignTag = `otono-2025-${curso.slug}`;
  const timestamp = new Date().toLocaleString('es-ES', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });
  const formOriginUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Asunto dinámico para el correo electrónico
  const emailSubject = `🎯 NUEVO LEAD - ${curso.nombre} - ${curso.sede} - ${campaignName}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
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

          <form action={formSubmitEndpoint} method="POST" className="space-y-4">
            {/* --- CAMPOS OCULTOS ENRIQUECIDOS PARA FORMSUBMIT Y AUTOMATIZACIÓN --- */}
            <input type="hidden" name="_cc" value="cepformacion.admi@hotmail.com" />
            <input type="hidden" name="_subject" value={emailSubject} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={thankYouUrl} />
            
            {/* --- Campos de Datos del Curso --- */}
            <input type="hidden" name="Curso" value={curso.nombre} />
            <input type="hidden" name="Sede_Curso" value={curso.sede} />

            {/* --- Campos de Campaña y Seguimiento --- */}
            <input type="hidden" name="Campana" value={campaignName} />
            <input type="hidden" name="Tag_Campana" value={campaignTag} />
            <input type="hidden" name="Timestamp" value={timestamp} />
            <input type="hidden" name="URL_Origen" value={formOriginUrl} />
            <input type="hidden" name="Origen_Lead" value="Modal Inscripción Web" />
            
            {/* --- CAMPOS VISIBLES PARA EL USUARIO --- */}
            
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
                  name="Apellidos"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="Tus apellidos"
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
                  name="Telefono"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                  placeholder="Tu teléfono"
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
                defaultValue={curso.sede}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base bg-white"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-base"
                placeholder="¿Tienes alguna pregunta o preferencia de horario para contactarte?"
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
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                disabled={!aceptaRgpd}
              >
                RESERVAR MI PLAZA AHORA
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CursoInscripcionModal; 