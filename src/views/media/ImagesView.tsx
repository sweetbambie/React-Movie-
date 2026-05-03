import { getImageUrl, PERSON_ENDPOINT, type ImagesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-5 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold">Career</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.profiles.map((profile, index) => (
        <img
          key={index}
          src={getImageUrl(profile.file_path)}
          className="rounded-xl object-cover w-full"
        />
      ))}
    </div>
    </section>
  );
};