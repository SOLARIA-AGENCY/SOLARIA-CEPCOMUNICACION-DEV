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
    imagen: '/images/cursos/prevencion-riesgos-ambientales.png',
    descripcion: 'Curso especializado en identificación, evaluación y control de riesgos ambientales en el ámbito laboral, conforme a la normativa vigente de prevención de riesgos laborales.',
    objetivos: [
      'Identificar los principales riesgos ambientales en el entorno laboral',
      'Aplicar técnicas de evaluación de riesgos ambientales',
      'Implementar medidas preventivas y de control',
      'Conocer la normativa legal aplicable en materia ambiental',
      'Desarrollar planes de emergencia ambiental'
    ],
    temario: [
      {
        modulo: 'Módulo 1: Fundamentos de la Gestión Ambiental',
        contenidos: [
          'Conceptos básicos de medio ambiente',
          'Legislación ambiental aplicable',
          'Sistemas de gestión ambiental ISO 14001',
          'Evaluación de aspectos ambientales'
        ]
      },
      {
        modulo: 'Módulo 2: Identificación de Riesgos Ambientales',
        contenidos: [
          'Contaminación atmosférica',
          'Contaminación acústica',
          'Gestión de residuos peligrosos',
          'Contaminación de suelos y aguas'
        ]
      },
      {
        modulo: 'Módulo 3: Evaluación y Control de Riesgos',
        contenidos: [
          'Técnicas de evaluación de riesgos',
          'Medidas preventivas y correctoras',
          'Equipos de protección individual',
          'Procedimientos de trabajo seguro'
        ]
      },
      {
        modulo: 'Módulo 4: Planes de Emergencia Ambiental',
        contenidos: [
          'Elaboración de planes de emergencia',
          'Protocolos de actuación',
          'Comunicación de riesgos',
          'Simulacros y ejercicios prácticos'
        ]
      }
    ],
    metodologia: 'Metodología teórico-práctica con casos reales, talleres participativos y simulaciones de situaciones de riesgo ambiental.',
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
        'Aplicación práctica inmediata',
        'Material didáctico incluido',
        'Seguimiento personalizado'
      ],
      requisitos: [
        'Ser trabajador activo de cualquier sector',
        'Residir en Canarias',
        'Tener más de 18 años',
        'Disponibilidad horaria de tardes',
        'Nivel básico de estudios'
      ],
      financiacion: 'SEPE - Servicio Público de Empleo Estatal',
      duracion: '40 horas lectivas',
      modalidad: 'Presencial',
      certificacion: 'Certificado oficial de aprovechamiento reconocido por SEPE',
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