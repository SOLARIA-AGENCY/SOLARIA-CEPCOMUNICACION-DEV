import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterSection from '../../components/organisms/NewsletterSection';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://www.cepcomunicacion.com/test-page',
    origin: 'https://www.cepcomunicacion.com'
  },
  writable: true
});

describe('NewsletterSection', () => {
  const mockWebhookUrl = 'https://test-n8n.example.com/webhook/newsletter-signup';
  const fixedTimestamp = '2024-01-15T10:30:00.000Z';

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders newsletter section with all elements', () => {
    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    expect(screen.getByTestId('newsletter-section')).toBeInTheDocument();
    expect(screen.getByText('Suscríbete a nuestro newsletter')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('firstname-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastname-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('validates required email field', async () => {
    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const submitButton = screen.getByTestId('submit-button');
    const form = screen.getByTestId('newsletter-form');
    
    // Submit button should be disabled when email is empty
    expect(submitButton).toBeDisabled();
    
    // Submit form directly without email to trigger validation
    fireEvent.submit(form);
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Por favor, introduce tu dirección de correo electrónico.')).toBeInTheDocument();
    });
  });

  it('enables submit button when email is provided', async () => {
    const user = userEvent.setup();
    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'test@example.com');
    
    expect(submitButton).not.toBeDisabled();
  });

  it('handles successful subscription', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      success: true,
      message: 'Suscripción exitosa',
      subscriber_id: 'CEP_123456789_abc123',
      timestamp: fixedTimestamp,
      services: {
        brevo_registered: true,
        mailchimp_registered: true,
        welcome_email_sent: true
      }
    };

    // Mock a delayed response to capture loading state
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => mockResponse
        }), 200)
      )
    );

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const firstNameInput = screen.getByTestId('firstname-input');
    const lastNameInput = screen.getByTestId('lastname-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(firstNameInput, 'Juan');
    await user.type(lastNameInput, 'Pérez');
    await user.click(submitButton);
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Procesando...')).toBeInTheDocument();
    });
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Suscripción exitosa')).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(mockWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        timestamp: fixedTimestamp,
        source: 'website_newsletter',
        origin_url: 'https://www.cepcomunicacion.com/test-page',
        campaign_tag: 'suscripcion-newsletter-web'
      })
    });
    
    // Form should be cleared after success
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
    });
  });

  it('handles subscription error', async () => {
    const user = userEvent.setup();
    const mockErrorResponse = {
      success: false,
      message: 'Email ya registrado',
      error_code: 'DUPLICATE_EMAIL'
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockErrorResponse
    });

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'existing@example.com');
    await user.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Email ya registrado')).toBeInTheDocument();
    });
    
    // Form should not be cleared on error
    expect(emailInput).toHaveValue('existing@example.com');
  });

  it('handles network error', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('trims and lowercases email input', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      success: true,
      message: 'Suscripción exitosa'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, '  TEST@EXAMPLE.COM  ');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"email":"test@example.com"')
        })
      );
    });
  });

  it('disables form during submission', async () => {
    const user = userEvent.setup();
    
    // Mock a slow response
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true, message: 'Success' })
        }), 100)
      )
    );

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const firstNameInput = screen.getByTestId('firstname-input');
    const lastNameInput = screen.getByTestId('lastname-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    // All inputs should be disabled during loading
    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(firstNameInput).toBeDisabled();
      expect(lastNameInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  it('uses default webhook URL when not provided', () => {
    const originalEnv = process.env.VITE_N8N_WEBHOOK_URL;
    process.env.VITE_N8N_WEBHOOK_URL = 'https://env-webhook.example.com';
    
    render(<NewsletterSection fixedTimestamp={fixedTimestamp} />);
    
    // Component should render without errors
    expect(screen.getByTestId('newsletter-section')).toBeInTheDocument();
    
    process.env.VITE_N8N_WEBHOOK_URL = originalEnv;
  });

  it('includes privacy notice', () => {
    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    expect(screen.getByText(/Al suscribirte, aceptas recibir comunicaciones/)).toBeInTheDocument();
  });

  it('redirects to thank you page after successful subscription', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      success: true,
      message: 'Suscripción exitosa'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    // Mock window.location.href setter
    const mockLocationSetter = vi.fn();
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        set href(url: string) {
          mockLocationSetter(url);
        }
      },
      writable: true
    });

    render(<NewsletterSection fixedTimestamp={fixedTimestamp} webhookUrl={mockWebhookUrl} />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Suscripción exitosa')).toBeInTheDocument();
    });
    
    // Wait for redirect timeout
    await waitFor(() => {
      expect(mockLocationSetter).toHaveBeenCalledWith('/gracias-suscripcion');
    }, { timeout: 3000 });
  });
});