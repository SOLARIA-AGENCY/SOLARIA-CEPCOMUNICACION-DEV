/**
 * Configuración específica para cursos dirigidos a trabajadores ocupados
 * Mantiene compatibilidad con sistema existente
 */

import { EmploymentCourseConfig } from '../types/employment';

export const cursosOcupadosConfig: EmploymentCourseConfig[] = [
  {
    id: 'PRO-OCUP-PREV-RIESGOS-25',
    nombre: 'Prevención de Riesgos Ambientales',
    tipo: 'ocupados',
    activo: true,
    fecha_inicio: '2025-08-11',
    fecha_fin: '2025-09-12',
    plazas_disponibles: 15,
    sede: 'Santa Cruz',
    datos_especificos: {
      tipo: 'ocupados',
      contacto: {
        email: 'cep.ocupados@gmail.com',
        telefono: '672.947.701'
      },
      beneficios: [
        '100% Gratuito (financiado SEPE)',
        'Certificación oficial reconocida',
        'Mejora tu CV y empleabilidad',
        'Horario compatible con trabajo',
        'Aplicación práctica inmediata'
      ],
      requisitos: [
        'Ser trabajador activo de cualquier sector',
        'Residir en Canarias',
        'Tener más de 18 años',
        'Disponibilidad horaria'
      ],
      financiacion: 'SEPE - Servicio Público de Empleo Estatal',
      duracion: '40 horas lectivas',
      modalidad: 'Presencial',
      certificacion: 'Certificado oficial reconocido',
      caracteristicas: {
        modalidad: 'presencial',
        horario: 'tarde',
        compatible_trabajo: true,
        certificacion_oficial: true,
        financiado_sepe: true
      }
    }
  }
];

export const ocupadosDefaultConfig = {
  colors: {
    primary: '#28A745',
    light: '#34CE57',
    dark: '#1E7E34'
  },
  icons: {
    main: '👔',
    features: ['💼', '📈', '🎯', '⏰']
  },
  messaging: {
    headline: 'Cursos Gratuitos para Trabajadores',
    subheadline: 'Evoluciona sin parar tu carrera profesional',
    cta: 'Solicita tu plaza gratuita',
    benefits_intro: 'Ventajas exclusivas para trabajadores:'
  },
  contact: {
    email: 'cep.ocupados@gmail.com',
    telefono: '672.947.701',
    whatsapp: '672947701'
  }
};

export const ocupadosMetadata = {
  title: 'Cursos Gratuitos para Trabajadores en Canarias | CEP Formación',
  description: 'Formación subvencionada SEPE para trabajadores activos. Certificación oficial, horarios compatibles. ¡Plazas limitadas!',
  keywords: 'cursos gratuitos trabajadores, formación ocupados canarias, SEPE, certificación oficial',
  canonical: '/cursos-ocupados'
};