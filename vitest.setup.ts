import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// 🌑 SHADOW-DEVOPS: Temporal consistency configuration
// Fixed date for deterministic testing - prevents snapshot drift
const FIXED_DATE = '2025-01-15T10:00:00.000Z';

// Mock Date constructor and related time functions for CI consistency
if (process.env.CI === 'true') {
  vi.stubGlobal('Date', class extends Date {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(FIXED_DATE);
      } else {
        super(...(args as []));
      }
    }
    
    static now() {
      return new Date(FIXED_DATE).getTime();
    }
  });
  
  // Ensure consistent timezone
  process.env.TZ = 'UTC';
}

// Enhanced test environment setup
beforeEach(() => {
  // Reset all mocks and timers
  vi.clearAllMocks();
  vi.clearAllTimers();
  
  // Ensure clean DOM state
  document.body.innerHTML = '';
  
  // Reset any global state - mock scrollTo to prevent jsdom warnings
  if (typeof window !== 'undefined') {
    // Mock window.scrollTo to avoid jsdom "Not implemented" warnings
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    });
  }
});

// Global test utilities
(globalThis as any).testUtils = {
  getFixedDate: () => FIXED_DATE,
  getFixedDateISO: () => new Date(FIXED_DATE).toISOString().split('T')[0]
}; 