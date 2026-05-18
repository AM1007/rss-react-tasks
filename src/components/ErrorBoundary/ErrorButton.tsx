import { useState } from 'react';

function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error triggered by ErrorButton');
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      Trigger error
    </button>
  );
}

export default ErrorButton;
