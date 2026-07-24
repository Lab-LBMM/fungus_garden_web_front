import { Database, ExternalLink, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import './DataSourcesPage.css';

interface DataSource {
  name: string;
  provider: string;
  category: string;
  url: string;
  description: string;
  dataTypes: string[];
  lastUpdate: string;
}

const dataSources: DataSource[] = [
  {
    name: 'NCBI GenBank & RefSeq',
    provider: 'National Center for Biotechnology Information (NCBI / NIH)',
    category: 'Genômica & Sequenciamento',
    url: 'https://www.ncbi.nlm.nih.gov/genbank/',
    description: 'Repositório público primário para sequências de nucleotídeos, genomas montados, anotações de genes e números de acesso internacionais (NC_*, GCA_*).',
    dataTypes: ['Tamanho do Genoma (Mb)', 'Conteúdo GC (%)', 'Contagem de Genes (CDS)', 'Números de Acesso GenBank'],
    lastUpdate: 'Diária (sincronização via API E-utilities)',
  },
  {
    name: 'NCBI Taxonomy Database',
    provider: 'NCBI Taxonomy Consortium',
    category: 'Taxonomia & Filogenia',
    url: 'https://www.ncbi.nlm.nih.gov/taxonomy',
    description: 'Banco de dados taxonômico padronizado que fornece a hierarquia filogenética oficial para todos os organismos catalogados no LBMM DB.',
    dataTypes: ['Reino', 'Filo', 'Classe', 'Ordem', 'Família', 'Gênero', 'Espécie'],
    lastUpdate: 'Atualização Mensal',
  },
  {
    name: 'UniProtKB / Swiss-Prot',
    provider: 'UniProt Consortium (EMBL-EBI, SIB, PIR)',
    category: 'Proteômica & Enzimologia',
    url: 'https://www.uniprot.org/',
    description: 'Fonte central de dados de sequências de proteínas e anotações funcionais curadas para identificação de enzimas bioativas de fungos e actinobactérias.',
    dataTypes: ['Atividade Enzimática', 'Vias Metabólicas', 'Propriedades Catalíticas'],
    lastUpdate: 'Revisão Trimestral',
  },
  {
    name: 'MycoBank & Index Fungorum',
    provider: 'International Mycological Association (IMA)',
    category: 'Micologia Nomenclatural',
    url: 'https://www.mycobank.org/',
    description: 'Registros nomenclaturais internacionais oficiais para espécies e táxons fúngicos, incluindo sinonímias e esporulação.',
    dataTypes: ['Nomenclatura Micológica', 'Tipos de Esporos', 'Estruturas de Micélio'],
    lastUpdate: 'Semestral',
  },
  {
    name: 'AntWeb & Formis',
    provider: 'California Academy of Sciences',
    category: 'Mirmecologia & Ecologia',
    url: 'https://www.antweb.org/',
    description: 'Maior banco de dados mundial de espécimes de formigas, imagens de alta resolução e informações ecomorfológicas de formicídeos atíneos.',
    dataTypes: ['Sistema de Castas', 'Profundidade do Ninho', 'Tipo de Agricultura', 'Distribuição Geográfica'],
    lastUpdate: 'Atualização Anual',
  },
  {
    name: 'Literatura Científica Especializada (Peer-Reviewed)',
    provider: 'Periódicos (Science, Nature, PNAS, PLoS Genetics, BMC Genomics)',
    category: 'Curadoria Bibliográfica',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
    description: 'Artigos científicos de alto impacto e teses acadêmicas vinculadas ao LBMM/UNESP que fornecem validação experimental das associações simbióticas.',
    dataTypes: ['Simbiontes Associados', 'Provas Experimentais', 'Citações Bibliográficas'],
    lastUpdate: 'Curadoria Contínua',
  },
];

const DataSourcesPage = () => {
  return (
    <div className="datasources-page">
      <div className="datasources-page__hero">
        <div className="datasources-page__hero-content">
          <div className="datasources-page__badge">
            <Database size={16} />
            <span>Transparência & Reprodutibilidade Científica</span>
          </div>
          <h1 className="datasources-page__title">Fontes de Dados & Metodologia</h1>
          <p className="datasources-page__subtitle">
            O LBMM DB integra informações genômicas, taxonômicas e ecológicas procedentes de repositórios públicos internacionais de referência e curadoria micológica local.
          </p>
        </div>
      </div>

      <div className="datasources-page__container">
        {/* Quality Assurance Card */}
        <div className="datasources-page__qa-card">
          <div className="datasources-page__qa-icon">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="datasources-page__qa-title">Padrão de Curadoria Científica</h3>
            <p className="datasources-page__qa-desc">
              Todos os dados integrados no banco passam por verificação cruzada entre sequenciamentos de genomas completos no NCBI GenBank e revisões taxonômicas validadas pela equipe do LBMM - UNESP.
            </p>
          </div>
        </div>

        {/* Data Sources Grid */}
        <section className="datasources-page__section">
          <h2 className="datasources-page__section-title">Bancos de Dados Integrados</h2>
          <div className="datasources-page__grid">
            {dataSources.map((source, index) => (
              <div key={index} className="source-card">
                <div className="source-card__header">
                  <span className="source-card__category">{source.category}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-card__external-link"
                    title="Acessar base original"
                  >
                    Acessar Fonte
                    <ExternalLink size={14} />
                  </a>
                </div>
                <h3 className="source-card__name">{source.name}</h3>
                <p className="source-card__provider">{source.provider}</p>
                <p className="source-card__desc">{source.description}</p>
                
                <div className="source-card__data-types">
                  <span className="source-card__data-title">Metadados Mapeados:</span>
                  <div className="source-card__tags">
                    {source.dataTypes.map((dt, i) => (
                      <span key={i} className="source-card__tag">
                        <CheckCircle2 size={12} />
                        {dt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="source-card__footer">
                  <RefreshCw size={13} />
                  <span>Frequência de Atualização: {source.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline & Protocol Section */}
        <section className="datasources-page__method-section">
          <h2 className="datasources-page__section-title">Fluxo de Integração e Padronização</h2>
          <div className="datasources-page__steps-grid">
            <div className="method-step">
              <span className="method-step__num">01</span>
              <h4>Extração de Dados NCBI</h4>
              <p>Download automatizado de montagens de genomas (FASTA/GFF) e extração de parâmetros essenciais (tamanho, %GC e CDS).</p>
            </div>
            <div className="method-step">
              <span className="method-step__num">02</span>
              <h4>Normalização Taxonômica</h4>
              <p>Mapeamento de táxons conforme o repositório NCBI Taxonomy e ajuste para táxons simplificados ou completos.</p>
            </div>
            <div className="method-step">
              <span className="method-step__num">03</span>
              <h4>Validação Micológica</h4>
              <p>Enriquecimento de dados biológicos de fungos e actinobactérias simbiontes com literatura experimental curada.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataSourcesPage;
