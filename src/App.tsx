import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import { Header, Footer } from './components';
import {
  HomePage,
  SearchPage,
  DetailPage,
  TeamPage,
  DataSourcesPage,
  ContactPage,
} from './pages';

/**
 * Componente principal da aplicacao.
 * Gerencia o roteamento global e a barra de navegacao padrao.
 */
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determina a chave da pagina ativa com base na rota atual
  const getPageKey = (path: string) => {
    if (path === '/') return 'home';
    if (path.startsWith('/buscar') || path.startsWith('/organismo')) return 'buscar';
    if (path.startsWith('/time')) return 'time';
    if (path.startsWith('/fontes')) return 'fontes';
    if (path.startsWith('/contato')) return 'contato';
    return 'home';
  };

  const currentPage = getPageKey(location.pathname);

  // Manipulador centralizado para mudancas de rota na aplicacao
  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'buscar':
        navigate('/buscar');
        break;
      case 'time':
        navigate('/time');
        break;
      case 'fontes':
        navigate('/fontes');
        break;
      case 'contato':
        navigate('/contato');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/buscar"        element={<SearchPage onViewDetail={(id) => navigate(`/organismo/${id}`)} />} />
          <Route path="/organismo/:id" element={<DetailPage />} />
          <Route path="/time"          element={<TeamPage />} />
          <Route path="/fontes"        element={<DataSourcesPage />} />
          <Route path="/contato"       element={<ContactPage />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}

export default App;