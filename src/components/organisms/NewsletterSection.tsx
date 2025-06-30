import React, { useState } from 'react';
import { Mail, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Por favor, introduce una dirección de correo válida.');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || '¡Gracias por suscribirte! Revisa tu correo para confirmar.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Ha ocurrido un error. Inténtalo de nuevo.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('No se pudo conectar con el servidor. Por favor, comprueba tu conexión.');
    }
  };

  const getButtonIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader className="animate-spin" size={20} />;
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertTriangle size={20} />;
      default:
        return 'Suscribirme';
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <Mail className="mx-auto text-cep-primary h-12 w-12 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Suscríbete a nuestro newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Recibe en tu correo las últimas novedades, ofertas especiales y notificaciones de nuevos cursos antes que nadie.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu dirección de correo electrónico"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:outline-none"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className={`px-6 py-3 font-bold text-white rounded-lg transition-all flex items-center justify-center
                ${status === 'loading' ? 'bg-gray-400' : ''}
                ${status === 'success' ? 'bg-green-500' : ''}
                ${status === 'error' ? 'bg-red-500' : ''}
                ${status === 'idle' ? 'bg-cep-primary hover:bg-cep-primary-dark' : ''}
              `}
              disabled={status === 'loading' || status === 'success'}
            >
              {getButtonIcon()}
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 