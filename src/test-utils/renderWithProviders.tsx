import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import selectedItemsReducer from '../features/selectedItems/selectedItemsSlice';
import ThemeProvider from '../features/theme/ThemeProvider';

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});

type PreloadedState = Parameters<typeof rootReducer>[0];

export const makeTestStore = (preloadedState?: PreloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type TestStore = ReturnType<typeof makeTestStore>;

interface Options {
  store?: TestStore;
  route?: string;
  preloadedState?: PreloadedState;
}

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const store = options.store ?? makeTestStore(options.preloadedState);
  const initialEntries = options.route ? [options.route] : ['/'];

  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </ThemeProvider>
      </Provider>,
    ),
  };
}
