import { organisms } from '../data/organisms';
import OrganismCard from './OrganismCard';
import './FeaturedOrganisms.css';

interface Props {
  onViewAll: () => void;
  onViewDetail: (id: number) => void;
}

const FeaturedOrganisms = ({ onViewAll, onViewDetail }: Props) => {
  return (
    <section className="featured" id="organismos">
      <div className="featured__inner">
        <div className="featured__header">
          <div>
            <h2 className="featured__title">Organismos em Destaque</h2>
            <p className="featured__sub">Conheça alguns dos microorganismos mais estudados da ciência</p>
          </div>
          <button className="featured__view-all" onClick={onViewAll}>Ver Todos os Organismos →</button>
        </div>

        <div className="featured__grid">
          {organisms.slice(0, 8).map((org) => (
            <OrganismCard key={org.id} organism={org} onViewDetail={onViewDetail} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrganisms;