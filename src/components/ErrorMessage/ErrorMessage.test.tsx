import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the provided message inside an alert', () => {
    render(<ErrorMessage message="Something went wrong" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Something went wrong');
  });

  it('renders different messages when prop changes', () => {
    render(<ErrorMessage message="Network failure" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network failure');
  });
});
