import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type MovieRespsonse, TRENDING_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType = 'movie', interval = 'day' } = useParams();

  const { data } = useTmdb<MovieRespsonse>(`${TRENDING_ENDPOINT}/${mediaType}/${interval}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name,
  }));

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Trending</h1>
        <ButtonGroup
          value={mediaType}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV Shows', value: 'tv' },
          ]}
          onClick={(value) => {
            navigate(`/trending/${value}/${interval}`);
            setPage(1);
          }}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => {
            navigate(`/trending/${mediaType}/${value}`);
            setPage(1);
          }}
        />
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) =>
          navigate(mediaType === 'movie' ? `/movie/${image.id}/credits` : `/tv/show/${image.id}/credits`)
        }
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};