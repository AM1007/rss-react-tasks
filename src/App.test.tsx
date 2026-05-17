import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import * as stapi from './api/stapi';

function renderApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(stapi, 'searchCharacters').mockResolvedValue({
      items: [{ id: '1', name: 'Picard', description: 'Born 2305. Birthplace: Earth' }],
      totalPages: 1,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders header and search', async () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Star Trek Characters' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter character name')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Picard')).toBeInTheDocument();
    });
  });

  it('calls searchCharacters on mount with empty term from localStorage', async () => {
    renderApp();
    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: undefined, pageNumber: 0 });
    });
  });

  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Kirk');
    renderApp();
    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: 'Kirk', pageNumber: 0 });
    });
  });

  it('persists search term to localStorage when user searches', async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Picard')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter character name');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'Spock');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Spock');
  });

  it('calls searchCharacters with new term when user searches', async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Picard')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter character name');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'Spock');
    await user.click(button);

    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: 'Spock', pageNumber: 0 });
    });
  });

  it('displays error message when API call fails', async () => {
    vi.spyOn(stapi, 'searchCharacters').mockRejectedValue(new Error('Network error'));
    renderApp();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    });
  });
});
