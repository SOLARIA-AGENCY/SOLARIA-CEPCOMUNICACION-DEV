import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection: React.FC = () => {
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
          {/* Configuración de FormSubmit */}
          <input type="hidden" name="_next" value="https://cepcomunicacion.com/thank-you" />
          <input type="hidden" name="_subject" value="Nueva suscripción al Newsletter de CEP Formación" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

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