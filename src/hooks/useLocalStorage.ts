import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string,
): readonly [string, (newValue: string) => void] {
  const [value, setStoredValue] = useState(() => localStorage.getItem(key) ?? initialValue);

  const setValue = (newValue: string) => {
    setStoredValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setValue] as const;
}
