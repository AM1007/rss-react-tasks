import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-2xl font-bold text-slate-800">Star Trek Characters</h1>
      <nav>
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}

export default Header;
