import type { SearchResult } from '../../types/character';
import CardList from './CardList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface ResultsProps {
  data: SearchResult | null;
  isLoading: boolean;
  error: string | null;
}

function Results({ data, isLoading, error }: ResultsProps) {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (data === null) {
    return null;
  }

  return <CardList items={data.items} />;
}

export default Results;
