import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { organisms } from '../data/organisms';
import OrganismCard from './OrganismCard';
import './SearchPage.css';

const MORPHOLOGY_FILTERS = ['Bastonetes', 'Cocos', 'Filamentosos', 'Leveduriformes', 'Cogumelos', 'Dimórficos', 'Cortadeiras'];
const MORPHOLOGY_MAP: Record<string, string[]> = {
  Bastonetes: ['Bastonete'],
  Cocos: ['Cocos'],
  Filamentosos: ['Filamentosa', 'Filamentoso'],
  Leveduriformes: ['Leveduriforme'],
  Cogumelos: ['Cogumelo'],
  Dimórficos: ['Dimórfico'],
  Cortadeiras: ['Cortadeira'],
};

interface Props {
  onViewDetail: (id: number) => void;
}

const SearchPage = ({ onViewDetail }: Props) => {
  const [query, setQuery] = useState('');
  const [searchInDesc, setSearchInDesc] = useState(false);
  const [reino, setReino] = useState<'Todos' | 'Bacteria' | 'Fungi' | 'Formiga'>('Todos');
  const [morphFilter, setMorphFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    return organisms.filter((org) => {
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        org.name.toLowerCase().includes(q) ||
        org.commonName.toLowerCase().includes(q) ||
        (searchInDesc && org.tags.some((t) => t.toLowerCase().includes(q)));
      const matchReino = reino === 'Todos' || org.type === reino;
      const matchMorph =
        !morphFilter ||
        (MORPHOLOGY_MAP[morphFilter] || []).some(
          (m) => org.morphology.toLowerCase() === m.toLowerCase()
        );
      return matchQuery && matchReino && matchMorph;
    });
  }, [query, searchInDesc, reino, morphFilter]);

  return (
    <div className="search-page">
      <div className="search-page__inner">
        <h1 className="search-page__title">Buscar</h1>

        <div className="search-page__bar">
          <div className="search-page__input-wrap">
            <Search size={17} className="search-page__input-icon" />
            <input
              type="text"
              className="search-page__input"
              placeholder="Buscar por nome científico ou comum..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="search-page__btn">
            <Search size={16} />
            Buscar
          </button>
        </div>

        <label className="search-page__desc-check">
          <input type="checkbox" checked={searchInDesc} onChange={(e) => setSearchInDesc(e.target.checked)} />
          <span>Buscar na descrição</span>
        </label>

        <div className="search-page__filters">
          <div className="search-page__filter-group">
            <span className="search-page__filter-label">Reino:</span>
            {(['Todos', 'Bacteria', 'Fungi', 'Formiga'] as const).map((r) => (
              <button
                key={r}
                className={`search-page__filter-pill ${reino === r ? 'search-page__filter-pill--active' : ''}`}
                onClick={() => setReino(r)}
              >{r}</button>
            ))}
          </div>
          <div className="search-page__filter-group">
            <span className="search-page__filter-label">Morfologia:</span>
            {MORPHOLOGY_FILTERS.map((m) => (
              <button
                key={m}
                className={`search-page__filter-pill ${morphFilter === m ? 'search-page__filter-pill--active' : ''}`}
                onClick={() => setMorphFilter((prev) => prev === m ? null : m)}
              >{m}</button>
            ))}
          </div>
        </div>

        <div className="search-page__results-header">
          <span className="search-page__results-count">
            {results.length} organismo{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </span>
          <button className="search-page__sort-btn">
            <SlidersHorizontal size={14} />
            Ordenar
          </button>
        </div>

        {results.length > 0 ? (
          <div className="search-page__grid">
            {results.map((org) => (
              <OrganismCard key={org.id} organism={org} onViewDetail={onViewDetail} />
            ))}
          </div>
        ) : (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">🔬</div>
            <h3>Nenhum organismo encontrado</h3>
            <p>Tente ajustar os filtros ou o termo de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;