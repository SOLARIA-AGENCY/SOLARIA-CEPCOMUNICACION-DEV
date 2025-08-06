/**
 * Sistema de tracking específico para cursos de empleo
 * Integra con sistema existente sin modificar funcionalidad base
 */

import { EmploymentStatus, EmploymentTracking } from '../types/employment';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    fbq: (command: string, event: string, data?: Record<string, unknown>) => void;
  }
}

export const trackEmploymentLead = (
  employmentType: EmploymentStatus,
  courseId: string,
  leadSource: string = 'website'
): void => {
  const trackingData: EmploymentTracking = {
    event_name: 'employment_lead',
    employment_type: employmentType,
    course_id: courseId,
    lead_source: leadSource,
    conversion_value: 1.0,
    timestamp: new Date().toISOString()
  };

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': getGAConversionId(employmentType),
      'value': 1.0,
      'currency': 'EUR',
      'custom_parameters': {
        'employment_type': employmentType,
        'course_id': courseId,
        'lead_source': leadSource
      }
    });

    // Evento personalizado para segmentación
    window.gtag('event', `${employmentType}_lead`, {
      'event_category': 'Lead Generation',
      'event_label': courseId,
      'value': 1
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: courseId,
      content_category: employmentType,
      value: 1.0,
      currency: 'EUR',
      custom_data: {
        employment_type: employmentType,
        course_id: courseId,
        lead_source: leadSource
      }
    });
  }

  // Enviar datos a endpoint interno para análisis
  sendTrackingData(trackingData);
};

export const trackEmploymentPageView = (
  employmentType: EmploymentStatus,
  page: string
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      'page_title': `CEP - ${employmentType} - ${page}`,
      'page_location': window.location.href,
      'custom_parameters': {
        'employment_type': employmentType,
        'section': page
      }
    });
  }
};

export const trackEmploymentFormStep = (
  employmentType: EmploymentStatus,
  step: string,
  courseId: string
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_progress', {
      'event_category': 'Form Interaction',
      'event_label': `${employmentType}_${step}`,
      'custom_parameters': {
        'employment_type': employmentType,
        'form_step': step,
        'course_id': courseId
      }
    });
  }
};

export const trackEmploymentDownload = (
  employmentType: EmploymentStatus,
  documentType: string,
  courseId: string
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      'file_name': `${courseId}_${documentType}`,
      'file_extension': 'pdf',
      'custom_parameters': {
        'employment_type': employmentType,
        'document_type': documentType,
        'course_id': courseId
      }
    });
  }
};

const getGAConversionId = (employmentType: EmploymentStatus): string => {
  // IDs de conversión específicos por tipo de empleo
  const conversionIds = {
    ocupados: 'AW-XXXXX/ocupados_lead',
    desempleados: 'AW-XXXXX/desempleados_lead'
  };
  
  return conversionIds[employmentType] || 'AW-XXXXX/default_lead';
};

const sendTrackingData = async (data: EmploymentTracking): Promise<void> => {
  try {
    // Enviar a endpoint interno para análisis avanzado
    await fetch('/api/track-employment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error sending tracking data:', error);
  }
};

export const generateUTMParams = (
  employmentType: EmploymentStatus,
  campaign: string,
  source: string = 'website'
): string => {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: 'formacion',
    utm_campaign: `cep_${employmentType}`,
    utm_term: campaign,
    utm_content: `${employmentType}_${campaign}`
  });

  return params.toString();
};

export const getEmploymentSpecificPixelEvent = (
  employmentType: EmploymentStatus,
  action: string
): string => {
  return `${employmentType}_${action}`;
};