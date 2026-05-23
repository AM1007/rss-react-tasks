import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from './ThemeProvider';
import { useTheme } from './useTheme';

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <span data-testid="theme-value">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
    </>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('provides light theme by default', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  it('reads stored theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('falls back to light when localStorage value is invalid', () => {
    localStorage.setItem('theme', 'banana');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('applies dark class to document element when theme is dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
