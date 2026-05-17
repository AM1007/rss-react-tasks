import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { name: 'Star Trek Characters' });
    expect(heading).toBeInTheDocument();
  });

  it('renders a link to the About page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
  });
});
