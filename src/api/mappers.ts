import type { CharacterDTO, SearchResponseDTO } from './types';
import type { Character, SearchResult } from '../types/character';

function buildDescription(dto: CharacterDTO): string {
  const { yearOfBirth, placeOfBirth } = dto;

  if (yearOfBirth !== null && placeOfBirth !== null) {
    return `Born ${yearOfBirth}. Birthplace: ${placeOfBirth}`;
  }
  if (yearOfBirth !== null) {
    return `Born ${yearOfBirth}`;
  }
  if (placeOfBirth !== null) {
    return `Birthplace: ${placeOfBirth}`;
  }
  return 'No biographical data available';
}

export function toCharacter(dto: CharacterDTO): Character {
  return {
    id: dto.uid,
    name: dto.name,
    description: buildDescription(dto),
  };
}

export function toSearchResult(dto: SearchResponseDTO): SearchResult {
  return {
    items: dto.characters.map(toCharacter),
  };
}
