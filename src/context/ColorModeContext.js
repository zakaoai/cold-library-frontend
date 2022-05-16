import React, { createContext, useContext, useMemo, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material";

const ColorModeContext = createContext(null);

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");
  console.log("🚀 ~ file: ColorModeContext.js ~ line 9 ~ ColorModeProvider ~ colorMode", colorMode);

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
