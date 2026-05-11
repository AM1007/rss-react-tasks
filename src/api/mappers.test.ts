import { describe, it, expect } from 'vitest';
import { toCharacter, toSearchResult } from './mappers';

describe('mappers', () => {
  it('returns a Character with mapped id and name', () => {
    const dto = {
      uid: '123',
      name: 'Picard',
      yearOfBirth: null,
      placeOfBirth: null,
    };
    const result = toCharacter(dto);
    expect(result).toEqual({
      id: '123',
      name: 'Picard',
      description: 'No biographical data available',
    });
  });

  it('builds description with year and birthplace when both are present', () => {
    const dto = {
      uid: '456',
      name: 'Jean-Luc Picard',
      yearOfBirth: 2305,
      placeOfBirth: 'La Barre, France, Earth',
    };
    const result = toCharacter(dto);
    expect(result).toEqual({
      id: '456',
      name: 'Jean-Luc Picard',
      description: 'Born 2305. Birthplace: La Barre, France, Earth',
    });
  });

  it('builds description with year when present', () => {
    const dto = {
      uid: '789',
      name: 'Maurice Picard',
      yearOfBirth: 2270,
      placeOfBirth: null,
    };
    const result = toCharacter(dto);
    expect(result).toEqual({
      id: '789',
      name: 'Maurice Picard',
      description: 'Born 2270',
    });
  });

  it('builds description with birthplace when present', () => {
    const dto = {
      uid: '147',
      name: 'Jane Dennis',
      yearOfBirth: null,
      placeOfBirth: 'Detroit',
    };
    const result = toCharacter(dto);
    expect(result).toEqual({
      id: '147',
      name: 'Jane Dennis',
      description: 'Birthplace: Detroit',
    });
  });

  it('returns SearchResult with mapped characters', () => {
    const dto = {
      characters: [
        { uid: '1', name: 'Picard', yearOfBirth: null, placeOfBirth: null },
        { uid: '2', name: 'Kirk', yearOfBirth: null, placeOfBirth: null },
      ],
    };
    const result = toSearchResult(dto);
    expect(result).toEqual({
      items: [
        { id: '1', name: 'Picard', description: 'No biographical data available' },
        { id: '2', name: 'Kirk', description: 'No biographical data available' },
      ],
    });
  });

  it('handles empty characters array', () => {
    const dto = {
      characters: [],
    };
    const result = toSearchResult(dto);
    expect(result).toEqual({
      items: [],
    });
  });
});
