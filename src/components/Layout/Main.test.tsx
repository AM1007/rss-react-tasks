import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('renders its children', () => {
    render(<Main>Hello</Main>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders a main landmark', () => {
    render(<Main>content</Main>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
