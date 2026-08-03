import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Filter, RotateCcw, Dna, Bug, ArrowUpDown } from 'lucide-react';
import { organisms } from '../data/organisms';
import OrganismCard from '../components/OrganismCard';
import TaxonomyFilter, {
  MICROBE_RANKS,
  ANT_RANKS,
  getInitialSelection,
} from '../components/TaxonomyFilter';
import { SearchableSelect, SearchableMultiSelect } from '../components/SearchableSelect';
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
  const [selectedBacteriaFilters, setSelectedBacteriaFilters] = useState<string[]>([]);
  const [selectedFungiFilters, setSelectedFungiFilters] = useState<string[]>([]);
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
    setSelectedBacteriaFilters([]);
    setSelectedFungiFilters([]);

    if (reino === 'Bacteria' || reino === 'Fungo') {
      setActiveTaxonomyTab('microbes');
    } else if (reino === 'Formiga') {
      setActiveTaxonomyTab('ants');
    }
  }, [reino]);

  // Organismos filtrados por morfologia para alimentar a taxonomia dinamicamente
  const filteredByMorphologyOrgs = useMemo(() => {
    if (!morphFilter) return organisms;
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

    return organisms.filter((org) => {
      if (matches.length > 0) {
        const morphLower = org.morphology.toLowerCase();
        const tagsLower = org.tags.map((t) => t.toLowerCase());
        return matches.some((m) => morphLower.includes(m) || tagsLower.some((t) => t.includes(m)));
      }
      return org.morphology.toLowerCase().includes(morphFilter.toLowerCase());
    });
  }, [morphFilter, reino]);

  const microbeOrganisms = useMemo(
    () => filteredByMorphologyOrgs.filter((o) => o.type === 'Bacteria' || o.type === 'Fungo'),
    [filteredByMorphologyOrgs]
  );
  const antOrganisms = useMemo(
    () => filteredByMorphologyOrgs.filter((o) => o.type === 'Formiga'),
    [filteredByMorphologyOrgs]
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
      if (selectedBacteriaFilters.length > 0) {
        if (org.type === 'Formiga') {
          matchAssociatedBacteria = Boolean(
            org.associatedBacteria &&
              selectedBacteriaFilters.every((sel) =>
                org.associatedBacteria!.some((b) => b.toLowerCase() === sel.toLowerCase())
              )
          );
        } else if (org.type === 'Bacteria') {
          matchAssociatedBacteria = selectedBacteriaFilters.every(
            (sel) =>
              org.name.toLowerCase().includes(sel.toLowerCase()) ||
              org.commonName.toLowerCase().includes(sel.toLowerCase())
          );
        } else {
          matchAssociatedBacteria = false;
        }
      }

      let matchAssociatedFungi = true;
      if (selectedFungiFilters.length > 0) {
        if (org.type === 'Formiga') {
          matchAssociatedFungi = Boolean(
            org.associatedFungi &&
              selectedFungiFilters.every((sel) =>
                org.associatedFungi!.some((f) => f.toLowerCase() === sel.toLowerCase())
              )
          );
        } else if (org.type === 'Fungo') {
          matchAssociatedFungi = selectedFungiFilters.every(
            (sel) =>
              org.name.toLowerCase().includes(sel.toLowerCase()) ||
              org.commonName.toLowerCase().includes(sel.toLowerCase())
          );
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
  }, [query, searchInDesc, reino, morphFilter, selectedBacteriaFilters, selectedFungiFilters, microbeSelection, antSelection, sortBy]);

  // Reseta todos os parametros de busca para o estado inicial
  const resetAllFilters = () => {
    setQuery('');
    setSearchInDesc(false);
    setReino('Todos');
    setMorphFilter(null);
    setSelectedBacteriaFilters([]);
    setSelectedFungiFilters([]);
    setMicrobeSelection(getInitialSelection(MICROBE_RANKS));
    setAntSelection(getInitialSelection(ANT_RANKS));
  };

  const morphologyOptions = useMemo(
    () => availableMorphologyFilters.map((m) => ({ label: m, value: m })),
    [availableMorphologyFilters]
  );

  const bacteriaOptions = useMemo(
    () => availableAssociatedBacteria.map((b) => ({ label: b, value: b })),
    [availableAssociatedBacteria]
  );

  const fungiOptions = useMemo(
    () => availableAssociatedFungi.map((f) => ({ label: f, value: f })),
    [availableAssociatedFungi]
  );

  const sortOptions = [
    { label: 'Nome (A-Z)', value: 'name' },
    { label: 'Tipo / Reino', value: 'type' },
    { label: 'Tamanho do Genoma', value: 'genome' },
  ];

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

          {(query ||
            reino !== 'Todos' ||
            morphFilter ||
            selectedBacteriaFilters.length > 0 ||
            selectedFungiFilters.length > 0 ||
            totalTaxonomyFilters > 0) && (
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
            <SearchableSelect
              label="Morfologia (Pesquisável):"
              placeholder="Todas as Morfologias"
              options={morphologyOptions}
              value={morphFilter}
              onChange={setMorphFilter}
              id="morphology-select"
            />
          </div>

          {(reino === 'Formiga' || reino === 'Todos') && availableAssociatedBacteria.length > 0 && (
            <div className="search-page__filter-group">
              <SearchableMultiSelect
                label="Bactérias em Formigas (Checkboxes):"
                placeholder="Todas as Bactérias Relacionadas"
                options={bacteriaOptions}
                selectedValues={selectedBacteriaFilters}
                onChange={setSelectedBacteriaFilters}
                id="bacteria-associated-select"
              />
            </div>
          )}

          {(reino === 'Formiga' || reino === 'Todos') && availableAssociatedFungi.length > 0 && (
            <div className="search-page__filter-group">
              <SearchableMultiSelect
                label="Fungos em Formigas (Checkboxes):"
                placeholder="Todos os Fungos Cultivados"
                options={fungiOptions}
                selectedValues={selectedFungiFilters}
                onChange={setSelectedFungiFilters}
                id="fungi-associated-select"
              />
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
            <SearchableSelect
              placeholder="Ordenar por"
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy((val as any) || 'name')}
              icon={<ArrowUpDown size={14} />}
            />
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
