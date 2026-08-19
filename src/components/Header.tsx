import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const nav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fecha o menu ao redimensionar a tela para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha o menu com tecla Escape e clique fora
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner">
        <button
          className="header__logo"
          onClick={() => nav('home')}
          aria-label="Página Inicial - Ômicas de Jardins de Fungos de Formigas"
        >
          <div className="header__logo-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="4" fill="white" opacity="0.9" />
              <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <circle cx="11" cy="11" r="10.5" stroke="white" strokeWidth="1" opacity="0.25" />
              <circle cx="6.5" cy="5.5" r="1.5" fill="white" opacity="0.7" />
              <circle cx="16.5" cy="14" r="1" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span className="header__logo-text">
            Ômicas de Jardins de Fungos de Formigas
          </span>
        </button>

        {/* Navegação Desktop */}
        <nav className="header__nav" aria-label="Navegação principal">
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
            className={`header__nav-link ${currentPage === 'comparar' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('comparar')}
          >
            Comparar Runs
          </button>
          <button
            className={`header__nav-link ${currentPage === 'sequenciamento' ? 'header__nav-link--active' : ''}`}
            onClick={() => nav('sequenciamento')}
          >
            Sequenciamento
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

        {/* Botão Hambúrguer Mobile / Tablet */}
        <button
          className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={mobileOpen}
          aria-controls="header-mobile-menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile / Dropdown */}
      {mobileOpen && (
        <>
          <div
            className="header__backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="header-mobile-menu"
            className="header__mobile-menu"
            aria-label="Navegação mobile"
          >
            <div className="header__mobile-links">
              <button
                className={`header__mobile-link ${currentPage === 'home' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('home')}
              >
                <span>Início</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'buscar' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('buscar')}
              >
                <span>Buscar</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'comparar' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('comparar')}
              >
                <span>Comparar Runs (Heatmap)</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'sequenciamento' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('sequenciamento')}
              >
                <span>Sequenciamento</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'time' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('time')}
              >
                <span>Equipe</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'fontes' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('fontes')}
              >
                <span>Fonte de Dados</span>
              </button>
              <button
                className={`header__mobile-link ${currentPage === 'contato' ? 'header__mobile-link--active' : ''}`}
                onClick={() => nav('contato')}
              >
                <span>Contato</span>
              </button>
              <button
                className="header__mobile-link header__mobile-link--btn"
                onClick={() => nav('buscar')}
              >
                Ver Todos os Organismos
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
