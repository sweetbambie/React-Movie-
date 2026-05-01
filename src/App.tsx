import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, GenreView, HomeView, ReviewsView, TrendingView, NowPlayingView } from '@/views';
import { Route, Routes } from 'react-router-dom';
import { MovieView } from './views/media/MovieView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
      <Route path="/movies" element={<NowPlayingView />} />
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genres" element={<GenreView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};