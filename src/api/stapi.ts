import type { CharacterDetailsResponseDTO, SearchResponseDTO } from './types';
import type { CharacterDetails, SearchResult } from '../types/character';
import { toCharacterDetails, toSearchResult } from './mappers';

const BASE_URL = 'https://stapi.co/api/v1/rest';
const PAGE_SIZE = 10;

interface SearchParams {
  name?: string;
  pageNumber?: number;
}

export async function searchCharacters(params: SearchParams = {}): Promise<SearchResult> {
  const url = new URL(`${BASE_URL}/character/search`);
  url.searchParams.set('pageNumber', String(params.pageNumber ?? 0));
  url.searchParams.set('pageSize', String(PAGE_SIZE));

  if (params.name) {
    url.searchParams.set('name', params.name);
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`STAPI returned ${response.status}`);
  }

  const data = (await response.json()) as SearchResponseDTO;
  return toSearchResult(data);
}

export async function getCharacterById(uid: string): Promise<CharacterDetails> {
  const url = new URL(`${BASE_URL}/character`);
  url.searchParams.set('uid', uid);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`STAPI returned ${response.status}`);
  }

  const data = (await response.json()) as CharacterDetailsResponseDTO;
  return toCharacterDetails(data.character);
}
