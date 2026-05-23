import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useTheme } from './useTheme';

function ThrowingConsumer() {
  useTheme();
  return null;
}

describe('useTheme', () => {
  it('throws when used outside of ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ThrowingConsumer />)).toThrow(
      /useTheme must be used within a ThemeProvider/,
    );

    consoleError.mockRestore();
  });
});
