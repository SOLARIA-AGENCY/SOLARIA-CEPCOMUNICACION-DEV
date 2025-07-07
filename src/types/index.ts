export type Modulo = {
  titulo: string;
  contenido: string[];
};

export type Profesor = {
  nombre: string;
  foto: string;
  especialidad: string;
  bio: string;
  tags: string[];
};

export type PuntoClave = {
  icono: string;
  texto: string;
};

export type Inversion = {
  total: string;
  modalidad: string;
  incluye: string;
};

export type DescripcionDetallada = {
  introduccion: string;
  queAprendes: string;
  puntosClave: PuntoClave[];
  inversion?: Inversion;
  salidasProfesionales: string[];
  modulos: Modulo[];
  profesores: Profesor[];
  requisitos?: string[];
  cursosComplementarios?: string[];
};

export type Curso = {
  nombre: string;
  codigo: string;
  slugBase: string;
  imagen: string;
  categoria: 'sanidad' | 'veterinaria' | 'bienestar' | 'ciclos' | 'adiestramiento' | 'diseño';
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  descripcionDetallada?: DescripcionDetallada;
  centro: string;
  turno: string;
  inicio: string;
  subtitulo?: string;
  modalidad?: string;
};
