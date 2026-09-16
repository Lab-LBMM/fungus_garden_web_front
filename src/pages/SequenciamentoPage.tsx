import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dna, 
  Database, 
  Search, 
  ExternalLink, 
  BarChart3, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Filter, 
  UploadCloud, 
  Layers,
  Copy,
  Check,
  X,
  Info,
  ChevronRight,
  PieChart
} from 'lucide-react';
import { organisms } from '../data/organisms';
import { seqRunsData } from '../data/seqRuns';
import type { SeqRun, ASVItem } from '../data/seqRuns';
import './SequenciamentoPage.css';

interface SequencingRecord {
  id: number;
  name: string;
  commonName: string;
  type: 'Bacteria' | 'Fungo' | 'Formiga';
  genomeSize: number;
  gcContent: number;
  geneCount: number;
  genbankAccession: string;
  platform: string;
  coverage: string;
}

const sequencingData: SequencingRecord[] = organisms.map((org, index) => {
  const defaultPlatforms = ['Illumina NovaSeq 6000', 'Oxford Nanopore GridION', 'PacBio Sequel II', 'MGI DNBSEQ-G400'];
  const platform = defaultPlatforms[index % defaultPlatforms.length];
  const coverage = `${(30 + (index * 13) % 70)}x`;

  return {
    id: org.id,
    name: org.name,
    commonName: org.commonName,
    type: org.type,
    genomeSize: org.detail?.genomeSize || 4.5,
    gcContent: org.detail?.gcContent || 48.0,
    geneCount: org.detail?.geneCount || 3800,
    genbankAccession: org.detail?.genbankAccession || `NC_0009${org.id}.1`,
    platform,
    coverage
  };
});

const TAX_COLORS: Record<string, string> = {
  Bacteria: '#0284c7',
  Fungo: '#1a7a4a',
  Formiga: '#d97706',
  Outros: '#6b7280'
};

