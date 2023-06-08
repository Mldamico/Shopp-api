import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface IHeaderProps {
  darkMode: boolean;
  setDarkMode: () => void;
}
const Header = ({ darkMode, setDarkMode }: IHeaderProps) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">SHOPPY</Typography>
        <Switch checked={darkMode} onChange={setDarkMode}></Switch>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
