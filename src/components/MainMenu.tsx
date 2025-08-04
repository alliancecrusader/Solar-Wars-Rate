import { raters } from "../raters/raters";

const MainMenu = ({ onSelectRater, toggleTheme }: any) => (
  <div className="menu-container">
    <h1>Main Menu</h1>
    {Object.entries(raters).map(([id, value]) => (
      <button
        key={id}
        className="menu-button"
        onClick={() => onSelectRater(id)}
      >
        {value.label}
      </button>
    ))}
    <button className="theme-toggle-button" onClick={toggleTheme}>
      Toggle Dark/Light Mode
    </button>
  </div>
);

export default MainMenu;
