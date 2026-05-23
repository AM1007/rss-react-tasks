import { Link, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types/character';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggle, selectIsSelected } from '../../features/selectedItems/selectedItemsSlice';

interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const isSelected = useAppSelector(selectIsSelected(character.id));
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggle(character));
  };

  return (
    <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-400 hover:bg-blue-50">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleToggle}
        aria-label={`Select ${character.name}`}
        className="mt-1"
      />
      <Link
        to={`/details/${character.id}${queryString ? `?${queryString}` : ''}`}
        className="block flex-1"
      >
        <h3 className="text-lg font-semibold text-slate-800">{character.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{character.description}</p>
      </Link>
    </div>
  );
}

export default Card;
