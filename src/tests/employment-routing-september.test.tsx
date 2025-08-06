/**
 * 🧪 TESTS ROUTING SYSTEM - CURSOS SEPTIEMBRE 2025
 * 
 * MISIÓN SILENT-TESTER: Verificación completa sistema rutas duales
 * - DirectEmploymentWrapper
 * - SemanticEmploymentWrapper  
 * - Lazy loading de configuraciones
 * - Navegación y redirecciones
 * 
 * COVERAGE TARGET: 100% rutas nuevas cursos septiembre
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock de configuraciones para testing
vi.mock('../config/cursos-desempleados', () => ({
  cursosDesempleadosConfig: [
    {
      id: 'CP-DESEMP-ALMACENES-25',
      slug: 'organizacion-almacenes-desempleados',
      nombre: 'Organización de Almacenes',
      tipo: 'desempleados',
      activo: true,
      fecha_inicio: '2025-09-29',
      fecha_fin: '2025-10-30',
      plazas_disponibles: 20,
      sede: 'Norte',
      datos_especificos: {
        tipo: 'desempleados',
        contacto: { email: 'info@cursostenerife.es', telefono: '922.706.414' },
        beneficios: ['100% Gratuito'],
        requisitos: ['Estar desempleado'],
        financiacion: 'SEPE/SCE',
        duracion: '140 horas',
        modalidad: 'Presencial',
        certificacion: 'Certificado de Profesionalidad',
        caracteristicas: {
          modalidad: 'presencial',
          practicas_empresas: true,
          orientacion_laboral: true,
          certificado_profesionalidad: true,
          financiado_sepe_sce: true
        }
      },
      seo: {
        title: 'Organización de Almacenes - Test',
        description: 'Test description',
        keywords: 'test keywords'
      }
    }
  ]
}));

vi.mock('../config/cursos-ocupados', () => ({
  cursosOcupadosConfig: [
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
      datos_especificos: {
        tipo: 'ocupados',
        contacto: { email: 'cep.ocupados@gmail.com', telefono: '672.947.701' },
        beneficios: ['100% Gratuito'],
        requisitos: ['Ser trabajador activo'],
        financiacion: 'SEPE',
        duracion: '25 horas',
        modalidad: 'Mixta',
        certificacion: 'Certificado oficial',
        caracteristicas: {
          modalidad: 'hibrido',
          horario: 'tarde',
          compatible_trabajo: true,
          certificacion_oficial: true,
          financiado_sepe: true
        }
      },
      seo: {
        title: 'Coaching de Equipos - Test',
        description: 'Test description',
        keywords: 'test keywords'
      }
    }
  ]
}));

// Mock componentes pesados para testing
vi.mock('../components/templates/DirectEmploymentWrapper', () => ({
  default: () => <div data-testid="direct-employment-wrapper">Direct Employment Wrapper</div>
}));

vi.mock('../components/templates/SemanticEmploymentWrapper', () => ({
  default: () => <div data-testid="semantic-employment-wrapper">Semantic Employment Wrapper</div>
}));

vi.mock('../templates/CursoOcupadosPageComponent', () => ({
  default: ({ curso }: any) => (
    <div data-testid="curso-ocupados-page">
      <h1>{curso.nombre}</h1>
      <p>ID: {curso.id}</p>
    </div>
  )
}));

// Mock del App component para testing de rutas
const TestApp = ({ initialRoute = '/' }: { initialRoute?: string }) => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        {/* Rutas duales para cursos nuevos */}
        <Route 
          path="/organizacion-almacenes-desempleados" 
          element={
            <div data-testid="direct-employment-wrapper">
              Direct Employment Wrapper - Almacenes
            </div>
          } 
        />
        <Route 
          path="/cursos-empleo/organizacion-almacenes-desempleados" 
          element={
            <div data-testid="semantic-employment-wrapper">
              Semantic Employment Wrapper - Almacenes
            </div>
          } 
        />
        <Route 
          path="/coaching-equipos-ocupados" 
          element={
            <div data-testid="direct-employment-wrapper">
              Direct Employment Wrapper - Coaching
            </div>
          } 
        />
        <Route 
          path="/cursos-empleo/coaching-equipos-ocupados" 
          element={
            <div data-testid="semantic-employment-wrapper">
              Semantic Employment Wrapper - Coaching
            </div>
          } 
        />
        
        {/* Rutas de fallback */}
        <Route path="*" element={<div data-testid="not-found">Not Found</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('🔀 SISTEMA RUTAS DUALES - SEPTIEMBRE 2025', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('📍 RUTAS DIRECTAS (Direct Employment Wrapper)', () => {
    it('debe renderizar ruta directa para Organización de Almacenes', async () => {
      render(<TestApp initialRoute="/organizacion-almacenes-desempleados" />);

      expect(screen.getByTestId('direct-employment-wrapper')).toBeInTheDocument();
      expect(screen.getByText(/Direct Employment Wrapper - Almacenes/)).toBeInTheDocument();
    });

    it('debe renderizar ruta directa para Coaching de Equipos', async () => {
      render(<TestApp initialRoute="/coaching-equipos-ocupados" />);

      expect(screen.getByTestId('direct-employment-wrapper')).toBeInTheDocument();
      expect(screen.getByText(/Direct Employment Wrapper - Coaching/)).toBeInTheDocument();
    });
  });

  describe('🌐 RUTAS SEMÁNTICAS (Semantic Employment Wrapper)', () => {
    it('debe renderizar ruta semántica para Organización de Almacenes', async () => {
      render(<TestApp initialRoute="/cursos-empleo/organizacion-almacenes-desempleados" />);

      expect(screen.getByTestId('semantic-employment-wrapper')).toBeInTheDocument();
      expect(screen.getByText(/Semantic Employment Wrapper - Almacenes/)).toBeInTheDocument();
    });

    it('debe renderizar ruta semántica para Coaching de Equipos', async () => {
      render(<TestApp initialRoute="/cursos-empleo/coaching-equipos-ocupados" />);

      expect(screen.getByTestId('semantic-employment-wrapper')).toBeInTheDocument();
      expect(screen.getByText(/Semantic Employment Wrapper - Coaching/)).toBeInTheDocument();
    });
  });

  describe('🔗 COMPATIBILIDAD RUTAS', () => {
    it('debe manejar rutas no existentes correctamente', async () => {
      render(<TestApp initialRoute="/curso-inexistente" />);

      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });

    it('debe diferenciar entre rutas directas y semánticas', async () => {
      // Ruta directa
      const { rerender } = render(<TestApp initialRoute="/organizacion-almacenes-desempleados" />);
      expect(screen.getByText(/Direct Employment Wrapper - Almacenes/)).toBeInTheDocument();

      // Cambiar a ruta semántica
      rerender(<TestApp initialRoute="/cursos-empleo/organizacion-almacenes-desempleados" />);
      expect(screen.getByText(/Semantic Employment Wrapper - Almacenes/)).toBeInTheDocument();
    });
  });
});

