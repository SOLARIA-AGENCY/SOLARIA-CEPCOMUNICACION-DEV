export type CursoMaestro = {
  id: string;
  slug: string;
  nombre: string;
  sede: 'Norte' | 'Santa Cruz';
  estado: 'activo' | 'proximamente';
  imagen: string;
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  // Campos opcionales que solo existen si estado es 'activo'
  inicio?: string;
  duracion?: string;
  precio?: string;
  practicas?: string;
  profesor?: string;
  certificacion?: string;
  profesorDetalle?: {
    nombre: string;
    especialidad: string;
    descripcion: string;
    foto: string;
  };
  modalidadInfo?: {
    tipo: string;
    horario: string;
    sesiones: string;
  };
  temario?: string[];
};

export const cursosMaestro: CursoMaestro[] = [
  // Adiestramiento Canino
  {
    id: 'adiestramiento-canino-norte',
    slug: 'adiestramiento-canino-norte',
    nombre: 'Adiestramiento Canino',
    sede: 'Norte',
    estado: 'proximamente',
    imagen: '/images/cursos/adiestramiento-canino.jpg',
    copy: {
      slogan: 'Conviértete en un experto en el comportamiento y educación canina.',
      textosPrincipales: [
        'Aprende las técnicas más efectivas y respetuosas para adiestrar perros de todas las razas y edades.',
        'Nuestro enfoque se basa en el refuerzo positivo para construir un vínculo sólido entre el perro y su guía.',
        'Ideal para futuros adiestradores profesionales o dueños que deseen comprender mejor a su compañero.'
      ],
      titulos: ['Psicología Canina', 'Técnicas de Modificación de Conducta', 'Creación de Planes de Adiestramiento', 'Legislación y Bienestar Animal']
    }
  },
  {
    id: 'adiestramiento-canino-santacruz',
    slug: 'adiestramiento-canino-santacruz',
    nombre: 'Adiestramiento Canino',
    sede: 'Santa Cruz',
    estado: 'activo',
    inicio: "Octubre 2025",
    imagen: '/images/cursos/adiestramiento-canino.jpg',
    copy: {
      slogan: 'Conviértete en un experto en el comportamiento y educación canina.',
      textosPrincipales: [
        'Aprende las técnicas más efectivas y respetuosas para adiestrar perros de todas las razas y edades.',
        'Nuestro enfoque se basa en el refuerzo positivo para construir un vínculo sólido entre el perro y su guía.',
        'Ideal para futuros adiestradores profesionales o dueños que deseen comprender mejor a su compañero.'
      ],
      titulos: ['Psicología Canina', 'Técnicas de Modificación de Conducta', 'Creación de Planes de Adiestramiento', 'Legislación y Bienestar Animal']
    }
  },
  // Agente Funerario
  {
    id: 'agente-funerario-norte',
    slug: 'agente-funerario-norte',
    nombre: 'Agente Funerario',
    sede: 'Norte',
    estado: 'proximamente',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
        slogan: 'Fórmate en una profesión esencial y de gran demanda social.',
        textosPrincipales: [
            'Adquiere las competencias técnicas y humanas para asistir a las familias en momentos difíciles.',
            'El curso cubre desde la tanatopraxia y tanatoestética hasta el protocolo funerario y la gestión administrativa.',
            'Una formación completa para un sector con alta empleabilidad.'
        ],
        titulos: ['Tanatopraxia y Tanatoestética', 'Protocolo Funerario', 'Psicología y Atención a la Familia', 'Gestión Funeraria']
    }
  },
  {
    id: 'agente-funerario-santacruz',
    slug: 'agente-funerario-santacruz',
    nombre: 'Agente Funerario',
    sede: 'Santa Cruz',
    estado: 'activo',
    inicio: "Noviembre 2025",
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
        slogan: 'Fórmate en una profesión esencial y de gran demanda social.',
        textosPrincipales: [
            'Adquiere las competencias técnicas y humanas para asistir a las familias en momentos difíciles.',
            'El curso cubre desde la tanatopraxia y tanatoestética hasta el protocolo funerario y la gestión administrativa.',
            'Una formación completa para un sector con alta empleabilidad.'
        ],
        titulos: ['Tanatopraxia y Tanatoestética', 'Protocolo Funerario', 'Psicología y Atención a la Familia', 'Gestión Funeraria']
    }
  },
  // ... y así sucesivamente para los 26 cursos.
  // Este es un ejemplo, completaría todos los cursos.
]; 