import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useNewsletterSubscription } from '../../hooks/useNewsletterSubscription';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window and document
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://www.cepcomunicacion.com/test-page'
  },
  writable: true
});

Object.defineProperty(document, 'referrer', {
  value: 'https://google.com',
  writable: true
});

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Browser)',
  writable: true
});

describe('useNewsletterSubscription', () => {
  const mockWebhookUrl = 'https://test-n8n.example.com/webhook/newsletter-signup';
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
    mockFetch.mockReset();
    mockOnSuccess.mockClear();
    mockOnError.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with idle state', () => {
    const { result } = renderHook(() => useNewsletterSubscription());
    
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.message).toBe('');
    expect(result.current.isIdle).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('validates empty email', async () => {
    const { result } = renderHook(() => useNewsletterSubscription());
    
    act(() => {
      result.current.subscribe({ email: '' });
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.message).toBe('Por favor, introduce tu dirección de correo electrónico.');
    expect(result.current.isError).toBe(true);
  });

  it('validates email format', async () => {
    const { result } = renderHook(() => useNewsletterSubscription());
    
    act(() => {
      result.current.subscribe({ email: 'invalid-email' });
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.message).toBe('Por favor, introduce un email válido.');
    expect(result.current.isError).toBe(true);
  });

  it('handles successful subscription', async () => {
    const mockResponse = {
      success: true,
      message: 'Suscripción exitosa',
      subscriber_id: 'CEP_123456789_abc123',
      timestamp: '2024-01-15T10:30:00.000Z',
      services: {
        brevo_registered: true,
        mailchimp_registered: true,
        welcome_email_sent: true
      }
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const { result } = renderHook(() => 
      useNewsletterSubscription({ 
        webhookUrl: mockWebhookUrl,
        onSuccess: mockOnSuccess 
      })
    );
    
    await act(async () => {
      await result.current.subscribe({
        email: 'test@example.com',
        firstName: 'Juan',
        lastName: 'Pérez'
      });
    });
    
    expect(result.current.state.status).toBe('success');
    expect(result.current.state.message).toBe('Suscripción exitosa');
    expect(result.current.state.subscriberId).toBe('CEP_123456789_abc123');
    expect(result.current.isSuccess).toBe(true);
    expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse);
    
    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(mockWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: expect.stringContaining('"email":"test@example.com"')
    });
  });

  it('handles subscription error from server', async () => {
    const mockErrorResponse = {
      success: false,
      message: 'Email ya registrado'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockErrorResponse
    });

    const { result } = renderHook(() => 
      useNewsletterSubscription({ 
        webhookUrl: mockWebhookUrl,
        onError: mockOnError 
      })
    );
    
    await act(async () => {
      await result.current.subscribe({ email: 'existing@example.com' });
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.message).toBe('Email ya registrado');
    expect(result.current.isError).toBe(true);
    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('handles HTTP error responses', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    const { result } = renderHook(() => 
      useNewsletterSubscription({ 
        webhookUrl: mockWebhookUrl,
        onError: mockOnError 
      })
    );
    
    await act(async () => {
      await result.current.subscribe({ email: 'test@example.com' });
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.message).toBe('HTTP 500: Internal Server Error');
    expect(result.current.isError).toBe(true);
    expect(mockOnError).toHaveBeenCalled();
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => 
      useNewsletterSubscription({ 
        webhookUrl: mockWebhookUrl,
        onError: mockOnError 
      })
    );
    
    await act(async () => {
      await result.current.subscribe({ email: 'test@example.com' });
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.message).toBe('Network error');
    expect(result.current.isError).toBe(true);
    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('shows loading state during subscription', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValueOnce(promise);

    const { result } = renderHook(() => useNewsletterSubscription({ webhookUrl: mockWebhookUrl }));
    
    act(() => {
      result.current.subscribe({ email: 'test@example.com' });
    });
    
    // Should be in loading state
    expect(result.current.state.status).toBe('loading');
    expect(result.current.state.message).toBe('Procesando suscripción...');
    expect(result.current.isLoading).toBe(true);
    
    // Resolve the promise
    act(() => {
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      });
    });
    
    await waitFor(() => {
      expect(result.current.state.status).toBe('success');
    });
  });

  it('resets state correctly', () => {
    const { result } = renderHook(() => useNewsletterSubscription());
    
    // Set some state
    act(() => {
      result.current.subscribe({ email: '' }); // This will cause an error
    });
    
    expect(result.current.state.status).toBe('error');
    
    // Reset state
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.message).toBe('');
    expect(result.current.isIdle).toBe(true);
  });

  it('trims and lowercases email', async () => {
    mockFetch.mockClear();
    
    const mockResponse = {
      success: true,
      message: 'Success'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const { result } = renderHook(() => useNewsletterSubscription({ webhookUrl: mockWebhookUrl }));
    
    await act(async () => {
      await result.current.subscribe({ 
        email: '  TEST@EXAMPLE.COM  ',
        firstName: '  Juan  ',
        lastName: '  Pérez  '
      });
    });
    
    await waitFor(() => {
      expect(result.current.state.status).toBe('success');
    });
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchCall = mockFetch.mock.calls[0];
    expect(fetchCall).toBeDefined();
    expect(fetchCall[1]).toBeDefined();
    expect(fetchCall[1].body).toBeDefined();
    
    const requestBody = JSON.parse(fetchCall[1].body);
    
    expect(requestBody.email).toBe('test@example.com');
    expect(requestBody.firstName).toBe('Juan');
    expect(requestBody.lastName).toBe('Pérez');
  });

  it('includes all required payload fields', async () => {
    const mockResponse = {
      success: true,
      message: 'Success'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const { result } = renderHook(() => useNewsletterSubscription({ webhookUrl: mockWebhookUrl }));
    
    await act(async () => {
      await result.current.subscribe({ 
        email: 'test@example.com',
        firstName: 'Juan',
        lastName: 'Pérez'
      });
    });
    
    await waitFor(() => {
      expect(result.current.state.status).toBe('success');
    });
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchCall = mockFetch.mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);
    
    expect(requestBody).toMatchObject({
      email: 'test@example.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      source: 'website_newsletter',
      origin_url: 'https://www.cepcomunicacion.com/test-page',
      campaign_tag: 'suscripcion-newsletter-web',
      user_agent: 'Mozilla/5.0 (Test Browser)',
      referrer: 'https://google.com'
    });
    
    expect(requestBody.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('uses default webhook URL from environment', () => {
    const originalEnv = process.env.VITE_N8N_WEBHOOK_URL;
    process.env.VITE_N8N_WEBHOOK_URL = 'https://env-webhook.example.com';
    
    const { result } = renderHook(() => useNewsletterSubscription());
    
    // Hook should initialize without errors
    expect(result.current.state.status).toBe('idle');
    
    process.env.VITE_N8N_WEBHOOK_URL = originalEnv;
  });

  it('handles missing optional fields gracefully', async () => {
    const mockResponse = {
      success: true,
      message: 'Success'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const { result } = renderHook(() => useNewsletterSubscription({ webhookUrl: mockWebhookUrl }));
    
    await act(async () => {
      await result.current.subscribe({ email: 'test@example.com' });
    });
    
    await waitFor(() => {
      expect(result.current.state.status).toBe('success');
    });
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchCall = mockFetch.mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);
    
    expect(requestBody.firstName).toBe('');
    expect(requestBody.lastName).toBe('');
  });
});