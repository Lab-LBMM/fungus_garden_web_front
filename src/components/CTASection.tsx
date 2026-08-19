import './CTASection.css';

interface Props {
  onViewAll: () => void;
}

const CTASection = ({ onViewAll }: Props) => {
  return (
    <section className="cta">
      <div className="cta__inner">
        <h2 className="cta__title">Pronto para Explorar?</h2>
        <p className="cta__sub">
          Navegue por nossa base de dados com mais de 16 organismos catalogados,<br className="cta__br" />
          incluindo fungos e bactérias de importância clínica, industrial e ecológica.
        </p>
        <button className="cta__btn" onClick={onViewAll}>Ver Todos os Organismos →</button>
      </div>
    </section>
  );
};

export default CTASection;
