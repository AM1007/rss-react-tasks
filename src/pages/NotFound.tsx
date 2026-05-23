import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 dark:bg-slate-950">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-100">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-200">
          Page not found
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
