import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Filter, RotateCcw, Dna, Bug, Microscope } from 'lucide-react';
import { organisms } from '../data/organisms';
import OrganismCard from './OrganismCard';
import TaxonomyFilter, {
  MICROBE_RANKS,
  ANT_RANKS,
  getInitialSelection,
} from './TaxonomyFilter';
import './SearchPage.css';

const MORPHOLOGY_FILTERS = [
  'Bastonetes',
  'Cocos',
  'Filamentosos',
  'Leveduriformes',
  'Cogumelos',
  'Dimórficos',
  'Cortadeiras',
];
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

  // Separate taxonomy selections
  const [microbeSelection, setMicrobeSelection] = useState<Record<string, string[]>>(
    getInitialSelection(MICROBE_RANKS)
  );
  const [antSelection, setAntSelection] = useState<Record<string, string[]>>(
    getInitialSelection(ANT_RANKS)
  );

  const [activeTaxonomyTab, setActiveTaxonomyTab] = useState<'microbes' | 'ants'>('microbes');
  const [showTaxonomyFilter, setShowTaxonomyFilter] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'genome'>('name');

  // Auto-switch taxonomy tab when Reino pill changes
  useEffect(() => {
    if (reino === 'Formiga') {
      setActiveTaxonomyTab('ants');
    } else if (reino === 'Bacteria' || reino === 'Fungi') {
      setActiveTaxonomyTab('microbes');
    }
  }, [reino]);

  const microbeOrganisms = useMemo(
    () => organisms.filter((o) => o.type === 'Bacteria' || o.type === 'Fungi'),
    []
  );
  const antOrganisms = useMemo(
    () => organisms.filter((o) => o.type === 'Formiga'),
    []
  );

  const totalMicrobeFilters = useMemo(
    () => Object.values(microbeSelection).reduce((a, b) => a + (b ? b.length : 0), 0),
    [microbeSelection]
  );

  const totalAntFilters = useMemo(
    () => Object.values(antSelection).reduce((a, b) => a + (b ? b.length : 0), 0),
    [antSelection]
  );

  const totalTaxonomyFilters = totalMicrobeFilters + totalAntFilters;

  const results = useMemo(() => {
    let filtered = organisms.filter((org) => {
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

      const tax = org.detail?.taxonomyInfo as Record<string, string> | undefined;

      let matchTaxonomy = true;
      if (org.type === 'Formiga') {
        if (tax) {
          matchTaxonomy = ANT_RANKS.every((r) => {
            const selectedVals = antSelection[r.key] || [];
            return selectedVals.length === 0 || (tax[r.key] && selectedVals.includes(tax[r.key]));
          });
        }
      } else {
        if (tax) {
          matchTaxonomy = MICROBE_RANKS.every((r) => {
            const selectedVals = microbeSelection[r.key] || [];
            return selectedVals.length === 0 || (tax[r.key] && selectedVals.includes(tax[r.key]));
          });
        }
      }

      return matchQuery && matchReino && matchMorph && matchTaxonomy;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'genome') {
        const sizeA = a.detail?.genomeSize || 0;
        const sizeB = b.detail?.genomeSize || 0;
        return sizeB - sizeA;
      }
      return 0;
    });

    return filtered;
  }, [query, searchInDesc, reino, morphFilter, microbeSelection, antSelection, sortBy]);

  const resetAllFilters = () => {
    setQuery('');
    setSearchInDesc(false);
    setReino('Todos');
    setMorphFilter(null);
    setMicrobeSelection(getInitialSelection(MICROBE_RANKS));
    setAntSelection(getInitialSelection(ANT_RANKS));
  };

  return (
    <div className="search-page">
      <div className="search-page__inner">
        <h1 className="search-page__title">Buscar Organismos</h1>

        <div className="search-page__bar">
          <div className="search-page__input-wrap">
            <Search size={17} className="search-page__input-icon" />
            <input
              type="text"
              className="search-page__input"
              placeholder="Buscar por nome científico, comum ou taxonomia..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="search-page__btn">
            <Search size={16} />
            Buscar
          </button>
        </div>

        <div className="search-page__sub-bar">
          <label className="search-page__desc-check">
            <input
              type="checkbox"
              checked={searchInDesc}
              onChange={(e) => setSearchInDesc(e.target.checked)}
            />
            <span>Buscar na descrição e tags</span>
          </label>

          {(query || reino !== 'Todos' || morphFilter || totalTaxonomyFilters > 0) && (
            <button className="search-page__reset-all-btn" onClick={resetAllFilters}>
              <RotateCcw size={13} />
              Resetar Todos os Filtros
            </button>
          )}
        </div>

        <div className="search-page__filters">
          <div className="search-page__filter-group">
            <span className="search-page__filter-label">Organismo:</span>
            {(['Todos', 'Bacteria', 'Fungi', 'Formiga'] as const).map((r) => (
              <button
                key={r}
                className={`search-page__filter-pill ${reino === r ? 'search-page__filter-pill--active' : ''}`}
                onClick={() => setReino(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="search-page__filter-group">
            <span className="search-page__filter-label">Morfologia:</span>
            {MORPHOLOGY_FILTERS.map((m) => (
              <button
                key={m}
                className={`search-page__filter-pill ${morphFilter === m ? 'search-page__filter-pill--active' : ''}`}
                onClick={() => setMorphFilter((prev) => (prev === m ? null : m))}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Taxonomic Checkbox Hierarchy Section (Split into 2 Filters) */}
        <div className="search-page__taxonomy-section">
          <div className="search-page__taxonomy-header">
            <button
              type="button"
              className="search-page__taxonomy-toggle-btn"
              onClick={() => setShowTaxonomyFilter((prev) => !prev)}
            >
              <Filter size={16} />
              <span>Filtros Taxonômicos Específicos</span>
              {totalTaxonomyFilters > 0 && (
                <span className="search-page__taxonomy-count-badge">
                  {totalTaxonomyFilters}
                </span>
              )}
            </button>
          </div>

          {showTaxonomyFilter && (
            <div className="search-page__taxonomy-container">
              {/* Filter Selector Tabs */}
              <div className="search-page__taxonomy-tabs">
                <button
                  type="button"
                  className={`search-page__taxonomy-tab-btn ${
                    activeTaxonomyTab === 'microbes' ? 'search-page__taxonomy-tab-btn--active' : ''
                  }`}
                  onClick={() => setActiveTaxonomyTab('microbes')}
                >
                  <Dna size={16} />
                  <span>Bactérias e Fungos</span>
                  <span className="search-page__taxonomy-tab-sub">
                    (Reino, Filo, Classe, Ordem, Família, Gênero, Espécie)
                  </span>
                  {totalMicrobeFilters > 0 && (
                    <span className="search-page__taxonomy-tab-badge">
                      {totalMicrobeFilters}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className={`search-page__taxonomy-tab-btn ${
                    activeTaxonomyTab === 'ants' ? 'search-page__taxonomy-tab-btn--active' : ''
                  }`}
                  onClick={() => setActiveTaxonomyTab('ants')}
                >
                  <Bug size={16} />
                  <span>Formigas</span>
                  <span className="search-page__taxonomy-tab-sub">
                    (Reino, Filo, Classe, Ordem, Superfamília, Família, Subfamília, Espécie)
                  </span>
                  {totalAntFilters > 0 && (
                    <span className="search-page__taxonomy-tab-badge">
                      {totalAntFilters}
                    </span>
                  )}
                </button>
              </div>

              {/* Active Filter Content */}
              {activeTaxonomyTab === 'microbes' ? (
                <TaxonomyFilter
                  title="Taxonomia de Bactérias e Fungos"
                  ranks={MICROBE_RANKS}
                  organisms={microbeOrganisms}
                  selection={microbeSelection}
                  onChange={setMicrobeSelection}
                />
              ) : (
                <TaxonomyFilter
                  title="Taxonomia de Formigas"
                  ranks={ANT_RANKS}
                  organisms={antOrganisms}
                  selection={antSelection}
                  onChange={setAntSelection}
                />
              )}
            </div>
          )}
        </div>

        <div className="search-page__results-header">
          <span className="search-page__results-count">
            {results.length} organismo{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </span>

          <div className="search-page__sort-wrap">
            <SlidersHorizontal size={14} />
            <span className="search-page__sort-label">Ordenar:</span>
            <select
              className="search-page__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'type' | 'genome')}
            >
              <option value="name">Nome Científico (A-Z)</option>
              <option value="type">Tipo (Bacteria, Fungi, Formiga)</option>
              <option value="genome">Tamanho do Genoma (Mb)</option>
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="search-page__grid">
            {results.map((org) => (
              <OrganismCard key={org.id} organism={org} onViewDetail={onViewDetail} />
            ))}
          </div>
        ) : (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">
              <Microscope size={44} color="var(--gray-400)" />
            </div>
            <h3>Nenhum organismo encontrado</h3>
            <p>Tente ajustar os filtros taxonômicos, a busca ou a morfologia.</p>
            <button className="search-page__btn search-page__btn--center" onClick={resetAllFilters}>
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;