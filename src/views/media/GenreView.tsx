import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { type MoviesResponse, MOVIE_GENRES_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const genre = searchParams.get('genre') || '28';

  const { data } = useTmdb<MoviesResponse>(
    MOVIE_GENRES_ENDPOINT,
    { page, with_genres: genre },
    [page, genre]
  );


  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Genre</h1>
        <ButtonGroup
          value={genre}
          options={[
            { label: 'Action', value: '28' },
            { label: 'Adventure', value: '12' },
            { label: 'Animation', value: '16' },
            { label: 'Crime', value: '80' },
            { label: 'Family', value: '10751' },
          ]}
          onClick={(value) => setSearchParams({ genre: value })}
        />
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};