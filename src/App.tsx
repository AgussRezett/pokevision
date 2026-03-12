import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout';
import SeasonSelector from '@/components/pages/SeasonSelector/SeasonSelector';
import SeasonDetail from '@/components/pages/SeasonDetail/SeasonDetail';
import EpisodePlayer from '@/components/pages/EpisodePlayer/EpisodePlayer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<SeasonSelector />} />
          <Route path="season/:seasonNumber" element={<SeasonDetail />} />
        </Route>
        <Route
          path="season/:seasonNumber/episode/:episodeNumber"
          element={<EpisodePlayer />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
