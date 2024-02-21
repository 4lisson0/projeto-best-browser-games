import { useLocation } from 'react-router-dom';
import './header-styles.css';
import { Button, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import theme from '../Styles/style-app'

const AppHeader = () => {
  const { pathname } = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="body" theme={theme}>
      <div className="logo">
        <img src="public/3899246.png" alt="Logo" width="10px" />
        <Heading color="black">Best Browser Games</Heading>
      </div>
      <nav>
        <ul>
          {token ? (
            <li>
              <Button background="#bdeb07" onClick={handleLogout}>
                <a href="/">Logout</a>
              </Button>
            </li>
          ) : (
            <li>
              <Button background="#bdeb07">
                <a href="/login">Login</a>
              </Button>
            </li>
          )}
          {!token && (
            <li>
              <Button background="#bdeb07">
                <a href="/cadastro">Cadastrar</a>
              </Button>
            </li>
          )}
          <li>
            <Button background="#bdeb07">
              <a href="/">Lista de Jogos</a>
            </Button>
          </li>
          <li>
            <Button background="#bdeb07">
              <a href="/register">Registrar Novo Jogo</a>
            </Button>
          </li>
          {token && (
            <li>
              <Button background="#bdeb07">
                <a href="/account">Minha Conta</a>
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
