import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmploymentFormModal from './EmploymentFormModal';

// Mock fetch global
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock tracking functions
vi.mock('../../utils/employmentTracking', () => ({
  trackEmploymentLead: vi.fn(),
  trackEmploymentFormStep: vi.fn(),
}));

const mockProps = {
  isOpen: true,
  onClose: vi.fn(),
  employmentType: 'ocupados' as const,
  courseId: 'test-course-id',
  courseName: 'Test Course Name'
};

describe('EmploymentFormModal - n8n Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  it('should submit form with correct data structure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(<EmploymentFormModal {...mockProps} />);

    // Fill form fields using data-testid
    await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
    await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
    await userEvent.type(screen.getByTestId('email-input'), 'juan@example.com');
    await userEvent.type(screen.getByTestId('telefono-input'), '123456789');
    
    // Check required consent
    const consentCheckbox = screen.getByTestId('consent-checkbox');
    await userEvent.click(consentCheckbox);
    
    // Verify checkbox is checked
    expect(consentCheckbox).toBeChecked();

    // Submit form
    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    // Wait for fetch to be called
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    }, { timeout: 10000 });

    // Verify the call was made to the correct URL
    expect(mockFetch).toHaveBeenCalledWith(
      'http://148.230.118.124/api/formsubmit-proxy',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: expect.stringContaining('"nombre":"Juan"')
      })
    );
  });

  it('should handle form validation errors', async () => {
    render(<EmploymentFormModal {...mockProps} />);

    // Try to submit without filling required fields
    const form = document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    } else {
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should handle network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('fetch failed'));

    render(<EmploymentFormModal {...mockProps} />);

    // Fill form fields
    await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
    await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
    await userEvent.type(screen.getByTestId('email-input'), 'juan@example.com');
    await userEvent.type(screen.getByTestId('telefono-input'), '123456789');
    await userEvent.click(screen.getByTestId('consent-checkbox'));

    // Submit form
    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error de conexión/i)).toBeInTheDocument();
    });
  });

  it('should send correct data structure to FormSubmit proxy', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(<EmploymentFormModal {...mockProps} />);

    // Fill form
    await userEvent.type(screen.getByTestId('nombre-input'), 'María');
    await userEvent.type(screen.getByTestId('apellidos-input'), 'García');
    await userEvent.type(screen.getByTestId('email-input'), 'maria@example.com');
    await userEvent.type(screen.getByTestId('telefono-input'), '987654321');
    await userEvent.click(screen.getByTestId('consent-checkbox'));

    // Submit form
    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://148.230.118.124/api/formsubmit-proxy',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );
      
      const fetchCall = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody).toMatchObject({
        nombre: 'María',
        apellidos: 'García',
        email_solicitante: 'maria@example.com',
        telefono: '987654321',
        curso: 'Test Course Name'
      });
    }, { timeout: 5000 });
  });

  it('should show success message on successful submission', async () => {
    const onCloseMock = vi.fn();
    
    // Mock successful fetch for the proxy URL specifically
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    render(
      <EmploymentFormModal
        isOpen={true}
        onClose={onCloseMock}
        employmentType="ocupados"
        courseId="test-course"
        courseName="Test Course"
      />
    );

    // Fill form
    await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
    await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
    await userEvent.type(screen.getByTestId('email-input'), 'juan@example.com');
    await userEvent.type(screen.getByTestId('telefono-input'), '123456789');
    await userEvent.click(screen.getByTestId('consent-checkbox'));

    // Submit form
    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText('¡Solicitud enviada correctamente!')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should call onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(
      <EmploymentFormModal
        isOpen={true}
        onClose={onCloseMock}
        employmentType="ocupados"
        courseId="test-course"
        courseName="Test Course"
      />
    );

    // Click the close button (×)
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});