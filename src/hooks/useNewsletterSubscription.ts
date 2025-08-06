import { useState, useCallback } from 'react';

interface SubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface SubscriptionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  subscriberId?: string;
}

interface UseNewsletterSubscriptionOptions {
  webhookUrl?: string;
  onSuccess?: (data: SubscriptionResponse) => void;
  onError?: (error: Error) => void;
}

interface SubscriptionResponse {
  success: boolean;
  message: string;
  subscriber_id?: string;
  timestamp?: string;
  services?: {
    brevo_registered: boolean;
    mailchimp_registered: boolean;
    welcome_email_sent: boolean;
  };
}

export const useNewsletterSubscription = (options: UseNewsletterSubscriptionOptions = {}) => {
  const {
    webhookUrl = process.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.cepcomunicacion.com/webhook/newsletter-signup',
    onSuccess,
    onError
  } = options;

  const [state, setState] = useState<SubscriptionState>({
    status: 'idle',
    message: ''
  });

  const subscribe = useCallback(async (data: SubscriptionData) => {
    // Normalizar email primero
    const normalizedEmail = data.email?.toLowerCase().trim() || '';
    
    // Validación básica
    if (!normalizedEmail) {
      setState({
        status: 'error',
        message: 'Por favor, introduce tu dirección de correo electrónico.'
      });
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setState({
        status: 'error',
        message: 'Por favor, introduce un email válido.'
      });
      return;
    }

    setState({ status: 'loading', message: 'Procesando suscripción...' });

    try {
      const payload = {
        email: normalizedEmail,
        firstName: data.firstName?.trim() || '',
        lastName: data.lastName?.trim() || '',
        timestamp: new Date().toISOString(),
        source: 'website_newsletter',
        origin_url: typeof window !== 'undefined' ? window.location.href : '',
        campaign_tag: 'suscripcion-newsletter-web',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: SubscriptionResponse = await response.json();

      if (result.success) {
        setState({
          status: 'success',
          message: result.message || '¡Suscripción exitosa! Revisa tu email para confirmar.',
          subscriberId: result.subscriber_id
        });
        
        onSuccess?.(result);
      } else {
        throw new Error(result.message || 'Error en la suscripción');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error de conexión. Inténtalo de nuevo.';
      
      setState({
        status: 'error',
        message: errorMessage
      });
      
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [webhookUrl, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({ status: 'idle', message: '' });
  }, []);

  return {
    subscribe,
    reset,
    state,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isIdle: state.status === 'idle'
  };
};

export default useNewsletterSubscription;