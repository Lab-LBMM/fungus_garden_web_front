import { ArrowLeft, Dna, Activity, Hash, MapPin, BookOpen, ExternalLink, Globe, Microscope, List, Users, Search, Bug, Circle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { organisms } from '../data/organisms';
import './DetailPage.css';

const taxonomyIcons: Record<string, React.ReactElement> = {
  reino:   <Globe size={15} />,
  filo:    <Dna size={15} />,
  classe:  <Microscope size={15} />,
  ordem:   <List size={15} />,
  familia: <Users size={15} />,
  genero:  <Search size={15} />,
  especie: <Bug size={15} />,
};

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const org = organisms.find((o) => o.id === Number(id));
  if (!org || !org.detail) return null;

  const { detail } = org;
  const tax = detail.taxonomyInfo;
  const atContent = parseFloat((100 - detail.gcContent).toFixed(1));
  const gcPct = detail.gcContent;

  const peers = organisms
    .filter((o) => o.type === org.type && o.detail)
    .sort((a, b) => b.detail!.genomeSize - a.detail!.genomeSize);

  const peersByGenes = [...organisms.filter((o) => o.type === org.type && o.detail)]
    .sort((a, b) => b.detail!.geneCount - a.detail!.geneCount);

  const maxGenome = Math.max(...peers.map((o) => o.detail!.genomeSize));
  const maxGenes = Math.max(...peersByGenes.map((o) => o.detail!.geneCount));

  const gcCircumference = 2 * Math.PI * 54;
  const gcDash = (gcPct / 100) * gcCircumference;

  return (
    <div className="detail">
      <div className="detail__hero" style={{
        backgroundImage: detail.heroImageUrl
          ? `url(${detail.heroImageUrl})`
          : org.imageUrl
          ? `url(${org.imageUrl})`
          : 'none',
        backgroundColor: org.color || '#e8f5ee',
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
          <aside className="detail__sidebar">
            <div className="detail__card">
              <h3 className="detail__card-title"><Dna size={16} />Taxonomia</h3>
              <div className="detail__taxonomy-list">
                {Object.entries(tax).map(([key, value]) => (
                  <div className="detail__taxonomy-row" key={key}>
                    <span className="detail__taxonomy-icon">{taxonomyIcons[key] ?? <Circle size={15} />}</span>
                    <div>
                      <span className="detail__taxonomy-key">{key === 'reino' ? 'Organismo' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="detail__taxonomy-val">{value}</span>
                    </div>
                    <span className="detail__taxonomy-chevron">›</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail__card">
              <h3 className="detail__card-title"><Activity size={16} />Descrição</h3>
              <p className="detail__description">{detail.description}</p>
            </div>

            <div className="detail__card">
              <h3 className="detail__card-title"><MapPin size={16} />Habitat</h3>
              <p className="detail__habitat">{detail.habitat}</p>
            </div>
          </aside>

          <main className="detail__main">
            <div className="detail__stats-row">
              <div className="detail__stat-card">
                <div className="detail__stat-icon detail__stat-icon--genome"><Dna size={14} /></div>
                <div>
                  <span className="detail__stat-label">TAMANHO DO GENOMA</span>
                  <span className="detail__stat-value">{detail.genomeSize} <small>Mb</small></span>
                </div>
              </div>
              <div className="detail__stat-card">
                <div className="detail__stat-icon detail__stat-icon--gc"><Activity size={14} /></div>
                <div>
                  <span className="detail__stat-label">CONTEÚDO GC</span>
                  <span className="detail__stat-value">{detail.gcContent}<small>%</small></span>
                </div>
              </div>
              <div className="detail__stat-card">
                <div className="detail__stat-icon detail__stat-icon--genes"><Hash size={14} /></div>
                <div>
                  <span className="detail__stat-label">NÚMERO DE GENES</span>
                  <span className="detail__stat-value">{detail.geneCount.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="detail__card">
              <h3 className="detail__card-title"><Activity size={16} />Conteúdo GC</h3>
              <p className="detail__card-sub">Proporção de Guanina-Citosina no genoma</p>
              <div className="detail__gc-body">
                <div className="detail__gc-donut-wrap">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2eae5" strokeWidth="12" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--green-primary)" strokeWidth="12"
                      strokeDasharray={`${gcDash} ${gcCircumference - gcDash}`}
                      strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <text x="60" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{gcPct}%</text>
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

            <div className="detail__card">
              <h3 className="detail__card-title"><Activity size={16} />Tamanho do Genoma (Mb)</h3>
              <p className="detail__card-sub">Comparação com outros organismos do mesmo tipo</p>
              <div className="detail__chart">
                {peers.map((peer) => (
                  <div className="detail__chart-row" key={peer.id}>
                    <span className="detail__chart-label">{peer.detail?.taxonomyInfo.genero || peer.name.split(' ')[0]}</span>
                    <div className="detail__chart-track">
                      <div className={`detail__chart-bar ${peer.id === org.id ? 'detail__chart-bar--active' : ''}`}
                        style={{ width: `${(peer.detail!.genomeSize / maxGenome) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div className="detail__chart-axis">
                  {[0, Math.round(maxGenome * 0.33), Math.round(maxGenome * 0.66), Math.round(maxGenome)].map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail__card">
              <h3 className="detail__card-title"><Hash size={16} />Número de Genes</h3>
              <p className="detail__card-sub">Comparação da contagem de genes com outros organismos do mesmo tipo</p>
              <div className="detail__chart">
                {peersByGenes.map((peer) => (
                  <div className="detail__chart-row" key={peer.id}>
                    <span className="detail__chart-label">{peer.detail?.taxonomyInfo.genero || peer.name.split(' ')[0]}</span>
                    <div className="detail__chart-track">
                      <div className={`detail__chart-bar ${peer.id === org.id ? 'detail__chart-bar--active' : ''}`}
                        style={{ width: `${(peer.detail!.geneCount / maxGenes) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div className="detail__chart-axis">
                  {[0, Math.round(maxGenes * 0.25), Math.round(maxGenes * 0.5), Math.round(maxGenes * 0.75), maxGenes].map((v) => (
                    <span key={v}>{v.toLocaleString('pt-BR')}</span>
                  ))}
                </div>
              </div>
            </div>

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