import { Users, Mail, Award, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import './TeamPage.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'coordination' | 'researchers' | 'developers' | 'collaborators';
  affiliation: string;
  lattesUrl?: string;
  email: string;
  bio: string;
  specialties: string[];
  imageUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. André Rodrigues',
    role: 'Coordenador Principal / Professor Titular',
    category: 'coordination',
    affiliation: 'UNESP - Depto. de Biologia / LBMM',
    email: 'andre.rodrigues@unesp.br',
    lattesUrl: 'http://lattes.cnpq.br/',
    bio: 'Especialista em micologia, interações inseto-fungo e filogenia molecular de fungos associados a formigas cultivadoras de jardins.',
    specialties: ['Micologia Ambiental', 'Interações Simbióticas', 'Filogenia Fúngica', 'Microbioma de Formigas'],
  },
  {
    id: '2',
    name: 'Dra. Maria Fernanda Silva',
    role: 'Pesquisadora Sênior de Pós-Doutorado',
    category: 'coordination',
    affiliation: 'UNESP - Laboratório de Bioquímica e Microbiologia',
    email: 'mf.silva@unesp.br',
    lattesUrl: 'http://lattes.cnpq.br/',
    bio: 'Doutora em Microbiologia Molecular com foco na caracterização metabólica de actinobactérias produtoras de antibióticos.',
    specialties: ['Metabolômica', 'Actinobactérias', 'Screening Antimicrobiano', 'Genômica Funcional'],
  },
  {
    id: '3',
    name: 'Dr. Lucas Gabriel Santos',
    role: 'Pesquisador Pós-Doutorando',
    category: 'researchers',
    affiliation: 'LBMM / UNESP',
    email: 'lucas.g.santos@unesp.br',
    lattesUrl: 'http://lattes.cnpq.br/',
    bio: 'Pesquisa a ecologia evolutiva de basidiomicetos cultivados por formigas atíneas e dinâmica metabólica em ninhos.',
    specialties: ['Basidiomycota', 'Ecologia Evolutiva', 'Enzimologia Fúngica'],
  },
  {
    id: '4',
    name: 'Me. Beatriz Oliveira',
    role: 'Doutoranda em Microbiologia',
    category: 'researchers',
    affiliation: 'Programa de Pós-Graduação em Ciências Biológicas - UNESP',
    email: 'beatriz.oliveira@unesp.br',
    lattesUrl: 'http://lattes.cnpq.br/',
    bio: 'Investiga os mecanismos de defesa antimicrobiana da cutícula de formigas cortadeiras contra patógenos fúngicos.',
    specialties: ['Defesa Cuticular', 'Pseudonocardia', 'Patologia de Formigas'],
  },
  {
    id: '5',
    name: 'Eng. Gabriel Martins',
    role: 'Desenvolvedor Principal de Sistemas e Bioinformática',
    category: 'developers',
    affiliation: 'LBMM - Bioinformática & Sistemas',
    email: 'gabriel.martins@unesp.br',
    bio: 'Engenheiro de software e bioinformata responsável pela arquitetura da base de dados, pipelines de sequenciamento e interface web.',
    specialties: ['Arquitetura de Dados', 'Pipelines de Sequenciamento', 'Interface Web & API', 'Genômica de Comparação'],
  },
  {
    id: '6',
    name: 'Dra. Camila Duarte',
    role: 'Curadora de Dados Taxonômicos',
    category: 'developers',
    affiliation: 'LBMM / UNESP',
    email: 'camila.duarte@unesp.br',
    bio: 'Responsável pela padronização nomenclatural, validação de números de acesso GenBank e curadoria bibliográfica do banco.',
    specialties: ['Curadoria Taxonômica', 'Nomenclatura Botânica/Micológica', 'Metadados Científicos'],
  },
  {
    id: '7',
    name: 'Dr. Fernando Peixoto',
    role: 'Colaborador Científico Internacional',
    category: 'collaborators',
    affiliation: 'Center for Evolutionary Hymenoptera / Smithsonian Institution',
    email: 'peixotof@smithsonian.org',
    bio: 'Pesquisador em filogenia de Hymenoptera e co-autor de revisões taxonômicas do gênero Atta e Acromyrmex na Região Neotropical.',
    specialties: ['Sistemática de Formicidae', 'Filogeografia', 'Taxonomia Neotropical'],
  },
];

