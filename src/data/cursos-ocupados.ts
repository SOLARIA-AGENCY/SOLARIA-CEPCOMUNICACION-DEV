import { EmploymentCourseConfig } from '../types/employment';

/**
 * Configuración de cursos para trabajadores ocupados
 * Integración automática desde datos JSON del sistema
 */

export const cursosOcupados: EmploymentCourseConfig[] = [
  {
    id: 'ADGD0109-COACHING-SEP2025',
    slug: 'coaching-equipos-ocupados',
    nombre: 'Desarrollo Organizacional. Coaching de Equipos',
    tipo: 'ocupados',
    activo: true,
    fecha_inicio: '2025-09-16',
    fecha_fin: '2025-11-28',
    plazas_disponibles: 12,
    sede: 'Santa Cruz',
    imagen: '/images/cursos/coaching-equipos-ocupados.png',
    descripcion: 'Curso especializado en desarrollo organizacional y coaching de equipos dirigido a trabajadores ocupados. Desarrolla competencias avanzadas en liderazgo, gestión de equipos y transformación organizacional.',
    objetivos: [
      'Dominar las técnicas fundamentales del coaching de equipos',
      'Desarrollar habilidades de liderazgo transformacional',
      'Implementar procesos de desarrollo organizacional',
      'Gestionar el cambio y la transformación en equipos',
      'Aplicar herramientas de comunicación efectiva',
      'Crear culturas organizacionales de alto rendimiento'
    ],
    temario: [
      {
        modulo: 'Fundamentos del Coaching Organizacional',
        contenidos: [
          'Introducción al coaching de equipos',
          'Diferencias entre coaching, mentoring y consultoría',
          'Modelos y enfoques del coaching organizacional',
          'Ética y competencias del coach organizacional'
        ]
      },
      {
        modulo: 'Liderazgo y Gestión de Equipos',
        contenidos: [
          'Estilos de liderazgo y su aplicación',
          'Dinámicas de grupo y trabajo en equipo',
          'Gestión de conflictos y negociación',
          'Motivación y engagement del equipo'
        ]
      },
      {
        modulo: 'Desarrollo Organizacional',
        contenidos: [
          'Diagnóstico organizacional',
          'Diseño de intervenciones de desarrollo',
          'Gestión del cambio organizacional',
          'Cultura organizacional y valores'
        ]
      },
      {
        modulo: 'Herramientas y Técnicas de Coaching',
        contenidos: [
          'Técnicas de escucha activa y preguntas poderosas',
          'Feedback efectivo y conversaciones difíciles',
          'Herramientas de evaluación y diagnóstico',
          'Planificación y seguimiento de objetivos'
        ]
      },
      {
        modulo: 'Comunicación y Relaciones Interpersonales',
        contenidos: [
          'Comunicación asertiva y empática',
          'Inteligencia emocional en el liderazgo',
          'Construcción de confianza y rapport',
          'Manejo de emociones en el equipo'
        ]
      },
      {
        modulo: 'Implementación y Evaluación',
        contenidos: [
          'Diseño de programas de coaching',
          'Medición del impacto y ROI',
          'Sostenibilidad de los cambios',
          'Casos prácticos y simulaciones'
        ]
      }
    ],
    metodologia: 'Metodología experiencial con 60% práctica y 40% teoría. Incluye role-playing, casos reales, simulaciones de coaching y proyecto final aplicado al entorno laboral del participante.',
    datos_especificos: {
      tipo: 'ocupados',
      contacto: {
        email: 'coaching@cepcomunicacion.com',
        telefono: '922 654 321'
      },
      beneficios: [
        'Curso financiado por FUNDAE (antigua Fundación Tripartita)',
        'Compatible con horario laboral (tardes)',
        'Certificación oficial reconocida',
        'Aplicación inmediata en el puesto de trabajo',
        'Networking con profesionales del sector',
        'Material didáctico y recursos digitales incluidos'
      ],
      requisitos: [
        'Estar trabajando por cuenta ajena',
        'Experiencia mínima de 2 años en gestión de equipos',
        'Formación universitaria o experiencia equivalente',
        'Compromiso de asistencia mínima del 75%'
      ],
      financiacion: 'Curso financiado por FUNDAE - Sin coste para trabajador ni empresa',
      duracion: '75 horas (10 semanas)',
      modalidad: 'Presencial vespertino',
      certificacion: 'Certificado de Aprovechamiento CEP Comunicación',
      caracteristicas: {
        modalidad: 'presencial',
        horario: 'tarde',
        compatible_trabajo: true,
        certificacion_oficial: true,
        financiado_sepe: true
      }
    },
    seo: {
      title: 'Curso Coaching de Equipos - Trabajadores Ocupados | CEP Comunicación',
      description: 'Curso de Desarrollo Organizacional y Coaching de Equipos para trabajadores ocupados. Financiado por FUNDAE, horario compatible con trabajo. ¡Inscríbete!',
      keywords: 'coaching equipos, desarrollo organizacional, liderazgo, gestión equipos, curso ocupados, FUNDAE, formación empresarial',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Desarrollo Organizacional. Coaching de Equipos',
        description: 'Curso especializado en desarrollo organizacional y coaching de equipos dirigido a trabajadores ocupados',
        provider: {
          '@type': 'Organization',
          name: 'CEP Comunicación',
          url: 'https://cepcomunicacion.com'
        },
        url: 'https://cepcomunicacion.com/curso-ocupado/coaching-equipos-ocupados',
        courseMode: 'Presencial',
        educationalLevel: 'Profesional Avanzado',
        audience: 'Trabajadores ocupados con experiencia en gestión',
        teaches: [
          'Coaching de equipos',
          'Liderazgo transformacional',
          'Desarrollo organizacional',
          'Gestión del cambio',
          'Comunicación efectiva'
        ]
      }
    },
    configuracion_ads: {
      tracking_tag: 'coaching_ocupados_sep2025',
      nombre_formulario: 'Formulario Coaching Ocupados',
      lista_mailchimp: 'cursos_ocupados_liderazgo',
      landing_page: '/curso-ocupado/coaching-equipos-ocupados',
      estado_campana: 'activa',
      prioridad: 9,
      urls_estrategicas: {
        landing_principal: 'https://cepcomunicacion.com/curso-ocupado/coaching-equipos-ocupados',
        formulario_contacto: 'https://cepcomunicacion.com/contacto?curso=coaching-ocupados',
        whatsapp_directo: 'https://wa.me/34922654321?text=Información%20curso%20Coaching%20Equipos'
      },
      meta_form: {
        form_id: 'coaching_ocupados_form',
        pixel_id: 'fb_pixel_coaching_ocup',
        conversion_api: true
      },
      llamada_accion_unificada: {
        titulo_principal: '🚀 Lidera Equipos de Alto Rendimiento',
        subtitulo: 'Curso de Coaching Organizacional financiado - Compatible con tu trabajo',
        boton_primario: 'Solicitar Plaza',
        boton_secundario: 'Descargar Programa',
        mensaje_urgencia: '⏰ ¡Solo 12 plazas! Inicio: 16 de Septiembre - Horario vespertino'
      },
      analytics: {
        facebook_pixel: {
          pixel_id: 'fb_pixel_coaching_ocup',
          eventos: ['ViewContent', 'Lead', 'CompleteRegistration']
        },
        google_analytics: {
          measurement_id: 'GA_coaching_ocupados',
          eventos_personalizados: ['curso_view', 'form_start', 'form_complete', 'programa_download']
        },
        google_tag_manager: {
          container_id: 'GTM_coaching_ocup',
          triggers: ['page_view', 'form_submission', 'scroll_depth', 'file_download']
        }
      },
      contenido_ads: {
        titulos: [
          '🎯 Coaching de Equipos - Curso Financiado',
          '👥 Desarrolla tu Liderazgo Organizacional',
          '🚀 Transforma tu Equipo de Trabajo'
        ],
        textos: [
          'Especialízate en coaching de equipos sin coste. Curso financiado por FUNDAE, horario compatible con trabajo. Desarrolla competencias de liderazgo transformacional.',
          'Conviértete en un líder coach. Aprende técnicas avanzadas de desarrollo organizacional y gestión de equipos de alto rendimiento. ¡Sin coste para ti!',
          'Impulsa tu carrera profesional con nuestro curso de coaching organizacional. Metodología práctica, casos reales y aplicación inmediata en tu trabajo.'
        ],
        ctas: [
          'Solicitar Plaza',
          'Más Información',
          'Descargar Programa'
        ],
        hashtags: [
          '#CoachingEquipos',
          '#LiderazgoTransformacional',
          '#DesarrolloOrganizacional',
          '#FUNDAE2025',
          '#FormacionEmpresarial'
        ],
        audiencia_objetivo: 'Profesionales ocupados con equipos a cargo, 30-50 años, Tenerife'
      }
    },
    automatizacion_n8n: {
      workflow_id: 'coaching_ocupados_workflow',
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
        campos_obligatorios: ['nombre', 'apellidos', 'email', 'telefono', 'empresa_actual'],
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

export default cursosOcupados;