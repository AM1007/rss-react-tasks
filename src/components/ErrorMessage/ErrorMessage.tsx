interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
      role="alert"
    >
      <h3 className="font-semibold text-red-800 dark:text-red-300">Something went wrong</h3>
      <p className="mt-1 text-sm text-red-700 dark:text-red-400">{message}</p>
    </div>
  );
}

export default ErrorMessage;
