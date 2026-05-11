import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search', () => {
  it('renders input and search button', () => {
    render(<Search initialValue="" onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Enter character name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses initialValue to prefill the input', () => {
    render(<Search initialValue="Picard" onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Enter character name') as HTMLInputElement;
    expect(input.value).toBe('Picard');
  });

  it('updates the input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search initialValue="" onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Enter character name') as HTMLInputElement;

    await user.type(input, 'Kirk');

    expect(input.value).toBe('Kirk');
  });

  it('calls onSearch with the trimmed input when button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialValue="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter character name');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, '  Spock  ');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('Spock');
  });

  it('does not call onSearch when value did not change', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialValue="Picard" onSearch={onSearch} />);
    const button = screen.getByRole('button', { name: 'Search' });

    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does not call onSearch twice for the same trimmed value', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialValue="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter character name');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'Kirk');
    await user.click(button);
    await user.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
