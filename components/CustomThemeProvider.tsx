import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";

const CustomThemeProvider: React.FC = ({ children }) => {
  const [themeMode] = useTheme();

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
