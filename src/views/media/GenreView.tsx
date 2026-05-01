import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type MovieRespsonse, type ImageCell, MOVIE_GENRES_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre') || '28';

  const { data } = useTmdb<MovieRespsonse>(
    MOVIE_GENRES_ENDPOINT,
    { page, with_genres: genre },
  );

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
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
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};