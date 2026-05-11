import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the page title', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { name: 'Star Trek Characters' });
    expect(heading).toBeInTheDocument();
  });
});
