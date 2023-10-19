import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

const defaultColorModeContext = { colorMode: "light", toggleColorMode: () => {} };
const ColorModeContext = createContext(defaultColorModeContext);

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const defaultColorMode = useMemo<PaletteMode>(() => (prefersLightMode ? "light" : "dark"), [prefersLightMode]);

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
