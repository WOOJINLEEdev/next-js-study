import styled, { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { useEffect, useState, ReactNode } from "react";

import { useTheme } from "hooks/useTheme";

import { menuClickState } from "state/menu";

interface ICustomThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider = ({ children }: ICustomThemeProviderProps) => {
  const themeMode = useTheme();

  const [mounted, setMounted] = useState(false);

  const [show, setShow] = useRecoilState(menuClickState);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDimmedLayerClick = () => {
    setShow(false);
  };

  const provider = (
    <ThemeProvider theme={themeMode}>
      <DimmedLayer show={show} onClick={handleDimmedLayerClick} />
      {children}
    </ThemeProvider>
  );

  if (!mounted) return <div style={{ visibility: "hidden" }}>{provider}</div>;

  return provider;
};

export default CustomThemeProvider;

interface IDimmedLayerProps {
  show: boolean;
}

const DimmedLayer = styled.div<IDimmedLayerProps>`
  z-index: ${(props) => props.theme.zIndices[3]};
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.show === true ? "flex" : "none")};
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.dimmedColor};
`;
