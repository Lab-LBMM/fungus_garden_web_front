import './AboutSection.css';

interface Props {
  onViewAll: () => void;
}

const AboutSection = ({ onViewAll }: Props) => {
  return (
    <section className="about">
      <div className="about__inner">
        <div className="about__image-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/EscherichiaColi_NIAID.jpg/800px-EscherichiaColi_NIAID.jpg"
            alt="Escherichia coli"
            className="about__image"
          />
        </div>
        <div className="about__content">
          <span className="about__label">SOBRE A PLATAFORMA</span>
          <h2 className="about__title">Sobre a Plataforma</h2>
          <p className="about__text">
            O MicroBioBase é uma plataforma colaborativa e aberta que centraliza informações
            taxonômicas e genômicas de fungos e bactérias, facilitando o acesso de pesquisadores e
            estudantes a dados científicos de qualidade.
          </p>
          <p className="about__highlight">
            Organismo em destaque: <strong><em>Escherichia coli</em></strong> — Bactéria Gram-negativa
            em forma de bastonete, anaeróbia facultativa, amplamente encontrada no trato intestinal
            de animais de sangue quente. É um dos...
          </p>
          <button className="about__btn" onClick={onViewAll}>Ver Todos os Organismos</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
