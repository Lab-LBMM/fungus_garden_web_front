import './Footer.css';

interface Props {
  onNavigate: (page: 'home' | 'buscar') => void;
}

const Footer = ({ onNavigate }: Props) => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <button className="footer__logo" onClick={() => onNavigate('home')}>
            <div className="footer__logo-icon">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="4" fill="white" opacity="0.9" />
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <circle cx="11" cy="11" r="10.5" stroke="white" strokeWidth="1" opacity="0.25" />
                <circle cx="6.5" cy="5.5" r="1.5" fill="white" opacity="0.7" />
                <circle cx="16.5" cy="14" r="1" fill="white" opacity="0.6" />
              </svg>
            </div>
            <span>LBMM DB</span>
          </button>
          <p className="footer__tagline">
            Plataforma de consulta científica para a comunidade de microbiologia.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Links Úteis</h4>
            <button onClick={() => onNavigate('home')}>Início</button>
            <button onClick={() => onNavigate('buscar')}>Buscar</button>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Taxonomia</h4>
            <button onClick={() => onNavigate('buscar')}>Bactéria</button>
            <button onClick={() => onNavigate('buscar')}>Fungi</button>
            <button onClick={() => onNavigate('buscar')}>Formiga</button>
            <button onClick={() => onNavigate('buscar')}>Filos</button>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Categorias</h4>
            <button onClick={() => onNavigate('buscar')}>Morfologia</button>
            <button onClick={() => onNavigate('buscar')}>Habitat</button>
            <button onClick={() => onNavigate('buscar')}>Dados Genômicos</button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 LBMM DB. Dados compilados de fontes científicas abertas.</p>
        <div className="footer__bottom-links">
          <button>Termos de Uso</button>
          <button>Privacidade</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
