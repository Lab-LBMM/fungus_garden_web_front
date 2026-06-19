import { morphologyCategories } from '../data/organisms';
import './MorphologyFilter.css';

const MorphologyFilter = () => {
  return (
    <section className="morphology">
      <div className="morphology__inner">
        <div className="morphology__header">
          <h2 className="morphology__title">Filtre por Morfologia</h2>
          <p className="morphology__sub">Explore organismos por suas características morfológicas</p>
        </div>

        <div className="morphology__grid">
          {morphologyCategories.map((cat, i) => (
            <button className="morphology__card" key={i}>
              <div className="morphology__card-img-wrap">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="morphology__card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="morphology__card-overlay" />
              </div>
              <div className="morphology__card-info">
                <span className="morphology__card-name">{cat.name}</span>
                <span className="morphology__card-count">{cat.count} organismo{cat.count !== 1 ? 's' : ''}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MorphologyFilter;
