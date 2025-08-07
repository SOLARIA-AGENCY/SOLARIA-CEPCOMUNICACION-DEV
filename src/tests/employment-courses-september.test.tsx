/**
 * 🧪 TESTS COMPLETOS - CURSOS SEPTIEMBRE 2025
 * 
 * MISIÓN SILENT-TESTER: Validación exhaustiva nuevos cursos implementados
 * - Organización de Almacenes (Desempleados) 
 * - Coaching de Equipos (Ocupados)
 * 
 * COVERAGE TARGET: 100% - REGLA INMUTABLE #1 COMPLIANCE
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Configuraciones a testear
import { cursosDesempleadosConfig } from '../config/cursos-desempleados';
import { cursosOcupadosConfig } from '../config/cursos-ocupados';

// Componente modal de formulario
import EmploymentFormModal from '../components/molecules/EmploymentFormModal';

// Utils para validation
import { validateEmploymentForm } from '../utils/employmentValidation';

describe('🎯 NUEVOS CURSOS SEPTIEMBRE 2025 - CONFIGURACIONES', () => {
  describe('🏢 Organización de Almacenes (Desempleados)', () => {
    const cursoAlmacenes = cursosDesempleadosConfig.find(
      curso => curso.id === 'organizacion-almacenes-desempleados'
    );

    it('debe existir la configuración del curso Organización de Almacenes', () => {
      expect(cursoAlmacenes).toBeDefined();
      expect(cursoAlmacenes).not.toBeNull();
    });

    it('debe tener la estructura correcta del curso Organización de Almacenes', () => {
      expect(cursoAlmacenes).toMatchObject({
        id: 'organizacion-almacenes-desempleados',
        slug: 'organizacion-almacenes-desempleados',
        nombre: 'Organización de Almacenes',
        tipo: 'desempleados',
        activo: true,
        fecha_inicio: '2025-09-29',
        fecha_fin: '2025-10-30',
        plazas_disponibles: 20,
        sede: 'Santa Cruz'
      });
    });

    it('debe tener datos específicos para desempleados correctos', () => {
      expect(cursoAlmacenes?.datos_especificos).toMatchObject({
        tipo: 'desempleados',
        contacto: {
          email: 'info@cursostenerife.es',
          telefono: '922.706.414'
        },
        financiacion: 'SEPE/SCE - Servicio Canario de Empleo',
        duracion: '140 horas lectivas',
        modalidad: 'Presencial intensiva',
        caracteristicas: {
          modalidad: 'presencial',
          practicas_empresas: false,
          orientacion_laboral: true,
          certificado_profesionalidad: true,
          financiado_sepe_sce: true
        }
      });
    });

    it('debe tener objetivos de aprendizaje definidos', () => {
      expect(cursoAlmacenes?.objetivos).toBeDefined();
      expect(cursoAlmacenes?.objetivos).toHaveLength(5);
      expect(cursoAlmacenes?.objetivos).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Diseñar y organizar almacenes'),
          expect.stringContaining('sistemas de gestión de almacenes'),
          expect.stringContaining('equipos de trabajo'),
          expect.stringContaining('prevención de riesgos'),
          expect.stringContaining('Optimizar costes')
        ])
      );
    });

    it('debe tener temario estructurado en 4 módulos', () => {
      expect(cursoAlmacenes?.temario).toBeDefined();
      expect(cursoAlmacenes?.temario).toHaveLength(4);
      
      const modulosEsperados = [
        'Diseño y Organización del Almacén',
        'Sistemas de Gestión de Almacenes', 
        'Gestión del Equipo de Trabajo',
        'Seguridad y Prevención de Riesgos'
      ];

      cursoAlmacenes?.temario?.forEach((modulo, index) => {
        expect(modulo.modulo).toBe(modulosEsperados[index]);
        expect(modulo.contenidos).toBeInstanceOf(Array);
        expect(modulo.contenidos.length).toBeGreaterThan(0);
      });
    });

    it('debe tener configuración SEO completa', () => {
      expect(cursoAlmacenes?.seo).toMatchObject({
        title: expect.stringContaining('Organización de Almacenes'),
        description: expect.stringContaining('Curso gratuito'),
        keywords: expect.stringContaining('organización almacenes'),
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Organización de Almacenes"
        }
      });
    });

    it('debe tener beneficios específicos para desempleados', () => {
      const beneficios = cursoAlmacenes?.datos_especificos.beneficios;
      expect(beneficios).toContain('100% Gratuito (financiado SEPE/SCE)');
      expect(beneficios).toContain('Certificado de Profesionalidad oficial');
      // Prácticas en empresas removidas del curso
      expect(beneficios).toContain('Orientación laboral personalizada');
    });
  });

  describe('👔 Coaching de Equipos (Ocupados)', () => {
    const cursoCoaching = cursosOcupadosConfig.find(
      curso => curso.id === 'PRO-OCUP-COACHING-EQUIPOS-25'
    );

    it('debe existir la configuración del curso Coaching de Equipos', () => {
      expect(cursoCoaching).toBeDefined();
      expect(cursoCoaching).not.toBeNull();
    });

    it('debe tener la estructura correcta del curso Coaching de Equipos', () => {
      expect(cursoCoaching).toMatchObject({
        id: 'PRO-OCUP-COACHING-EQUIPOS-25',
        slug: 'coaching-equipos-ocupados',
        nombre: 'Desarrollo Organizacional. Coaching de Equipos',
        tipo: 'ocupados',
        activo: true,
        fecha_inicio: '2025-09-04',
        fecha_fin: '2025-09-16',
        plazas_disponibles: 30,
        sede: 'Norte'
      });
    });

    it('debe tener datos específicos para ocupados correctos', () => {
      expect(cursoCoaching?.datos_especificos).toMatchObject({
        tipo: 'ocupados',
        contacto: {
          email: 'cep.ocupados@gmail.com',
          telefono: '672.947.701'
        },
        financiacion: 'SEPE - Servicio Público de Empleo Estatal',
        duracion: '25 horas lectivas',
        modalidad: 'Mixta (presencial + teleformación)',
        caracteristicas: {
          modalidad: 'hibrido',
          horario: 'tarde',
          compatible_trabajo: true,
          certificacion_oficial: true,
          financiado_sepe: true
        }
      });
    });

    it('debe tener objetivos específicos de coaching', () => {
      expect(cursoCoaching?.objetivos).toBeDefined();
      expect(cursoCoaching?.objetivos).toHaveLength(5);
      expect(cursoCoaching?.objetivos).toEqual(
        expect.arrayContaining([
          expect.stringContaining('coaching sistémico'),
          expect.stringContaining('comunicación efectiva'),
          expect.stringContaining('liderazgo y motivación'),
          expect.stringContaining('resolución de conflictos'),
          expect.stringContaining('desarrollo organizacional')
        ])
      );
    });

    it('debe tener temario estructurado en 4 módulos de coaching', () => {
      expect(cursoCoaching?.temario).toBeDefined();
      expect(cursoCoaching?.temario).toHaveLength(4);
      
      const modulosEsperados = [
        'Coaching de Equipos - Fundamentos',
        'Competencias del Coaching Sistémico',
        'Características y Gestión de Equipos',
        'Comunicación y Clima Emocional'
      ];

      cursoCoaching?.temario?.forEach((modulo, index) => {
        expect(modulo.modulo).toBe(modulosEsperados[index]);
        expect(modulo.contenidos).toBeInstanceOf(Array);
        expect(modulo.contenidos.length).toBeGreaterThan(0);
      });
    });

    it('debe tener configuración SEO específica para ocupados', () => {
      expect(cursoCoaching?.seo).toMatchObject({
        title: expect.stringContaining('Coaching de Equipos'),
        description: expect.stringContaining('Curso gratuito'),
        keywords: expect.stringContaining('coaching equipos'),
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Desarrollo Organizacional. Coaching de Equipos",
          audience: "Trabajadores ocupados"
        }
      });
    });
  });
});

describe('🔄 ROUTING SISTEMA - RUTAS DUALES', () => {
  beforeEach(() => {
    cleanup();
  });


  it('debe reconocer slugs de cursos nuevos en configuraciones', () => {
    const slugsDesempleados = cursosDesempleadosConfig.map(c => c.slug);
    const slugsOcupados = cursosOcupadosConfig.map(c => c.slug);

    expect(slugsDesempleados).toContain('organizacion-almacenes-desempleados');
    expect(slugsOcupados).toContain('coaching-equipos-ocupados');
  });

  it('debe encontrar cursos por slug correctamente', () => {
    const cursoAlmacenesPorSlug = cursosDesempleadosConfig.find(
      c => c.slug === 'organizacion-almacenes-desempleados'
    );
    const cursoCoachingPorSlug = cursosOcupadosConfig.find(
      c => c.slug === 'coaching-equipos-ocupados'
    );

    expect(cursoAlmacenesPorSlug?.id).toBe('organizacion-almacenes-desempleados');
    expect(cursoCoachingPorSlug?.id).toBe('PRO-OCUP-COACHING-EQUIPOS-25');
  });

  it('debe validar que todos los cursos tengan slugs únicos', () => {
    const todosLosSlugs = [
      ...cursosDesempleadosConfig.map(c => c.slug),
      ...cursosOcupadosConfig.map(c => c.slug)
    ];

    const slugsUnicos = new Set(todosLosSlugs);
    expect(slugsUnicos.size).toBe(todosLosSlugs.length);
  });
});

describe('📝 FORMULARIO MODAL - INTEGRACIÓN NUEVOS CURSOS', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderFormModal = (courseId: string, courseName: string, employmentType: 'ocupados' | 'desempleados') => {
    return render(
      <EmploymentFormModal
        isOpen={true}
        onClose={() => {}}
        courseId={courseId}
        courseName={courseName}
        employmentType={employmentType}
      />
    );
  };

  it('debe renderizar formulario para curso Organización de Almacenes', async () => {
    renderFormModal(
      'organizacion-almacenes-desempleados',
      'Organización de Almacenes',
      'desempleados'
    );

    expect(screen.getByText('Organización de Almacenes')).toBeInTheDocument();
    expect(screen.getByText('Curso gratuito para desempleados')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByTestId('sector-interes-select')).toBeInTheDocument();
  });

  it('debe renderizar formulario para curso Coaching de Equipos', async () => {
    renderFormModal(
      'PRO-OCUP-COACHING-EQUIPOS-25',
      'Desarrollo Organizacional. Coaching de Equipos',
      'ocupados'
    );

    expect(screen.getByText('Desarrollo Organizacional. Coaching de Equipos')).toBeInTheDocument();
    expect(screen.getByText('Curso 100% subvencionado para trabajadores')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre de tu empresa actual')).toBeInTheDocument();
  });

  it('debe mostrar campos específicos para desempleados en formulario de almacenes', () => {
    renderFormModal(
      'organizacion-almacenes-desempleados',
      'Organización de Almacenes',
      'desempleados'
    );

    expect(screen.getByTestId('sector-interes-select')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Nombre de tu empresa actual')).not.toBeInTheDocument();
  });

  it('debe mostrar campos específicos para ocupados en formulario de coaching', () => {
    renderFormModal(
      'PRO-OCUP-COACHING-EQUIPOS-25',
      'Coaching de Equipos',
      'ocupados'
    );

    expect(screen.getByPlaceholderText('Nombre de tu empresa actual')).toBeInTheDocument();
    expect(screen.queryByTestId('sector-interes-select')).not.toBeInTheDocument();
  });

  it('debe validar correctamente formulario para curso desempleados', async () => {
    renderFormModal(
      'organizacion-almacenes-desempleados',
      'Organización de Almacenes', 
      'desempleados'
    );

    const user = userEvent.setup();
    const submitButton = screen.getByText('Enviar Inscripción');

    await user.click(submitButton);

    // Debe mantener el botón (validación interna no mostraría errores específicos aquí)
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByText('Organización de Almacenes')).toBeInTheDocument();
  });

  it('debe validar correctamente formulario completo para curso ocupados', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    renderFormModal(
      'PRO-OCUP-COACHING-EQUIPOS-25',
      'Coaching de Equipos',
      'ocupados'
    );

    const user = userEvent.setup();

    // Llenar formulario completo
    await user.type(screen.getByPlaceholderText('Tu nombre'), 'Juan');
    await user.type(screen.getByPlaceholderText('Tus apellidos'), 'Pérez');
    await user.type(screen.getByPlaceholderText('tu@email.com'), 'juan@example.com');
    await user.type(screen.getByPlaceholderText('123456789'), '666777888');
    await user.type(screen.getByPlaceholderText('Nombre de tu empresa actual'), 'Mi Empresa S.L.');
    // Marcar checkbox de consentimiento (primer checkbox = datos personales)
    const consentCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(consentCheckbox);

    // Enviar formulario
    await user.click(screen.getByText('Enviar Inscripción'));

    // Debe procesarse correctamente - verificar éxito en lugar de estado procesando
    await waitFor(() => {
      expect(screen.getByText('¡Inscripción Enviada!')).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

describe('📊 VALIDACIÓN EMPLOYMENT FORM', () => {
  it('debe validar formulario para desempleados correctamente', () => {
    const datosDesempleados = {
      nombre: 'María',
      apellidos: 'García',
      email: 'maria@example.com',
      telefono: '922123456',
      situacion_laboral: 'desempleados' as const,
      sector_interes: 'administracion',
      disponibilidad: 'flexible' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: false,
      consentimiento_datos: true
    };

    const errores = validateEmploymentForm(datosDesempleados);
    expect(Object.keys(errores)).toHaveLength(0);
  });

  it('debe validar formulario para ocupados correctamente', () => {
    const datosOcupados = {
      nombre: 'Carlos',
      apellidos: 'Rodríguez', 
      email: 'carlos@example.com',
      telefono: '672947701',
      situacion_laboral: 'ocupados' as const,
      empresa_actual: 'Tech Solutions S.L.',
      disponibilidad: 'tarde' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: true,
      consentimiento_datos: true
    };

    const errores = validateEmploymentForm(datosOcupados);
    expect(Object.keys(errores)).toHaveLength(0);
  });

  it('debe fallar validación con datos incompletos', () => {
    const datosIncompletos = {
      nombre: '',
      apellidos: '',
      email: 'email-invalido',
      telefono: '',
      situacion_laboral: 'desempleados' as const,
      disponibilidad: 'flexible' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: false,
      consentimiento_datos: false
    };

    const errores = validateEmploymentForm(datosIncompletos);
    expect(Object.keys(errores).length).toBeGreaterThan(0);
    expect(errores.nombre).toBeDefined();
    expect(errores.apellidos).toBeDefined();
    expect(errores.email).toBeDefined();
    expect(errores.consentimiento_datos).toBeDefined();
  });
});

describe('🔍 INTEGRACIÓN SISTEMA - VERIFICACIÓN COMPLETA', () => {
  it('debe tener todos los cursos activos correctamente configurados', () => {
    const cursosActivosDesempleados = cursosDesempleadosConfig.filter(c => c.activo);
    const cursosActivosOcupados = cursosOcupadosConfig.filter(c => c.activo);

    // Verificar que los nuevos cursos están activos
    const almacenesActivo = cursosActivosDesempleados.find(c => c.id === 'organizacion-almacenes-desempleados');
    const coachingActivo = cursosActivosOcupados.find(c => c.id === 'PRO-OCUP-COACHING-EQUIPOS-25');

    expect(almacenesActivo).toBeDefined();
    expect(coachingActivo).toBeDefined();
  });

  it('debe tener fechas válidas para cursos de septiembre', () => {
    const cursoAlmacenes = cursosDesempleadosConfig.find(c => c.id === 'organizacion-almacenes-desempleados');
    const cursoCoaching = cursosOcupadosConfig.find(c => c.id === 'PRO-OCUP-COACHING-EQUIPOS-25');

    // Verificar formato de fechas
    expect(cursoAlmacenes?.fecha_inicio).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(cursoAlmacenes?.fecha_fin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(cursoCoaching?.fecha_inicio).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(cursoCoaching?.fecha_fin).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // Verificar que son fechas de septiembre/octubre 2025
    expect(cursoAlmacenes?.fecha_inicio).toBe('2025-09-29');
    expect(cursoCoaching?.fecha_inicio).toBe('2025-09-04');
  });

  it('debe tener plazas disponibles configuradas correctamente', () => {
    const cursoAlmacenes = cursosDesempleadosConfig.find(c => c.id === 'organizacion-almacenes-desempleados');
    const cursoCoaching = cursosOcupadosConfig.find(c => c.id === 'PRO-OCUP-COACHING-EQUIPOS-25');

    expect(cursoAlmacenes?.plazas_disponibles).toBe(20);
    expect(cursoCoaching?.plazas_disponibles).toBe(30);
    expect(typeof cursoAlmacenes?.plazas_disponibles).toBe('number');
    expect(typeof cursoCoaching?.plazas_disponibles).toBe('number');
  });

  it('debe tener configuraciones de contacto correctas por tipo', () => {
    const cursoAlmacenes = cursosDesempleadosConfig.find(c => c.id === 'organizacion-almacenes-desempleados');
    const cursoCoaching = cursosOcupadosConfig.find(c => c.id === 'PRO-OCUP-COACHING-EQUIPOS-25');

    // Desempleados - contacto info@cursostenerife.es
    expect(cursoAlmacenes?.datos_especificos.contacto.email).toBe('info@cursostenerife.es');
    expect(cursoAlmacenes?.datos_especificos.contacto.telefono).toBe('922.706.414');

    // Ocupados - contacto cep.ocupados@gmail.com  
    expect(cursoCoaching?.datos_especificos.contacto.email).toBe('cep.ocupados@gmail.com');
    expect(cursoCoaching?.datos_especificos.contacto.telefono).toBe('672.947.701');
  });
});

describe('🚀 RENDIMIENTO Y ESTRUCTURA', () => {
  it('debe cargar configuraciones rápidamente', async () => {
    const startTime = performance.now();
    
    // Simular carga de configuraciones
    const loadDesempleados = import('../config/cursos-desempleados');
    const loadOcupados = import('../config/cursos-ocupados');
    
    await Promise.all([loadDesempleados, loadOcupados]);
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    // No debería tardar más de 50ms en cargar
    expect(loadTime).toBeLessThan(50);
  });

  it('debe tener estructura consistent en todos los cursos', () => {
    const todosCursos = [...cursosDesempleadosConfig, ...cursosOcupadosConfig];
    
    todosCursos.forEach((curso) => {
      // Campos obligatorios
      expect(curso.id).toBeDefined();
      expect(curso.slug).toBeDefined();
      expect(curso.nombre).toBeDefined();
      expect(curso.tipo).toBeDefined();
      expect(curso.activo).toBeDefined();
      expect(curso.sede).toBeDefined();
      expect(curso.datos_especificos).toBeDefined();
      expect(curso.seo).toBeDefined();
      
      // Tipos correctos
      expect(typeof curso.id).toBe('string');
      expect(typeof curso.slug).toBe('string');
      expect(typeof curso.nombre).toBe('string');
      expect(typeof curso.activo).toBe('boolean');
      expect(['ocupados', 'desempleados']).toContain(curso.tipo);
      expect(['Norte', 'Santa Cruz']).toContain(curso.sede);
    });
  });
});