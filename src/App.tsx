import { useState, useMemo } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import { FaSun, FaMoon } from "react-icons/fa";
import FortuneCard from "./assets/component/fortuneCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          secondary: {
            main: darkMode ? "#f48fb1" : "#1976d2",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ textAlign: "right", padding: 16 }}>
        <IconButton onClick={toggleTheme}>
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </IconButton>
      </div>
      <FortuneCard />
    </ThemeProvider>
  );
}

export default App;
