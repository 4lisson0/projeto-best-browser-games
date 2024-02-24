import './footer-styles.css';
import packageJson from "../../../package.json"

const AppFooter = () => {
  return (
    <>
      <footer>
        <p>Best Browser Games</p>
        <pre>{`v${packageJson.version}`}</pre>
      </footer>
    </>
  )
};

export default AppFooter;
