import { getImageUrl, TV_ENDPOINT, type SeasonsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useNavigate } from 'react-router-dom';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2 space-y-4">
      <h2 className="text-2xl font-bold">Seasons</h2>
      {data.seasons?.length ? (
        data.seasons.slice(0, 5).map((season) => (
          <div 
            key={season.id} 
            className="bg-gray-800 p-5 rounded-xl shadow cursor-pointer" 
            onClick={() => navigate(`/tv/show/${id}/season/${season.season_number}`)}
          >
            <img className="w-50 rounded-xl object-cover" src={getImageUrl(season.poster_path)} alt={season.name} />
            <p className="text-white font-semibold mt-2">{season.name}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No Seasons Available.</p>
      )}
    </section>
  );
};