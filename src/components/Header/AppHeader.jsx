import './header-styles.css';
import {
  Button
} from '@chakra-ui/react'

const AppHeader = () => {
  return (
    <div className="body">
      <div className="logo">
        <img src="public/game_logo.png" alt="Logo" width="10px"/>
      </div>
      <nav>
        <ul>
          <li>
            <Button background='#bdeb07'><a href="/">Lista de Jogos</a></Button>
          </li>
          <li>
            <Button background='#bdeb07'><a href="/register">Registrar Novo Jogo</a></Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
