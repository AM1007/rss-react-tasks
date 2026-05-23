import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('shows the moon icon in light theme', () => {
    renderWithTheme();
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toHaveTextContent('🌙');
  });

  it('shows the sun icon after toggling to dark', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }));

    expect(screen.getByRole('button', { name: /switch to light theme/i })).toHaveTextContent('☀️');
  });
});
