export interface Character {
  id: string;
  name: string;
  description: string;
}

export interface SearchResult {
  items: Character[];
  totalPages: number;
}
