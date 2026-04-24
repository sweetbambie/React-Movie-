import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, HomeView, MovieView, ReviewsView, TrendingView } from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};