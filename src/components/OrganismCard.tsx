import type { Organism } from '../types';
import './OrganismCard.css';

interface Props {
  organism: Organism;
  onViewDetail?: (id: number) => void;
  onClick?: () => void;
}

const OrganismCard = ({ organism, onViewDetail, onClick }: Props) => {
  return (
    <article
      className="organism-card"
      onClick={() => {
        if (onClick) onClick();
        else if (onViewDetail) onViewDetail(organism.id);
      }}
      style={{ cursor: onClick || onViewDetail ? 'pointer' : 'default' }}
    >
      <div
        className="organism-card__img-wrap"
        style={{ background: organism.color || '#e8f5ee' }}
      >
        <span className={`organism-card__badge organism-card__badge--${organism.type.toLowerCase()}`}>
          {organism.type}
        </span>
        {organism.imageUrl ? (
          <img
            src={organism.imageUrl}
            alt={organism.name}
            className="organism-card__img"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
          />
        ) : (
          <div className="organism-card__placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
              <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" strokeDasharray="2 3"/>
            </svg>
          </div>
        )}
      </div>

      <div className="organism-card__body">
        <h3 className="organism-card__name">{organism.name}</h3>
        <p className="organism-card__common">{organism.commonName}</p>

        <div className="organism-card__tags">
          {organism.tags.slice(0, 3).map((tag, i) => (
            <span className="organism-card__tag" key={i}>{tag}</span>
          ))}
        </div>

        <div className="organism-card__footer">
          <span className="organism-card__taxonomy">{organism.taxonomy}</span>
          <span className="organism-card__detail-btn">Ver Detalhes →</span>
        </div>
      </div>
    </article>
  );
};

export default OrganismCard;