import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

import { useTheme } from "hooks/useTheme";

import { IMenuWrap } from "components/common/Menu";
import { menuClickState } from "components/common/Header";

const CustomThemeProvider: React.FC = ({ children }) => {
  const themeMode = useTheme();

  const [mounted, setMounted] = useState(false);

  const show = useRecoilValue(menuClickState);
  const setMenuState = useSetRecoilState(menuClickState);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDimmedLayerClick = () => {
    setMenuState(false);
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

const DimmedLayer = styled.div<IMenuWrap>`
  z-index: ${(props) => props.theme.zIndices[3]};
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.show === true ? "flex" : "none")};
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.dimmedColor};
`;
