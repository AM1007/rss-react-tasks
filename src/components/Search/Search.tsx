import { useState } from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

function Search({ initialValue, onSearch }: SearchProps) {
  const [value, setValue] = useState(initialValue);
  const [lastSubmitted, setLastSubmitted] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed === lastSubmitted) {
      return;
    }
    setValue(trimmed);
    setLastSubmitted(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter character name"
        className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
