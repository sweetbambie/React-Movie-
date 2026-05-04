import { Link } from '@/components';

export const Header = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies">Movies</Link>
        <Link to="/tv">TV</Link>
        <Link to="/trending/movie/day">Trending</Link>
        <Link to="/genre/movies/action">Genres</Link>
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
};