import { Link, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types/character';

interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link
      to={`/details/${character.id}${queryString ? `?${queryString}` : ''}`}
      className="block rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-400 hover:bg-blue-50"
    >
      <h3 className="text-lg font-semibold text-slate-800">{character.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{character.description}</p>
    </Link>
  );
}

export default Card;
