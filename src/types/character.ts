export interface Character {
  id: string;
  name: string;
  description: string;
}

export interface SearchResult {
  items: Character[];
  totalPages: number;
}

export interface CharacterDetails {
  id: string;
  name: string;
  yearOfBirth: number | null;
  placeOfBirth: string | null;
  yearOfDeath: number | null;
  placeOfDeath: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
}
