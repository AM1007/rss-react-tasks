import type { Character } from '../../types/character';

interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{character.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{character.description}</p>
    </article>
  );
}

export default Card;