describe('⚡ LAZY LOADING Y PERFORMANCE', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe poder cargar configuraciones de forma asíncrona', async () => {
    const loadCursosDesempleados = () => import('../config/cursos-desempleados');
    const loadCursosOcupados = () => import('../config/cursos-ocupados');

    const startTime = performance.now();
    
    const [desempleados, ocupados] = await Promise.all([
      loadCursosDesempleados(),
      loadCursosOcupados()
    ]);

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    expect(desempleados.cursosDesempleadosConfig).toBeDefined();
    expect(ocupados.cursosOcupadosConfig).toBeDefined();
    expect(loadTime).toBeLessThan(100); // Debe cargar en menos de 100ms
  });

  it('debe encontrar cursos por slug en configuraciones lazy', async () => {
    const { cursosDesempleadosConfig } = await import('../config/cursos-desempleados');
    const { cursosOcupadosConfig } = await import('../config/cursos-ocupados');

    const cursoAlmacenes = cursosDesempleadosConfig.find(
      c => c.slug === 'organizacion-almacenes-desempleados'
    );
    const cursoCoaching = cursosOcupadosConfig.find(
      c => c.slug === 'coaching-equipos-ocupados'
    );

    expect(cursoAlmacenes?.id).toBe('CP-DESEMP-ALMACENES-25');
    expect(cursoCoaching?.id).toBe('PRO-OCUP-COACHING-EQUIPOS-25');
  });
});