const TeamPage = () => {
  const coordination = teamMembers.filter((m) => m.category === 'coordination');
  const researchers = teamMembers.filter((m) => m.category === 'researchers');
  const developers = teamMembers.filter((m) => m.category === 'developers');
  const collaborators = teamMembers.filter((m) => m.category === 'collaborators');

  return (
    <div className="team-page">
      <div className="team-page__hero">
        <div className="team-page__hero-content">
          <div className="team-page__badge">
            <Users size={16} />
            <span>Laboratório de Bioquímica e Microbiologia Molecular - UNESP</span>
          </div>
          <h1 className="team-page__title">Equipe do Projeto LBMM DB</h1>
          <p className="team-page__subtitle">
            Conheça os pesquisadores, bioinformatas e colaboradores dedicados ao estudo, curadoria e catalogação dos organismos simbiontes dos jardins de fungos.
          </p>
        </div>
      </div>

      <div className="team-page__container">
        {/* Coordination */}
        <section className="team-page__section">
          <div className="team-page__section-header">
            <Award size={22} />
            <h2>Coordenação & Liderança Científica</h2>
          </div>
          <div className="team-page__grid">
            {coordination.map((member) => (
              <div key={member.id} className="team-card team-card--featured">
                <div className="team-card__header">
                  <div className="team-card__avatar">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <span className="team-card__role">{member.role}</span>
                    <span className="team-card__affiliation">{member.affiliation}</span>
                  </div>
                </div>
                <p className="team-card__bio">{member.bio}</p>
                <div className="team-card__tags">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="team-card__tag">{spec}</span>
                  ))}
                </div>
                <div className="team-card__footer">
                  <a href={`mailto:${member.email}`} className="team-card__link">
                    <Mail size={14} />
                    {member.email}
                  </a>
                  {member.lattesUrl && (
                    <a href={member.lattesUrl} target="_blank" rel="noopener noreferrer" className="team-card__link">
                      <BookOpen size={14} />
                      Currículo Lattes
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Researchers */}
        <section className="team-page__section">
          <div className="team-page__section-header">
            <Users size={22} />
            <h2>Pesquisadores & Doutorandos</h2>
          </div>
          <div className="team-page__grid">
            {researchers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card__header">
                  <div className="team-card__avatar team-card__avatar--slate">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <span className="team-card__role">{member.role}</span>
                    <span className="team-card__affiliation">{member.affiliation}</span>
                  </div>
                </div>
                <p className="team-card__bio">{member.bio}</p>
                <div className="team-card__tags">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="team-card__tag">{spec}</span>
                  ))}
                </div>
                <div className="team-card__footer">
                  <a href={`mailto:${member.email}`} className="team-card__link">
                    <Mail size={14} />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bioinformática e Sistemas */}
        <section className="team-page__section">
          <div className="team-page__section-header">
            <ShieldCheck size={22} />
            <h2>Bioinformática & Curadoria de Dados</h2>
          </div>
          <div className="team-page__grid">
            {developers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card__header">
                  <div className="team-card__avatar team-card__avatar--slate">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <span className="team-card__role">{member.role}</span>
                    <span className="team-card__affiliation">{member.affiliation}</span>
                  </div>
                </div>
                <p className="team-card__bio">{member.bio}</p>
                <div className="team-card__tags">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="team-card__tag">{spec}</span>
                  ))}
                </div>
                <div className="team-card__footer">
                  <a href={`mailto:${member.email}`} className="team-card__link">
                    <Mail size={14} />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborators */}
        <section className="team-page__section">
          <div className="team-page__section-header">
            <BookOpen size={22} />
            <h2>Colaboradores Institucionais</h2>
          </div>
          <div className="team-page__grid">
            {collaborators.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card__header">
                  <div className="team-card__avatar team-card__avatar--slate">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <span className="team-card__role">{member.role}</span>
                    <span className="team-card__affiliation">{member.affiliation}</span>
                  </div>
                </div>
                <p className="team-card__bio">{member.bio}</p>
                <div className="team-card__tags">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="team-card__tag">{spec}</span>
                  ))}
                </div>
                <div className="team-card__footer">
                  <a href={`mailto:${member.email}`} className="team-card__link">
                    <Mail size={14} />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
