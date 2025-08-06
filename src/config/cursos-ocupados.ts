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
    imagen: '/images/cursos/prevencion-riesgos-ambientales-ocupados.png',
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
    id: 'COACHING-EQUIPOS-OCUPADOS-25',
    slug: 'coaching-equipos-trabajadores-ocupados',
    nombre: 'Desarrollo Organizacional. Coaching de Equipos',
    tipo: 'ocupados',
    activo: true,
    fecha_inicio: '2025-09-15',
    fecha_fin: '2025-10-20',
    plazas_disponibles: 12,
    sede: 'Norte',
    imagen: '/images/cursos/coaching-equipos-ocupados.png',
    descripcion: 'Curso especializado en técnicas de coaching aplicadas al desarrollo organizacional y gestión de equipos de trabajo, orientado a mejorar el rendimiento y la cohesión grupal.',
    objetivos: [
      'Dominar las técnicas fundamentales del coaching de equipos',
      'Desarrollar habilidades de liderazgo transformacional',
      'Implementar estrategias de desarrollo organizacional',
      'Mejorar la comunicación y cohesión en equipos de trabajo',
      'Aplicar herramientas de evaluación del rendimiento grupal'
    ],
    temario: [
      {
        modulo: 'Módulo 1: Fundamentos del Coaching Organizacional',
        contenidos: [
          'Principios básicos del coaching',
          'Diferencias entre coaching, mentoring y consultoría',
          'El coach como facilitador del cambio',
          'Ética y competencias del coach profesional'
        ]
      },
      {
        modulo: 'Módulo 2: Dinámicas de Equipos y Liderazgo',
        contenidos: [
          'Teorías de desarrollo de equipos',
          'Estilos de liderazgo situacional',
          'Gestión de conflictos en equipos',
          'Comunicación efectiva y feedback constructivo'
        ]
      },
      {
        modulo: 'Módulo 3: Herramientas de Coaching de Equipos',
        contenidos: [
          'Técnicas de facilitación grupal',
          'Dinámicas de team building',
          'Evaluación del clima organizacional',
          'Planificación estratégica participativa'
        ]
      },
      {
        modulo: 'Módulo 4: Implementación y Seguimiento',
        contenidos: [
          'Diseño de programas de desarrollo',
          'Métricas y KPIs de rendimiento grupal',
          'Planes de acción y seguimiento',
          'Casos prácticos y simulaciones'
        ]
      }
    ],
    metodologia: 'Metodología experiencial con role-playing, dinámicas grupales, análisis de casos reales y práctica supervisada de técnicas de coaching.',
    datos_especificos: {
      tipo: 'ocupados',
      contacto: {
        email: 'cep.ocupados@gmail.com',
        telefono: '672.947.701'
      },
      beneficios: [
        '100% Gratuito (financiado SEPE)',
        'Certificación oficial reconocida',
        'Mejora tus competencias directivas',
        'Horario compatible con trabajo',
        'Aplicación inmediata en tu equipo',
        'Material didáctico especializado',
        'Networking profesional'
      ],
      requisitos: [
        'Ser trabajador activo con responsabilidades de equipo',
        'Residir en Canarias',
        'Tener más de 18 años',
        'Disponibilidad horaria de tardes',
        'Experiencia mínima en gestión de personas'
      ],
      financiacion: 'SEPE - Servicio Público de Empleo Estatal',
      duracion: '50 horas lectivas',
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
      title: 'Curso Coaching de Equipos - Trabajadores Ocupados | CEP Formación',
      description: 'Curso gratuito de Coaching de Equipos para trabajadores. Financiado por SEPE. Desarrolla habilidades de liderazgo y gestión de equipos. ¡Plazas limitadas!',
      keywords: 'coaching equipos, desarrollo organizacional, curso trabajadores ocupados, SEPE, liderazgo, gestión equipos, las palmas gran canaria',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Desarrollo Organizacional. Coaching de Equipos",
        "description": "Curso especializado en técnicas de coaching aplicadas al desarrollo organizacional y gestión de equipos de trabajo, orientado a mejorar el rendimiento y la cohesión grupal.",
        "provider": {
          "@type": "Organization",
          "name": "CEP Formación",
          "url": "https://cepcomunicacion.com"
        },
        "url": "https://cepcomunicacion.com/curso-ocupado/coaching-equipos-trabajadores-ocupados",
        "courseMode": "blended",
        "educationalLevel": "professional",
        "audience": "Trabajadores ocupados con responsabilidades de equipo",
        "teaches": [
          "Técnicas de coaching de equipos",
          "Liderazgo transformacional",
          "Desarrollo organizacional",
          "Gestión de conflictos",
          "Comunicación efectiva"
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