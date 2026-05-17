export interface CharacterDTO {
  uid: string;
  name: string;
  yearOfBirth: number | null;
  placeOfBirth: string | null;
}

export interface PageDTO {
  totalPages: number;
}

export interface SearchResponseDTO {
  page: PageDTO;
  characters: CharacterDTO[];
}

export interface CharacterDetailsDTO {
  uid: string;
  name: string;
  yearOfBirth: number | null;
  placeOfBirth: string | null;
  yearOfDeath: number | null;
  placeOfDeath: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
}

export interface CharacterDetailsResponseDTO {
  character: CharacterDetailsDTO;
}