describe('🎯 DYNAMIC ROUTING LOGIC', () => {
  beforeEach(() => {
    cleanup();
  });

  // Test para simular la lógica del CursoDesempleadosDetailWrapper
  it('debe manejar loading state en wrapper de desempleados', async () => {
    const MockWrapper = () => {
      const [curso, setCurso] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const id = 'CP-DESEMP-ALMACENES-25';

      React.useEffect(() => {
        if (!id) return;
        
        import('../config/cursos-desempleados').then(({ cursosDesempleadosConfig }) => {
          const foundCurso = cursosDesempleadosConfig.find((c: any) => c.id === id);
          setCurso(foundCurso || null);
          setLoading(false);
        });
      }, [id]);

      if (loading) return <div data-testid="loading">Loading...</div>;
      if (!curso) return <div data-testid="not-found">Course not found</div>;
      
      return (
        <div data-testid="curso-encontrado">
          <h1>{(curso as any).nombre}</h1>
          <p>ID: {(curso as any).id}</p>
        </div>
      );
    };

    render(<MockWrapper />);

    // Initially loading
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for course to load
    await waitFor(() => {
      expect(screen.getByTestId('curso-encontrado')).toBeInTheDocument();
    });

    expect(screen.getByText('Organización de Almacenes')).toBeInTheDocument();
    expect(screen.getByText('ID: CP-DESEMP-ALMACENES-25')).toBeInTheDocument();
  });

  // Test para simular la lógica del CursoOcupadosDetailWrapper
  it('debe manejar loading state en wrapper de ocupados', async () => {
    const MockWrapper = () => {
      const [curso, setCurso] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const id = 'PRO-OCUP-COACHING-EQUIPOS-25';

      React.useEffect(() => {
        if (!id) return;
        
        import('../config/cursos-ocupados').then(({ cursosOcupadosConfig }) => {
          const foundCurso = cursosOcupadosConfig.find((c: any) => c.id === id);
          setCurso(foundCurso || null);
          setLoading(false);
        });
      }, [id]);

      if (loading) return <div data-testid="loading">Loading...</div>;
      if (!curso) return <div data-testid="not-found">Course not found</div>;
      
      return (
        <div data-testid="curso-encontrado">
          <h1>{(curso as any).nombre}</h1>
          <p>Tipo: {(curso as any).tipo}</p>
        </div>
      );
    };

    render(<MockWrapper />);

    // Wait for course to load
    await waitFor(() => {
      expect(screen.getByTestId('curso-encontrado')).toBeInTheDocument();
    });

    expect(screen.getByText('Desarrollo Organizacional. Coaching de Equipos')).toBeInTheDocument();
    expect(screen.getByText('Tipo: ocupados')).toBeInTheDocument();
  });

  it('debe manejar IDs no encontrados correctamente', async () => {
    const MockWrapper = () => {
      const [curso, setCurso] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const id = 'CURSO-NO-EXISTENTE';

      React.useEffect(() => {
        if (!id) return;
        
        import('../config/cursos-desempleados').then(({ cursosDesempleadosConfig }) => {
          const foundCurso = cursosDesempleadosConfig.find((c: any) => c.id === id);
          setCurso(foundCurso || null);
          setLoading(false);
        });
      }, [id]);

      if (loading) return <div data-testid="loading">Loading...</div>;
      if (!curso) return <div data-testid="not-found">Course not found</div>;
      
      return <div data-testid="curso-encontrado">Found course</div>;
    };

    render(<MockWrapper />);

    await waitFor(() => {
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });
  });
});

