import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../types/character';
import type { RootState } from '../../store';

export interface SelectedItemsState {
  items: Record<string, Character>;
}

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      if (state.items[character.id]) {
        delete state.items[character.id];
      } else {
        state.items[character.id] = character;
      }
    },
    clear: (state) => {
      state.items = {};
    },
  },
});

export const { toggle, clear } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;

export const selectSelectedItems = (state: RootState) => Object.values(state.selectedItems.items);

export const selectSelectedCount = (state: RootState) =>
  Object.keys(state.selectedItems.items).length;

export const selectIsSelected = (id: string) => (state: RootState) =>
  Boolean(state.selectedItems.items[id]);
