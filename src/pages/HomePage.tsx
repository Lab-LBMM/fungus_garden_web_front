import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import MorphologyFilter from '../components/MorphologyFilter';
import FeaturedOrganisms from '../components/FeaturedOrganisms';
import AboutSection from '../components/AboutSection';
import CTASection from '../components/CTASection';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero onSearch={(query) => navigate(query ? `/buscar?q=${encodeURIComponent(query)}` : '/buscar')} />
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

export default HomePage;
