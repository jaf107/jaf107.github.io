
import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';

// Mock the matchMedia function for components that might use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Silence console errors during tests
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  vi.clearAllMocks();
});
