import { Link } from 'react-router-dom';
import ThemeToggle from '../../features/theme/ThemeToggle';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        Star Trek Characters
      </h1>
      <nav className="flex items-center gap-4">
        <Link to="/about" className="text-blue-600 hover:underline dark:text-blue-400">
          About
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;
