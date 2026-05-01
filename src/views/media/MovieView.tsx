import { LinkGroup, Modal, DetailItem} from '@/components';
import { type MovieRespsonse, getBackdropUrl, getImageUrl, MOVIE_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, );

  const trailerVideo =
    data?.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.name?.toLowerCase().includes('official')
    ) || data?.videos?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="grid grid-rows-[auto_1fr] h-full">
        <img className="w-full h-[240px] object-cover rounded-2xl" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid grid-cols-[auto_1fr] gap-5 p-5 min-h-0">
          <img className="w-[200px] object-cover rounded-xl" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="overflow-y-auto space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.release_date} />
              <DetailItem label="Rating" value={data.vote_average} />
            </div>
            {trailerVideo && (
              <div className="aspect-video w-[50%]">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title={trailerVideo.name}
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
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};