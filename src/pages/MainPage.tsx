import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Main from '../components/Layout/Main';
import Search from '../components/Search/Search';
import Results from '../components/Results/Results';
import Pagination from '../components/Pagination/Pagination';
import { searchCharacters } from '../api/stapi';
import type { SearchResult } from '../types/character';
import ErrorButton from '../components/ErrorBoundary/ErrorButton';
import { useLocalStorage } from '../hooks/useLocalStorage';

function MainPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await searchCharacters({
          name: searchTerm || undefined,
          pageNumber: page - 1,
        });
        setData(result);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [searchTerm, page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Search initialValue={searchTerm} onSearch={handleSearch} />
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Results data={data} isLoading={isLoading} error={error} />
          {data && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
        <div className="mt-6 flex justify-end">
          <ErrorButton />
        </div>
      </Main>
    </div>
  );
}

export default MainPage;
