import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection: React.FC = () => {

  // --- Lógica para datos dinámicos y de campaña ---
  const thankYouUrl = `${window.location.origin}/gracias-suscripcion`;
  const campaignTag = `suscripcion-newsletter-web`;
  const timestamp = new Date().toLocaleString('es-ES', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });
  const formOriginUrl = typeof window !== 'undefined' ? window.location.href : '';
  const emailSubject = `🚀 NUEVO SUSCRIPTOR - Newsletter CEP Formación`;

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <Mail className="mx-auto text-cep-primary h-12 w-12 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Suscríbete a nuestro newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Recibe en tu correo las últimas novedades, ofertas especiales y notificaciones de nuevos cursos antes que nadie.
        </p>
        
        <form 
          action="https://formsubmit.co/agency.solaria@gmail.com" 
          method="POST" 
          className="max-w-md mx-auto"
        >
          {/* --- CAMPOS OCULTOS ENRIQUECIDOS PARA FORMSUBMIT Y AUTOMATIZACIÓN --- */}
          <input type="hidden" name="_next" value={thankYouUrl} />
          <input type="hidden" name="_subject" value={emailSubject} />
          <input type="hidden" name="_captcha" value="false" />
          
          {/* --- Campos de Campaña y Seguimiento --- */}
          <input type="hidden" name="Origen_Lead" value="Suscripción Newsletter Web" />
          <input type="hidden" name="Tag_Suscripcion" value={campaignTag} />
          <input type="hidden" name="Timestamp" value={timestamp} />
          <input type="hidden" name="URL_Origen" value={formOriginUrl} />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              name="email"
              placeholder="Tu dirección de correo electrónico"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 font-bold text-white rounded-lg bg-cep-primary hover:bg-cep-primary-dark transition-colors"
            >
              Suscribirme
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 