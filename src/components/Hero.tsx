import { useState } from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

interface Props {
  onSearch: () => void;
}

const Hero = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch();
  };

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          Explore o Mundo<br />Microscópico
        </h1>
        <p className="hero__subtitle">
          Acesse dados taxonômicos e genômicos de fungos e bactérias em uma<br className="hero__br" />
          plataforma desenhada para a comunidade científica.
        </p>
        <div className="hero__search">
          <div className="hero__search-input-wrap">
            <Search size={17} className="hero__search-icon" />
            <input
              type="text"
              className="hero__search-input"
              placeholder="Buscar por nome científico ou comum..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="hero__search-btn" onClick={handleSearch}>Buscar</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
