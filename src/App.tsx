import { useEffect, useState } from 'react';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import { searchCharacters } from './api/stapi';
import type { SearchResult } from './types/character';
import ErrorButton from './components/ErrorBoundary/ErrorButton';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await searchCharacters({ name: searchTerm || undefined });
        setData(result);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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
        </section>
        <div className="mt-6 flex justify-end">
          <ErrorButton />
        </div>
      </Main>
    </div>
  );
}

export default App;
