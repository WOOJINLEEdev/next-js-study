import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "hooks/useTheme";
import { light } from "styles/theme";

interface HeaderProps {
  scrollStatus: boolean;
  cafeTitle: string;
}

const Header = ({ scrollStatus, cafeTitle }: HeaderProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    scrollStatus && setTitle(cafeTitle);

    !scrollStatus && setTitle("");

    router.pathname !== "/" && setTitle(cafeTitle);
    router.pathname !== "/" ? setShowDivider(true) : setShowDivider(false);
  }, [scrollStatus, router.pathname]);

  const [themeMode, handleChangeTheme] = useTheme();

  return (
    <Container showDivider={showDivider}>
      <Link href="/">
        <a className="home_link">cafe</a>
      </Link>

      <Title>{title}</Title>

      <BtnWrapper>
        <ModeBtn type="button" onClick={handleChangeTheme}>
          {themeMode === light ? <MdOutlineLightMode /> : <MdDarkMode />}
        </ModeBtn>
        <SearchBtn role="button">
          <GoSearch />
          <span className="visually_hidden">검색 버튼</span>
        </SearchBtn>
        <MenuBtn role="button">
          <HiMenu />
          <span className="visually_hidden">메뉴 버튼</span>
        </MenuBtn>
      </BtnWrapper>
    </Container>
  );
};

export default Header;

interface ContainerProps {
  showDivider: boolean;
}

const Container = styled.header<ContainerProps>`
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  top: 0;
  text-align: center;
  line-height: 51px;
  background: #fff;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  z-index: 10;
  border-bottom: ${(props) => (props.showDivider ? "1px solid #e6e6e6" : "0")};

  & .home_link {
    min-width: 79px;
  }
`;

const Title = styled.h1`
  min-width: calc(100% - 238.05px);
  height: 100%;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ModeBtnProps {
  onClick?: any;
}

const ModeBtn = styled.button<ModeBtnProps>`
  min-width: 75.06px;
  height: 100%;
  color: ${(props) => props.theme.colors.titleColor};

  & svg {
    width: 16px;
    height: 16px;
  }
`;

const SearchBtn = styled.div`
  width: 38px;
  height: 100%;
`;

const MenuBtn = styled.div`
  width: 46px;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
`;
