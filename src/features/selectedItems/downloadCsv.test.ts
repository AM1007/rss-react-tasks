import { describe, it, expect } from 'vitest';
import { buildCsv } from './downloadCsv';
import type { Character } from '../../types/character';

const origin = 'https://test.local';

describe('buildCsv', () => {
  it('produces a header-only string for an empty list', () => {
    const result = buildCsv([], origin);
    expect(result).toBe('id,name,description,detailsUrl');
  });

  it('produces a row for a single character', () => {
    const items: Character[] = [{ id: '1', name: 'Picard', description: 'Captain' }];
    const result = buildCsv(items, origin);
    expect(result).toBe(
      'id,name,description,detailsUrl\n1,Picard,Captain,https://test.local/details/1',
    );
  });

  it('escapes commas in values by wrapping in quotes', () => {
    const items: Character[] = [{ id: '1', name: 'Picard, Jean-Luc', description: 'A, B, C' }];
    const result = buildCsv(items, origin);
    expect(result).toContain('"Picard, Jean-Luc"');
    expect(result).toContain('"A, B, C"');
  });

  it('escapes double quotes by doubling them', () => {
    const items: Character[] = [{ id: '1', name: 'Captain "Q"', description: 'desc' }];
    const result = buildCsv(items, origin);
    expect(result).toContain('"Captain ""Q"""');
  });

  it('escapes newlines in values', () => {
    const items: Character[] = [{ id: '1', name: 'Multi\nLine', description: 'desc' }];
    const result = buildCsv(items, origin);
    expect(result).toContain('"Multi\nLine"');
  });

  it('joins multiple rows with newlines', () => {
    const items: Character[] = [
      { id: '1', name: 'A', description: 'a' },
      { id: '2', name: 'B', description: 'b' },
    ];
    const result = buildCsv(items, origin);
    expect(result.split('\n')).toHaveLength(3); // header + 2 rows
  });
});
