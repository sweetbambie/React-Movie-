import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, GenreView, HomeView, MoviesView, ReviewsView, TrendingView } from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genres" element={<GenreView />} />
        <Route path="/movies" element={<MoviesView />}>
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};