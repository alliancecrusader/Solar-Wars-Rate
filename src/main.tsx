import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Rater from './components/Rater';
import { raters, RaterItem } from './Raters/raters';

const MainMenu = ({ onSelectRater, toggleTheme }: any) => (
  <div className="menu-container">
    <h1>Main Menu</h1>
    {
      Object.entries(raters).map(([id, value]) => (
        <button key={id} className="menu-button" onClick={() => onSelectRater(id)}>
          {value.label}
        </button>
      ))
    }
    <button className="theme-toggle-button" onClick={toggleTheme}>Toggle Dark/Light Mode</button>
  </div>
);

const App = () => {
  const [currentRater, setCurrentRater] = useState(null);
  const [theme, setTheme] = useState('light-mode');

  useEffect(() => {
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleSelectRater = (rater: any) => {
    setCurrentRater(rater);
  };

  const handleGoBack = () => {
    setCurrentRater(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  return (
    <div className={theme}>
      {
        currentRater === null ? <MainMenu onSelectRater={handleSelectRater} toggleTheme={toggleTheme} /> :
        (
          () => {
            const rater = raters[currentRater] as RaterItem || undefined;

            if (rater === undefined) {
              setCurrentRater(null);
              throw Error("Unknown current rater");
            }

            return (
              <Rater rate_name={rater.label as string} params={rater.rater.params} computeCost={rater.rater.rate} goBack={handleGoBack}></Rater>
            )
          }
        )()
      }
    </div>
  );
};

function main() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  document.title = 'Solar Wars Vehicle Rater';
}

main();
