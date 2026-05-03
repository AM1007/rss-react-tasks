import type { SearchResult } from '../../types/character';
import CardList from './CardList';

interface ResultsProps {
  data: SearchResult | null;
  isLoading: boolean;
  error: string | null;
}

function Results({ data, isLoading, error }: ResultsProps) {
  if (isLoading) {
    return <p className="text-slate-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (data === null) {
    return null;
  }

  return <CardList items={data.items} />;
}

export default Results;
