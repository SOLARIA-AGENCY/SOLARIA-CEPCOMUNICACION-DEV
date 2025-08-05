import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmploymentFormModal from '../../components/molecules/EmploymentFormModal';

// Mock fetch global
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock tracking functions
vi.mock('../../utils/employmentTracking', () => ({
  trackEmploymentLead: vi.fn(),
  trackEmploymentFormStep: vi.fn()
}));

describe('EmploymentFormModal - N8N Integration Tests', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    employmentType: 'ocupados' as const,
    courseId: 'prevencion-riesgos-ambientales-ocupados',
    courseName: 'Prevención de Riesgos Ambientales'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    mockFetch.mockClear();
  });

  describe('Form Submission Flow', () => {
    it('should render all required form fields', () => {
      render(<EmploymentFormModal {...mockProps} />);
      
      expect(screen.getByTestId('nombre-input')).toBeInTheDocument();
      expect(screen.getByTestId('apellidos-input')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('telefono-input')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('should validate required fields before submission', async () => {
      render(<EmploymentFormModal {...mockProps} />);

      // Try to submit empty form using form submit
      const nameInput = screen.getByTestId('nombre-input');
      const form = nameInput.closest('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('submit-button'));
      }

      await waitFor(() => {
        expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Verify fetch was not called due to validation errors
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      render(<EmploymentFormModal {...mockProps} />);

      // Fill form with invalid data
      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'invalid-email');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');

      // Submit form using form submit method
      const nameInput = screen.getByTestId('nombre-input');
      const form = nameInput.closest('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('submit-button'));
      }

      await waitFor(() => {
        expect(mockFetch).not.toHaveBeenCalled();
        expect(screen.getByText(/El email no tiene un formato válido/i)).toBeInTheDocument();
      });
    });

    it('should submit form successfully with valid data', async () => {
      // Mock successful FormSubmit proxy response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      render(<EmploymentFormModal {...mockProps} />);

      // Fill form with valid data (same as debug test)
      await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
      await userEvent.type(screen.getByTestId('email-input'), 'juan@test.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      
      // Accept consent
      const consentCheckbox = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentCheckbox);

      // Verify checkbox is checked
      expect(consentCheckbox).toBeChecked();

      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));

      // Wait for fetch to be called (same as debug test)
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      }, { timeout: 10000 });

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/solicitud enviada correctamente/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('should handle network errors gracefully', async () => {
      // Mock network error that contains 'fetch' to trigger the connection error message
      mockFetch.mockRejectedValueOnce(new TypeError('fetch failed'));

      render(<EmploymentFormModal {...mockProps} />);

      // Fill form
      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'test@example.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      
      const consentimientoDatos = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentimientoDatos);

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText(/error de conexión/i)).toBeInTheDocument();
      });
    });

    it('should send correct data structure to FormSubmit proxy', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      render(<EmploymentFormModal {...mockProps} />);

      // Fill form with complete data
      await userEvent.type(screen.getByTestId('nombre-input'), 'María');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'García');
      await userEvent.type(screen.getByTestId('email-input'), 'maria@test.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '722456789');
      await userEvent.type(screen.getByTestId('empresa-input'), 'Test Company');
      
      const consentimientoDatos = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentimientoDatos);

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs).toBeDefined();
        expect(callArgs[1]).toBeDefined();
        expect(callArgs[1].body).toBeDefined();
        
        const requestBody = JSON.parse(callArgs[1].body);
        
        expect(requestBody).toMatchObject({
          nombre: 'María',
          apellidos: 'García',
          email_solicitante: 'maria@test.com',
          telefono: '722456789',
          curso: 'Prevención de Riesgos Ambientales',
          tipo_curso: 'ocupados',
          empresa_actual: 'Test Company',
          consentimiento_datos: 'Sí'
        });

        expect(requestBody.fecha_envio).toBeDefined();
        expect(requestBody.origen).toBe('Formulario web - Fallback via Proxy');
      });
    });

    it('should handle form submission within reasonable time', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      const startTime = Date.now();
      
      render(<EmploymentFormModal {...mockProps} />);

      await userEvent.type(screen.getByTestId('nombre-input'), 'Performance');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'Test');
      await userEvent.type(screen.getByTestId('email-input'), 'perf@test.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      
      const consentimientoDatos = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentimientoDatos);

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText(/solicitud enviada correctamente/i)).toBeInTheDocument();
      });

      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
    });
  });

  describe('Form Behavior', () => {
    it('should clear errors when user starts typing', async () => {
      render(<EmploymentFormModal {...mockProps} />);

      // Submit empty form to trigger validation errors using form submit
      const nameInput = screen.getByTestId('nombre-input');
      const form = nameInput.closest('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('submit-button'));
      }

      await waitFor(() => {
        expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Start typing in name field
      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/El nombre es obligatorio/i)).not.toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('should close modal after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      const onCloseMock = vi.fn();
      
      render(<EmploymentFormModal {...mockProps} onClose={onCloseMock} />);

      // Fill and submit form
      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'test@example.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      
      const consentimientoDatos = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentimientoDatos);

      fireEvent.click(screen.getByTestId('submit-button'));

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/solicitud enviada correctamente/i)).toBeInTheDocument();
      });

      // Wait for modal to close (after 3 seconds)
      await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalled();
      }, { timeout: 4000 });
    });
  });

  describe('Different Employment Types', () => {
    it('should handle desempleados employment type', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      const desempleadosProps = {
        ...mockProps,
        employmentType: 'desempleados' as const
      };

      render(<EmploymentFormModal {...desempleadosProps} />);

      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'test@example.com');
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      
      // For desempleados, sector_interes is required
      const sectorSelect = screen.getByTestId('sector-interes-select');
      await userEvent.selectOptions(sectorSelect, 'sanidad');
      
      const consentimientoDatos = screen.getByTestId('consent-checkbox');
      await userEvent.click(consentimientoDatos);

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      }, { timeout: 10000 });
    });
  });

  describe('Debug Tests', () => {
    it('DEBUG: should verify form submission step by step', async () => {
      console.log('🔍 Starting debug test...');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      render(<EmploymentFormModal {...mockProps} />);

      // Verify form is rendered
      console.log('✅ Form rendered');
      expect(screen.getByTestId('nombre-input')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();

      // Fill required fields step by step
      console.log('📝 Filling form fields...');
      await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
      console.log('✅ Name filled');
      
      await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
      console.log('✅ Surname filled');
      
      await userEvent.type(screen.getByTestId('email-input'), 'juan@test.com');
      console.log('✅ Email filled');
      
      await userEvent.type(screen.getByTestId('telefono-input'), '666123456');
      console.log('✅ Phone filled');
      
      // Check consent checkbox
      const consentCheckbox = screen.getByTestId('consent-checkbox');
      console.log('📋 Consent checkbox found:', consentCheckbox);
      
      await userEvent.click(consentCheckbox);
      console.log('✅ Consent checkbox clicked');
      
      // Verify checkbox is checked
      expect(consentCheckbox).toBeChecked();
      console.log('✅ Consent checkbox is checked');

      // Verify fetch mock is ready
      console.log('🔧 Fetch mock calls before submit:', mockFetch.mock.calls.length);
      expect(mockFetch.mock.calls.length).toBe(0);

      // Submit form
      console.log('🚀 Submitting form...');
      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);
      console.log('✅ Submit button clicked');

      // Wait for fetch to be called with detailed logging
       await waitFor(() => {
         console.log('🔍 Checking fetch calls...', mockFetch.mock.calls.length);
         if (mockFetch.mock.calls.length > 0) {
           console.log('✅ Fetch was called!');
           console.log('📞 Fetch call details:', mockFetch.mock.calls[0]);
         }
         expect(mockFetch).toHaveBeenCalled();
       }, { 
         timeout: 10000
       });

       console.log('🎉 Debug test completed successfully!');
    });
  });
});