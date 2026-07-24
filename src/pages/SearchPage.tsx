import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Filter, RotateCcw, Dna, Bug } from 'lucide-react';
import { organisms } from '../data/organisms';
import OrganismCard from '../components/OrganismCard';
import TaxonomyFilter, {
  MICROBE_RANKS,
  ANT_RANKS,
  getInitialSelection,
} from '../components/TaxonomyFilter';
import './SearchPage.css';

/**
 * Mapeamento de categorias de morfologia por reino biologico.
 * Define as palavras-chave utilizadas na filtragem morfológica.
 */
const MORPHOLOGY_BY_REINO: Record<'Formiga' | 'Bacteria' | 'Fungo', { label: string; match: string[] }[]> = {
  Formiga: [
    { label: 'Agricultura basal', match: ['basal', 'agricultura basal'] },
    { label: 'Agricultura de Levedura', match: ['levedura', 'agricultura de levedura'] },
    { label: 'Agricultura de Derivada', match: ['derivada', 'agricultura de derivada', 'agricultura derivada'] },
    { label: 'Agricultura de Fungos corais', match: ['corais', 'fungos corais', 'agricultura de fungos corais'] },
  ],
  Bacteria: [
    { label: 'Bastonetes', match: ['bastonete'] },
    { label: 'Cocos', match: ['cocos'] },
    { label: 'Filamentosos', match: ['filamentosa', 'filamentoso'] },
  ],
  Fungo: [
    { label: 'Filamentosos', match: ['filamentosa', 'filamentoso'] },
    { label: 'Leveduriformes', match: ['leveduriforme'] },
    { label: 'Dimórficos', match: ['dimórfico', 'dimorfico'] },
    { label: 'Cogumelos', match: ['cogumelo'] },
  ],
};

const ALL_MORPHOLOGIES = Array.from(
  new Set(Object.values(MORPHOLOGY_BY_REINO).flatMap((list) => list.map((item) => item.label)))
);

interface Props {
  onViewDetail: (id: number) => void;
}

/**
 * Pagina de consulta e filtragem avancada de organismos.
 * Suporta busca por texto, filtro de reino, morfologia, simbiose e hierarquia taxonomica.
 */
