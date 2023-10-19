import { ThemeProvider, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createContext, useContext, useMemo, useState } from "react";

const ColorModeContext = createContext(null);

export const ColorModeProvider = ({ children }) => {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const defaultColorMode = useMemo(() => (prefersLightMode ? "light" : "dark"), [prefersLightMode]);

  const [colorMode, setColorMode] = useState(defaultColorMode);

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode
        }
      }),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};
