import { Link, SearchBar, ButtonGroup } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Header = () => {
const navigate = useNavigate();
// const [searchParams] = useSearchParams();
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') ?? '';
const mediaType = searchParams.get('mediaType') || 'movie';

const handleSearch = (value: string) => {
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

const updateParam = (key: string, value: string) => {
    setSearchParams({ q: query, mediaType, page: '1', [key]: value });
  };

  return (
    <header>
      <nav className='flex justify-between bg-gray-800'>
        <div className='flex gap-4 p-4'>
          <h1 className="text-2xl font-bold text-white">TMDB Explorer</h1>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV</Link>
          <Link to="/trending/movie/day">Trending</Link>
          <Link to="/genre/movies/action">Genres</Link>
        </div>
        <div className='flex items-center gap-4 p-4'>
          <SearchBar value={query} onChange={handleSearch}/>
          <ButtonGroup 
            value={mediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV Shows', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(value) => updateParam('mediaType', value)}
          />
        </div>
      </nav>
    </header>
  );
};