import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as stapi from './api/stapi';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(stapi, 'searchCharacters').mockResolvedValue({
      items: [{ id: '1', name: 'Picard', description: 'Born 2305. Birthplace: Earth' }],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders header and search', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Star Trek Characters' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter character name')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Picard')).toBeInTheDocument();
    });
  });

  it('calls searchCharacters on mount with empty term from localStorage', async () => {
    render(<App />);
    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: undefined });
    });
  });

  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Kirk');
    render(<App />);
    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: 'Kirk' });
    });
  });

  it('persists search term to localStorage when user searches', async () => {
    const user = userEvent.setup();
    render(<App />);

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
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Picard')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter character name');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'Spock');
    await user.click(button);

    await waitFor(() => {
      expect(stapi.searchCharacters).toHaveBeenCalledWith({ name: 'Spock' });
    });
  });

  it('displays error message when API call fails', async () => {
    vi.spyOn(stapi, 'searchCharacters').mockRejectedValue(new Error('Network error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    });
  });
});