const SearchPage = ({ onViewDetail }: Props) => {
  // Estados para os filtros principais e de texto
  const [query, setQuery] = useState('');
  const [searchInDesc, setSearchInDesc] = useState(false);
  const [reino, setReino] = useState<'Todos' | 'Formiga' | 'Bacteria' | 'Fungo'>('Todos');
  const [morphFilter, setMorphFilter] = useState<string | null>(null);
  const [selectedBacteriaFilter, setSelectedBacteriaFilter] = useState<string | null>(null);
  const [selectedFungiFilter, setSelectedFungiFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'genome'>('name');

  // Estados para expansao e navegacao da secao taxonomica
  const [showTaxonomyFilter, setShowTaxonomyFilter] = useState(false);
  const [activeTaxonomyTab, setActiveTaxonomyTab] = useState<'microbes' | 'ants'>('microbes');

  // Selecao dos filtros taxonômicos por categoria
  const [microbeSelection, setMicrobeSelection] = useState<Record<string, string[]>>(() =>
    getInitialSelection(MICROBE_RANKS)
  );

  const [antSelection, setAntSelection] = useState<Record<string, string[]>>(() =>
    getInitialSelection(ANT_RANKS)
  );

  // Extrai todas as bacterias associadas catalogadas
  const availableAssociatedBacteria = useMemo(() => {
    const set = new Set<string>();
    organisms.forEach((o) => {
      if (o.associatedBacteria) {
        o.associatedBacteria.forEach((b) => set.add(b));
      }
    });
    return Array.from(set).sort();
  }, []);

  // Extrai todos os fungos associados catalogados
  const availableAssociatedFungi = useMemo(() => {
    const set = new Set<string>();
    organisms.forEach((o) => {
      if (o.associatedFungi) {
        o.associatedFungi.forEach((f) => set.add(f));
      }
    });
    return Array.from(set).sort();
  }, []);

  // Determina os filtros de morfologia disponiveis de acordo com o reino ativo
  const availableMorphologyFilters = useMemo(() => {
    if (reino === 'Formiga') {
      return MORPHOLOGY_BY_REINO.Formiga.map((m) => m.label);
    }
    if (reino === 'Bacteria') {
      return MORPHOLOGY_BY_REINO.Bacteria.map((m) => m.label);
    }
    if (reino === 'Fungo') {
      return MORPHOLOGY_BY_REINO.Fungo.map((m) => m.label);
    }
    return ALL_MORPHOLOGIES;
  }, [reino]);

  // Reseta o filtro de morfologia caso a selecao atual nao seja valida para o novo reino
  useEffect(() => {
    if (morphFilter && !availableMorphologyFilters.includes(morphFilter)) {
      setMorphFilter(null);
    }
  }, [reino, availableMorphologyFilters, morphFilter]);

  // Le parametros da URL no carregamento inicial
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const r = params.get('reino');
    const m = params.get('morfologia');
    if (q) setQuery(q);
    if (r && ['Formiga', 'Bacteria', 'Fungo'].includes(r)) setReino(r as any);
    if (m) setMorphFilter(m);
  }, []);

  // Reseta filtros relacionais ao alterar o filtro de reino
  useEffect(() => {
    setSelectedBacteriaFilter(null);
    setSelectedFungiFilter(null);

    if (reino === 'Bacteria' || reino === 'Fungo') {
      setActiveTaxonomyTab('microbes');
    } else if (reino === 'Formiga') {
      setActiveTaxonomyTab('ants');
    }
  }, [reino]);

  const microbeOrganisms = useMemo(
    () => organisms.filter((o) => o.type === 'Bacteria' || o.type === 'Fungo'),
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

  // Algoritmo de filtragem e ordenacao dos resultados
  const results = useMemo(() => {
    let filtered = organisms.filter((org) => {
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        org.name.toLowerCase().includes(q) ||
        org.commonName.toLowerCase().includes(q) ||
        (searchInDesc && (
          org.tags.some((t) => t.toLowerCase().includes(q)) ||
          Boolean(org.detail?.description?.toLowerCase().includes(q)) ||
          Boolean(org.detail?.habitat?.toLowerCase().includes(q))
        ));
      const matchReino = reino === 'Todos' || org.type === reino;

      let matchMorph = true;
      if (morphFilter) {
        let matches: string[] = [];
        if (reino !== 'Todos') {
          const item = MORPHOLOGY_BY_REINO[reino]?.find((x) => x.label === morphFilter);
          if (item) matches = item.match;
        } else {
          for (const key of Object.keys(MORPHOLOGY_BY_REINO) as ('Formiga' | 'Bacteria' | 'Fungo')[]) {
            const item = MORPHOLOGY_BY_REINO[key].find((x) => x.label === morphFilter);
            if (item) {
              matches = item.match;
              break;
            }
          }
        }

        if (matches.length > 0) {
          const morphLower = org.morphology.toLowerCase();
          const tagsLower = org.tags.map((t) => t.toLowerCase());
          matchMorph = matches.some((m) => morphLower.includes(m) || tagsLower.some((t) => t.includes(m)));
        } else {
          matchMorph = org.morphology.toLowerCase().includes(morphFilter.toLowerCase());
        }
      }

      let matchAssociatedBacteria = true;
      if (selectedBacteriaFilter) {
        if (org.type === 'Formiga') {
          matchAssociatedBacteria = Boolean(
            org.associatedBacteria &&
              org.associatedBacteria.some(
                (b) => b.toLowerCase() === selectedBacteriaFilter.toLowerCase()
              )
          );
        } else if (org.type === 'Bacteria') {
          matchAssociatedBacteria =
            org.name.toLowerCase().includes(selectedBacteriaFilter.toLowerCase()) ||
            org.commonName.toLowerCase().includes(selectedBacteriaFilter.toLowerCase());
        } else {
          matchAssociatedBacteria = false;
        }
      }

      let matchAssociatedFungi = true;
      if (selectedFungiFilter) {
        if (org.type === 'Formiga') {
          matchAssociatedFungi = Boolean(
            org.associatedFungi &&
              org.associatedFungi.some(
                (f) => f.toLowerCase() === selectedFungiFilter.toLowerCase()
              )
          );
        } else if (org.type === 'Fungo') {
          matchAssociatedFungi =
            org.name.toLowerCase().includes(selectedFungiFilter.toLowerCase()) ||
            org.commonName.toLowerCase().includes(selectedFungiFilter.toLowerCase());
        } else {
          matchAssociatedFungi = false;
        }
      }

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

      return matchQuery && matchReino && matchMorph && matchAssociatedBacteria && matchAssociatedFungi && matchTaxonomy;
    });

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
  }, [query, searchInDesc, reino, morphFilter, selectedBacteriaFilter, selectedFungiFilter, microbeSelection, antSelection, sortBy]);

  // Reseta todos os parametros de busca para o estado inicial
  const resetAllFilters = () => {
    setQuery('');
    setSearchInDesc(false);
    setReino('Todos');
    setMorphFilter(null);
    setSelectedBacteriaFilter(null);
    setSelectedFungiFilter(null);
    setMicrobeSelection(getInitialSelection(MICROBE_RANKS));
    setAntSelection(getInitialSelection(ANT_RANKS));
  };

  return (
    <div className="search-page">
      <div className="search-page__inner">
        <h1 className="search-page__title">Buscar Organismos</h1>

        <div className="search-page__bar">
          <div className="search-page__input-wrap">
            <Search className="search-page__input-icon" size={18} />
            <input
              type="text"
              className="search-page__input"
              placeholder="Busque por nome científico, nome comum, gênero ou palavras-chave..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="search-page__btn" onClick={() => {}}>
            <SlidersHorizontal size={16} />
            Filtrar
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

          {(query || reino !== 'Todos' || morphFilter || selectedBacteriaFilter || selectedFungiFilter || totalTaxonomyFilters > 0) && (
            <button className="search-page__reset-all-btn" onClick={resetAllFilters}>
              <RotateCcw size={13} />
              Resetar Todos os Filtros
            </button>
          )}
        </div>

        <div className="search-page__filters">
          <div className="search-page__filter-group">
            <span className="search-page__filter-label">Organismo:</span>
            {(['Todos', 'Formiga', 'Bacteria', 'Fungo'] as const).map((r) => (
              <button
                key={r}
                className={`search-page__filter-pill ${reino === r ? 'search-page__filter-pill--active' : ''}`}
                onClick={() => setReino(r)}
              >
                {r === 'Formiga' ? 'Formigas' : r === 'Bacteria' ? 'Bactérias' : r === 'Fungo' ? 'Fungos' : 'Todos'}
              </button>
            ))}
          </div>

          <div className="search-page__filter-group">
            <label htmlFor="morphology-select" className="search-page__filter-label">
              Morfologia:
            </label>
            <select
              id="morphology-select"
              className="search-page__filter-select"
              value={morphFilter || ''}
              onChange={(e) => setMorphFilter(e.target.value || null)}
            >
              <option value="">Todas as Morfologias</option>
              {availableMorphologyFilters.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {(reino === 'Formiga' || reino === 'Todos') && availableAssociatedBacteria.length > 0 && (
            <div className="search-page__filter-group">
              <label htmlFor="bacteria-associated-select" className="search-page__filter-label">
                Bactéria Associada:
              </label>
              <select
                id="bacteria-associated-select"
                className="search-page__filter-select"
                value={selectedBacteriaFilter || ''}
                onChange={(e) => setSelectedBacteriaFilter(e.target.value || null)}
              >
                <option value="">Todas as Bactérias Relacionadas</option>
                {availableAssociatedBacteria.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(reino === 'Formiga' || reino === 'Todos') && availableAssociatedFungi.length > 0 && (
            <div className="search-page__filter-group">
              <label htmlFor="fungi-associated-select" className="search-page__filter-label">
                Fungo Cultivado:
              </label>
              <select
                id="fungi-associated-select"
                className="search-page__filter-select"
                value={selectedFungiFilter || ''}
                onChange={(e) => setSelectedFungiFilter(e.target.value || null)}
              >
                <option value="">Todos os Fungos Cultivados</option>
                {availableAssociatedFungi.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

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
                    (Gênero, Espécie, Acesso GenBank)
                  </span>
                  {totalAntFilters > 0 && (
                    <span className="search-page__taxonomy-tab-badge">
                      {totalAntFilters}
                    </span>
                  )}
                </button>
              </div>

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
            {results.length} {results.length === 1 ? 'organismo encontrado' : 'organismos encontrados'}
          </span>

          <div className="search-page__sort-wrap">
            <span className="search-page__sort-label">Ordenar por:</span>
            <select
              className="search-page__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">Nome (A-Z)</option>
              <option value="type">Tipo/Organismo</option>
              <option value="genome">Tamanho do Genoma</option>
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="search-page__grid">
            {results.map((org) => (
              <OrganismCard
                key={org.id}
                organism={org}
                onClick={() => onViewDetail(org.id)}
              />
            ))}
          </div>
        ) : (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">Buscar</div>
            <h3>Nenhum organismo encontrado</h3>
            <p>Tente ajustar os termos de busca ou remover os filtros aplicados.</p>
            <button className="search-page__btn search-page__btn--center" onClick={resetAllFilters}>
              Resetar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
