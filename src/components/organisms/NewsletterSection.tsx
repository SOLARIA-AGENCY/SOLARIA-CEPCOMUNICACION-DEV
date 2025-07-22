import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSectionProps {
  fixedTimestamp?: string; // Para tests determinísticos
  webhookUrl?: string; // Para configuración de entorno
}

interface SubscriptionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  fixedTimestamp, 
  webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.cepcomunicacion.com/webhook/newsletter-signup'
}) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>({
    status: 'idle',
    message: ''
  });

  // --- Lógica para datos dinámicos y de campaña ---
  const timestamp = fixedTimestamp || new Date().toISOString();
  const formOriginUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setSubscriptionState({
        status: 'error',
        message: 'Por favor, introduce tu dirección de correo electrónico.'
      });
      return;
    }

    // Establecer estado de carga inmediatamente
    setSubscriptionState({ status: 'loading', message: 'Procesando suscripción...' });
    
    // Pequeña pausa para asegurar que React actualice el DOM
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      const payload = {
        email: formData.email.toLowerCase().trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        timestamp,
        source: 'website_newsletter',
        origin_url: formOriginUrl,
        campaign_tag: 'suscripcion-newsletter-web'
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubscriptionState({
          status: 'success',
          message: result.message || '¡Suscripción exitosa! Revisa tu email para confirmar.'
        });
        
        // Limpiar formulario después del éxito
        setFormData({ email: '', firstName: '', lastName: '' });
        
        // Opcional: Redirigir después de un delay
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/gracias-suscripcion';
          }
        }, 2000);
      } else {
        throw new Error(result.message || 'Error en la suscripción');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error de conexión. Inténtalo de nuevo.'
      });
    }
  };

  const renderStatusMessage = () => {
    if (subscriptionState.status === 'idle') return null;

    const statusConfig = {
      loading: {
        icon: <Loader2 className="animate-spin h-5 w-5" />,
        className: 'bg-blue-50 text-blue-700 border-blue-200'
      },
      success: {
        icon: <CheckCircle className="h-5 w-5" />,
        className: 'bg-green-50 text-green-700 border-green-200'
      },
      error: {
        icon: <AlertCircle className="h-5 w-5" />,
        className: 'bg-red-50 text-red-700 border-red-200'
      }
    };

    const config = statusConfig[subscriptionState.status];

    return (
      <div className={`mt-4 p-4 rounded-lg border flex items-center gap-2 ${config.className}`}>
        {config.icon}
        <span>{subscriptionState.message}</span>
      </div>
    );
  };

  return (
    <section className="bg-gray-100 py-16" data-testid="newsletter-section">
      <div className="container mx-auto px-4 text-center">
        <Mail className="mx-auto text-cep-primary h-12 w-12 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Suscríbete a nuestro newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Recibe en tu correo las últimas novedades, ofertas especiales y notificaciones de nuevos cursos antes que nadie.
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          data-testid="newsletter-form"
        >
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Tu dirección de correo electrónico *"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:outline-none"
              required
              disabled={subscriptionState.status === 'loading'}
              aria-label="Email para suscripción"
              data-testid="email-input"
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Nombre (opcional)"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:outline-none"
                disabled={subscriptionState.status === 'loading'}
                data-testid="firstname-input"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Apellidos (opcional)"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:outline-none"
                disabled={subscriptionState.status === 'loading'}
                data-testid="lastname-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={subscriptionState.status === 'loading' || !formData.email}
            className="w-full px-8 py-3 font-bold text-white rounded-lg bg-cep-primary hover:bg-cep-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-testid="submit-button"
          >
            {subscriptionState.status === 'loading' ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Procesando...
              </>
            ) : (
              'Suscribirme'
            )}
          </button>

          {renderStatusMessage()}
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Al suscribirte, aceptas recibir comunicaciones de CEP Formación. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;