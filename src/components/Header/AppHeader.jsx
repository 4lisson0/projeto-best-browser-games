import './header-styles.css';

const AppHeader = () => {
  return (
    <div className="body">
      <div className="logo">
        <img src="/public/game_logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Página 1</a>
          </li>
          <li>
            <a href="#">Página 2</a>
          </li>
          <li>
            <a href="#">Página 3</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
