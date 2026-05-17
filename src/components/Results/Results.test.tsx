import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';

describe('Results', () => {
  it('shows loader when isLoading is true', () => {
    render(
      <MemoryRouter>
        <Results data={null} isLoading={true} error={null} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <MemoryRouter>
        <Results data={null} isLoading={false} error="Network failure" />
      </MemoryRouter>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Network failure');
  });

  it('renders nothing when data is null and not loading', () => {
    const { container } = render(
      <MemoryRouter>
        <Results data={null} isLoading={false} error={null} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders card list when data is provided', () => {
    const data = {
      items: [
        { id: '1', name: 'Picard', description: 'desc 1' },
        { id: '2', name: 'Kirk', description: 'desc 2' },
      ],
      totalPages: 1,
    };
    render(
      <MemoryRouter>
        <Results data={data} isLoading={false} error={null} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Picard')).toBeInTheDocument();
    expect(screen.getByText('Kirk')).toBeInTheDocument();
  });

  it('renders empty state when data has no items', () => {
    render(
      <MemoryRouter>
        <Results data={{ items: [], totalPages: 0 }} isLoading={false} error={null} />
      </MemoryRouter>,
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
