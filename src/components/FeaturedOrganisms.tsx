import { useMemo } from 'react';
import { organisms } from '../data/organisms';
import OrganismCard from './OrganismCard';
import './FeaturedOrganisms.css';

interface Props {
  onViewAll: () => void;
  onViewDetail: (id: number) => void;
}

/**
 * Componente que exibe os organismos de maior relevancia simbiotica com formigas atineas.
 * Filtra bacterias e fungos diretamente associados as especies de formigas catalogadas.
 */
const FeaturedOrganisms = ({ onViewAll, onViewDetail }: Props) => {
  // Coleta nomes de bacterias e fungos associados a partir das especies de formiga
  const antSymbiontNames = useMemo(() => {
    const names = new Set<string>();
    organisms
      .filter((o) => o.type === 'Formiga')
      .forEach((ant) => {
        if (ant.associatedBacteria) {
          ant.associatedBacteria.forEach((b) => names.add(b.toLowerCase()));
        }
        if (ant.associatedFungi) {
          ant.associatedFungi.forEach((f) => names.add(f.toLowerCase()));
        }
      });
    return names;
  }, []);

  // Seleciona as formigas e os microorganismos simbiontes mais relevantes
  const featuredList = useMemo(() => {
    return organisms.filter((org) => {
      // Inclui todas as especies de formiga
      if (org.type === 'Formiga') return true;

      // Inclui bacterias ou fungos que correspondem aos nomes associados
      const orgName = org.name.toLowerCase();
      const commonName = org.commonName.toLowerCase();
      return Array.from(antSymbiontNames).some(
        (symName) => orgName.includes(symName) || symName.includes(orgName) || commonName.includes(symName)
      );
    });
  }, [antSymbiontNames]);

  return (
    <section className="featured" id="organismos">
      <div className="featured__inner">
        <div className="featured__header">
          <div>
            <h2 className="featured__title">Simbiontes Relacionados às Formigas</h2>
            <p className="featured__sub">
              Bactérias, fungos e formigas atíneas com interações ecológicas e simbióticas catalogadas no LBMM DB
            </p>
          </div>
          <button className="featured__view-all" onClick={onViewAll}>
            Ver Todos os Organismos →
          </button>
        </div>

        <div className="featured__grid">
          {featuredList.map((org) => (
            <OrganismCard key={org.id} organism={org} onViewDetail={onViewDetail} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrganisms;