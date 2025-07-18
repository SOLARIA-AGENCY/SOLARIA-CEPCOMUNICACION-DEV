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
  dni: string;
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
}

export interface EmploymentTracking {
  event_name: string;
  employment_type: EmploymentStatus;
  course_id: string;
  lead_source: string;
  conversion_value: number;
  timestamp: string;
}