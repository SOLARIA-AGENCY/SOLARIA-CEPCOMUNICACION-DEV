/**
 * Configuración específica para cursos dirigidos a trabajadores ocupados
 * Mantiene compatibilidad con sistema existente
 */

import { EmploymentCourseConfig } from '../types/employment';

export const cursosOcupadosConfig: EmploymentCourseConfig[] = [
  {
    id: 'PRO-OCUP-PREV-RIESGOS-25',
    slug: 'prevencion-riesgos-ambientales-ocupados',
    nombre: 'Prevención de Riesgos Ambientales',
    tipo: 'ocupados',
    activo: true,
    fecha_inicio: '2025-08-11',
    fecha_fin: '2025-09-12',
    plazas_disponibles: 15,
    sede: 'Santa Cruz',
    imagen: '/images/cursos/prevencion-riesgos-ambientales-ocupados.jpg',
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
    },
    seo: {
      title: 'Curso Prevención de Riesgos Ambientales - Trabajadores Ocupados | CEP Formación',
      description: 'Curso gratuito de Prevención de Riesgos Ambientales para trabajadores. Financiado por SEPE. Aprende identificación, evaluación y control de riesgos ambientales. ¡Plazas limitadas!',
      keywords: 'prevención riesgos ambientales, curso trabajadores ocupados, SEPE, formación gratuita, seguridad ambiental, santa cruz tenerife',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Prevención de Riesgos Ambientales",
        "description": "Curso especializado en identificación, evaluación y control de riesgos ambientales en el ámbito laboral, conforme a la normativa vigente de prevención de riesgos laborales.",
        "provider": {
          "@type": "Organization",
          "name": "CEP Formación",
          "url": "https://cepcomunicacion.com"
        },
        "url": "https://cepcomunicacion.com/curso-ocupado/prevencion-riesgos-ambientales-ocupados",
        "courseMode": "blended",
        "educationalLevel": "professional",
        "audience": "Trabajadores ocupados",
        "teaches": [
          "Identificación de riesgos ambientales",
          "Evaluación de riesgos ambientales", 
          "Medidas preventivas y de control",
          "Normativa legal ambiental",
          "Planes de emergencia ambiental"
        ]
      }
    }
  },
  {
    id: 'PRO-OCUP-COACHING-EQUIPOS-25',
    slug: 'coaching-equipos-ocupados',
    nombre: 'Desarrollo Organizacional. Coaching de Equipos',
    tipo: 'ocupados',
    activo: true,
    fecha_inicio: '2025-09-04',
    fecha_fin: '2025-09-16',
    plazas_disponibles: 30,
    sede: 'Norte',
    imagen: '/images/cursos/coaching-equipos-ocupados.jpg',
    descripcion: 'Adquiere conocimientos sobre las herramientas para acompañar a un equipo de personas en el proceso de desarrollo, cambio y aprendizaje desde un enfoque sistémico, con el fin de optimizar su desempeño.',
    objetivos: [
      'Dominar las competencias generales del coaching sistémico de equipos',
      'Aplicar técnicas de comunicación efectiva en la gestión de equipos',
      'Desarrollar habilidades de liderazgo y motivación grupal',
      'Implementar estrategias para la resolución de conflictos internos',
      'Crear planes de acción para el desarrollo organizacional'
    ],
    temario: [
      {
        modulo: 'Coaching de Equipos - Fundamentos',
        contenidos: [
          'Qué es y para qué sirve el coaching de equipos',
          'Objetivos del coaching de equipos',
          'El coach de equipos: competencias y habilidades',
          'Enfoque y principios sistémicos'
        ]
      },
      {
        modulo: 'Competencias del Coaching Sistémico',
        contenidos: [
          'Competencias generales del coaching',
          'Competencias específicas del coaching sistémico de equipos',
          'Herramientas de intervención grupal',
          'Técnicas de evaluación y seguimiento'
        ]
      },
      {
        modulo: 'Características y Gestión de Equipos',
        contenidos: [
          'Liderazgo de equipos efectivo',
          'Estructura del equipo y roles',
          'Etapas para afrontar el cambio organizacional',
          'Dinámicas de valoración y desarrollo del equipo'
        ]
      },
      {
        modulo: 'Comunicación y Clima Emocional',
        contenidos: [
          'Comunicación efectiva en equipos',
          'Escucha activa y rapport',
          'Gestión del clima emocional',
          'Resolución de conflictos y disfunciones'
        ]
      }
    ],
    metodologia: 'Modalidad mixta con sesiones presenciales de aplicación práctica y teleformación para contenidos teóricos. Metodología participativa con dinámicas de grupo, casos prácticos y role-playing.',
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
        'Nivel básico de estudios',
        'Experiencia previa en gestión de equipos (recomendable)'
      ],
      financiacion: 'SEPE - Servicio Público de Empleo Estatal',
      duracion: '25 horas lectivas',
      modalidad: 'Mixta (presencial + teleformación)',
      certificacion: 'Certificado oficial de aprovechamiento reconocido por SEPE',
      caracteristicas: {
        modalidad: 'hibrido',
        horario: 'tarde',
        compatible_trabajo: true,
        certificacion_oficial: true,
        financiado_sepe: true
      }
    },
    seo: {
      title: 'Coaching de Equipos - Trabajadores Ocupados | CEP Formación',
      description: 'Curso gratuito de Desarrollo Organizacional y Coaching de Equipos para trabajadores. Financiado por SEPE. Modalidad mixta, horario compatible con trabajo. ¡Plazas limitadas!',
      keywords: 'coaching equipos, desarrollo organizacional, liderazgo, trabajadores ocupados, SEPE, formación gratuita, norte tenerife',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Desarrollo Organizacional. Coaching de Equipos",
        "description": "Curso para adquirir conocimientos sobre herramientas de coaching de equipos desde un enfoque sistémico",
        "provider": {
          "@type": "Organization",
          "name": "CEP Formación",
          "url": "https://cepcomunicacion.com"
        },
        "url": "https://cepcomunicacion.com/curso-ocupado/coaching-equipos-ocupados",
        "courseMode": "blended",
        "educationalLevel": "professional",
        "audience": "Trabajadores ocupados",
        "teaches": [
          "Competencias del coaching sistémico de equipos",
          "Técnicas de comunicación efectiva",
          "Habilidades de liderazgo y motivación",
          "Estrategias de resolución de conflictos",
          "Desarrollo organizacional"
        ]
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