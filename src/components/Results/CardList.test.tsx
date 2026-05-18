import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardList from './CardList';

describe('CardList', () => {
  it('renders a card for each item', () => {
    const items = [
      { id: '1', name: 'Picard', description: 'desc 1' },
      { id: '2', name: 'Kirk', description: 'desc 2' },
      { id: '3', name: 'Spock', description: 'desc 3' },
    ];
    render(
      <MemoryRouter>
        <CardList items={items} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Picard')).toBeInTheDocument();
    expect(screen.getByText('Kirk')).toBeInTheDocument();
    expect(screen.getByText('Spock')).toBeInTheDocument();
  });

  it('renders all card headings', () => {
    const items = [
      { id: '1', name: 'Picard', description: 'desc 1' },
      { id: '2', name: 'Kirk', description: 'desc 2' },
    ];
    render(
      <MemoryRouter>
        <CardList items={items} />
      </MemoryRouter>,
    );
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
  });

  it('shows a message when items list is empty', () => {
    render(
      <MemoryRouter>
        <CardList items={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
