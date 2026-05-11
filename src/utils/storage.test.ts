import { describe, it, expect, beforeEach } from 'vitest';
import { getSearchTerm, setSearchTerm } from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty string when nothing is stored', () => {
    expect(getSearchTerm()).toBe('');
  });

  it('returns the stored search term', () => {
    localStorage.setItem('searchTerm', 'Picard');
    expect(getSearchTerm()).toBe('Picard');
  });

  it('writes the search term to localStorage', () => {
    setSearchTerm('Kirk');
    expect(localStorage.getItem('searchTerm')).toBe('Kirk');
  });
});
