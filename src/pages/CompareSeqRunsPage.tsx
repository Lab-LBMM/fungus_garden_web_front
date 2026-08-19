import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Search,
  X,
  Dna,
  Download,
  Info,
  Copy,
  Check,
  Sliders,
  BarChart2,
  Table,
  ArrowRight,
  TrendingUp,
  Share2
} from 'lucide-react';
import { seqRunsData, type SeqRun, type ASVItem } from '../data/seqRuns';
import './CompareSeqRunsPage.css';

type MetricType = 'relative' | 'count' | 'log10';
type PaletteType = 'green-yellow-red' | 'green-red' | 'red-yellow-green';
type ViewMode = 'matrix' | 'similarity' | 'top-asvs';

interface CellData {
  runId: string;
  asvId: string;
  count: number;
  relativeAbundance: number;
  log10: number;
  asv: ASVItem | null;
}

const CompareSeqRunsPage = () => {
  const navigate = useNavigate();

  // Estados principais
  const [selectedRunIds, setSelectedRunIds] = useState<string[]>(
    seqRunsData.map(r => r.id)
  );
  const [metricMode, setMetricMode] = useState<MetricType>('relative');
  const [colorPalette, setColorPalette] = useState<PaletteType>('green-yellow-red');
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');
  const [showValues, setShowValues] = useState(true);

  // Filtros de ASV
  const [searchTerm, setSearchTerm] = useState('');
  const [asvTypeFilter, setAsvTypeFilter] = useState<'all' | 'Bacteria' | 'Fungo'>('all');
  const [minAbundance, setMinAbundance] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'abundance-desc' | 'name-asc' | 'id-asc' | 'presence-desc'>('abundance-desc');

  // Modais e Tooltips
  const [selectedAsvModal, setSelectedAsvModal] = useState<ASVItem | null>(null);
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const [copiedFastaId, setCopiedFastaId] = useState<string | null>(null);
  const [copiedCsv, setCopiedCsv] = useState(false);

  // Corridas selecionadas
  const activeRuns: SeqRun[] = useMemo(() => {
    return seqRunsData.filter(r => selectedRunIds.includes(r.id));
  }, [selectedRunIds]);

  // Consolidar todas as ASVs únicas presentes nas corridas selecionadas
  const allAvailableAsvs: ASVItem[] = useMemo(() => {
    const asvMap = new Map<string, ASVItem>();
    activeRuns.forEach(run => {
      run.asvs.forEach(asv => {
        if (!asvMap.has(asv.id)) {
          asvMap.set(asv.id, asv);
        }
      });
    });
    return Array.from(asvMap.values());
  }, [activeRuns]);

  // Mapa de acesso rápido: [runId][asvId] -> ASVItem
  const runAsvLookup = useMemo(() => {
    const map = new Map<string, Map<string, ASVItem>>();
    seqRunsData.forEach(run => {
      const innerMap = new Map<string, ASVItem>();
      run.asvs.forEach(asv => {
        innerMap.set(asv.id, asv);
      });
      map.set(run.id, innerMap);
    });
    return map;
  }, []);

  // Calcular métricas de cada ASV para filtros e ordenações
  const asvStats = useMemo(() => {
    const stats = new Map<string, { totalReads: number; maxRelAbundance: number; runCount: number }>();
    allAvailableAsvs.forEach(asv => {
      let totalReads = 0;
      let maxRelAbundance = 0;
      let runCount = 0;

      activeRuns.forEach(run => {
        const item = runAsvLookup.get(run.id)?.get(asv.id);
        if (item) {
          totalReads += item.count;
          if (item.relativeAbundance > maxRelAbundance) maxRelAbundance = item.relativeAbundance;
          runCount += 1;
        }
      });

      stats.set(asv.id, { totalReads, maxRelAbundance, runCount });
    });
    return stats;
  }, [allAvailableAsvs, activeRuns, runAsvLookup]);

  // ASVs filtradas e ordenadas para exibição nas colunas da matriz
  const filteredAsvs = useMemo(() => {
    return allAvailableAsvs
      .filter(asv => {
        const stat = asvStats.get(asv.id);
        if (!stat) return false;

        // Filtro por texto
        const matchSearch =
          asv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asv.organismName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asv.taxonomy.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro por tipo
        const matchType = asvTypeFilter === 'all' || asv.type === asvTypeFilter;

        // Filtro por abundância mínima
        const matchAbundance = stat.maxRelAbundance >= minAbundance;

        return matchSearch && matchType && matchAbundance;
      })
      .sort((a, b) => {
        const statA = asvStats.get(a.id)!;
        const statB = asvStats.get(b.id)!;

        if (sortBy === 'abundance-desc') {
          return statB.maxRelAbundance - statA.maxRelAbundance;
        }
        if (sortBy === 'presence-desc') {
          if (statB.runCount !== statA.runCount) return statB.runCount - statA.runCount;
          return statB.maxRelAbundance - statA.maxRelAbundance;
        }
        if (sortBy === 'name-asc') {
          return a.organismName.localeCompare(b.organismName);
        }
        if (sortBy === 'id-asc') {
          return a.id.localeCompare(b.id);
        }
        return 0;
      });
  }, [allAvailableAsvs, asvStats, searchTerm, asvTypeFilter, minAbundance, sortBy]);

  // Calcular valores máximos para normalização do mapa de calor
  const maxValue = useMemo(() => {
    let max = 0;
    activeRuns.forEach(run => {
      filteredAsvs.forEach(asv => {
        const item = runAsvLookup.get(run.id)?.get(asv.id);
        if (item) {
          if (metricMode === 'relative') {
            if (item.relativeAbundance > max) max = item.relativeAbundance;
          } else if (metricMode === 'count') {
            if (item.count > max) max = item.count;
          } else {
            const logVal = Math.log10(item.count + 1);
            if (logVal > max) max = logVal;
          }
        }
      });
    });
    return max || 1;
  }, [activeRuns, filteredAsvs, runAsvLookup, metricMode]);

  // Função para interpolar cores do mapa de calor de Verde para Vermelho
  const getHeatmapColor = (value: number, max: number) => {
    if (value <= 0 || max <= 0) {
      return {
        bg: '#f8faf9',
        color: '#94a3b8',
        border: 'rgba(226, 234, 229, 0.6)',
        ratio: 0
      };
    }

    const ratio = Math.min(Math.max(value / max, 0), 1);

    if (colorPalette === 'green-red') {
      // Interpolação direta Verde (#16a34a) -> Vermelho (#dc2626)
      const r = Math.round(22 + (220 - 22) * ratio);
      const g = Math.round(163 - (163 - 38) * ratio);
      const b = Math.round(74 - (74 - 38) * ratio);
      const color = ratio > 0.45 ? '#ffffff' : '#142820';
      return {
        bg: `rgb(${r}, ${g}, ${b})`,
        color,
        border: `rgb(${Math.max(r - 25, 0)}, ${Math.max(g - 25, 0)}, ${Math.max(b - 25, 0)})`,
        ratio
      };
    }

    if (colorPalette === 'red-yellow-green') {
      // Invertido: Vermelho -> Amarelo -> Verde
      let r: number, g: number, b: number;
      if (ratio <= 0.5) {
        const t = ratio / 0.5;
        r = Math.round(220 + (234 - 220) * t);
        g = Math.round(38 + (179 - 38) * t);
        b = Math.round(38 + (8 - 38) * t);
      } else {
        const t = (ratio - 0.5) / 0.5;
        r = Math.round(234 - (234 - 34) * t);
        g = Math.round(179 + (197 - 179) * t);
        b = Math.round(8 + (94 - 8) * t);
      }
      return {
        bg: `rgb(${r}, ${g}, ${b})`,
        color: ratio > 0.55 || ratio < 0.4 ? '#ffffff' : '#142820',
        border: 'rgba(0,0,0,0.12)',
        ratio
      };
    }

    // Padrão Verde (#22c55e) -> Amarelo (#eab308) -> Vermelho (#dc2626)
    let r: number, g: number, b: number;
    if (ratio <= 0.5) {
      const t = ratio / 0.5;
      // Verde (34, 197, 94) para Amarelo (234, 179, 8)
      r = Math.round(34 + (234 - 34) * t);
      g = Math.round(197 - (197 - 179) * t);
      b = Math.round(94 - (94 - 8) * t);
    } else {
      const t = (ratio - 0.5) / 0.5;
      // Amarelo (234, 179, 8) para Vermelho (220, 38, 38)
      r = Math.round(234 - (234 - 220) * t);
      g = Math.round(179 - (179 - 38) * t);
      b = Math.round(8 + (38 - 8) * t);
    }

    const color = ratio > 0.55 || (ratio < 0.25 && ratio > 0.05) ? '#ffffff' : '#1a2820';
    return {
      bg: `rgb(${r}, ${g}, ${b})`,
      color,
      border: 'rgba(0,0,0,0.12)',
      ratio
    };
  };

  // Toggle de seleção de corrida
  const toggleRun = (runId: string) => {
    setSelectedRunIds(prev => {
      if (prev.includes(runId)) {
        if (prev.length === 1) return prev; // Mantém ao menos uma corrida
        return prev.filter(id => id !== runId);
      }
      return [...prev, runId];
    });
  };

  // Presets rápidos
  const handleApplyPreset = (preset: 'all' | '16s' | 'its' | 'atta_comparison') => {
    if (preset === 'all') {
      setSelectedRunIds(seqRunsData.map(r => r.id));
    } else if (preset === '16s') {
      setSelectedRunIds(seqRunsData.filter(r => r.targetRegion.includes('16S')).map(r => r.id));
      setAsvTypeFilter('Bacteria');
    } else if (preset === 'its') {
      setSelectedRunIds(seqRunsData.filter(r => r.targetRegion.includes('ITS')).map(r => r.id));
      setAsvTypeFilter('Fungo');
    } else if (preset === 'atta_comparison') {
      setSelectedRunIds([
        'SEQRUN-2024-16S-01',
        'SEQRUN-2024-16S-05',
        'SEQRUN-2024-ITS-06',
        'SEQRUN-2023-METAG-03'
      ]);
      setAsvTypeFilter('all');
    }
  };

  // Copiar sequência FASTA
  const handleCopyFasta = (asv: ASVItem) => {
    const fasta = `>${asv.id} | ${asv.organismName} | ${asv.taxonomy}\n${asv.sequence}`;
    navigator.clipboard.writeText(fasta);
    setCopiedFastaId(asv.id);
    setTimeout(() => setCopiedFastaId(null), 2000);
  };

  // Exportar Matriz CSV
  const handleExportCsv = () => {
    const headers = ['SeqRun_ID', 'Target_Region', 'Platform', ...filteredAsvs.map(a => `${a.id}_${a.organismName.replace(/\s+/g, '_')}`)];
    const rows = activeRuns.map(run => {
      const rowData = [run.id, run.targetRegion, run.platform];
      filteredAsvs.forEach(asv => {
        const item = runAsvLookup.get(run.id)?.get(asv.id);
        if (!item) {
          rowData.push('0');
        } else if (metricMode === 'relative') {
          rowData.push(item.relativeAbundance.toFixed(2));
        } else if (metricMode === 'count') {
          rowData.push(item.count.toString());
        } else {
          rowData.push(Math.log10(item.count + 1).toFixed(3));
        }
      });
      return rowData.join(';');
    });

    const csvContent = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `matriz_seqruns_asvs_${metricMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  // Matriz de Similaridade Bray-Curtis entre Corridas
  const similarityMatrix = useMemo(() => {
    if (activeRuns.length < 2) return [];

    const matrix: { runA: SeqRun; runB: SeqRun; similarity: number }[] = [];

    for (let i = 0; i < activeRuns.length; i++) {
      for (let j = i; j < activeRuns.length; j++) {
        const runA = activeRuns[i];
        const runB = activeRuns[j];

        if (i === j) {
          matrix.push({ runA, runB, similarity: 100 });
          continue;
        }

        // Bray-Curtis: 1 - sum(|Ai - Bi|) / sum(Ai + Bi)
        let sumDiff = 0;
        let sumTotal = 0;

        allAvailableAsvs.forEach(asv => {
          const valA = runAsvLookup.get(runA.id)?.get(asv.id)?.relativeAbundance || 0;
          const valB = runAsvLookup.get(runB.id)?.get(asv.id)?.relativeAbundance || 0;
          sumDiff += Math.abs(valA - valB);
          sumTotal += valA + valB;
        });

        const similarity = sumTotal > 0 ? Math.max(0, (1 - sumDiff / sumTotal) * 100) : 0;
        matrix.push({ runA, runB, similarity });
      }
    }

    return matrix;
  }, [activeRuns, allAvailableAsvs, runAsvLookup]);

  return (
    <div className="cmp-page">
      {/* Hero Header */}
      <section className="cmp-hero">
        <div className="cmp-hero__inner">
          <div className="cmp-hero__badge">
            <Sparkles size={15} />
            Bioinformática & Metagenômica Comparativa • LBMM UNESP
          </div>
          <h1 className="cmp-hero__title">
            Matriz Comparativa de SEQ RUNs & ASVs
          </h1>
          <p className="cmp-hero__subtitle">
            Cruze múltiplas corridas de sequenciamento (linhas) com variantes de sequência de amplicon (colunas) em um mapa de calor bidimensional de Verde para Vermelho.
          </p>

          {/* Cards de Métricas Rápidas */}
          <div className="cmp-hero__stats">
            <div className="cmp-stat-card">
              <div className="cmp-stat-icon">
                <Layers size={20} />
              </div>
              <div>
                <div className="cmp-stat-value">{activeRuns.length} / {seqRunsData.length}</div>
                <div className="cmp-stat-label">SEQ RUNs Selecionadas</div>
              </div>
            </div>

            <div className="cmp-stat-card">
              <div className="cmp-stat-icon">
                <Dna size={20} />
              </div>
              <div>
                <div className="cmp-stat-value">{filteredAsvs.length}</div>
                <div className="cmp-stat-label">ASVs na Matriz</div>
              </div>
            </div>

            <div className="cmp-stat-card">
              <div className="cmp-stat-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="cmp-stat-value">
                  {metricMode === 'relative'
                    ? `${maxValue.toFixed(1)}%`
                    : metricMode === 'count'
                    ? maxValue.toLocaleString('pt-BR')
                    : maxValue.toFixed(2)}
                </div>
                <div className="cmp-stat-label">Abundância Máxima</div>
              </div>
            </div>

            <div className="cmp-stat-card">
              <div className="cmp-stat-icon">
                <Share2 size={20} />
              </div>
              <div>
                <div className="cmp-stat-value">
                  {allAvailableAsvs.filter(a => (asvStats.get(a.id)?.runCount || 0) > 1).length}
                </div>
                <div className="cmp-stat-label">ASVs Compartilhadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="cmp-container">
        {/* Painel de Filtros e Controles */}
        <div className="cmp-panel">
          <div className="cmp-panel__header">
            <div className="cmp-panel__title-wrap">
              <Sliders size={20} className="cmp-panel__icon" />
              <div>
                <h2 className="cmp-panel__title">Configuração da Matriz e Escala Térmica</h2>
                <p className="cmp-panel__desc">Personalize a seleção de corridas, métrica visual e filtros taxonômicos.</p>
              </div>
            </div>

            {/* Ações de Exportação e Troca de Visão */}
            <div className="cmp-panel__actions">
              <div className="cmp-view-toggle">
                <button
                  className={`cmp-view-btn ${viewMode === 'matrix' ? 'cmp-view-btn--active' : ''}`}
                  onClick={() => setViewMode('matrix')}
                  title="Visão Matriz Heatmap 2D"
                >
                  <Table size={16} />
                  Matriz Heatmap
                </button>
                <button
                  className={`cmp-view-btn ${viewMode === 'similarity' ? 'cmp-view-btn--active' : ''}`}
                  onClick={() => setViewMode('similarity')}
                  title="Matriz de Similaridade Bray-Curtis"
                >
                  <Share2 size={16} />
                  Similaridade
                </button>
                <button
                  className={`cmp-view-btn ${viewMode === 'top-asvs' ? 'cmp-view-btn--active' : ''}`}
                  onClick={() => setViewMode('top-asvs')}
                  title="Distribuição Top ASVs"
                >
                  <BarChart2 size={16} />
                  Top ASVs
                </button>
              </div>

              <button className="cmp-export-btn" onClick={handleExportCsv}>
                {copiedCsv ? <Check size={16} /> : <Download size={16} />}
                {copiedCsv ? 'Exportado!' : 'Exportar CSV'}
              </button>
            </div>
          </div>

          {/* Seleção de SEQ RUNs (Linhas) */}
          <div className="cmp-section">
            <div className="cmp-section__title-bar">
              <span className="cmp-section__label">
                <Layers size={15} />
                1. Seleção de Corridas (Linhas da Matriz):
              </span>
              <div className="cmp-presets">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Atalhos:</span>
                <button className="cmp-preset-btn" onClick={() => handleApplyPreset('all')}>Todas ({seqRunsData.length})</button>
                <button className="cmp-preset-btn" onClick={() => handleApplyPreset('16s')}>Apenas 16S</button>
                <button className="cmp-preset-btn" onClick={() => handleApplyPreset('its')}>Apenas ITS</button>
                <button className="cmp-preset-btn" onClick={() => handleApplyPreset('atta_comparison')}>Comparativo Atta</button>
              </div>
            </div>

            <div className="cmp-runs-pills">
              {seqRunsData.map(run => {
                const isSelected = selectedRunIds.includes(run.id);
                return (
                  <button
                    key={run.id}
                    className={`cmp-run-pill ${isSelected ? 'cmp-run-pill--selected' : ''}`}
                    onClick={() => toggleRun(run.id)}
                  >
                    <span className="cmp-run-pill__id">{run.id}</span>
                    <span className="cmp-run-pill__region">{run.targetRegion}</span>
                    <span className="cmp-run-pill__reads">{(run.totalReads / 1000).toFixed(0)}k</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controles de Visualização e Métricas */}
          <div className="cmp-controls-grid">
            {/* Métrica da Célula */}
            <div className="cmp-control-block">
              <label className="cmp-control-label">Métrica das Células:</label>
              <div className="cmp-btn-group">
                <button
                  className={`cmp-btn-choice ${metricMode === 'relative' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setMetricMode('relative')}
                >
                  Abundância Relativa (%)
                </button>
                <button
                  className={`cmp-btn-choice ${metricMode === 'count' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setMetricMode('count')}
                >
                  Contagem de Reads
                </button>
                <button
                  className={`cmp-btn-choice ${metricMode === 'log10' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setMetricMode('log10')}
                >
                  Log₁₀(Reads + 1)
                </button>
              </div>
            </div>

            {/* Escala de Cor / Paleta */}
            <div className="cmp-control-block">
              <label className="cmp-control-label">Paleta do Heatmap:</label>
              <div className="cmp-btn-group">
                <button
                  className={`cmp-btn-choice ${colorPalette === 'green-yellow-red' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setColorPalette('green-yellow-red')}
                >
                  <span className="cmp-palette-preview cmp-palette-preview--gyr" />
                  Verde ➔ Amarelo ➔ Vermelho
                </button>
                <button
                  className={`cmp-btn-choice ${colorPalette === 'green-red' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setColorPalette('green-red')}
                >
                  <span className="cmp-palette-preview cmp-palette-preview--gr" />
                  Verde ➔ Vermelho
                </button>
                <button
                  className={`cmp-btn-choice ${colorPalette === 'red-yellow-green' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setColorPalette('red-yellow-green')}
                >
                  <span className="cmp-palette-preview cmp-palette-preview--ryg" />
                  Invertido
                </button>
              </div>
            </div>

            {/* Filtros de ASV */}
            <div className="cmp-control-block">
              <label className="cmp-control-label">Reino Biológico:</label>
              <div className="cmp-btn-group">
                <button
                  className={`cmp-btn-choice ${asvTypeFilter === 'all' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setAsvTypeFilter('all')}
                >
                  Todos
                </button>
                <button
                  className={`cmp-btn-choice ${asvTypeFilter === 'Bacteria' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setAsvTypeFilter('Bacteria')}
                >
                  Bactérias
                </button>
                <button
                  className={`cmp-btn-choice ${asvTypeFilter === 'Fungo' ? 'cmp-btn-choice--active' : ''}`}
                  onClick={() => setAsvTypeFilter('Fungo')}
                >
                  Fungos
                </button>
              </div>
            </div>

            {/* Ordenação das Colunas */}
            <div className="cmp-control-block">
              <label className="cmp-control-label">Ordenar Colunas (ASVs):</label>
              <select
                className="cmp-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
              >
                <option value="abundance-desc">Maior Abundância Global</option>
                <option value="presence-desc">Mais Compartilhadas (Ocorrência)</option>
                <option value="name-asc">Nome do Organismo (A-Z)</option>
                <option value="id-asc">Código ASV (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Barra de Busca e Filtro de Abundância Mínima */}
          <div className="cmp-filter-bar">
            <div className="cmp-search-box">
              <Search size={16} className="cmp-search-icon" />
              <input
                type="text"
                className="cmp-search-input"
                placeholder="Filtrar ASVs por organismo, gênero ou taxonomia..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="cmp-search-clear" onClick={() => setSearchTerm('')}>
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="cmp-abundance-filter">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Abundância Mínima:
              </span>
              {[0, 2, 5, 10, 20].map(val => (
                <button
                  key={val}
                  className={`cmp-chip ${minAbundance === val ? 'cmp-chip--active' : ''}`}
                  onClick={() => setMinAbundance(val)}
                >
                  {val === 0 ? 'Todas' : `≥ ${val}%`}
                </button>
              ))}
            </div>

            <div className="cmp-toggle-values">
              <label className="cmp-checkbox-label">
                <input
                  type="checkbox"
                  checked={showValues}
                  onChange={e => setShowValues(e.target.checked)}
                />
                Exibir Valores nas Células
              </label>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VISÃO 1: MATRIZ 2D HEATMAP (CORRIDAS X ASVS) */}
        {/* ========================================================= */}
        {viewMode === 'matrix' && (
          <div className="cmp-matrix-card">
            <div className="cmp-matrix-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Table size={18} className="cmp-matrix-card__icon" />
                <h3 className="cmp-matrix-card__title">
                  Matriz Bidimensional ({activeRuns.length} Corridas × {filteredAsvs.length} ASVs)
                </h3>
              </div>

              {/* Legenda Dinâmica do Mapa de Calor */}
              <div className="cmp-heatmap-legend">
                <span className="cmp-legend-label">Ausente / 0</span>
                <div className={`cmp-legend-gradient cmp-legend-gradient--${colorPalette}`} />
                <span className="cmp-legend-label">
                  Max ({metricMode === 'relative' ? `${maxValue.toFixed(1)}%` : metricMode === 'count' ? maxValue.toLocaleString('pt-BR') : maxValue.toFixed(1)})
                </span>
              </div>
            </div>

            {/* Container com Rolagem Bidimensional */}
            <div className="cmp-table-container">
              {filteredAsvs.length > 0 && activeRuns.length > 0 ? (
                <table className="cmp-matrix-table">
                  <thead>
                    <tr>
                      {/* Célula de Canto (Sticky Top & Left) */}
                      <th className="cmp-th-corner">
                        <div className="cmp-corner-content">
                          <span className="cmp-corner-row-lbl">Linhas: SEQ RUNs</span>
                          <span className="cmp-corner-col-lbl">Colunas: ASVs ➔</span>
                        </div>
                      </th>

                      {/* Cabeçalhos de Colunas (ASVs) */}
                      {filteredAsvs.map(asv => {
                        const stat = asvStats.get(asv.id);
                        return (
                          <th key={asv.id} className="cmp-th-asv">
                            <div
                              className="cmp-asv-header"
                              onClick={() => setSelectedAsvModal(asv)}
                              title={`Clique para ver detalhes de ${asv.id} (${asv.organismName})`}
                            >
                              <div className="cmp-asv-header__top">
                                <span className="cmp-asv-badge">{asv.id}</span>
                                <span className={`cmp-type-tag cmp-type-tag--${asv.type.toLowerCase()}`}>
                                  {asv.type[0]}
                                </span>
                              </div>
                              <div className="cmp-asv-header__name" title={asv.organismName}>
                                {asv.organismName}
                              </div>
                              <div className="cmp-asv-header__sub">
                                {stat?.runCount} corrida{stat?.runCount === 1 ? '' : 's'} • Max: {stat?.maxRelAbundance.toFixed(1)}%
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {activeRuns.map(run => (
                      <tr key={run.id}>
                        {/* Cabeçalho da Linha (Sticky Left) */}
                        <th className="cmp-th-run">
                          <div className="cmp-run-header">
                            <div className="cmp-run-header__top">
                              <span className="cmp-run-header__id">{run.id}</span>
                              <span className="cmp-run-header__region">{run.targetRegion}</span>
                            </div>
                            <div className="cmp-run-header__title" title={run.title}>
                              {run.title}
                            </div>
                            <div className="cmp-run-header__meta">
                              {run.platform} • {run.totalReads.toLocaleString('pt-BR')} reads
                            </div>
                          </div>
                        </th>

                        {/* Células da Matriz */}
                        {filteredAsvs.map(asv => {
                          const item = runAsvLookup.get(run.id)?.get(asv.id) || null;
                          const countVal = item ? item.count : 0;
                          const relVal = item ? item.relativeAbundance : 0;
                          const logVal = item ? Math.log10(item.count + 1) : 0;

                          const primaryVal =
                            metricMode === 'relative'
                              ? relVal
                              : metricMode === 'count'
                              ? countVal
                              : logVal;

                          const { bg, color, ratio } = getHeatmapColor(primaryVal, maxValue);

                          const cellObj: CellData = {
                            runId: run.id,
                            asvId: asv.id,
                            count: countVal,
                            relativeAbundance: relVal,
                            log10: logVal,
                            asv: item || asv
                          };

                          return (
                            <td
                              key={asv.id}
                              className={`cmp-cell ${item ? 'cmp-cell--active' : 'cmp-cell--empty'}`}
                              style={{
                                backgroundColor: bg,
                                color
                              }}
                              onMouseEnter={() => setHoveredCell(cellObj)}
                              onMouseLeave={() => setHoveredCell(null)}
                              onClick={() => setSelectedAsvModal(item || asv)}
                            >
                              {showValues && (
                                <span className="cmp-cell-value">
                                  {item ? (
                                    metricMode === 'relative' ? (
                                      `${relVal.toFixed(1)}%`
                                    ) : metricMode === 'count' ? (
                                      countVal > 1000 ? `${(countVal / 1000).toFixed(0)}k` : countVal
                                    ) : (
                                      logVal.toFixed(1)
                                    )
                                  ) : (
                                    <span className="cmp-cell-empty-dash">—</span>
                                  )}
                                </span>
                              )}

                              {/* Barra indicadora miniatura */}
                              {item && ratio > 0 && (
                                <div
                                  className="cmp-cell-bar"
                                  style={{
                                    width: `${ratio * 100}%`,
                                    backgroundColor: color === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'
                                  }}
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="cmp-empty-state">
                  <Dna size={32} style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }} />
                  <p>Nenhuma ASV corresponde aos filtros atuais ou nenhuma corrida selecionada.</p>
                  <button className="cmp-preset-btn" style={{ marginTop: '0.75rem' }} onClick={() => handleApplyPreset('all')}>
                    Resetar Filtros e Selecionar Todas
                  </button>
                </div>
              )}
            </div>

            {/* Painel Inferior de Pré-visualização ao passar o mouse */}
            {hoveredCell && (
              <div className="cmp-hover-preview">
                <div className="cmp-hover-preview__left">
                  <span className="cmp-hover-badge">{hoveredCell.asvId}</span>
                  <div>
                    <div className="cmp-hover-org">{hoveredCell.asv?.organismName}</div>
                    <div className="cmp-hover-run">
                      <strong>Corrida:</strong> {hoveredCell.runId} • <strong>Taxonomia:</strong> {hoveredCell.asv?.taxonomy}
                    </div>
                  </div>
                </div>

                <div className="cmp-hover-preview__right">
                  <div className="cmp-hover-stat">
                    <span className="cmp-hover-stat-lbl">Abundância Relativa</span>
                    <span className="cmp-hover-stat-val">{hoveredCell.relativeAbundance.toFixed(2)}%</span>
                  </div>
                  <div className="cmp-hover-stat">
                    <span className="cmp-hover-stat-lbl">Reads Absolutos</span>
                    <span className="cmp-hover-stat-val">{hoveredCell.count.toLocaleString('pt-BR')} reads</span>
                  </div>
                  <div className="cmp-hover-stat">
                    <span className="cmp-hover-stat-lbl">Log₁₀(Reads+1)</span>
                    <span className="cmp-hover-stat-val">{hoveredCell.log10.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VISÃO 2: MATRIZ DE SIMILARIDADE BRAY-CURTIS */}
        {/* ========================================================= */}
        {viewMode === 'similarity' && (
          <div className="cmp-matrix-card">
            <div className="cmp-matrix-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Share2 size={18} className="cmp-matrix-card__icon" />
                <h3 className="cmp-matrix-card__title">
                  Matriz de Similaridade da Comunidade Microbiana (Índice de Bray-Curtis)
                </h3>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Valores próximos a 100% indicam perfis taxonômicos altamente similares; valores próximos a 0% indicam microbiomas completamente distintos.
              </p>
            </div>

            <div className="cmp-similarity-grid">
              <table className="cmp-matrix-table">
                <thead>
                  <tr>
                    <th className="cmp-th-corner">SEQ RUN</th>
                    {activeRuns.map(r => (
                      <th key={r.id} className="cmp-th-sim" title={r.title}>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{r.id}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{r.targetRegion}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeRuns.map(runA => (
                    <tr key={runA.id}>
                      <th className="cmp-th-run">
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{runA.id}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{runA.sampleSource}</div>
                      </th>
                      {activeRuns.map(runB => {
                        const item = similarityMatrix.find(
                          m => (m.runA.id === runA.id && m.runB.id === runB.id) || (m.runA.id === runB.id && m.runB.id === runA.id)
                        );
                        const sim = item ? item.similarity : 0;
                        const { bg, color } = getHeatmapColor(sim, 100);

                        return (
                          <td
                            key={runB.id}
                            className="cmp-cell cmp-cell--sim"
                            style={{ backgroundColor: bg, color }}
                          >
                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                              {sim.toFixed(1)}%
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VISÃO 3: DISTRIBUIÇÃO TOP ASVs */}
        {/* ========================================================= */}
        {viewMode === 'top-asvs' && (
          <div className="cmp-matrix-card">
            <div className="cmp-matrix-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart2 size={18} className="cmp-matrix-card__icon" />
                <h3 className="cmp-matrix-card__title">
                  Comparação das ASVs Mais Abundantes nas Corridas Selecionadas
                </h3>
              </div>
            </div>

            <div className="cmp-top-asvs-list">
              {filteredAsvs.slice(0, 15).map(asv => {
                const stat = asvStats.get(asv.id);
                return (
                  <div key={asv.id} className="cmp-top-card">
                    <div className="cmp-top-card__header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span className="cmp-asv-badge">{asv.id}</span>
                        <span style={{ fontWeight: 700, fontSize: '1rem', fontStyle: 'italic' }}>
                          {asv.organismName}
                        </span>
                        <span className={`cmp-type-tag cmp-type-tag--${asv.type.toLowerCase()}`}>
                          {asv.type}
                        </span>
                        {stat && (
                          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            ({stat.runCount} corrida{stat.runCount === 1 ? '' : 's'} • Max: {stat.maxRelAbundance.toFixed(1)}%)
                          </span>
                        )}
                      </div>
                      <button className="cmp-action-btn" onClick={() => setSelectedAsvModal(asv)}>
                        <Info size={14} />
                        Ver Sequência
                      </button>
                    </div>

                    <div className="cmp-top-card__tax">{asv.taxonomy}</div>

                    <div className="cmp-top-runs-bars">
                      {activeRuns.map(run => {
                        const item = runAsvLookup.get(run.id)?.get(asv.id);
                        const rel = item ? item.relativeAbundance : 0;
                        const reads = item ? item.count : 0;
                        const { bg } = getHeatmapColor(rel, 100);

                        return (
                          <div key={run.id} className="cmp-top-bar-item">
                            <div className="cmp-top-bar-lbl">
                              <span>{run.id}</span>
                              <span><strong>{rel.toFixed(1)}%</strong> ({reads.toLocaleString('pt-BR')} reads)</span>
                            </div>
                            <div className="cmp-top-bar-track">
                              <div
                                className="cmp-top-bar-fill"
                                style={{
                                  width: `${Math.max(rel, 1)}%`,
                                  backgroundColor: rel > 0 ? bg : '#e2eae5'
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL DE DETALHES DA ASV */}
      {/* ========================================================= */}
      {selectedAsvModal && (
        <div className="cmp-modal-overlay" onClick={() => setSelectedAsvModal(null)}>
          <div className="cmp-modal" onClick={e => e.stopPropagation()}>
            <div className="cmp-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="cmp-asv-badge" style={{ fontSize: '0.95rem' }}>
                  {selectedAsvModal.id}
                </span>
                <span className={`cmp-type-tag cmp-type-tag--${selectedAsvModal.type.toLowerCase()}`}>
                  {selectedAsvModal.type}
                </span>
              </div>
              <button className="cmp-modal-close" onClick={() => setSelectedAsvModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="cmp-modal-body">
              <h3 className="cmp-modal-title">{selectedAsvModal.organismName}</h3>
              {selectedAsvModal.description && (
                <p className="cmp-modal-desc">{selectedAsvModal.description}</p>
              )}

              {/* Informações taxonômicas */}
              <div className="cmp-modal-section">
                <h4 className="cmp-modal-subtitle">Classificação Taxonômica</h4>
                <div className="cmp-tax-code">{selectedAsvModal.taxonomy}</div>
              </div>

              {/* Ocorrência nas SEQ RUNs */}
              <div className="cmp-modal-section">
                <h4 className="cmp-modal-subtitle">Abundância nas Corridas Selecionadas</h4>
                <div className="cmp-modal-runs-list">
                  {seqRunsData.map(run => {
                    const item = runAsvLookup.get(run.id)?.get(selectedAsvModal.id);
                    return (
                      <div key={run.id} className="cmp-modal-run-row">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{run.id}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{run.title}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          {item ? (
                            <>
                              <span style={{ fontWeight: 800, color: 'var(--green-primary)', fontSize: '0.95rem' }}>
                                {item.relativeAbundance.toFixed(2)}%
                              </span>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {item.count.toLocaleString('pt-BR')} reads
                              </div>
                            </>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Não detectado (0%)</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sequência FASTA */}
              <div className="cmp-modal-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 className="cmp-modal-subtitle">Sequência Nucleotídica ({selectedAsvModal.length} bp)</h4>
                  <button
                    className="cmp-copy-btn"
                    onClick={() => handleCopyFasta(selectedAsvModal)}
                  >
                    {copiedFastaId === selectedAsvModal.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedFastaId === selectedAsvModal.id ? 'Copiado!' : 'Copiar FASTA'}
                  </button>
                </div>
                <div className="cmp-fasta-code">{selectedAsvModal.sequence}</div>
              </div>
            </div>

            <div className="cmp-modal-footer">
              {selectedAsvModal.organismId && (
                <button
                  className="cmp-modal-primary-btn"
                  onClick={() => {
                    setSelectedAsvModal(null);
                    navigate(`/organismo/${selectedAsvModal.organismId}`);
                  }}
                >
                  Ver Ficha do Organismo
                  <ArrowRight size={15} />
                </button>
              )}
              <button className="cmp-modal-secondary-btn" onClick={() => setSelectedAsvModal(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSeqRunsPage;
