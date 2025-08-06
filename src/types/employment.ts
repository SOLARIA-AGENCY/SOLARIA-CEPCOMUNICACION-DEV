/**
 * Tipos específicos para cursos basados en situación laboral
 * Extiende tipos existentes sin modificar funcionalidad base
 */

export type EmploymentStatus = 'ocupados' | 'desempleados';

export interface EmploymentSpecificData {
  contacto: {
    email: string;
    telefono: string;
  };
  beneficios: string[];
  requisitos: string[];
  financiacion: string;
  duracion: string;
  modalidad: string;
  certificacion: string;
}

export interface CursoOcupados extends EmploymentSpecificData {
  tipo: 'ocupados';
  caracteristicas: {
    modalidad: 'presencial' | 'online' | 'hibrido';
    horario: 'mañana' | 'tarde' | 'noche';
    compatible_trabajo: boolean;
    certificacion_oficial: boolean;
    financiado_sepe: boolean;
  };
}

export interface CursoDesempleados extends EmploymentSpecificData {
  tipo: 'desempleados';
  caracteristicas: {
    modalidad: 'presencial' | 'online' | 'hibrido';
    practicas_empresas: boolean;
    orientacion_laboral: boolean;
    certificado_profesionalidad: boolean;
    financiado_sepe_sce: boolean;
  };
}

export interface EmploymentFormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  situacion_laboral: EmploymentStatus;
  empresa_actual?: string; // Solo para ocupados
  sector_interes?: string; // Solo para desempleados
  disponibilidad: 'mañana' | 'tarde' | 'noche' | 'flexible';
  provincia: string;
  consentimiento_marketing: boolean;
  consentimiento_datos: boolean;
}

export interface EmploymentCourseConfig {
  id: string;
  slug: string; // NUEVO CAMPO OBLIGATORIO - Para rutas duales
  nombre: string;
  tipo: EmploymentStatus;
  activo: boolean;
  fecha_inicio: string;
  fecha_fin: string;
  plazas_disponibles: number;
  sede: 'Norte' | 'Santa Cruz';
  imagen?: string;
  descripcion?: string;
  objetivos?: string[];
  temario?: {
    modulo: string;
    contenidos: string[];
  }[];
  metodologia?: string;
  datos_especificos: CursoOcupados | CursoDesempleados;
  // NUEVA SECCIÓN SEO - Para optimización de rutas duales
  seo: {
    title: string;
    description: string;
    keywords: string;
    structuredData?: {
      "@context": string;
      "@type": string;
      name: string;
      description: string;
      provider: {
        "@type": string;
        name: string;
        url: string;
      };
      url: string;
      courseMode: string;
      educationalLevel: string;
      audience?: string;
      teaches?: string[];
    };
  };
  // CONFIGURACIONES AVANZADAS - Opcionales para compatibilidad
  configuracion_ads?: {
    tracking_tag: string;
    nombre_formulario: string;
    lista_mailchimp: string;
    landing_page: string;
    estado_campana: string;
    prioridad: number;
    urls_estrategicas: {
      landing_principal: string;
      formulario_contacto: string;
      whatsapp_directo: string;
    };
    meta_form: {
      form_id: string;
      pixel_id: string;
      conversion_api: boolean;
    };
    llamada_accion_unificada: {
      titulo_principal: string;
      subtitulo: string;
      boton_primario: string;
      boton_secundario: string;
      mensaje_urgencia: string;
    };
    analytics: {
      facebook_pixel: {
        pixel_id: string;
        eventos: string[];
      };
      google_analytics: {
        measurement_id: string;
        eventos_personalizados: string[];
      };
      google_tag_manager: {
        container_id: string;
        triggers: string[];
      };
    };
    contenido_ads: {
      titulos: string[];
      textos: string[];
      ctas: string[];
      hashtags: string[];
      audiencia_objetivo: string;
    };
  };
  automatizacion_n8n?: {
    workflow_id: string;
    acciones: {
      lead_capture: boolean;
      email_bienvenida: boolean;
      seguimiento_automatico: boolean;
      notificacion_equipo: boolean;
    };
    integraciones: {
      mailchimp: boolean;
      hubspot: boolean;
      whatsapp_business: boolean;
      calendario_citas: boolean;
    };
    timing: {
      email_inmediato: boolean;
      seguimiento_24h: boolean;
      recordatorio_7d: boolean;
    };
  };
  configuracion_tecnica?: {
    formularios: {
      validacion_tiempo_real: boolean;
      campos_obligatorios: string[];
      integracion_captcha: boolean;
    };
    optimizacion_conversion: {
      ab_testing_activo: boolean;
      lazy_loading: boolean;
      cache_optimizado: boolean;
    };
  };
}

export interface EmploymentTracking {
  event_name: string;
  employment_type: EmploymentStatus;
  course_id: string;
  lead_source: string;
  conversion_value: number;
  timestamp: string;
}