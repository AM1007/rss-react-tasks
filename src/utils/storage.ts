const SEARCH_TERM_KEY = 'searchTerm';

export function getSearchTerm(): string {
  return localStorage.getItem(SEARCH_TERM_KEY) ?? '';
}

export function setSearchTerm(term: string): void {
  localStorage.setItem(SEARCH_TERM_KEY, term);
}
