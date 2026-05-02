import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type MovieRespsonse, type ImageCell, MOVIE_GENRES_ENDPOINT, TV_GENRES_ENDPOINT} from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MOVIE_GENRES = [
  { label: 'Action', value: '28' },
  { label: 'Adventure', value: '12' },
  { label: 'Animation', value: '16' },
  { label: 'Crime', value: '80' },
  { label: 'Family', value: '10751' },
];

const TV_GENRES = [
  { label: 'Action & Adventure', value: '10759' },
  { label: 'Animation', value: '16' },
  { label: 'Comedy', value: '35' },
  { label: 'Crime', value: '80' },
  { label: 'Drama', value: '18' },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre') || '28';

  const mediaType = searchParams.get('mediaType') || 'movie';
  const isMovie = mediaType === 'movie';

  const genres = isMovie ? MOVIE_GENRES : TV_GENRES;

  const endpoint = isMovie ? MOVIE_GENRES_ENDPOINT : TV_GENRES_ENDPOINT;

  const { data } = useTmdb<MovieRespsonse>(endpoint, { page, with_genres: genre });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name,
  }));

  const handleMediaTypeSwitch = (value: string) => {
    const newGenres = value === 'movie' ? MOVIE_GENRES : TV_GENRES;
    setSearchParams({ mediaType: value, genre: newGenres[0].value });
    setPage(1);
  };


  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Genre</h1>
        <div className="flex flex-col items-end gap-3">
        <ButtonGroup
            value={mediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV Shows', value: 'tv' },
            ]}
            onClick={handleMediaTypeSwitch}
          />
          <ButtonGroup
            value={genre}
            options={genres}
            onClick={(value) => {
              setSearchParams({ mediaType, genre: value });
              setPage(1);
            }}
          />
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/movie/${image.id}`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};  