// Facebook Conversions API Integration
// Configuración basada en la guía oficial CEP FORMACIÓN - Solaria Agency

import CryptoJS from 'crypto-js';

interface FacebookEventData {
  event_name: 'CompleteRegistration' | 'Lead' | 'Contact';
  event_time: number;
  action_source: 'website' | 'system_generated';
  event_source_url: string;
  user_data: {
    em?: string[];
    ph?: string[];
    fn?: string[];
    ln?: string[];
    ct?: string[];
    zip?: string[];
  };
  custom_data?: {
    event_source?: string;
    lead_event_source?: string;
    lead_id?: string;
    course_name?: string;
    course_category?: string;
  };
  event_id?: string;
}

interface ConversionAPIPayload {
  data: FacebookEventData[];
  test_event_code?: string;
}

// Configuración desde variables de entorno
const FB_CONFIG = {
  PIXEL_ID: '1189071876088388',
  API_VERSION: 'v23.0',
  ACCESS_TOKEN: import.meta.env.FB_ACCESS_TOKEN || '', // Se debe configurar en producción
  ENDPOINT: `https://graph.facebook.com/v23.0/1189071876088388/events`,
  N8N_WEBHOOK: import.meta.env.FB_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/facebook-conversions'
};

/**
 * Hashea un valor usando SHA256 según los requisitos de Facebook
 */
function hashUserData(value: string): string {
  return CryptoJS.SHA256(value.toLowerCase().trim()).toString();
}

/**
 * Genera un ID único para el evento para evitar duplicados
 */
function generateEventId(): string {
  return `cep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Prepara los datos del usuario hasheados según estándares de Facebook
 */
function prepareUserData(rawData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  zipCode?: string;
}) {
  const userData: FacebookEventData['user_data'] = {};

  if (rawData.email) {
    userData.em = [hashUserData(rawData.email)];
  }
  
  if (rawData.phone) {
    // Limpiar y hashear teléfono
    const cleanPhone = rawData.phone.replace(/[^\d+]/g, '');
    userData.ph = [hashUserData(cleanPhone)];
  }
  
  if (rawData.firstName) {
    userData.fn = [hashUserData(rawData.firstName)];
  }
  
  if (rawData.lastName) {
    userData.ln = [hashUserData(rawData.lastName)];
  }
  
  if (rawData.city) {
    userData.ct = [hashUserData(rawData.city)];
  }
  
  if (rawData.zipCode) {
    userData.zip = [hashUserData(rawData.zipCode)];
  }

  return userData;
}

/**
 * Envía evento directamente a la API de Conversiones de Facebook
 * Solo para uso interno cuando n8n no esté disponible
 */
async function sendConversionEventDirect(eventData: FacebookEventData): Promise<boolean> {
  if (!FB_CONFIG.ACCESS_TOKEN) {
    console.warn('FB_ACCESS_TOKEN no configurado. Enviando solo vía n8n.');
    return false;
  }

  try {
    const payload: ConversionAPIPayload = {
      data: [eventData]
    };

    const response = await fetch(`${FB_CONFIG.ENDPOINT}?access_token=${FB_CONFIG.ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Evento enviado a Facebook Conversions API:', result);
      return true;
    } else {
      console.error('❌ Error en Facebook Conversions API:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Error al enviar a Facebook Conversions API:', error);
    return false;
  }
}

/**
 * Envía evento vía webhook n8n (método preferido)
 */
async function sendConversionEventViaWebhook(eventData: FacebookEventData): Promise<boolean> {
  try {
    const response = await fetch(FB_CONFIG.N8N_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      console.log('✅ Evento enviado vía n8n webhook a Facebook Conversions API');
      return true;
    } else {
      console.error('❌ Error en webhook n8n:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Error al enviar vía webhook n8n:', error);
    return false;
  }
}

/**
 * Función principal para trackear eventos de conversión
 * Envía tanto al Pixel (lado cliente) como a la API de Conversiones (lado servidor)
 */
export async function trackConversionEvent(
  eventType: 'lead' | 'registration' | 'contact',
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    zipCode?: string;
  },
  customData?: {
    course_name?: string;
    course_category?: string;
    lead_id?: string;
  }
): Promise<void> {
  const eventId = generateEventId();
  const currentUrl = window.location.href;
  
  // Mapear tipo de evento
  const eventNameMap = {
    'lead': 'Lead' as const,
    'registration': 'CompleteRegistration' as const,
    'contact': 'Contact' as const
  };

  // Preparar datos del evento para la API
  const eventData: FacebookEventData = {
    event_name: eventNameMap[eventType],
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: currentUrl,
    user_data: prepareUserData(userData),
    event_id: eventId
  };

  if (customData) {
    eventData.custom_data = {
      event_source: 'crm',
      lead_event_source: 'cep_website',
      ...customData
    };
  }

  // Enviar al Pixel de Facebook (lado cliente) si hay consentimiento
  const hasMarketingConsent = localStorage.getItem('marketing_consent') === 'true';
  if (hasMarketingConsent && typeof window.fbq !== 'undefined') {
    try {
      window.fbq('track', eventData.event_name, customData);
      console.log('✅ Evento enviado al Facebook Pixel (cliente)');
    } catch (error) {
      console.error('❌ Error al enviar al Facebook Pixel:', error);
    }
  }

  // Enviar a la API de Conversiones (lado servidor)
  try {
    // Priorizar n8n webhook, fallback a API directa
    const webhookSuccess = await sendConversionEventViaWebhook(eventData);
    
    if (!webhookSuccess) {
      console.log('🔄 Webhook n8n falló, intentando envío directo...');
      await sendConversionEventDirect(eventData);
    }
  } catch (error) {
    console.error('❌ Error en el envío de conversión:', error);
  }
}

/**
 * Función específica para trackear leads de formularios de curso
 */
export async function trackCourseLeadEvent(formData: {
  email: string;
  phone?: string;
  name?: string;
  curso?: string;
  modalidad?: string;
}) {
  const [firstName, ...lastNameParts] = (formData.name || '').split(' ');
  const lastName = lastNameParts.join(' ');

  await trackConversionEvent(
    'lead',
    {
      email: formData.email,
      phone: formData.phone,
      firstName: firstName,
      lastName: lastName
    },
    {
      course_name: formData.curso,
      course_category: formData.modalidad || 'presencial',
      lead_id: `cep_lead_${Date.now()}`
    }
  );
}

/**
 * Función para trackear registro completo en curso
 */
export async function trackCourseRegistrationEvent(registrationData: {
  email: string;
  phone?: string;
  name?: string;
  curso: string;
  modalidad?: string;
}) {
  const [firstName, ...lastNameParts] = (registrationData.name || '').split(' ');
  const lastName = lastNameParts.join(' ');

  await trackConversionEvent(
    'registration',
    {
      email: registrationData.email,
      phone: registrationData.phone,
      firstName: firstName,
      lastName: lastName
    },
    {
      course_name: registrationData.curso,
      course_category: registrationData.modalidad || 'presencial'
    }
  );
}

// Declaración de tipos globales para TypeScript
declare global {
  interface Window {
    fbq: (command: string, event: string, data?: Record<string, unknown>) => void;
  }
}

export default {
  trackConversionEvent,
  trackCourseLeadEvent,
  trackCourseRegistrationEvent
}; 