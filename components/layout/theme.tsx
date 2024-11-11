import * as React from "react";
import GlobalData from "../../content/global/index.json";

const ThemeContext = React.createContext(GlobalData.theme);

export const useTheme = () => React.useContext(ThemeContext);

const updateRenderColorMode = () => {
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  }
};

export const Theme = ({ data, children }) => {
  const { color = "black", font = "Bodoni MT" } = data;

  React.useEffect(() => {
    updateRenderColorMode();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        color,
        font,
        darkMode: "light", // Ensures context always returns "light"
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};