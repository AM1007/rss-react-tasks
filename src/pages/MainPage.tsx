import { useEffect, useState } from 'react';
import { useSearchParams, useParams, Outlet, useNavigate } from 'react-router-dom';
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
  const { detailsId } = useParams<{ detailsId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams(
        (prev) => {
          prev.set('page', '1');
          return prev;
        },
        { replace: true },
      );
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
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
  };

  const handleCloseDetails = () => {
    const query = searchParams.toString();
    navigate(`/${query ? `?${query}` : ''}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Search initialValue={searchTerm} onSearch={handleSearch} />
        </section>
        <div className={detailsId ? 'grid grid-cols-1 gap-6 lg:grid-cols-2' : ''}>
          <div onClick={detailsId ? handleCloseDetails : undefined}>
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <Results data={data} isLoading={isLoading} error={error} />
              {data && (
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
          </div>
          {detailsId && (
            <div onClick={(e) => e.stopPropagation()}>
              <Outlet />
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <ErrorButton />
        </div>
      </Main>
    </div>
  );
}

export default MainPage;
