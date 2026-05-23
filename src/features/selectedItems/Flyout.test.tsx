import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flyout from './Flyout';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import type { Character } from '../../types/character';

const character: Character = {
  id: '1',
  name: 'Picard',
  description: 'desc',
};

const character2: Character = {
  id: '2',
  name: 'Kirk',
  description: 'desc',
};

describe('Flyout', () => {
  it('does not render when no items are selected', () => {
    renderWithProviders(<Flyout />);
    expect(
      screen.queryByRole('region', { name: /selected items actions/i }),
    ).not.toBeInTheDocument();
  });

  it('renders when at least one item is selected', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: { items: { '1': character } } },
    });
    expect(screen.getByRole('region', { name: /selected items actions/i })).toBeInTheDocument();
  });

  it('displays the number of selected items', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { items: { '1': character, '2': character2 } },
      },
    });
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('clears selection when Unselect all is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { items: { '1': character, '2': character2 } },
      },
    });

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(store.getState().selectedItems.items).toEqual({});
  });

  it('hides after Unselect all', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: { items: { '1': character } } },
    });

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(
      screen.queryByRole('region', { name: /selected items actions/i }),
    ).not.toBeInTheDocument();
  });
});
