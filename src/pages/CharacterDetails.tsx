import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getCharacterById } from '../api/stapi';
import type { CharacterDetails as CharacterDetailsType } from '../types/character';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

function CharacterDetails() {
  const { detailsId } = useParams<{ detailsId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<CharacterDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCharacterById(detailsId);
        setData(result);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [detailsId]);

  const handleClose = () => {
    const query = searchParams.toString();
    navigate(`/${query ? `?${query}` : ''}`);
  };

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Character Details</h2>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-300"
        >
          Close
        </button>
      </div>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="space-y-2 text-slate-700">
          <p>
            <span className="font-semibold">Name:</span> {data.name}
          </p>
          {data.yearOfBirth !== null && (
            <p>
              <span className="font-semibold">Year of birth:</span> {data.yearOfBirth}
            </p>
          )}
          {data.placeOfBirth !== null && (
            <p>
              <span className="font-semibold">Birthplace:</span> {data.placeOfBirth}
            </p>
          )}
          {data.yearOfDeath !== null && (
            <p>
              <span className="font-semibold">Year of death:</span> {data.yearOfDeath}
            </p>
          )}
          {data.placeOfDeath !== null && (
            <p>
              <span className="font-semibold">Place of death:</span> {data.placeOfDeath}
            </p>
          )}
          {data.gender !== null && (
            <p>
              <span className="font-semibold">Gender:</span> {data.gender}
            </p>
          )}
          {data.height !== null && (
            <p>
              <span className="font-semibold">Height:</span> {data.height} cm
            </p>
          )}
          {data.weight !== null && (
            <p>
              <span className="font-semibold">Weight:</span> {data.weight} kg
            </p>
          )}
        </div>
      )}
    </aside>
  );
}

export default CharacterDetails;
