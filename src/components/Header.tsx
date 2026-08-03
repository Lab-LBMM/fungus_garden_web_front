import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__inner">
        <button className="header__logo" onClick={() => nav('home')}>
          <div className="header__logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="4" fill="white" opacity="0.9" />
              <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <circle cx="11" cy="11" r="10.5" stroke="white" strokeWidth="1" opacity="0.25" />
              <circle cx="6.5" cy="5.5" r="1.5" fill="white" opacity="0.7" />
              <circle cx="16.5" cy="14" r="1" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span>Ômicas de Jardins de Fungos de Formigas</span>
        </button>

        <nav className="header__nav">
          <button
            className={`header__nav-link ${currentPage === 'home' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('home')}
          >
            Início
          </button>
          <button
            className={`header__nav-link ${currentPage === 'buscar' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('buscar')}
          >
            Buscar
          </button>
          <button
            className={`header__nav-link ${currentPage === 'time' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('time')}
          >
            Equipe
          </button>
          <button
            className={`header__nav-link ${currentPage === 'fontes' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('fontes')}
          >
            Fonte de Dados
          </button>
          <button
            className={`header__nav-link ${currentPage === 'contato' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('contato')}
          >
            Contato
          </button>
          <button className="header__nav-btn" onClick={() => nav('buscar')}>
            Ver Todos os Organismos
          </button>
        </nav>

        <button
          className="header__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="header__mobile-menu">
          <button className="header__mobile-link" onClick={() => nav('home')}>Início</button>
          <button className="header__mobile-link" onClick={() => nav('buscar')}>Buscar</button>
          <button className="header__mobile-link" onClick={() => nav('time')}>Equipe</button>
          <button className="header__mobile-link" onClick={() => nav('fontes')}>Fonte de Dados</button>
          <button className="header__mobile-link" onClick={() => nav('contato')}>Contato</button>
          <button className="header__mobile-link header__mobile-link--btn" onClick={() => nav('buscar')}>
            Ver Todos os Organismos
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
