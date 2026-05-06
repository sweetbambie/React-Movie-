// import { TV_ENDPOINT, MOVIE_ENDPOINT } from '@/core/constants';
import type { MovieRespsonse } from '@/core/types';
import { useOutletContext } from 'react-router-dom';

export const TrailerView = () => {
  const { data, isTv } = useOutletContext<{ data: MovieRespsonse; isTv: boolean }>();
  // const endpoint = isTv ? TV_ENDPOINT : MOVIE_ENDPOINT;

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="gap-8 flex-1 space-y-4">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">Trailer</h1>
        {trailerVideo ? (
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title={isTv ? 'TV Show Trailer' : 'Movie Trailer'}
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-gray-400">No trailer available.</p>
        )}
      </div>
    </section>
  );
};