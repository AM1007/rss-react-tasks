import type { SearchResponseDTO } from './types';
import type { SearchResult } from '../types/character';
import { toSearchResult } from './mappers';

const BASE_URL = 'https://stapi.co/api/v1/rest';
const PAGE_SIZE = 10;

interface SearchParams {
  name?: string;
  pageNumber?: number;
}

export async function searchCharacters(params: SearchParams = {}): Promise<SearchResult> {
  const body = new URLSearchParams({
    pageNumber: String(params.pageNumber ?? 0),
    pageSize: String(PAGE_SIZE),
  });

  if (params.name) {
    body.append('name', params.name);
  }

  const response = await fetch(`${BASE_URL}/character/search`, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error(`STAPI returned ${response.status}`);
  }

  const data = (await response.json()) as SearchResponseDTO;
  return toSearchResult(data);
}
