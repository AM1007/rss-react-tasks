import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

describe('About', () => {
  it('renders the About heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'About', level: 1 })).toBeInTheDocument();
  });

  it('renders the RS School link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'RS School React Course' });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders the Back to Home link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Back to Home' })).toBeInTheDocument();
  });
});
