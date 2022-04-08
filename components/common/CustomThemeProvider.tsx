import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTheme } from "hooks/useTheme";
import { MenuWrapProps } from "components/common/Menu";
import { menuClickStatus } from "components/common/Header";

const CustomThemeProvider: React.FC = ({ children }) => {
  const [themeMode] = useTheme();

  const show = useRecoilValue(menuClickStatus);
  const setMenuStatus = useSetRecoilState(menuClickStatus);

  const handleDimmedClick = () => {
    setMenuStatus(false);
  };

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <DimmedLayer show={show} onClick={handleDimmedClick} />
        {children}
      </>
    </ThemeProvider>
  );
};

export default CustomThemeProvider;

const DimmedLayer = styled.div<MenuWrapProps>`
  position: fixed;
  display: ${(props) => (props.show === true ? "flex" : "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.colors.dimmedColor};
`;
