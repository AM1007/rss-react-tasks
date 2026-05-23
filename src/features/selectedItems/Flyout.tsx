import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, selectSelectedCount, selectSelectedItems } from './selectedItemsSlice';
import { downloadCsv } from './downloadCsv';

function Flyout() {
  const count = useAppSelector(selectSelectedCount);
  const items = useAppSelector(selectSelectedItems);
  const dispatch = useAppDispatch();

  if (count === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clear());
  };

  const handleDownload = () => {
    downloadCsv(items);
  };

  return (
    <div
      role="region"
      aria-label="Selected items actions"
      className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between bg-slate-800 px-4 py-3 text-white shadow-lg"
    >
      <span>
        {count} {count === 1 ? 'item' : 'items'} selected
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleUnselectAll}
          className="rounded bg-slate-600 px-4 py-2 hover:bg-slate-500"
        >
          Unselect all
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Flyout;
