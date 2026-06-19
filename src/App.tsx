import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import MorphologyFilter from './components/MorphologyFilter';
import FeaturedOrganisms from './components/FeaturedOrganisms';
import AboutSection from './components/AboutSection';
import CTASection from './components/CTASection';
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailPage';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero onSearch={() => navigate('/buscar')} />
      <StatsBar />
      <MorphologyFilter />
      <FeaturedOrganisms
        onViewAll={() => navigate('/buscar')}
        onViewDetail={(id) => navigate(`/organismo/${id}`)}
      />
      <AboutSection onViewAll={() => navigate('/buscar')} />
      <CTASection onViewAll={() => navigate('/buscar')} />
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname === '/buscar' || location.pathname.startsWith('/organismo')
    ? 'buscar'
    : 'home';

  return (
    <>
      <Header
        currentPage={currentPage}
        onNavigate={(page) => navigate(page === 'home' ? '/' : '/buscar')}
      />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/buscar"        element={<SearchPage onViewDetail={(id) => navigate(`/organismo/${id}`)} />} />
          <Route path="/organismo/:id" element={<DetailPage />} />
        </Routes>
      </main>
      <Footer onNavigate={(page) => navigate(page === 'home' ? '/' : '/buscar')} />
    </>
  );
}

export default App;