const SequenciamentoPage = () => {
  const navigate = useNavigate();
  
  // Aba ativa
  const [activeTab, setActiveTab] = useState<'seqruns' | 'tabela' | 'diretrizes'>('seqruns');
  
  // Estado de SEQ RUNs & ASVs
  const [selectedRunId, setSelectedRunId] = useState<string>(seqRunsData[0].id);
  const [runSearchTerm, setRunSearchTerm] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('todas');
  
  // Estado de Filtro de ASVs
  const [asvSearchTerm, setAsvSearchTerm] = useState('');
  const [asvTypeFilter, setAsvTypeFilter] = useState<'todos' | 'Bacteria' | 'Fungo'>('todos');
  const [selectedAsvModal, setSelectedAsvModal] = useState<ASVItem | null>(null);

  // Clipboard states
  const [copiedGenbankId, setCopiedGenbankId] = useState<string | null>(null);
  const [copiedFastaId, setCopiedFastaId] = useState<string | null>(null);

  // Filtros da tabela de genomas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'todos' | 'Bacteria' | 'Fungo' | 'Formiga'>('todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('todas');

  // SEQ RUN selecionado atualmente
  const currentRun: SeqRun = seqRunsData.find(r => r.id === selectedRunId) || seqRunsData[0];

  // Filtrar lista de SEQ RUNs
  const filteredSeqRuns = seqRunsData.filter(run => {
    const matchesSearch = 
      run.id.toLowerCase().includes(runSearchTerm.toLowerCase()) ||
      run.title.toLowerCase().includes(runSearchTerm.toLowerCase()) ||
      run.sampleSource.toLowerCase().includes(runSearchTerm.toLowerCase()) ||
      run.platform.toLowerCase().includes(runSearchTerm.toLowerCase());

    const matchesRegion = 
      selectedRegionFilter === 'todas' || 
      run.targetRegion.toLowerCase().includes(selectedRegionFilter.toLowerCase());

    return matchesSearch && matchesRegion;
  });

  // Filtrar ASVs dentro do SEQ RUN atual
  const filteredAsvs = currentRun.asvs.filter(asv => {
    const matchesSearch = 
      asv.id.toLowerCase().includes(asvSearchTerm.toLowerCase()) ||
      asv.organismName.toLowerCase().includes(asvSearchTerm.toLowerCase()) ||
      asv.taxonomy.toLowerCase().includes(asvSearchTerm.toLowerCase()) ||
      asv.sequence.toLowerCase().includes(asvSearchTerm.toLowerCase());

    const matchesType = asvTypeFilter === 'todos' || asv.type === asvTypeFilter;

    return matchesSearch && matchesType;
  });

  // Filtragem da tabela de genomas
  const filteredRecords = sequencingData.filter((rec) => {
    const matchesSearch = 
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.genbankAccession.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'todos' || rec.type === selectedType;
    const matchesPlatform = selectedPlatform === 'todas' || rec.platform.includes(selectedPlatform);

    return matchesSearch && matchesType && matchesPlatform;
  });

  const handleCopyAccession = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedGenbankId(acc);
    setTimeout(() => setCopiedGenbankId(null), 2000);
  };

  const handleCopyFasta = (asv: ASVItem) => {
    const fastaHeader = `>${asv.id} | ${asv.organismName} | ${asv.length}bp | Abundância: ${asv.relativeAbundance.toFixed(2)}%\n${asv.sequence}`;
    navigator.clipboard.writeText(fastaHeader);
    setCopiedFastaId(asv.id);
    setTimeout(() => setCopiedFastaId(null), 2000);
  };

  const totalGenomes = sequencingData.length;
  const totalBasesMb = sequencingData.reduce((acc, curr) => acc + curr.genomeSize, 0).toFixed(1);
  const totalSeqRunsCount = seqRunsData.length;
  const totalAsvsCount = seqRunsData.reduce((sum, r) => sum + r.asvs.length, 0);

  return (
    <div className="seq-page">
      {/* Hero Header */}
      <section className="seq-hero">
        <div className="seq-hero__inner">
          <div className="seq-hero__badge">
            <Sparkles size={15} />
            Plataforma de Genômica & Metagenômica - LBMM UNESP
          </div>
          <h1 className="seq-hero__title">Central de Sequenciamento, SEQ RUNs & ASVs</h1>
          <p className="seq-hero__subtitle">
            Consulte as corridas de sequenciamento (SEQ RUNs), explore as variantes de sequência de amplicon (ASVs) e analise as quantidades absolutas e abundâncias relativas no microbioma dos jardins de fungos.
          </p>

          {/* Cards de Métricas Globais */}
          <div className="seq-hero__stats">
            <div className="seq-hero__stat-card">
              <div className="seq-hero__stat-icon">
                <Layers size={22} />
              </div>
              <div>
                <div className="seq-hero__stat-value">{totalSeqRunsCount}</div>
                <div className="seq-hero__stat-label">SEQ RUNs Catalogadas</div>
              </div>
            </div>

            <div className="seq-hero__stat-card">
              <div className="seq-hero__stat-icon">
                <Dna size={22} />
              </div>
              <div>
                <div className="seq-hero__stat-value">{totalAsvsCount}</div>
                <div className="seq-hero__stat-label">ASVs Mapeadas</div>
              </div>
            </div>

            <div className="seq-hero__stat-card">
              <div className="seq-hero__stat-icon">
                <Database size={22} />
              </div>
              <div>
                <div className="seq-hero__stat-value">{totalGenomes}</div>
                <div className="seq-hero__stat-label">Genomas Montados</div>
              </div>
            </div>

            <div className="seq-hero__stat-card">
              <div className="seq-hero__stat-icon">
                <BarChart3 size={22} />
              </div>
              <div>
                <div className="seq-hero__stat-value">{totalBasesMb} Mb</div>
                <div className="seq-hero__stat-label">Total de Bases Mapeadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="seq-container">
        {/* Navigation Tabs */}
        <div className="seq-tabs">
          <button 
            className={`seq-tab-btn ${activeTab === 'seqruns' ? 'seq-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('seqruns')}
          >
            <Layers size={17} />
            SEQ RUNs & Variantes (ASVs)
          </button>

          <button 
            className="seq-tab-btn"
            style={{ background: 'linear-gradient(135deg, var(--green-light), #ffffff)', color: 'var(--green-dark)', fontWeight: 700, border: '1.5px solid var(--green-muted)' }}
            onClick={() => navigate('/comparar-seqruns')}
            title="Abrir Matriz Bidimensional de Comparação de SEQ RUNs com Mapa de Calor"
          >
            <BarChart3 size={17} style={{ color: 'var(--green-primary)' }} />
            Comparar SEQ RUNs (Heatmap 2D)
            <ArrowRight size={14} style={{ marginLeft: '2px' }} />
          </button>

          <button 
            className={`seq-tab-btn ${activeTab === 'tabela' ? 'seq-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('tabela')}
          >
            <Database size={17} />
            Genomas Catalogados (NCBI GenBank)
          </button>

          <button 
            className={`seq-tab-btn ${activeTab === 'diretrizes' ? 'seq-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('diretrizes')}
          >
            <UploadCloud size={17} />
            Diretrizes de Submissão
          </button>
        </div>

        {/* TAB 1: SEQ RUNS & ASVS */}
        {activeTab === 'seqruns' && (
          <div className="seq-card">
            <div className="seq-card__header">
              <div className="seq-card__title-group">
                <Layers className="seq-card__icon" size={22} />
                <div>
                  <h2 className="seq-card__title">Explorador de SEQ RUNs & Abundância de ASVs</h2>
                  <p className="seq-card__subtitle">Selecione uma corrida de sequenciamento para visualizar o relatório completo de abundância de ASVs.</p>
                </div>
              </div>

              <button
                className="seq-action-btn"
                style={{ background: 'var(--green-primary)', color: '#ffffff', padding: '0.55rem 1rem', fontSize: '0.825rem', fontWeight: 600 }}
                onClick={() => navigate('/comparar-seqruns')}
              >
                <BarChart3 size={15} />
                Comparar Todas as Corridas (Matriz Heatmap)
                <ArrowRight size={14} />
              </button>
            </div>

            {/* SELETOR SUPERIOR DE SEQ RUNS */}
            <div className="seq-selector-box">
              <div className="seq-selector-header">
                <div className="seq-selector-title">
                  <Filter size={16} />
                  Selecione a Corrida de Sequenciamento (SEQ RUN):
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div className="seq-search" style={{ minWidth: '220px' }}>
                    <Search size={16} className="seq-search__icon" />
                    <input 
                      type="text" 
                      className="seq-search__input" 
                      placeholder="Filtrar corridas por código, título..."
                      value={runSearchTerm}
                      onChange={(e) => setRunSearchTerm(e.target.value)}
                    />
                    {runSearchTerm && (
                      <button 
                        type="button"
                        className="seq-search__clear-btn" 
                        onClick={() => setRunSearchTerm('')}
                        title="Limpar busca"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {[
                      { label: 'Todas', val: 'todas' },
                      { label: '16S', val: '16S' },
                      { label: 'ITS', val: 'ITS' },
                      { label: 'Metagenoma', val: 'Metagenoma' }
                    ].map(btn => (
                      <button
                        key={btn.val}
                        className={`seq-chip ${selectedRegionFilter === btn.val ? 'seq-chip--active' : ''}`}
                        onClick={() => setSelectedRegionFilter(btn.val)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid de Cards Selecionáveis das SEQ RUNs */}
              <div className="seq-run-cards-grid">
                {filteredSeqRuns.length > 0 ? (
                  filteredSeqRuns.map((run) => {
                    const isActive = run.id === selectedRunId;
                    const regionClass = run.targetRegion.includes('ITS') 
                      ? 'seq-run-region--its' 
                      : run.targetRegion.includes('Metagenoma') 
                      ? 'seq-run-region--metagenoma' 
                      : '';

                    return (
                      <div
                        key={run.id}
                        className={`seq-run-select-card ${isActive ? 'seq-run-select-card--active' : ''}`}
                        onClick={() => setSelectedRunId(run.id)}
                      >
                        <div>
                          <div className="seq-run-select-card__top">
                            <span className="seq-run-id">{run.id}</span>
                            <span className={`seq-run-region ${regionClass}`}>{run.targetRegion}</span>
                          </div>

                          <div className="seq-run-select-card__title">{run.title}</div>
                          
                          <div className="seq-run-select-card__meta">
                            {run.sampleSource}
                          </div>
                        </div>

                        <div className="seq-run-select-card__footer">
                          <span>{run.totalReads.toLocaleString('pt-BR')} reads • {run.asvs.length} ASVs</span>
                          <ChevronRight size={15} style={{ color: isActive ? 'var(--green-primary)' : 'var(--text-secondary)' }} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Nenhuma corrida de sequenciamento encontrada.
                  </div>
                )}
              </div>
            </div>

            {/* DASHBOARD DA SEQ RUN SELECIONADA */}
            <div className="seq-run-full-dashboard">
              {/* Header da Corrida Selecionada */}
              <div className="seq-run-detail-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.55rem', borderRadius: '0.35rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                      {currentRun.id} • {currentRun.targetRegion} • {currentRun.platform}
                    </span>
                    <h3 className="seq-run-detail-title" style={{ marginTop: '0.4rem' }}>{currentRun.title}</h3>
                    <p className="seq-run-detail-sub">{currentRun.description}</p>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.825rem', color: '#e8f5ee' }}>
                      <strong>Origem da Amostra:</strong> {currentRun.sampleSource} | <strong>Ambiente:</strong> {currentRun.environment} | <strong>Data:</strong> {currentRun.date}
                    </div>
                  </div>
                </div>

                {/* Métricas da SEQ RUN */}
                <div className="seq-run-metrics-grid">
                  <div className="seq-metric-card">
                    <div className="seq-metric-val">{currentRun.totalReads.toLocaleString('pt-BR')}</div>
                    <div className="seq-metric-lbl">Total de Reads Registradas</div>
                  </div>

                  <div className="seq-metric-card">
                    <div className="seq-metric-val">{currentRun.asvs.length}</div>
                    <div className="seq-metric-lbl">ASVs Identificadas</div>
                  </div>

                  <div className="seq-metric-card">
                    <div className="seq-metric-val">{currentRun.shannonIndex.toFixed(2)}</div>
                    <div className="seq-metric-lbl">Índice de Shannon (H')</div>
                  </div>

                  <div className="seq-metric-card">
                    <div className="seq-metric-val">{currentRun.chao1Index.toFixed(1)}</div>
                    <div className="seq-metric-lbl">Riqueza Chao1</div>
                  </div>
                </div>
              </div>

              {/* Visualização de Abundância Relativa */}
              <div className="asv-abundance-container">
                <div className="asv-abundance-title">
                  <span>
                    <PieChart size={15} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
                    Perfil de Abundância Relativa das ASVs nesta SEQ RUN:
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--green-primary)', fontWeight: 700 }}>
                    Total: {currentRun.totalReads.toLocaleString('pt-BR')} reads (100%)
                  </span>
                </div>

                <div className="asv-abundance-stacked">
                  {currentRun.asvs.map((asv, idx) => (
                    <div
                      key={asv.id}
                      className="asv-stacked-segment"
                      style={{
                        width: `${asv.relativeAbundance}%`,
                        backgroundColor: TAX_COLORS[asv.type] || '#6b7280',
                        opacity: 1 - (idx * 0.08)
                      }}
                      title={`${asv.id} (${asv.organismName}): ${asv.count.toLocaleString('pt-BR')} reads (${asv.relativeAbundance.toFixed(2)}%)`}
                    />
                  ))}
                </div>

                <div className="asv-abundance-legend">
                  {currentRun.asvs.slice(0, 5).map((asv, idx) => (
                    <div key={asv.id} className="asv-legend-item">
                      <span 
                        className="asv-legend-dot" 
                        style={{ 
                          backgroundColor: TAX_COLORS[asv.type] || '#6b7280',
                          opacity: 1 - (idx * 0.08)
                        }} 
                      />
                      <span><strong>{asv.id}</strong> ({asv.organismName}): <strong>{asv.count.toLocaleString('pt-BR')} reads</strong> ({asv.relativeAbundance.toFixed(2).replace('.', ',')}%)</span>
                    </div>
                  ))}
                  {currentRun.asvs.length > 5 && (
                    <div className="asv-legend-item" style={{ color: 'var(--text-muted)' }}>
                      + {currentRun.asvs.length - 5} outras ASVs
                    </div>
                  )}
                </div>
              </div>

              {/* Filtros da Lista de ASVs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <div className="seq-search" style={{ flex: 1, minWidth: '240px' }}>
                  <Search size={16} className="seq-search__icon" />
                  <input 
                    type="text" 
                    className="seq-search__input" 
                    placeholder="Buscar por código ASV, organismo ou taxonomia..."
                    value={asvSearchTerm}
                    onChange={(e) => setAsvSearchTerm(e.target.value)}
                  />
                  {asvSearchTerm && (
                    <button 
                      type="button"
                      className="seq-search__clear-btn" 
                      onClick={() => setAsvSearchTerm('')}
                      title="Limpar busca"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="seq-filter-group">
                  {(['todos', 'Bacteria', 'Fungo'] as const).map(type => (
                    <button
                      key={type}
                      className={`seq-chip ${asvTypeFilter === type ? 'seq-chip--active' : ''}`}
                      onClick={() => setAsvTypeFilter(type)}
                    >
                      {type === 'todos' ? 'Todas ASVs' : type === 'Bacteria' ? 'Bactérias' : 'Fungos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista Responsiva de Cards de ASVs */}
              <div className="asv-cards-list">
                {filteredAsvs.length > 0 ? (
                  filteredAsvs.map((asv) => (
                    <div key={asv.id} className="asv-card-row">
                      {/* Identificação e Taxonomia */}
                      <div className="asv-card-main">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span className="asv-id-badge">{asv.id}</span>
                          <span className="seq-org-name">{asv.organismName}</span>
                          <span className={`seq-type-badge seq-type-badge--${asv.type.toLowerCase()}`}>
                            {asv.type}
                          </span>
                        </div>
                        <span className="asv-tax-snippet">{asv.taxonomy}</span>
                      </div>

                      {/* Estatísticas Numéricas de Abundância */}
                      <div className="asv-card-stats">
                        <div className="asv-card-stat-item">
                          <span className="asv-stat-label">Quantidade Numérica</span>
                          <span className="asv-stat-value asv-stat-value--highlight">
                            {asv.count.toLocaleString('pt-BR')} reads
                          </span>
                        </div>

                        <div className="asv-card-stat-item">
                          <span className="asv-stat-label">Abundância Relativa</span>
                          <span className="asv-stat-value">
                            {asv.relativeAbundance.toFixed(2).replace('.', ',')}%
                          </span>
                        </div>

                        <div className="asv-card-stat-item">
                          <span className="asv-stat-label">Tamanho / Confiança</span>
                          <span className="asv-stat-value" style={{ fontSize: '0.85rem' }}>
                            {asv.length} bp • {asv.confidence.toFixed(1).replace('.', ',')}%
                          </span>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="asv-card-actions">
                        <button 
                          className="seq-action-btn"
                          onClick={() => setSelectedAsvModal(asv)}
                          title="Ver Detalhes e Sequência da ASV"
                        >
                          <Info size={14} />
                          Detalhes
                        </button>
                        <button 
                          className="seq-action-btn"
                          style={{ background: copiedFastaId === asv.id ? 'var(--green-dark)' : 'var(--text-secondary)' }}
                          onClick={() => handleCopyFasta(asv)}
                          title="Copiar Sequência FASTA"
                        >
                          {copiedFastaId === asv.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhuma ASV encontrada para os filtros selecionados.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TABELA DE REGISTROS GENÔMICOS */}
        {activeTab === 'tabela' && (
          <div className="seq-card">
            <div className="seq-card__header">
              <div className="seq-card__title-group">
                <Database className="seq-card__icon" size={22} />
                <div>
                  <h2 className="seq-card__title">Registros Genômicos Catalogados</h2>
                  <p className="seq-card__subtitle">Explore montagens de genomas, tamanho em Mb, profundidade de cobertura e códigos GenBank.</p>
                </div>
              </div>
            </div>

            <div className="seq-controls">
              <div className="seq-search">
                <Search size={16} className="seq-search__icon" />
                <input 
                  type="text" 
                  className="seq-search__input"
                  placeholder="Buscar por organismo, nome comum ou ID GenBank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    type="button"
                    className="seq-search__clear-btn" 
                    onClick={() => setSearchTerm('')}
                    title="Limpar busca"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <div className="seq-filter-group">
                <span className="seq-chip" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none' }}>
                  <Filter size={13} /> Reino:
                </span>
                {(['todos', 'Bacteria', 'Fungo', 'Formiga'] as const).map((type) => (
                  <button
                    key={type}
                    className={`seq-chip ${selectedType === type ? 'seq-chip--active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === 'todos' ? 'Todos' : type === 'Bacteria' ? 'Bactérias' : type === 'Fungo' ? 'Fungos' : 'Formigas'}
                  </button>
                ))}

                <span className="seq-chip" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', marginLeft: '8px' }}>
                  Plataforma:
                </span>
                {[
                  { label: 'Todas', value: 'todas' },
                  { label: 'Illumina', value: 'Illumina' },
                  { label: 'Nanopore', value: 'Nanopore' },
                  { label: 'PacBio', value: 'PacBio' }
                ].map((p) => (
                  <button
                    key={p.value}
                    className={`seq-chip ${selectedPlatform === p.value ? 'seq-chip--active' : ''}`}
                    onClick={() => setSelectedPlatform(p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="seq-table-wrapper">
              <table className="seq-table">
                <thead>
                  <tr>
                    <th>Organismo</th>
                    <th>Tipo</th>
                    <th>Tamanho Genoma</th>
                    <th>Conteúdo GC (%)</th>
                    <th>Est. Genes</th>
                    <th>Plataforma</th>
                    <th>GenBank Accession</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((rec) => (
                      <tr key={rec.id}>
                        <td>
                          <div className="seq-org-cell">
                            <span className="seq-org-name">{rec.name}</span>
                            <span className="seq-org-common">{rec.commonName}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`seq-type-badge seq-type-badge--${rec.type.toLowerCase()}`}>
                            {rec.type}
                          </span>
                        </td>
                        <td><strong>{rec.genomeSize} Mb</strong></td>
                        <td className="seq-gc-cell">
                          <span className="seq-gc-val">{rec.gcContent.toFixed(1).replace('.', ',')}%</span>
                          <div className="seq-gc-bar">
                            <div 
                              className={`seq-gc-fill ${rec.gcContent < 40 ? 'seq-gc-fill--low' : rec.gcContent < 55 ? 'seq-gc-fill--mid' : 'seq-gc-fill--high'}`}
                              style={{ width: `${Math.min(rec.gcContent, 100)}%` }}
                            />
                          </div>
                        </td>
                        <td>{rec.geneCount.toLocaleString('pt-BR')}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {rec.platform} ({rec.coverage})
                          </span>
                        </td>
                        <td>
                          <a 
                            href={`https://www.ncbi.nlm.nih.gov/nuccore/${rec.genbankAccession}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="seq-genbank-link"
                          >
                            {rec.genbankAccession}
                            <ExternalLink size={12} />
                          </a>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              className="seq-action-btn"
                              onClick={() => navigate(`/organismo/${rec.id}`)}
                              title="Ver Detalhes do Organismo"
                            >
                              Ver Organismo
                            </button>
                            <button
                              className="seq-action-btn"
                              style={{ background: copiedGenbankId === rec.genbankAccession ? 'var(--green-dark)' : 'var(--text-secondary)' }}
                              onClick={() => handleCopyAccession(rec.genbankAccession)}
                              title="Copiar Código GenBank"
                            >
                              {copiedGenbankId === rec.genbankAccession ? <Check size={13} /> : <Copy size={13} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        Nenhum registro de sequenciamento encontrado para a busca informada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DIRETRIZES DE SUBMISSÃO */}
        {activeTab === 'diretrizes' && (
          <div className="seq-card">
            <div className="seq-card__header">
              <div className="seq-card__title-group">
                <UploadCloud className="seq-card__icon" size={22} />
                <div>
                  <h2 className="seq-card__title">Diretrizes para Submissão de Dados de Sequenciamento</h2>
                  <p className="seq-card__subtitle">Requisitos de extração, formatos aceitos e protocolos de amostragem para pesquisadores parceiros.</p>
                </div>
              </div>
            </div>

            <div className="seq-guide-grid">
              <div className="seq-guide-card">
                <div className="seq-guide-icon">
                  <FileText size={18} />
                </div>
                <h3 className="seq-guide-title">1. Formatos de Arquivos Aceitos</h3>
                <p className="seq-guide-text">
                  Reads brutos em formato FASTQ compactado (.fastq.gz) com arquivos de qualidade associados (Phred score Q &gt; 30 em ao menos 85% dos reads). Para montagens prontas, aceitamos FASTA (.fasta / .fna).
                </p>
              </div>

              <div className="seq-guide-card">
                <div className="seq-guide-icon">
                  <Layers size={18} />
                </div>
                <h3 className="seq-guide-title">2. Metadados de Amostragem</h3>
                <p className="seq-guide-text">
                  Cada amostra enviada deve acompanhar planilha contendo coordenadas de amostragem (latitude/longitude), espécie da formiga hospedeira, casta ou camada do jardim de fungos de onde o isolado foi extraído.
                </p>
              </div>

              <div className="seq-guide-card">
                <div className="seq-guide-icon">
                  <Dna size={18} />
                </div>
                <h3 className="seq-guide-title">3. Validação Taxonômica & GenBank</h3>
                <p className="seq-guide-text">
                  Todas as sequências submetidas passam por verificação de contaminação e amplificação do gene 16S rRNA (Bactérias) ou região ITS / 18S rRNA (Fungos) antes da atribuição de número de acesso NCBI GenBank.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.75rem', padding: '1.25rem', background: 'var(--green-light)', borderRadius: '0.65rem', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: '1rem' }}>Deseja colaborar enviando dados de sequenciamento?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Entre em contato com nossa equipe de bioinformática para enviar propostas de sequenciamento e colaborações científicas.</p>
              </div>
              <button 
                className="seq-sim-start-btn"
                style={{ width: 'auto', padding: '0.6rem 1.15rem' }}
                onClick={() => navigate('/contato')}
              >
                Fazer Solicitação via Contato
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalhes da ASV */}
      {selectedAsvModal && (
        <div className="asv-modal-overlay" onClick={() => setSelectedAsvModal(null)}>
          <div className="asv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="asv-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="asv-id-badge" style={{ fontSize: '0.9rem' }}>{selectedAsvModal.id}</span>
                <span className={`seq-type-badge seq-type-badge--${selectedAsvModal.type.toLowerCase()}`}>
                  {selectedAsvModal.type}
                </span>
              </div>
              <button 
                onClick={() => setSelectedAsvModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.2rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="asv-modal-body">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '0.3rem' }}>
                {selectedAsvModal.organismName}
              </h3>
              
              {selectedAsvModal.description && (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.15rem' }}>
                  {selectedAsvModal.description}
                </p>
              )}

              {/* Estatísticas Numéricas da ASV */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '1.15rem' }}>
                <div style={{ background: 'var(--off-white)', padding: '0.7rem', borderRadius: '0.45rem', border: '1px solid var(--gray-200)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Leituras (Reads)</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--green-primary)', marginTop: '0.1rem' }}>
                    {selectedAsvModal.count.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div style={{ background: 'var(--off-white)', padding: '0.7rem', borderRadius: '0.45rem', border: '1px solid var(--gray-200)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Abundância Relativa</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--green-primary)', marginTop: '0.1rem' }}>
                    {selectedAsvModal.relativeAbundance.toFixed(2).replace('.', ',')}%
                  </div>
                </div>

                <div style={{ background: 'var(--off-white)', padding: '0.7rem', borderRadius: '0.45rem', border: '1px solid var(--gray-200)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Tamanho da Sequência</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                    {selectedAsvModal.length} bp
                  </div>
                </div>

                <div style={{ background: 'var(--off-white)', padding: '0.7rem', borderRadius: '0.45rem', border: '1px solid var(--gray-200)' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Confiança Taxonômica</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--green-dark)', marginTop: '0.1rem' }}>
                    {selectedAsvModal.confidence.toFixed(1).replace('.', ',')}%
                  </div>
                </div>
              </div>

              {/* Hierarquia Taxonômica Completa */}
              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Linhagem Taxonômica:
                </label>
                <div className="asv-tax-tree">
                  {selectedAsvModal.taxonomy.split('; ').map((rank, i) => (
                    <span key={i} className="asv-tax-rank">
                      {rank}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box de Sequência Nucleotídica (FASTA) */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Sequência Nucleotídica (FASTA):
                  </label>
                  <button
                    className="seq-action-btn"
                    style={{ background: copiedFastaId === selectedAsvModal.id ? 'var(--green-dark)' : 'var(--green-primary)', padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                    onClick={() => handleCopyFasta(selectedAsvModal)}
                  >
                    {copiedFastaId === selectedAsvModal.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedFastaId === selectedAsvModal.id ? 'Copiado' : 'Copiar FASTA'}
                  </button>
                </div>
                <div className="asv-seq-box">
                  {`>${selectedAsvModal.id} | ${selectedAsvModal.organismName} | ${selectedAsvModal.length}bp | Abundância: ${selectedAsvModal.relativeAbundance.toFixed(2).replace('.', ',')}%\n${selectedAsvModal.sequence}`}
                </div>
              </div>

              {/* Botões de Ação no Rodapé do Modal */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                {selectedAsvModal.organismId && (
                  <button 
                    className="seq-action-btn"
                    style={{ background: '#0284c7', padding: '0.55rem 0.9rem' }}
                    onClick={() => {
                      const id = selectedAsvModal.organismId;
                      setSelectedAsvModal(null);
                      navigate(`/organismo/${id}`);
                    }}
                  >
                    Ver Perfil do Organismo
                    <ExternalLink size={13} />
                  </button>
                )}

                <button 
                  className="seq-action-btn"
                  style={{ background: 'var(--text-secondary)', padding: '0.55rem 0.9rem' }}
                  onClick={() => setSelectedAsvModal(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SequenciamentoPage;
