export interface CursoData {
  slug: string;
  nombre: string;
  sede: string;
  tag: string;
  inicio: string;
  imagen: string;
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
    descripciones: string[];
  };
}

export const cursosOtono2025: CursoData[] = [
  // 1. Adiestramiento Canino
  {
    slug: 'adiestramiento-canino-norte',
    nombre: 'Adiestramiento Canino',
    sede: 'Norte',
    tag: 'otono-2025-adiestramiento-canino-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    copy: {
      slogan: 'Haz de tu pasión por los perros tu profesión.',
      textosPrincipales: [
        'Fórmate en Adiestramiento Canino con prácticas reales y título CEP. Plazas limitadas.',
        'Aprende técnicas de educación y manejo canino con instructores expertos. Prácticas garantizadas y salida laboral real.',
        'Conviértete en adiestrador profesional y trabaja con perros de forma ética y efectiva. Plazas abiertas.'
      ],
      titulos: [
        'Fórmate como adiestrador canino. Prácticas reales y empleo.',
        'Curso de adiestramiento con prácticas y título CEP.',
        'Da el salto profesional al mundo canino.'
      ],
      descripciones: [
        'Descubre cómo convertir tu pasión por los perros en profesión.',
        'Haz clic y conoce nuestro curso de adiestrador canino.',
        'Solicita plaza y accede a prácticas reales. Más info.'
      ]
    }
  },
  // 2. Agente Funerario
  {
    slug: 'agente-funerario-santacruz',
    nombre: 'Agente Funerario',
    sede: 'Santa Cruz',
    tag: 'otono-2025-agente-funerario-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Fórmate en un sector estable con futuro.',
      textosPrincipales: [
        'Fórmate como Agente Funerario y trabaja en un sector estable con futuro. Curso oficial, prácticas reales y orientación laboral garantizada.',
        'Descubre una profesión humana y necesaria. Curso de Agente Funerario con prácticas en empresas y doble titulación.',
        'Da el paso a una carrera con estabilidad laboral. Fórmate como agente funerario con CEP y accede a empleo real.'
      ],
      titulos: [
        'Curso Agente Funerario con prácticas y empleo garantizado.',
        'Fórmate en servicios funerarios. Estabilidad laboral real.',
        'Especialízate como agente funerario. Plazas abiertas.'
      ],
      descripciones: [
        'Solicita información sobre el curso más completo del sector.',
        'Descubre una profesión estable y humana. Haz clic.',
        'Conoce fechas, requisitos y salidas laborales. Más info.'
      ]
    }
  },
  // 3. Auxiliar Clínico Veterinario - Norte
  {
    slug: 'auxiliar-clinico-veterinario-norte',
    nombre: 'Auxiliar Clínico Veterinario',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-clinico-veterinario-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    copy: {
      slogan: 'Convierte tu amor por los animales en tu futuro.',
      textosPrincipales: [
        'Fórmate como Auxiliar Clínico Veterinario y trabaja en clínicas, refugios y centros de acogida. Incluye 350h de prácticas reales, doble diploma y grupos reducidos.',
        'Convierte tu amor por los animales en tu futuro profesional. Curso presencial, prácticas en empresa y doble diploma en el Norte de Tenerife.',
        'Empieza tu carrera como Auxiliar Veterinario con CEP Norte. Aprende de profesionales en activo, disfruta de prácticas reales y consigue orientación laboral.'
      ],
      titulos: [
        'Auxiliar Veterinario Norte. Prácticas reales y doble diploma.',
        'Fórmate como ACV en el Norte. 350h de prácticas garantizadas.',
        'Da el salto al mundo animal. Curso ACV Norte de Tenerife.'
      ],
      descripciones: [
        'Solicita información y comienza tu futuro en el mundo animal Norte.',
        'Descubre cómo trabajar con animales en el Norte de Tenerife.',
        'Reserva plaza en el curso líder de veterinaria del Norte.'
      ]
    }
  },
  // 4. Auxiliar Clínico Veterinario - Santa Cruz
  {
    slug: 'auxiliar-clinico-veterinario-santacruz',
    nombre: 'Auxiliar Clínico Veterinario',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-clinico-veterinario-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    copy: {
      slogan: 'Tu vocación animal, nuestra formación profesional.',
      textosPrincipales: [
        'Fórmate como Auxiliar Clínico Veterinario y trabaja en clínicas, refugios y centros de acogida. Incluye 350h de prácticas reales, doble diploma y grupos reducidos.',
        'Convierte tu amor por los animales en tu futuro profesional. Curso presencial, prácticas en empresa y doble diploma. Fórmate con expertos.',
        'Empieza tu carrera como Auxiliar Veterinario con CEP. Aprende de profesionales en activo, disfruta de prácticas reales y consigue orientación laboral.'
      ],
      titulos: [
        'Haz de tu pasión por los animales tu empleo. Curso con prácticas reales.',
        'Fórmate como Auxiliar Veterinario en clínicas. Prácticas garantizadas.',
        'Da el salto al mundo animal. Curso con 350h de prácticas.'
      ],
      descripciones: [
        'Solicita información y comienza tu futuro en el mundo animal.',
        'Descubre cómo trabajar con animales y obtener tu diploma oficial.',
        'Reserva plaza en el curso líder de veterinaria. Fechas de inicio.'
      ]
    }
  },
  // 5. Auxiliar Clínicas Estéticas
  {
    slug: 'auxiliar-clinicas-esteticas-santacruz',
    nombre: 'Auxiliar de Clínicas Estéticas',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-clinicas-esteticas-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    copy: {
      slogan: 'Descubre el mundo de la estética profesional.',
      textosPrincipales: [
        'Fórmate como Auxiliar de Clínicas Estéticas y trabaja en centros de belleza y medicina estética. Curso con prácticas reales y doble titulación.',
        'Aprende técnicas avanzadas, disfruta de prácticas garantizadas y accede a empleo real.',
        'Especialízate en medicina estética y tratamientos de belleza. Curso presencial con prácticas en clínicas y orientación laboral.'
      ],
      titulos: [
        'Auxiliar Clínicas Estéticas. Prácticas reales y empleo.',
        'Curso de estética profesional. Doble titulación.',
        'Especialízate en medicina estética. Plazas abiertas.'
      ],
      descripciones: [
        'Descubre cómo trabajar en el sector de la belleza y estética.',
        'Solicita información sobre nuestro curso de estética profesional.',
        'Conoce fechas, temario y salidas laborales en estética.'
      ]
    }
  },
  // 6. Auxiliar de Enfermería - Norte
  {
    slug: 'auxiliar-enfermeria-norte',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-enfermeria-norte',
    inicio: 'Noviembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Da el paso hacia una profesión estable y humana.',
      textosPrincipales: [
        'Fórmate como Auxiliar de Enfermería y comienza una carrera con futuro en centros sanitarios y hospitales del Norte. Incluye prácticas reales, doble diploma y grupos reducidos.',
        'Da el paso hacia una profesión estable y humana en el Norte de Tenerife. Curso con prácticas en hospitales, formación actualizada y doble titulación.',
        'Curso de Auxiliar de Enfermería Norte: prácticas en empresas, orientación laboral y doble diploma. Prepárate para trabajar donde más importa.'
      ],
      titulos: [
        'Conviértete en Auxiliar de Enfermería Norte. Prácticas reales.',
        'Da el salto al sector sanitario Norte. Empleo asegurado.',
        'Fórmate en salud Norte. Curso presencial, doble titulación.'
      ],
      descripciones: [
        'Descubre cómo trabajar en hospitales del Norte de Tenerife.',
        'Reserva tu plaza Norte y accede a prácticas reales.',
        'Fórmate con los mejores del Norte y consigue empleo.'
      ]
    }
  },
  // 7. Auxiliar de Enfermería - Santa Cruz
  {
    slug: 'auxiliar-enfermeria-santacruz',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-enfermeria-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Fórmate para trabajar donde más importa.',
      textosPrincipales: [
        'Fórmate como Auxiliar de Enfermería y comienza una carrera con futuro en centros sanitarios y hospitales. Incluye prácticas reales, doble diploma y grupos reducidos.',
        'Da el paso hacia una profesión estable y humana. Curso con prácticas en hospitales, formación actualizada y doble titulación.',
        'Descubre la formación más completa en Auxiliar de Enfermería. Prácticas reales, grupos reducidos y empleabilidad asegurada.'
      ],
      titulos: [
        'Conviértete en Auxiliar de Enfermería. Prácticas reales y doble diploma.',
        'Da el salto al sector sanitario. Curso con empleo asegurado.',
        'Comienza tu carrera en sanidad. Prácticas en hospitales.'
      ],
      descripciones: [
        'Descubre cómo puedes trabajar en hospitales y centros médicos.',
        'Reserva tu plaza y accede a prácticas reales.',
        'Tu futuro en la sanidad comienza aquí.'
      ]
    }
  },
  // 8. Auxiliar Farmacia + Dermo - Norte
  {
    slug: 'auxiliar-farmacia-dermo-norte',
    nombre: 'Auxiliar Farmacia + Dermo',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Especialízate en farmacia y dermocosmética.',
      textosPrincipales: [
        'Especialízate como Auxiliar de Farmacia y Parafarmacia con Dermocosmética en el Norte. Curso presencial, prácticas reales y título oficial.',
        'Da el salto profesional en farmacia, perfumería o parafarmacia del Norte. Prácticas en empresas, formación en dermocosmética y orientación laboral.',
        'Fórmate en farmacia y dermocosmética con CEP Norte. Grupos reducidos, prácticas garantizadas y doble diploma.'
      ],
      titulos: [
        'Fórmate como Auxiliar de Farmacia Norte. Prácticas y título oficial.',
        'Curso farmacia y dermocosmética Norte: prácticas reales y empleo.',
        'Tu futuro en farmacia Norte empieza aquí. Doble diploma.'
      ],
      descripciones: [
        'Haz clic y descubre tu empleo en farmacia del Norte.',
        'Solicita tu plaza Norte y accede a prácticas en empresas.',
        'Conoce el temario y salidas profesionales Norte.'
      ]
    }
  },
  // 9. Auxiliar en Odontología - Norte
  {
    slug: 'auxiliar-odontologia-norte',
    nombre: 'Auxiliar en Odontología',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-odontologia-norte',
    inicio: 'Noviembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Da el paso al sector dental.',
      textosPrincipales: [
        'Fórmate como Auxiliar de Odontología con especialidad en Periodoncia en el Norte. Curso presencial, prácticas reales y orientación laboral.',
        'Descubre el curso más completo en odontología del Norte. Prácticas en clínicas, grupos reducidos y doble diploma.',
        'Prepárate para trabajar en clínicas dentales del Norte con nuestro curso especializado. Prácticas garantizadas y empleabilidad real.'
      ],
      titulos: [
        'Fórmate como auxiliar dental Norte y especialízate en periodoncia.',
        'Curso de odontología Norte con prácticas en clínicas.',
        'Da el salto al sector dental Norte. Plazas limitadas.'
      ],
      descripciones: [
        'Descubre cómo conseguir tu empleo en odontología Norte.',
        'Solicita información Norte y accede a prácticas reales.',
        'Empieza tu carrera en el sector dental Norte.'
      ]
    }
  },
  // 10. Auxiliar en Odontología - Santa Cruz
  {
    slug: 'auxiliar-odontologia-santacruz',
    nombre: 'Auxiliar en Odontología',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-odontologia-santacruz',
    inicio: 'Noviembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Prepárate para trabajar en clínicas dentales.',
      textosPrincipales: [
        'Fórmate como Auxiliar de Odontología con especialidad en Periodoncia. Curso presencial, prácticas reales y orientación laboral.',
        'Descubre el curso más completo en odontología. Prácticas en clínicas, grupos reducidos y doble diploma.',
        'Consigue tu título de auxiliar de odontología y especialízate en periodoncia. Prácticas en empresas y orientación laboral.'
      ],
      titulos: [
        'Fórmate como auxiliar dental y especialízate en periodoncia.',
        'Curso de odontología con prácticas en clínicas y doble diploma.',
        'Prepárate para trabajar en clínicas dentales.'
      ],
      descripciones: [
        'Descubre cómo conseguir tu empleo en odontología.',
        'Solicita información y accede a prácticas reales.',
        'Conoce el temario, fechas y opciones de inscripción.'
      ]
    }
  },
  // 11. Dietética y Nutrición - Norte
  {
    slug: 'dietetica-nutricion-norte',
    nombre: 'Dietética y Nutrición',
    sede: 'Norte',
    tag: 'otono-2025-dietetica-nutricion-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    copy: {
      slogan: 'Ayuda a transformar vidas.',
      textosPrincipales: [
        'Fórmate como dietista-nutricionista en el Norte y ayuda a transformar vidas. Curso presencial, prácticas en empresas y título oficial.',
        'Descubre el curso líder en dietética y nutrición del Norte. Prácticas reales, grupos reducidos y salidas laborales.',
        'Cambia tu vida y la de los demás con nuestro curso de dietética Norte. Prácticas en empresas y empleo asegurado.'
      ],
      titulos: [
        'Fórmate como dietista Norte y mejora la salud de los demás.',
        'Curso de dietética Norte: prácticas en empresas y empleo.',
        'Aprende nutrición Norte y cambia vidas. Plazas limitadas.'
      ],
      descripciones: [
        'Haz clic y transforma tu futuro en la nutrición Norte.',
        'Descubre cómo ser dietista Norte con prácticas y empleo.',
        'Haz de la alimentación tu profesión Norte.'
      ]
    }
  },
  // 12. Peluquería Canina y Felina - Norte
  {
    slug: 'peluqueria-canina-felina-norte',
    nombre: 'Peluquería Canina y Felina',
    sede: 'Norte',
    tag: 'otono-2025-peluqueria-canina-felina-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    copy: {
      slogan: 'Aprende técnicas de estética y salud animal.',
      textosPrincipales: [
        'Fórmate como peluquero/a canino y felino en el Norte. Curso presencial, prácticas en centros reales y título CEP.',
        'Aprende técnicas de estética y salud animal Norte. Prácticas en empresa, grupos reducidos y empleabilidad real.',
        'Curso de peluquería canina y felina Norte: prácticas garantizadas y salida laboral directa.'
      ],
      titulos: [
        'Curso de peluquería animal Norte con prácticas y empleo.',
        'Aprende técnicas de corte y baño en animales Norte.',
        'Prácticas reales Norte en centros de estética animal.'
      ],
      descripciones: [
        'Haz clic y solicita información sobre peluquería animal Norte.',
        'Conoce fechas Norte, temario y salidas profesionales.',
        'Tu carrera en el mundo animal Norte empieza aquí.'
      ]
    }
  },
  // 13. Peluquería Canina y Felina - Santa Cruz
  {
    slug: 'peluqueria-canina-felina-santacruz',
    nombre: 'Peluquería Canina y Felina',
    sede: 'Santa Cruz',
    tag: 'otono-2025-peluqueria-canina-felina-santacruz',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    copy: {
      slogan: 'Convierte tu pasión por los animales en tu futuro profesional.',
      textosPrincipales: [
        'Fórmate como peluquero/a canino y felino. Curso presencial, prácticas en centros reales y título CEP.',
        'Aprende técnicas de estética y salud animal. Prácticas en empresa, grupos reducidos y empleabilidad real.',
        'Descubre cómo trabajar en centros de estética animal con nuestro curso práctico y certificado.'
      ],
      titulos: [
        'Curso de peluquería animal con prácticas y empleo.',
        'Aprende técnicas de corte y baño en animales.',
        'Prácticas reales en centros de estética animal.'
      ],
      descripciones: [
        'Haz clic y solicita información sobre peluquería animal.',
        'Conoce fechas, temario y salidas profesionales.',
        'Fórmate con expertos y accede a empleo.'
      ]
    }
  },
  // 14. Quiromasaje Nivel II - Norte
  {
    slug: 'quiromasaje-nivel2-norte',
    nombre: 'Quiromasaje Nivel II',
    sede: 'Norte',
    tag: 'otono-2025-quiromasaje-nivel2-norte',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    copy: {
      slogan: 'Especialízate en masaje deportivo y terapéutico.',
      textosPrincipales: [
        'Especialízate en Quiromasaje Nivel II Norte y trabaja en spas, gimnasios y centros de bienestar. Curso presencial, prácticas y bolsa de empleo.',
        'Aprende técnicas avanzadas de masaje deportivo y terapéutico Norte. Prácticas en empresa y titulación CEP.',
        'Fórmate en quiromasaje Norte con profesionales en activo. Grupos reducidos y prácticas garantizadas.'
      ],
      titulos: [
        'Curso de quiromasaje nivel II Norte: prácticas y bolsa de empleo.',
        'Especialízate en masaje deportivo Norte. Plazas limitadas.',
        'Prácticas reales Norte, grupos reducidos y empleo.'
      ],
      descripciones: [
        'Solicita información Norte y accede a la bolsa de empleo.',
        'Descubre cómo especializarte en quiromasaje Norte.',
        'Conoce el programa Norte, fechas y salidas laborales.'
      ]
    }
  }
]; 