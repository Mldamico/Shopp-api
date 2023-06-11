import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";

import { Outlet } from "react-router-dom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useLocalStorageState(true, "darkmode");
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
