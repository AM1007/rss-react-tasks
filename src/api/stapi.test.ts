import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { searchCharacters } from './stapi';

describe('searchCharacters', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls STAPI with default pagination and no name', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ characters: [] }),
    });

    await searchCharacters();

    const calledUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain('https://stapi.co/api/v1/rest/character/search');
    expect(calledUrl).toContain('pageNumber=0');
    expect(calledUrl).toContain('pageSize=10');
    expect(calledUrl).not.toContain('name=');
  });

  it('includes name in the URL when provided', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ characters: [] }),
    });

    await searchCharacters({ name: 'Picard' });

    const calledUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain('name=Picard');
  });

  it('uses POST method', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ characters: [] }),
    });

    await searchCharacters();

    const options = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(options.method).toBe('POST');
  });

  it('returns mapped search result on success', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({
        characters: [{ uid: '1', name: 'Picard', yearOfBirth: 2305, placeOfBirth: 'Earth' }],
      }),
    });

    const result = await searchCharacters();

    expect(result).toEqual({
      items: [{ id: '1', name: 'Picard', description: 'Born 2305. Birthplace: Earth' }],
    });
  });

  it('throws when response is not ok', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(searchCharacters()).rejects.toThrow('STAPI returned 500');
  });

  it('uses custom pageNumber when provided', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ characters: [] }),
    });

    await searchCharacters({ pageNumber: 3 });

    const calledUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain('pageNumber=3');
  });
});
