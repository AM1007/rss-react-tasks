import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders character name and description', () => {
    const character = {
      id: '1',
      name: 'Jean-Luc Picard',
      description: 'Born 2305. Birthplace: La Barre, France, Earth',
    };
    render(<Card character={character} />);
    expect(screen.getByText('Jean-Luc Picard')).toBeInTheDocument();
    expect(screen.getByText('Born 2305. Birthplace: La Barre, France, Earth')).toBeInTheDocument();
  });

  it('renders name as a heading', () => {
    const character = {
      id: '2',
      name: 'Kirk',
      description: 'No biographical data available',
    };
    render(<Card character={character} />);
    expect(screen.getByRole('heading', { name: 'Kirk' })).toBeInTheDocument();
  });
});
