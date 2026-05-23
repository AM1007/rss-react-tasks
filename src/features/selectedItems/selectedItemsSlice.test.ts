import { describe, it, expect } from 'vitest';
import reducer, { toggle, clear } from './selectedItemsSlice';
import type { Character } from '../../types/character';

const makeCharacter = (id: string, name = 'Spock'): Character =>
  ({
    id,
    name,
    description: '',
  }) as Character;

describe('selectedItemsSlice', () => {
  it('returns empty state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ items: {} });
  });

  it('adds character on toggle when not selected', () => {
    const character = makeCharacter('1');
    const state = reducer({ items: {} }, toggle(character));
    expect(state.items['1']).toEqual(character);
  });

  it('removes character on toggle when already selected', () => {
    const character = makeCharacter('1');
    const initial = { items: { '1': character } };
    const state = reducer(initial, toggle(character));
    expect(state.items['1']).toBeUndefined();
  });

  it('clears all selected items', () => {
    const initial = {
      items: { '1': makeCharacter('1'), '2': makeCharacter('2') },
    };
    const state = reducer(initial, clear());
    expect(state.items).toEqual({});
  });
});
