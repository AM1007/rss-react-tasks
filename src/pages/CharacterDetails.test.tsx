import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import * as stapi from './../api/stapi';

function renderWithRoute(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/details/:detailsId" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CharacterDetails', () => {
  beforeEach(() => {
    vi.spyOn(stapi, 'getCharacterById').mockResolvedValue({
      id: 'CHMA0000169418',
      name: 'Jean-Luc Picard',
      yearOfBirth: 2305,
      placeOfBirth: 'La Barre, France, Earth',
      yearOfDeath: null,
      placeOfDeath: null,
      gender: 'M',
      height: 178,
      weight: 80,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders character details when data is loaded', async () => {
    renderWithRoute('/details/CHMA0000169418');
    await waitFor(() => {
      expect(screen.getByText('Jean-Luc Picard')).toBeInTheDocument();
    });
    expect(screen.getByText('2305')).toBeInTheDocument();
    expect(screen.getByText('La Barre, France, Earth')).toBeInTheDocument();
  });

  it('calls getCharacterById with the uid from URL', async () => {
    renderWithRoute('/details/CHMA0000169418');
    await waitFor(() => {
      expect(stapi.getCharacterById).toHaveBeenCalledWith('CHMA0000169418');
    });
  });

  it('renders Close button', async () => {
    renderWithRoute('/details/CHMA0000169418');
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    vi.spyOn(stapi, 'getCharacterById').mockRejectedValue(new Error('Network error'));
    renderWithRoute('/details/CHMA0000169418');
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error');
    });
  });
});
