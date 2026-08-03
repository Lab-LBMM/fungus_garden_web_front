import './Footer.css';

interface Props {
  onNavigate: (page: string) => void;
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
            Plataforma de consulta científica para a comunidade de microbiologia e mirmecologia.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Navegação</h4>
            <button onClick={() => onNavigate('home')}>Início</button>
            <button onClick={() => onNavigate('buscar')}>Buscar Organismos</button>
            <button onClick={() => onNavigate('time')}>Equipe de Pesquisa</button>
            <button onClick={() => onNavigate('fontes')}>Fonte de Dados</button>
            <button onClick={() => onNavigate('contato')}>Contato</button>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Taxonomia</h4>
            <button onClick={() => onNavigate('buscar')}>Bactérias</button>
            <button onClick={() => onNavigate('buscar')}>Fungos</button>
            <button onClick={() => onNavigate('buscar')}>Formigas Atíneas</button>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Institucional</h4>
            <button onClick={() => onNavigate('fontes')}>NCBI GenBank</button>
            <button onClick={() => onNavigate('fontes')}>RefSeq & UniProt</button>
            <button onClick={() => onNavigate('contato')}>UNESP Rio Claro</button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 LBMM DB - Laboratório de Bioquímica e Microbiologia Molecular / UNESP.</p>
        <div className="footer__bottom-links">
          <button onClick={() => onNavigate('fontes')}>Termos de Uso</button>
          <button onClick={() => onNavigate('contato')}>Contato Acadêmico</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
