import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";

import { themeStatus, useTheme } from "hooks/useTheme";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { dark, light } from "styles/theme";

interface IHeaderProps {
  scrollStatus: boolean;
  cafeTitle: string;
}

interface IContainer {
  showDivider: boolean;
}

export const menuClickStatus = atom<boolean>({
  key: "menuClickStatus",
  default: false,
});

const Header = ({ scrollStatus, cafeTitle }: IHeaderProps) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [showDivider, setShowDivider] = useState(false);

  const setMenuStatus = useSetRecoilState(menuClickStatus);
  const [theme, setTheme] = useRecoilState(themeStatus);

  const themeMode = useTheme();

  useEffect(() => {
    scrollStatus && setTitle(cafeTitle);

    !scrollStatus && setTitle("");

    router.pathname !== "/" && setTitle(cafeTitle);
    router.pathname !== "/" ? setShowDivider(true) : setShowDivider(false);
  }, [scrollStatus, router.pathname, cafeTitle]);

  const handleMenuClick = () => {
    setMenuStatus(true);
  };

  const handleModeBtnClick = () => {
    const mode = theme === light ? "dark" : "light";
    window.localStorage.setItem("theme", mode);

    return setTheme(mode === "light" ? light : dark);
  };

  return (
    <Container showDivider={showDivider}>
      <Link href="/">
        <a className="home_link">cafe</a>
      </Link>

      <Link href="/" passHref>
        <Title tabIndex={0}>{title}</Title>
      </Link>

      <BtnWrapper>
        <ModeBtn
          type="button"
          onClick={handleModeBtnClick}
          aria-label={themeMode === light ? "라이트 모드" : "다크 모드"}
        >
          {themeMode === light ? <MdOutlineLightMode /> : <MdDarkMode />}
        </ModeBtn>
        <Link href="/search" passHref>
          <SearchBtn role="button">
            <GoSearch />
            <span className="visually_hidden">검색 버튼</span>
          </SearchBtn>
        </Link>
        <MenuBtn
          role="button"
          id="menu_button"
          aria-haspopup="true"
          onClick={handleMenuClick}
          tabIndex={0}
        >
          <HiMenu />
          <span className="visually_hidden">메뉴 버튼</span>
        </MenuBtn>
      </BtnWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.header<IContainer>`
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  top: 0;
  text-align: center;
  line-height: 51px;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  z-index: 99;
  border-bottom: ${(props) => (props.showDivider ? "1px solid #e6e6e6" : "0")};

  & .home_link {
    min-width: 79px;
    user-select: none;
  }
`;

const Title = styled.h1`
  min-width: calc(100% - 238.05px);
  height: 100%;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: pointer;
`;

const ModeBtn = styled.button`
  min-width: 75.06px;
  height: 100%;
  color: ${(props) => props.theme.colors.titleColor};

  & svg {
    width: 19px;
    height: 19px;
    margin: 16px 0;
  }
`;

const SearchBtn = styled.a`
  width: 38px;
  height: 100%;

  & svg {
    width: 16px;
    height: 16px;
    margin: 17.5px 0;
    color: ${(props) => props.theme.colors.titleColor};
  }
`;

const MenuBtn = styled.div`
  width: 46px;
  cursor: pointer;

  & svg {
    width: 19px;
    height: 19px;
    margin: 16px 0;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
`;
