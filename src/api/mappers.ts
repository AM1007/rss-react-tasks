import type { CharacterDTO, CharacterDetailsDTO, SearchResponseDTO } from './types';
import type { Character, CharacterDetails, SearchResult } from '../types/character';

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
    totalPages: dto.page.totalPages,
  };
}

export function toCharacterDetails(dto: CharacterDetailsDTO): CharacterDetails {
  return {
    id: dto.uid,
    name: dto.name,
    yearOfBirth: dto.yearOfBirth,
    placeOfBirth: dto.placeOfBirth,
    yearOfDeath: dto.yearOfDeath,
    placeOfDeath: dto.placeOfDeath,
    gender: dto.gender,
    height: dto.height,
    weight: dto.weight,
  };
}
