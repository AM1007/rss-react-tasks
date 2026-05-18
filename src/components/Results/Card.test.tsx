import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('Card', () => {
  it('renders character name and description', () => {
    const character = {
      id: '1',
      name: 'Jean-Luc Picard',
      description: 'Born 2305. Birthplace: La Barre, France, Earth',
    };
    render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Jean-Luc Picard')).toBeInTheDocument();
    expect(screen.getByText('Born 2305. Birthplace: La Barre, France, Earth')).toBeInTheDocument();
  });

  it('renders name as a heading', () => {
    const character = {
      id: '2',
      name: 'Kirk',
      description: 'No biographical data available',
    };
    render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Kirk' })).toBeInTheDocument();
  });

  it('renders as a link to details page', () => {
    const character = {
      id: 'CHMA001',
      name: 'Picard',
      description: 'desc',
    };
    render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('/details/CHMA001');
  });
});
