import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Results from './Results';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('Results', () => {
  it('shows loader when isLoading is true', () => {
    renderWithProviders(<Results data={null} isLoading={true} error={null} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    renderWithProviders(<Results data={null} isLoading={false} error="Network failure" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network failure');
  });

  it('renders nothing when data is null and not loading', () => {
    renderWithProviders(<Results data={null} isLoading={false} error={null} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
  });

  it('renders card list when data is provided', () => {
    const data = {
      items: [
        { id: '1', name: 'Picard', description: 'desc 1' },
        { id: '2', name: 'Kirk', description: 'desc 2' },
      ],
      totalPages: 1,
    };
    renderWithProviders(<Results data={data} isLoading={false} error={null} />);
    expect(screen.getByText('Picard')).toBeInTheDocument();
    expect(screen.getByText('Kirk')).toBeInTheDocument();
  });

  it('renders empty state when data has no items', () => {
    renderWithProviders(
      <Results data={{ items: [], totalPages: 0 }} isLoading={false} error={null} />,
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
