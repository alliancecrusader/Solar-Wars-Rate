import { useState, useEffect } from "react";
import Rater from "./Rater";
import MainMenu from "./MainMenu";
import { raters, RaterItem } from "../raters/raters";

const App = () => {
  const [currentRater, setCurrentRater] = useState(null);
  const [theme, setTheme] = useState("light-mode");

  useEffect(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleSelectRater = (rater: any) => {
    setCurrentRater(rater);
  };

  const handleGoBack = () => {
    setCurrentRater(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-mode" ? "dark-mode" : "light-mode"
    );
  };

  return (
    <div className={theme}>
      {currentRater === null ? (
        <MainMenu onSelectRater={handleSelectRater} toggleTheme={toggleTheme} />
      ) : (
        (() => {
          const rater = (raters[currentRater] as RaterItem) || undefined;

          if (rater === undefined) {
            setCurrentRater(null);
            throw Error("Unknown current rater");
          }

          return (
            <Rater
              rate_name={rater.label as string}
              params={rater.rater.params}
              computeCost={rater.rater.rate}
              goBack={handleGoBack}
            ></Rater>
          );
        })()
      )}
    </div>
  );
};

export default App;
