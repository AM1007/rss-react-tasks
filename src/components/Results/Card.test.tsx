import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

const character = {
  id: '1',
  name: 'Jean-Luc Picard',
  description: 'Born 2305. Birthplace: La Barre, France, Earth',
};

describe('Card', () => {
  it('renders character name and description', () => {
    renderWithProviders(<Card character={character} />);
    expect(screen.getByText('Jean-Luc Picard')).toBeInTheDocument();
    expect(screen.getByText('Born 2305. Birthplace: La Barre, France, Earth')).toBeInTheDocument();
  });

  it('renders name as a heading', () => {
    renderWithProviders(<Card character={character} />);
    expect(screen.getByRole('heading', { name: 'Jean-Luc Picard' })).toBeInTheDocument();
  });

  it('renders as a link to details page', () => {
    renderWithProviders(<Card character={character} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('/details/1');
  });

  it('renders an unchecked checkbox initially', () => {
    renderWithProviders(<Card character={character} />);
    const checkbox = screen.getByRole('checkbox', { name: /select jean-luc picard/i });
    expect(checkbox).not.toBeChecked();
  });

  it('selects the character when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Card character={character} />);
    const checkbox = screen.getByRole('checkbox', { name: /select jean-luc picard/i });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(store.getState().selectedItems.items['1']).toEqual(character);
  });

  it('unselects the character on second click', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Card character={character} />);
    const checkbox = screen.getByRole('checkbox', { name: /select jean-luc picard/i });

    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(store.getState().selectedItems.items['1']).toBeUndefined();
  });
});
