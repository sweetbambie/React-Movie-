import { LinkGroup, Modal } from '@/components';
import {  MOVIE_ENDPOINT } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const TrailerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
            <p className="text-gray-300">{data.overview}</p>
            {trailerVideo && (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title="Movie Trailer"
                  allowFullScreen
                />
              </div>
            )}
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
    </Modal>
  );
};