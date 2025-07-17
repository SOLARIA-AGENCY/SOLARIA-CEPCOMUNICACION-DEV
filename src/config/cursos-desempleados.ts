/**
 * Configuración específica para cursos dirigidos a trabajadores desempleados
 * Mantiene compatibilidad con sistema existente
 */

import { EmploymentCourseConfig } from '../types/employment';

export const cursosDesempleadosConfig: EmploymentCourseConfig[] = [
  // Placeholder para futuros cursos de desempleados
  // Se agregará una vez implementado el sistema base
];

export const desempleadosDefaultConfig = {
  colors: {
    primary: '#007BFF',
    light: '#0D8BFF',
    dark: '#0056B3'
  },
  icons: {
    main: '🚀',
    features: ['💪', '🎓', '🏢', '📊']
  },
  messaging: {
    headline: 'Cursos Gratuitos para Desempleados',
    subheadline: 'Tu próxima oportunidad laboral',
    cta: 'Impulsa tu carrera profesional',
    benefits_intro: 'Ventajas para tu inserción laboral:'
  },
  contact: {
    email: 'info@cursostenerife.es', // Temporal hasta nuevo email
    telefono: '922.706.414',
    whatsapp: '922706414'
  }
};

export const desempleadosMetadata = {
  title: 'Cursos Gratuitos para Desempleados en Canarias | CEP Formación',
  description: 'Formación profesional para el empleo. Certificados de profesionalidad, prácticas en empresas. Mejora tu empleabilidad.',
  keywords: 'cursos gratuitos desempleados, formación empleo canarias, certificados profesionalidad',
  canonical: '/cursos-desempleados'
};