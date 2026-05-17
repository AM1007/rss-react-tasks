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
