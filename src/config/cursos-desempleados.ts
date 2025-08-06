/**
 * Configuración específica para cursos dirigidos a trabajadores desempleados
 * Mantiene compatibilidad con sistema existente
 */

import { EmploymentCourseConfig } from '../types/employment';

export const cursosDesempleadosConfig: EmploymentCourseConfig[] = [
  {
    id: 'CP-DESEMP-ALMACENES-25',
    slug: 'organizacion-almacenes-desempleados',
    nombre: 'Organización de Almacenes',
    tipo: 'desempleados',
    activo: true,
    fecha_inicio: '2025-09-29',
    fecha_fin: '2025-10-30',
    plazas_disponibles: 20,
    sede: 'Santa Cruz',
    imagen: '/images/cursos/organizacion-almacenes-profesionales.jpg',
    descripcion: 'Curso especializado en diseño, organización y gestión integral de almacenes. Aprende las técnicas más avanzadas de logística, control de inventarios, gestión de equipos y aplicación de medidas de seguridad en el entorno del almacén.',
    objetivos: [
      'Diseñar y organizar almacenes eficientes según normativas y necesidades empresariales',
      'Dominar los sistemas de gestión de almacenes (SGA) y tecnologías aplicadas',
      'Gestionar equipos de trabajo en el almacén con técnicas de liderazgo efectivo',
      'Aplicar medidas de prevención de riesgos laborales específicas del sector',
      'Optimizar costes y presupuestos de operaciones de almacenaje'
    ],
    temario: [
      {
        modulo: 'Diseño y Organización del Almacén',
        contenidos: [
          'Procesos y actividades del almacén: recepción, almacenaje, picking',
          'Principios básicos de diseño: zonas y layout optimizado',
          'Variables que inciden en el diseño: flujos, empresa y productos',
          'Sistemas de almacenamiento: estanterías, equipos de manutención'
        ]
      },
      {
        modulo: 'Sistemas de Gestión de Almacenes',
        contenidos: [
          'Organización estructural: zona pulmón y zona picking',
          'Sistemas de Gestión de Almacenes (SGA) y ERP',
          'Tecnología aplicada: radiofrecuencia, picking por voz',
          'Picking to light y sistemas producto-operario'
        ]
      },
      {
        modulo: 'Gestión del Equipo de Trabajo',
        contenidos: [
          'Organización del trabajo y asignación de funciones',
          'Técnicas de liderazgo y motivación del equipo',
          'Comunicación efectiva y resolución de conflictos',
          'Formación del personal y planes de desarrollo'
        ]
      },
      {
        modulo: 'Seguridad y Prevención de Riesgos',
        contenidos: [
          'Evaluación de riesgos específicos del almacén',
          'Medidas preventivas y equipos de protección',
          'Manejo seguro de mercancías peligrosas (APQ)',
          'Protocolos de emergencia y primeros auxilios'
        ]
      }
    ],
    metodologia: 'Metodología presencial con enfoque práctico. Combinación de clases teóricas con simulaciones reales de gestión de almacenes, uso de software especializado y visitas a instalaciones logísticas.',
    datos_especificos: {
      tipo: 'desempleados',
      contacto: {
        email: 'info@cursostenerife.es',
        telefono: '922.706.414'
      },
      beneficios: [
        '100% Gratuito (financiado SEPE/SCE)',
        'Certificado de Profesionalidad oficial',
        'Orientación laboral personalizada',
        'Bolsa de empleo activa',
        'Material didáctico incluido',
        'Seguimiento post-formación'
      ],
      requisitos: [
        'Estar inscrito como demandante de empleo',
        'Residir en Canarias',
        'Tener más de 18 años',
        'Disponer de la ESO, competencias clave nivel 2 o equivalente',
        'Disponibilidad horaria completa',
        'Colectivos prioritarios: mujeres +40 años, parados larga duración, trabajadores sin cualificación'
      ],
      financiacion: 'SEPE/SCE - Servicio Canario de Empleo',
      duracion: '140 horas lectivas',
      modalidad: 'Presencial intensiva',
      certificacion: 'Certificado de Profesionalidad MF1014_3: Organización de almacenes',
      caracteristicas: {
        modalidad: 'presencial',
        practicas_empresas: false,
        orientacion_laboral: true,
        certificado_profesionalidad: true,
        financiado_sepe_sce: true
      }
    },
    seo: {
      title: 'Organización de Almacenes - Curso Gratuito Desempleados | CEP Formación',
      description: 'Curso gratuito Organización de Almacenes para desempleados. Certificado de Profesionalidad oficial. 140 horas de formación intensiva. ¡Plazas limitadas!',
      keywords: 'organización almacenes, logística, curso desempleados, certificado profesionalidad, santa cruz tenerife',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Organización de Almacenes",
        "description": "Curso especializado en diseño, organización y gestión integral de almacenes con certificado de profesionalidad",
        "provider": {
          "@type": "Organization",
          "name": "CEP Formación",
          "url": "https://cepcomunicacion.com"
        },
        "url": "https://cepcomunicacion.com/curso-desempleado/organizacion-almacenes-desempleados",
        "courseMode": "onsite",
        "educationalLevel": "professional",
        "audience": "Personas desempleadas",
        "teaches": [
          "Diseño y organización de almacenes",
          "Sistemas de gestión SGA y ERP",
          "Gestión de equipos de trabajo",
          "Seguridad y prevención de riesgos",
          "Optimización de costes"
        ]
      }
    }
  }
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
  description: 'Formación profesional para el empleo. Certificados de profesionalidad. Mejora tu empleabilidad.',
  keywords: 'cursos gratuitos desempleados, formación empleo canarias, certificados profesionalidad',
  canonical: '/cursos-desempleados'
};