import type { Character } from '../../types/character';
import Card from './Card';

interface CardListProps {
  items: Character[];
}

function CardList({ items }: CardListProps) {
  if (items.length === 0) {
    return <p className="text-slate-500">No results found</p>;
  }

  return (
    <div className="grid gap-3">
      {items.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CardList;
