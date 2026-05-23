import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders the page title', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('heading', { name: 'Star Trek Characters' })).toBeInTheDocument();
  });

  it('renders a link to the About page', () => {
    renderWithProviders(<Header />);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
  });
});