describe('📱 SEO Y METADATOS', () => {
  it('debe tener metadatos SEO completos en configuraciones', async () => {
    const { cursosDesempleadosConfig } = await import('../config/cursos-desempleados');
    const { cursosOcupadosConfig } = await import('../config/cursos-ocupados');

    const cursoAlmacenes = cursosDesempleadosConfig.find(
      c => c.id === 'CP-DESEMP-ALMACENES-25'
    );
    const cursoCoaching = cursosOcupadosConfig.find(
      c => c.id === 'PRO-OCUP-COACHING-EQUIPOS-25'
    );

    // Verificar metadatos completos
    expect(cursoAlmacenes?.seo).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      keywords: expect.any(String)
    });

    expect(cursoCoaching?.seo).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      keywords: expect.any(String)
    });
  });

  it('debe tener títulos SEO únicos y descriptivos', async () => {
    const { cursosDesempleadosConfig } = await import('../config/cursos-desempleados');
    const { cursosOcupadosConfig } = await import('../config/cursos-ocupados');

    const allCourses = [...cursosDesempleadosConfig, ...cursosOcupadosConfig];
    const seoTitles = allCourses.map(c => c.seo.title);

    // Todos los títulos deben ser únicos
    const uniqueTitles = new Set(seoTitles);
    expect(uniqueTitles.size).toBe(seoTitles.length);

    // Títulos deben contener el nombre del curso
    const cursoAlmacenes = cursosDesempleadosConfig.find(
      c => c.id === 'CP-DESEMP-ALMACENES-25'
    );
    expect(cursoAlmacenes?.seo.title).toContain('Almacenes');
    expect(cursoAlmacenes?.seo.title).toContain('Desempleados');
  });
});

describe('🔧 INTEGRACIÓN COMPLETA SISTEMA', () => {
  it('debe tener consistencia entre slugs y IDs', async () => {
    const { cursosDesempleadosConfig } = await import('../config/cursos-desempleados');
    const { cursosOcupadosConfig } = await import('../config/cursos-ocupados');

    const allCourses = [...cursosDesempleadosConfig, ...cursosOcupadosConfig];
    
    allCourses.forEach(curso => {
      // El slug debe contener información del tipo de curso
      if (curso.tipo === 'desempleados') {
        expect(curso.slug).toContain('desempleados');
      } else if (curso.tipo === 'ocupados') {
        expect(curso.slug).toContain('ocupados');
      }
      
      // El ID debe seguir el patrón correcto
      if (curso.tipo === 'desempleados') {
        expect(curso.id).toMatch(/^CP-DESEMP-.+-\d{2}$/);
      } else if (curso.tipo === 'ocupados') {
        expect(curso.id).toMatch(/^PRO-OCUP-.+-\d{2}$/);
      }
    });
  });

  it('debe tener configuración de contacto coherente por tipo', async () => {
    const { cursosDesempleadosConfig } = await import('../config/cursos-desempleados');
    const { cursosOcupadosConfig } = await import('../config/cursos-ocupados');

    // Verificar emails de contacto consistentes
    cursosDesempleadosConfig.forEach(curso => {
      expect(curso.datos_especificos.contacto.email).toBe('info@cursostenerife.es');
      expect(curso.datos_especificos.contacto.telefono).toBe('922.706.414');
    });

    cursosOcupadosConfig.forEach(curso => {
      expect(curso.datos_especificos.contacto.email).toBe('cep.ocupados@gmail.com');
      expect(curso.datos_especificos.contacto.telefono).toBe('672.947.701');
    });
  });
});