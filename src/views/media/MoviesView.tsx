import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, MOVIE_ENDPOINT, type ImageCell, type MovieRespsonse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get('filterType') || 'now_playing';
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${filterType}`, { page });
  
  const updateParam = (value: string) => {
    setSearchParams({ filterType: value });
  };
  
  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <ButtonGroup 
        value={filterType}
        options={[
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
        onClick={(value) => {
            updateParam(value);
            setPage(1);
          }}
        />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};