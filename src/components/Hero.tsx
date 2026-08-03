import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

interface Props {
  onSearch: (query?: string) => void;
}

const Hero = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
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
         Acesse dados taxonômicos e metagenômicos de fungos e bactérias em jardins de fungos cultivados por formigas.
        </p>
        <form className="hero__search" onSubmit={handleSubmit}>
          <div className="hero__search-input-wrap">
            <Search size={17} className="hero__search-icon" />
            <input
              type="text"
              className="hero__search-input"
              placeholder="Buscar por nome científico, comum ou descrição..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="hero__search-btn">Buscar</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
