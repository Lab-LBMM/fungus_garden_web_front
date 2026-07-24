import { ArrowLeft, Dna, Activity, MapPin, BookOpen, ExternalLink, Globe, Microscope, List, Users, Search, Bug, Circle, Shield, Folder, Database } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { organisms } from '../data/organisms';
import './DetailPage.css';

/**
 * Mapeamento de icones para cada nivel taxonômico exibido na barra lateral.
 */
const taxonomyIcons: Record<string, React.ReactElement> = {
  reino:         <Globe size={15} />,
  filo:          <Dna size={15} />,
  classe:        <Microscope size={15} />,
  ordem:         <List size={15} />,
  superfamilia:  <Shield size={15} />,
  familia:       <Users size={15} />,
  subfamilia:    <Folder size={15} />,
  genero:        <Search size={15} />,
  especie:       <Bug size={15} />,
  acessoGenbank: <Database size={15} />,
};

/**
 * Pagina de detalhes individuais de um organismo.
 * Renderiza informacoes taxonômicas, habitat, caracterizacao especializada e conteudo GC.
 */
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Busca o organismo correspondente ao ID informado na URL
  const org = organisms.find((o) => o.id === Number(id));
  if (!org || !org.detail) return null;

  const { detail } = org;
  const tax = detail.taxonomyInfo;
  const atContent = parseFloat((100 - detail.gcContent).toFixed(1));
  const gcPct = detail.gcContent;
  const gcCircumference = 2 * Math.PI * 54;
  const gcDash = (gcPct / 100) * gcCircumference;

  return (
    <div className="detail">
      {/* Hero Banner com imagem e badges principais */}
      <div className="detail__hero" style={{
        backgroundImage: detail.heroImageUrl
          ? `url(${detail.heroImageUrl})`
          : org.imageUrl
          ? `url(${org.imageUrl})`
          : 'none',
        backgroundColor: org.color || '#f8fafc',
      }}>
        <div className="detail__hero-overlay" />
        <div className="detail__hero-content">
          <button className="detail__back" onClick={() => navigate('/buscar')}>
            <ArrowLeft size={15} />
            Voltar para Busca
          </button>
          <div className="detail__hero-meta">
            <div className="detail__hero-left">
              <span className={`detail__type-badge detail__type-badge--${org.type.toLowerCase()}`}>
                {org.type}
              </span>
              <h1 className="detail__name">{org.name}</h1>
              <p className="detail__common">{org.commonName}</p>
            </div>
            <div className="detail__hero-tags">
              {org.tags.map((tag, i) => (
                <span key={i} className="detail__hero-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="detail__body">
        <div className="detail__layout">
          {/* Barra lateral com hierarquia taxonômica e habitat */}
          <aside className="detail__sidebar">
            <div className="detail__card">
              <h3 className="detail__card-title"><Dna size={16} />Taxonomia</h3>
              <div className="detail__taxonomy-list">
                {Object.entries(tax).map(([key, value]) => {
                  const label =
                    key === 'reino'
                      ? 'Reino'
                      : key === 'acessoGenbank'
                      ? 'Acesso GenBank'
                      : key === 'superfamilia'
                      ? 'Superfamília'
                      : key === 'subfamilia'
                      ? 'Subfamília'
                      : key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <div className="detail__taxonomy-row" key={key}>
                      <span className="detail__taxonomy-icon">
                        {taxonomyIcons[key] ?? <Circle size={15} />}
                      </span>
                      <div>
                        <span className="detail__taxonomy-key">{label}</span>
                        <span className="detail__taxonomy-val">{value}</span>
                      </div>
                      <span className="detail__taxonomy-chevron">›</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="detail__card">
              <h3 className="detail__card-title"><MapPin size={16} />Habitat</h3>
              <p className="detail__habitat">{detail.habitat}</p>
            </div>
          </aside>

          {/* Area principal com caracterizacao especializada por reino */}
          <main className="detail__main">
            <div className="detail__card">
              <h3 className="detail__card-title"><Activity size={16} />Descrição</h3>
              <p className="detail__description">{detail.description}</p>
            </div>

            {/* Caracterizacao para Formigas */}
            {org.type === 'Formiga' && (
              <div className="detail__card detail__card--featured">
                <div className="detail__card-header-badge">
                  <Bug size={22} className="detail__featured-icon" />
                  <div>
                    <h3 className="detail__featured-title">Caracterização Ecológica da Colônia</h3>
                    <p className="detail__card-sub">Dados estruturais da colônia e microbioma associado</p>
                  </div>
                </div>

                <div className="detail__featured-grid">
                  {org.agricultureType && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Tipo de Agricultura</span>
                      <span className="detail__featured-val detail__featured-val--highlight">{org.agricultureType}</span>
                    </div>
                  )}

                  {org.colonySize && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Tamanho da Colônia</span>
                      <span className="detail__featured-val">{org.colonySize}</span>
                    </div>
                  )}

                  {org.nestDepth && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Profundidade do Ninho</span>
                      <span className="detail__featured-val">{org.nestDepth}</span>
                    </div>
                  )}

                  {org.associatedBacteria && org.associatedBacteria.length > 0 && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Bactérias Simbiontes Associadas</span>
                      <div className="detail__symbionts-list">
                        {org.associatedBacteria.map((bac, i) => (
                          <span key={i} className="detail__symbiont-pill detail__symbiont-pill--bacteria">
                            <Microscope size={13} />
                            {bac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {org.associatedFungi && org.associatedFungi.length > 0 && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Fungos Cultivados no Jardim</span>
                      <div className="detail__symbionts-list">
                        {org.associatedFungi.map((fung, i) => (
                          <span key={i} className="detail__symbiont-pill detail__symbiont-pill--fungi">
                            <Activity size={13} />
                            {fung}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Caracterizacao para Bacterias */}
            {org.type === 'Bacteria' && (
              <div className="detail__card detail__card--featured">
                <div className="detail__card-header-badge">
                  <Microscope size={22} className="detail__featured-icon" />
                  <div>
                    <h3 className="detail__featured-title">Caracterização Biológica Bacteriana</h3>
                    <p className="detail__card-sub">Propriedades morfológicas, fisiológicas e metabólicas</p>
                  </div>
                </div>

                <div className="detail__featured-grid">
                  {org.gramStain && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Coloração Gram</span>
                      <span className="detail__featured-val">{org.gramStain}</span>
                    </div>
                  )}
                  {org.motility && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Mobilidade</span>
                      <span className="detail__featured-val">{org.motility}</span>
                    </div>
                  )}
                  {org.spores && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Esporulação</span>
                      <span className="detail__featured-val">{org.spores}</span>
                    </div>
                  )}
                  {org.optimumTemperature && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Temperatura Ótima</span>
                      <span className="detail__featured-val">{org.optimumTemperature}</span>
                    </div>
                  )}
                  {org.antibioticProduction && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Antibióticos Produzidos</span>
                      <span className="detail__featured-val detail__featured-val--highlight">{org.antibioticProduction}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Caracterizacao para Fungos */}
            {org.type === 'Fungo' && (
              <div className="detail__card detail__card--featured">
                <div className="detail__card-header-badge">
                  <Activity size={22} className="detail__featured-icon" />
                  <div>
                    <h3 className="detail__featured-title">Caracterização Fúngica Especializada</h3>
                    <p className="detail__card-sub">Estrutura micelial, esporulação, substrato e perfil enzimático</p>
                  </div>
                </div>

                <div className="detail__featured-grid">
                  {org.spores && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Tipo de Esporos</span>
                      <span className="detail__featured-val">{org.spores}</span>
                    </div>
                  )}

                  {org.myceliumType && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Tipo de Micélio</span>
                      <span className="detail__featured-val">{org.myceliumType}</span>
                    </div>
                  )}

                  {org.gongylidiaProduction && (
                    <div className="detail__featured-item">
                      <span className="detail__featured-label">Produção de Gongilídios</span>
                      <span className="detail__featured-val">{org.gongylidiaProduction}</span>
                    </div>
                  )}

                  {org.growthSubstrate && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Substrato de Crescimento</span>
                      <span className="detail__featured-val">{org.growthSubstrate}</span>
                    </div>
                  )}

                  {(org.symbioticRole || org.symbioticFunction) && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Função Ecológica e Simbiótica</span>
                      <span className="detail__featured-val detail__featured-val--highlight">
                        {org.symbioticRole || org.symbioticFunction}
                      </span>
                    </div>
                  )}

                  {org.enzymaticActivity && org.enzymaticActivity.length > 0 && (
                    <div className="detail__featured-item detail__featured-item--full">
                      <span className="detail__featured-label">Atividade Enzimática Secretada</span>
                      <div className="detail__symbionts-list">
                        {org.enzymaticActivity.map((enz, i) => (
                          <span key={i} className="detail__symbiont-pill">
                            <Activity size={13} />
                            {enz}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Grafico Donut e barras de Conteudo GC/AT */}
            <div className="detail__card">
              <h3 className="detail__card-title"><Activity size={16} />Conteúdo GC</h3>
              <p className="detail__card-sub">Proporção de Guanina-Citosina no genoma</p>
              <div className="detail__gc-body">
                <div className="detail__gc-donut-wrap">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2eae5" strokeWidth="12" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--green-primary, #2e7d32)" strokeWidth="12"
                      strokeDasharray={`${gcDash} ${gcCircumference - gcDash}`}
                      strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <text x="60" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary, #0f172a)">{gcPct}%</text>
                  </svg>
                </div>
                <div className="detail__gc-bars">
                  <div className="detail__gc-bar-row">
                    <span className="detail__gc-dot detail__gc-dot--gc" />
                    <span className="detail__gc-bar-label">GC</span>
                    <div className="detail__gc-bar-track">
                      <div className="detail__gc-bar-fill detail__gc-bar-fill--gc" style={{ width: `${gcPct}%` }} />
                    </div>
                    <span className="detail__gc-bar-pct">{gcPct}%</span>
                  </div>
                  <div className="detail__gc-bar-row">
                    <span className="detail__gc-dot detail__gc-dot--at" />
                    <span className="detail__gc-bar-label">AT</span>
                    <div className="detail__gc-bar-track">
                      <div className="detail__gc-bar-fill detail__gc-bar-fill--at" style={{ width: `${atContent}%` }} />
                    </div>
                    <span className="detail__gc-bar-pct">{atContent}%</span>
                  </div>
                  <p className="detail__gc-note">
                    {gcPct < 40 ? 'Conteúdo GC baixo' : gcPct < 60 ? 'Conteúdo GC moderado' : 'Conteúdo GC alto'}
                  </p>
                </div>
              </div>
            </div>

            {/* Referencias bibliograficas e GenBank */}
            <div className="detail__card">
              <h3 className="detail__card-title"><BookOpen size={16} />Referências Científicas</h3>
              <div className="detail__refs">
                {detail.references.map((ref, i) => (
                  <div className="detail__ref-row" key={i}>
                    <span className="detail__ref-num">{i + 1}</span>
                    <span className="detail__ref-text">{ref}</span>
                  </div>
                ))}
              </div>
              {detail.genbankAccession && (
                <div className="detail__genbank">
                  <span>Número de Acesso GenBank:</span>
                  <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${detail.genbankAccession}`}
                    target="_blank" rel="noopener noreferrer" className="detail__genbank-link">
                    {detail.genbankAccession}
                    <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
