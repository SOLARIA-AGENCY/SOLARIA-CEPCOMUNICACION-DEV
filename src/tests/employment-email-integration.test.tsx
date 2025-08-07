/**
 * 🧪 TESTS EMAIL SYSTEM - CURSOS SEPTIEMBRE 2025
 * 
 * MISIÓN SILENT-TESTER: Verificación completa sistema emails
 * - FormSubmit proxy integration
 * - Webhook n8n fallback
 * - Email templates por tipo de curso
 * - Error handling y retry logic
 * 
 * COVERAGE TARGET: 100% flujo de emails nuevos cursos
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmploymentFormModal from '../components/molecules/EmploymentFormModal';
import { validateEmploymentForm } from '../utils/employmentValidation';

describe('📧 SISTEMA EMAIL INTEGRATION - CURSOS SEPTIEMBRE', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    
    // Reset environment variables
    vi.stubEnv('VITE_NOTIFICATION_EMAIL', 'agency.solaria@gmail.com');
    vi.stubEnv('VITE_FORMSUBMIT_PROXY_URL', 'http://localhost:3001/api/formsubmit-proxy');
    vi.stubEnv('VITE_API_BASE_URL', 'https://www.cepcomunicacion.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    cleanup();
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

  describe('✉️ ORGANIZACIÓN DE ALMACENES - EMAIL FLOW', () => {
    it('debe enviar email correctamente para curso de almacenes', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      // Completar formulario
      await user.type(screen.getByTestId('nombre-input'), 'María');
      await user.type(screen.getByTestId('apellidos-input'), 'González');
      await user.type(screen.getByTestId('email-input'), 'maria@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922123456');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      // Seleccionar sector de interés (específico para desempleados)
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'administracion');
      
      await user.click(screen.getByTestId('consent-checkbox'));

      // Enviar formulario
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:3001/api/formsubmit-proxy',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('Organización de Almacenes')
          })
        );
      });

      // Verificar datos del email
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);
      
      expect(requestBody).toMatchObject({
        email: 'agency.solaria@gmail.com',
        _subject: expect.stringContaining('Organización de Almacenes'),
        _template: 'box',
        _captcha: 'false',
        _format: 'plain',
        mensaje: expect.stringContaining('María González')
      });
      
      // Verificar contenido específico del mensaje
      expect(requestBody.mensaje).toContain('NUEVA INSCRIPCIÓN CURSO SUBVENCIONADO');
      expect(requestBody.mensaje).toContain('desempleados');
      expect(requestBody.mensaje).toContain('administracion'); // El test selecciona 'administracion', no 'comercio'
    });

    it('debe incluir datos específicos de desempleados en email', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      // Completar formulario con sector específico
      await user.type(screen.getByTestId('nombre-input'), 'Ana');
      await user.type(screen.getByTestId('apellidos-input'), 'Martín');
      await user.type(screen.getByTestId('email-input'), 'ana@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922654321');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'comercio');
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      
      // Verificar que incluye 'No especificada' para empresa en el mensaje
      expect(requestBody.mensaje).toContain('Empresa Actual:    No especificada');
      // Verificar estructura de email específica para desempleados
      expect(requestBody._subject).toContain('Organización de Almacenes');
      expect(requestBody.mensaje).toContain('desempleados');
      expect(requestBody.mensaje).toContain('comercio'); // Este test SÍ selecciona comercio
    });
  });

  describe('💼 COACHING DE EQUIPOS - EMAIL FLOW', () => {
    it('debe enviar email correctamente para curso de coaching', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'PRO-OCUP-COACHING-EQUIPOS-25',
        'Desarrollo Organizacional. Coaching de Equipos',
        'ocupados'
      );

      const user = userEvent.setup();

      // Completar formulario
      await user.type(screen.getByTestId('nombre-input'), 'Carlos');
      await user.type(screen.getByTestId('apellidos-input'), 'Rodríguez');
      await user.type(screen.getByTestId('email-input'), 'carlos@empresa.com');
      await user.type(screen.getByTestId('telefono-input'), '672947701');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      // Empresa actual (específico para ocupados)
      await user.type(screen.getByTestId('empresa-input'), 'Tech Solutions S.L.');
      
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:3001/api/formsubmit-proxy',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('Coaching de Equipos')
          })
        );
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      
      expect(requestBody).toMatchObject({
        email: 'agency.solaria@gmail.com',
        _subject: expect.stringContaining('Coaching de Equipos'),
        _template: 'box',
        _captcha: 'false',
        _format: 'plain',
        mensaje: expect.stringContaining('Carlos Rodríguez')
      });
      
      // Verificar que incluye empresa en el mensaje
      expect(requestBody.mensaje).toContain('Tech Solutions S.L.');
      expect(requestBody.mensaje).toContain('ocupados');
    });

    it('debe manejar empresa vacía para ocupados', async () => {
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

      await user.type(screen.getByTestId('nombre-input'), 'Pedro');
      await user.type(screen.getByTestId('apellidos-input'), 'López');
      await user.type(screen.getByTestId('email-input'), 'pedro@example.com');
      await user.type(screen.getByTestId('telefono-input'), '666777888');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      // No llenar campo empresa
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.mensaje).toContain('Empresa Actual:    No especificada');
    });
  });

  describe('🔄 ERROR HANDLING Y FALLBACKS', () => {
    it('debe manejar error de conexión correctamente', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new TypeError('Network error'));
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      await user.type(screen.getByTestId('nombre-input'), 'Test');
      await user.type(screen.getByTestId('apellidos-input'), 'User');
      await user.type(screen.getByTestId('email-input'), 'test@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922000000');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'tecnologia');
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        // El componente debe mostrar el error en la sección de errores
        const errorSection = document.querySelector('.bg-red-50');
        expect(errorSection).toBeInTheDocument();
        expect(errorSection).toHaveTextContent(/Error: Network error/);
      }, { timeout: 5000 });
    });

    it('debe manejar error 500 del proxy', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'PRO-OCUP-COACHING-EQUIPOS-25',
        'Coaching de Equipos',
        'ocupados'
      );

      const user = userEvent.setup();

      await user.type(screen.getByTestId('nombre-input'), 'Error');
      await user.type(screen.getByTestId('apellidos-input'), 'Test');
      await user.type(screen.getByTestId('email-input'), 'error@example.com');
      await user.type(screen.getByTestId('telefono-input'), '666000000');
      
      // La situación laboral se define por el prop 'emplementType', no es un campo del formulario
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText(/Error al enviar el formulario|Error:/)).toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('debe manejar respuesta de error del proxy', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ 
          success: false, 
          error: 'Email validation failed' 
        })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      await user.type(screen.getByTestId('nombre-input'), 'Invalid');
      await user.type(screen.getByTestId('apellidos-input'), 'Email');
      await user.type(screen.getByTestId('email-input'), 'invalid@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922111111');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'sanidad');
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText(/Error: Email validation failed/)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  describe('📝 TEMPLATE EMAIL VALIDATION', () => {
    it('debe generar template correcto para desempleados', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      await user.type(screen.getByTestId('nombre-input'), 'Template');
      await user.type(screen.getByTestId('apellidos-input'), 'Test');
      await user.type(screen.getByTestId('email-input'), 'template@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922222222');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'veterinaria');
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      
      expect(requestBody).toMatchObject({
        _template: 'box',
        _captcha: 'false',
        _format: 'plain',
        mensaje: expect.stringContaining('Template Test')
      });

      expect(requestBody.mensaje).toContain(new Date().toISOString().split('T')[0]); // Contiene fecha ISO
      expect(requestBody.mensaje).toContain('NUEVA INSCRIPCIÓN CURSO SUBVENCIONADO');
    });

    it('debe incluir información de disponibilidad y consentimientos', async () => {
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

      await user.type(screen.getByTestId('nombre-input'), 'Disponibilidad');
      await user.type(screen.getByTestId('apellidos-input'), 'Test');
      await user.type(screen.getByTestId('email-input'), 'disponibilidad@example.com');
      await user.type(screen.getByTestId('telefono-input'), '672333333');
      
      // La situación laboral se define por el prop 'emplementType', no es un campo del formulario
      
      // Cambiar disponibilidad a "mañana" para verificar que se envía correctamente
      await user.selectOptions(screen.getByTestId('disponibilidad-select'), 'mañana');
      
      await user.click(screen.getByTestId('consent-checkbox'));
      // También marcar marketing - buscar por name ya que no tiene data-testid
      await user.click(document.querySelector('input[name="consentimiento_marketing"]') as HTMLInputElement);

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      
      expect(requestBody.mensaje).toContain('Disponibilidad:    mañana');
      expect(requestBody.mensaje).toContain('Tratamiento de Datos:    ✅ ACEPTADO');
      expect(requestBody.mensaje).toContain('Marketing:    ✅ ACEPTADO');
    });
  });

  describe('⚙️ CONFIGURACIÓN SISTEMA', () => {
    it('debe usar variables de entorno correctamente', async () => {
      // Cambiar variables de entorno
      vi.stubEnv('VITE_NOTIFICATION_EMAIL', 'custom@empresa.com');
      vi.stubEnv('VITE_FORMSUBMIT_PROXY_URL', 'https://custom-proxy.com/api/submit');

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      global.fetch = mockFetch;

      renderFormModal(
        'organizacion-almacenes-desempleados',
        'Organización de Almacenes',
        'desempleados'
      );

      const user = userEvent.setup();

      await user.type(screen.getByTestId('nombre-input'), 'Env');
      await user.type(screen.getByTestId('apellidos-input'), 'Test');
      await user.type(screen.getByTestId('email-input'), 'env@example.com');
      await user.type(screen.getByTestId('telefono-input'), '922444444');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.selectOptions(screen.getByTestId('sector-interes-select'), 'otros');
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://custom-proxy.com/api/submit',
          expect.any(Object)
        );
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.email).toBe('custom@empresa.com');
    });

    it('debe usar valores por defecto si env no está definido', async () => {
      // Quitar variables de entorno - usar string vacío en vez de undefined
      vi.stubEnv('VITE_NOTIFICATION_EMAIL', '');
      vi.stubEnv('VITE_FORMSUBMIT_PROXY_URL', '');
      vi.stubEnv('VITE_API_BASE_URL', '');

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

      await user.type(screen.getByTestId('nombre-input'), 'Default');
      await user.type(screen.getByTestId('apellidos-input'), 'Values');
      await user.type(screen.getByTestId('email-input'), 'default@example.com');
      await user.type(screen.getByTestId('telefono-input'), '672555555');
      
      // El campo disponibilidad tiene valor por defecto 'flexible', no es necesario cambiarlo
      
      await user.click(screen.getByTestId('consent-checkbox'));

      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:3001/api/formsubmit-proxy',
          expect.any(Object)
        );
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.email).toBe('agency.solaria@gmail.com');
    });
  });
});

describe('🧪 VALIDATION INTEGRATION', () => {
  it('debe validar datos específicos para curso de almacenes', () => {
    const datosAlmacenes = {
      nombre: 'Usuario',
      apellidos: 'Almacenes',
      email: 'almacenes@example.com',
      telefono: '922123456',
      situacion_laboral: 'desempleados' as const,
      sector_interes: 'comercio',
      disponibilidad: 'mañana' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: false,
      consentimiento_datos: true
    };

    const errores = validateEmploymentForm(datosAlmacenes);
    expect(Object.keys(errores)).toHaveLength(0);
  });

  it('debe validar datos específicos para curso de coaching', () => {
    const datosCoaching = {
      nombre: 'Usuario',
      apellidos: 'Coaching',
      email: 'coaching@example.com',
      telefono: '672947701',
      situacion_laboral: 'ocupados' as const,
      empresa_actual: 'Coaching Solutions',
      disponibilidad: 'tarde' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: true,
      consentimiento_datos: true
    };

    const errores = validateEmploymentForm(datosCoaching);
    expect(Object.keys(errores)).toHaveLength(0);
  });

  it('debe requerir sector_interes para desempleados', () => {
    const datosSinSector = {
      nombre: 'Sin',
      apellidos: 'Sector',
      email: 'sin.sector@example.com',
      telefono: '922000000',
      situacion_laboral: 'desempleados' as const,
      disponibilidad: 'flexible' as const,
      provincia: 'Santa Cruz de Tenerife',
      consentimiento_marketing: false,
      consentimiento_datos: true
    };

    const errores = validateEmploymentForm(datosSinSector);
    expect(errores.sector_interes).toBeDefined();
  });
});