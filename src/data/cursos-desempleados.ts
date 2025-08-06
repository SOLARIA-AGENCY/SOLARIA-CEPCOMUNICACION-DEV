import { EmploymentCourseConfig } from '../types/employment';

/**
 * Configuración de cursos para trabajadores desempleados
 * Integración automática desde datos JSON del sistema
 */

export const cursosDesempleados: EmploymentCourseConfig[] = [
  {
    id: 'ADGD0308-ALMACENES-SEP2025',
    slug: 'organizacion-almacenes-desempleados',
    nombre: 'Organización de Almacenes',
    tipo: 'desempleados',
    activo: true,
    fecha_inicio: '2025-09-15',
    fecha_fin: '2025-12-15',
    plazas_disponibles: 15,
    sede: 'Norte',
    imagen: '/images/cursos/almacenes-desempleados.png',
    descripcion: 'Curso especializado en gestión y organización de almacenes dirigido a trabajadores desempleados. Aprende las técnicas más avanzadas de logística, control de inventarios y optimización de espacios de almacenamiento.',
    objetivos: [
      'Dominar los principios fundamentales de la gestión de almacenes',
      'Aplicar técnicas de organización y optimización del espacio',
      'Gestionar sistemas de control de inventarios',
      'Implementar procesos de recepción, almacenamiento y expedición',
      'Utilizar software especializado en gestión de almacenes',
      'Desarrollar competencias en seguridad y prevención de riesgos'
    ],
    temario: [
      {
        modulo: 'Fundamentos de la Gestión de Almacenes',
        contenidos: [
          'Introducción a la logística y supply chain',
          'Tipos de almacenes y sus características',
          'Organización física del almacén',
          'Flujos de mercancías y procesos básicos'
        ]
      },
      {
        modulo: 'Sistemas de Almacenaje y Manutención',
        contenidos: [
          'Sistemas de almacenaje convencional y automático',
          'Equipos de manutención y manipulación',
          'Criterios de ubicación de mercancías',
          'Optimización del espacio de almacenamiento'
        ]
      },
      {
        modulo: 'Control de Inventarios',
        contenidos: [
          'Métodos de control de existencias',
          'Sistemas de codificación y etiquetado',
          'Inventarios periódicos y permanentes',
          'Análisis ABC y gestión de stocks'
        ]
      },
      {
        modulo: 'Procesos Operativos',
        contenidos: [
          'Recepción y verificación de mercancías',
          'Procesos de almacenamiento y ubicación',
          'Preparación de pedidos (picking)',
          'Expedición y control de salidas'
        ]
      },
      {
        modulo: 'Tecnología y Software de Gestión',
        contenidos: [
          'Sistemas WMS (Warehouse Management System)',
          'Códigos de barras y tecnología RFID',
          'Software de gestión de almacenes',
          'Integración con sistemas ERP'
        ]
      },
      {
        modulo: 'Seguridad y Prevención de Riesgos',
        contenidos: [
          'Normativa de seguridad en almacenes',
          'Prevención de riesgos laborales',
          'Manipulación manual de cargas',
          'Planes de emergencia y evacuación'
        ]
      }
    ],
    metodologia: 'Metodología práctica con 70% de contenido aplicado en almacén real. Incluye simulaciones con software profesional, casos prácticos del sector y prácticas en empresas colaboradoras.',
    datos_especificos: {
      tipo: 'desempleados',
      contacto: {
        email: 'almacenes@cepcomunicacion.com',
        telefono: '922 123 456'
      },
      beneficios: [
        'Curso 100% gratuito financiado por SEPE',
        'Prácticas garantizadas en empresas del sector',
        'Certificado de Profesionalidad oficial',
        'Orientación laboral personalizada',
        'Bolsa de empleo activa',
        'Material didáctico incluido'
      ],
      requisitos: [
        'Estar inscrito como demandante de empleo',
        'Graduado en ESO o equivalente',
        'Conocimientos básicos de informática',
        'Disponibilidad horaria completa'
      ],
      financiacion: 'Curso gratuito financiado por SEPE (Servicio Público de Empleo Estatal)',
      duracion: '380 horas (3 meses)',
      modalidad: 'Presencial con prácticas en empresa',
      certificacion: 'Certificado de Profesionalidad ADGD0308',
      caracteristicas: {
        modalidad: 'presencial',
        practicas_empresas: true,
        orientacion_laboral: true,
        certificado_profesionalidad: true,
        financiado_sepe_sce: true
      }
    },
    seo: {
      title: 'Curso Organización de Almacenes - Desempleados | CEP Comunicación',
      description: 'Curso gratuito de Organización de Almacenes para desempleados. Certificado de Profesionalidad, prácticas en empresa y orientación laboral. ¡Inscríbete ya!',
      keywords: 'curso almacenes, organización almacenes, certificado profesionalidad, curso gratuito desempleados, logística, gestión inventarios, SEPE',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Organización de Almacenes',
        description: 'Curso especializado en gestión y organización de almacenes dirigido a trabajadores desempleados',
        provider: {
          '@type': 'Organization',
          name: 'CEP Comunicación',
          url: 'https://cepcomunicacion.com'
        },
        url: 'https://cepcomunicacion.com/curso-desempleado/organizacion-almacenes-desempleados',
        courseMode: 'Presencial',
        educationalLevel: 'Profesional',
        audience: 'Trabajadores desempleados',
        teaches: [
          'Gestión de almacenes',
          'Control de inventarios',
          'Logística',
          'Sistemas WMS',
          'Prevención de riesgos'
        ]
      }
    },
    configuracion_ads: {
      tracking_tag: 'almacenes_desempleados_sep2025',
      nombre_formulario: 'Formulario Almacenes Desempleados',
      lista_mailchimp: 'cursos_desempleados_logistica',
      landing_page: '/curso-desempleado/organizacion-almacenes-desempleados',
      estado_campana: 'activa',
      prioridad: 8,
      urls_estrategicas: {
        landing_principal: 'https://cepcomunicacion.com/curso-desempleado/organizacion-almacenes-desempleados',
        formulario_contacto: 'https://cepcomunicacion.com/contacto?curso=almacenes-desempleados',
        whatsapp_directo: 'https://wa.me/34922123456?text=Información%20curso%20Organización%20Almacenes'
      },
      meta_form: {
        form_id: 'almacenes_desempleados_form',
        pixel_id: 'fb_pixel_almacenes_des',
        conversion_api: true
      },
      llamada_accion_unificada: {
        titulo_principal: '¡Especialízate en Organización de Almacenes!',
        subtitulo: 'Curso gratuito con Certificado de Profesionalidad y prácticas garantizadas',
        boton_primario: 'Inscríbete Gratis',
        boton_secundario: 'Más Información',
        mensaje_urgencia: '⏰ ¡Solo 15 plazas disponibles! Inicio: 15 de Septiembre'
      },
      analytics: {
        facebook_pixel: {
          pixel_id: 'fb_pixel_almacenes_des',
          eventos: ['ViewContent', 'Lead', 'CompleteRegistration']
        },
        google_analytics: {
          measurement_id: 'GA_almacenes_desempleados',
          eventos_personalizados: ['curso_view', 'form_start', 'form_complete']
        },
        google_tag_manager: {
          container_id: 'GTM_almacenes_des',
          triggers: ['page_view', 'form_submission', 'scroll_depth']
        }
      },
      contenido_ads: {
        titulos: [
          '🏭 Especialízate en Organización de Almacenes',
          '📦 Curso Gratuito de Gestión de Almacenes',
          '🎯 Certificado Profesionalidad + Prácticas Empresa'
        ],
        textos: [
          'Domina la gestión de almacenes con nuestro curso gratuito. Certificado de Profesionalidad oficial, prácticas garantizadas y orientación laboral. ¡Inscríbete ya!',
          'Conviértete en especialista en organización de almacenes. Curso 100% gratuito financiado por SEPE con prácticas en empresas reales del sector logístico.',
          'Aprende gestión de inventarios, sistemas WMS y optimización de almacenes. Curso presencial con certificación oficial y alta empleabilidad.'
        ],
        ctas: [
          'Inscríbete Gratis',
          'Solicita Información',
          'Reserva tu Plaza'
        ],
        hashtags: [
          '#CursoAlmacenes',
          '#LogísticaGratis',
          '#CertificadoProfesionalidad',
          '#PrácticasEmpresa',
          '#SEPE2025'
        ],
        audiencia_objetivo: 'Desempleados interesados en logística y almacenes, 25-50 años, Tenerife'
      }
    },
    automatizacion_n8n: {
      workflow_id: 'almacenes_desempleados_workflow',
      acciones: {
        lead_capture: true,
        email_bienvenida: true,
        seguimiento_automatico: true,
        notificacion_equipo: true
      },
      integraciones: {
        mailchimp: true,
        hubspot: true,
        whatsapp_business: true,
        calendario_citas: true
      },
      timing: {
        email_inmediato: true,
        seguimiento_24h: true,
        recordatorio_7d: true
      }
    },
    configuracion_tecnica: {
      formularios: {
        validacion_tiempo_real: true,
        campos_obligatorios: ['nombre', 'apellidos', 'email', 'telefono', 'situacion_laboral'],
        integracion_captcha: true
      },
      optimizacion_conversion: {
        ab_testing_activo: true,
        lazy_loading: true,
        cache_optimizado: true
      }
    }
  }
];

export default cursosDesempleados;