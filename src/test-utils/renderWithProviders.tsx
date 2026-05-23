import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import selectedItemsReducer from '../features/selectedItems/selectedItemsSlice';

export const makeTestStore = () =>
  configureStore({
    reducer: { selectedItems: selectedItemsReducer },
  });

export type TestStore = ReturnType<typeof makeTestStore>;

interface Options {
  store?: TestStore;
  route?: string;
}

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const store = options.store ?? makeTestStore();
  const initialEntries = options.route ? [options.route] : ['/'];

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
}
