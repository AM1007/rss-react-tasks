import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from './ErrorButton';

describe('ErrorButton', () => {
  it('renders a button', () => {
    render(<ErrorButton />);
    expect(screen.getByRole('button', { name: 'Trigger error' })).toBeInTheDocument();
  });

  it('throws an error when clicked', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: 'Trigger error' });

    await expect(async () => {
      await user.click(button);
    }).rejects.toThrow('Test error triggered by ErrorButton');

    errorSpy.mockRestore();
  });
});
