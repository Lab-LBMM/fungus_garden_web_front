import { useNavigate } from 'react-router-dom';
import { morphologyCategories, organisms } from '../data/organisms';
import './MorphologyFilter.css';

const getMatchingOrganisms = (catName: string) => {
  const nameLower = catName.toLowerCase().trim();
  return organisms.filter((o) => {
    const m = o.morphology.toLowerCase().trim();
    if (nameLower.includes('bastonete')) return m.includes('bastonete');
    if (nameLower.includes('coco')) return m.includes('coco');
    if (nameLower.includes('filamentoso')) return m.includes('filament');
    if (nameLower.includes('leveduri')) return m.includes('leveduri');
    if (nameLower.includes('dimór') || nameLower.includes('dimor')) return m.includes('dimór') || m.includes('dimor');
    if (nameLower.includes('cogumelo')) return m.includes('cogumelo');
    if (nameLower.includes('cortadeira')) return m.includes('cortadeira');
    return m.includes(nameLower) || nameLower.includes(m);
  });
};

const MorphologyFilter = () => {
  const navigate = useNavigate();

  const handleCardClick = (catName: string) => {
    navigate(`/buscar?morfologia=${encodeURIComponent(catName.trim())}`);
  };

  return (
    <section className="morphology">
      <div className="morphology__inner">
        <div className="morphology__header">
          <h2 className="morphology__title">Filtre por Morfologia</h2>
          <p className="morphology__sub">
            Explore organismos por suas características morfológicas
          </p>
        </div>

        <div className="morphology__grid">
          {morphologyCategories.map((cat, i) => {
            const matchingOrgs = getMatchingOrganisms(cat.name);
            const count = matchingOrgs.length;

            return (
              <button
                className="morphology__card"
                key={i}
                onClick={() => handleCardClick(cat.name)}
              >
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
                  <span className="morphology__card-count">
                    {count} organismo{count !== 1 ? 's' : ''}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MorphologyFilter;
