export interface CharacterDTO {
  uid: string;
  name: string;
  yearOfBirth: number | null;
  placeOfBirth: string | null;
}

export interface SearchResponseDTO {
  characters: CharacterDTO[];
}
