import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { MdOutlineLocalCafe } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { VscBellDot } from "react-icons/vsc";
import { BsChatDots } from "react-icons/bs";

import { tokenSelector } from "hooks/useAuth";
import MenuList from "components/common/MenuList";
import { menuClickStatus } from "components/common/Header";

export interface IMenuWrap {
  show: boolean;
}

const Menu = () => {
  const router = useRouter();

  const [showStatus, setShowStatus] = useRecoilState(menuClickStatus);
  const token = useRecoilValue(tokenSelector);

  const storage = globalThis?.sessionStorage;

  useEffect(() => {
    storage?.getItem("prevPath") !== router.asPath && setShowStatus(false);
  }, [router.asPath, setShowStatus, storage]);

  function handleClick() {
    setShowStatus(false);
  }

  return (
    <MenuWrap
      className={showStatus ? "menu_wrap" : "menu_hidden"}
      show={showStatus}
    >
      <MenuHeader className="menu_header" onClick={handleClick}>
        <div className="user_area">
          {token ? (
            <>
              <Link href="/myprofile/articles">
                <a className="user_photo">
                  <span className="visually_hidden">사용자 사진</span>
                </a>
              </Link>
              <Link href="/myprofile/articles">
                <a className="user_id">{token}</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="user_photo">
                  <span className="visually_hidden">사용자 사진</span>
                </a>
              </Link>
              <Link href="/login">
                <a>로그인 해주세요.</a>
              </Link>
            </>
          )}
        </div>

        <nav aria-labelledby="buttonList">
          <h2 className="visually_hidden" id="buttonList">
            버튼 리스트
          </h2>
          <ul className="menu_btn_list">
            <li>
              <Link href="/">
                <a className="menu_btn_link">
                  <MdOutlineLocalCafe />
                  <span>내카페</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/articles/write">
                <a className="menu_btn_link">
                  <HiOutlinePencil />
                  <span>글쓰기</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="menu_btn_link">
                  <VscBellDot />
                  <span>알림설정</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="menu_btn_link">
                  <BsChatDots />
                  <span>채팅</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </MenuHeader>

      <MenuList />
    </MenuWrap>
  );
};

export default Menu;

const MenuWrap = styled.aside<IMenuWrap>`
  position: fixed;
  display: ${(props) => props.show && "flex"};
  flex-direction: column;
  width: 80%;
  min-width: 275px;
  max-width: 300px;
  min-height: 100vh;
  top: 0;
  right: 0;
  margin: 0;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
  z-index: 101;
  transform: ${(props) => props.show === false && "translateX(310px)"};
  transition: ${(props) =>
    props.show ? "transform 0.3s ease" : "transform 0.5s ease"};
`;

const MenuHeader = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;

  & .user_area {
    display: flex;
    min-width: 100%;
    line-height: 60px;

    & .user_id {
      width: calc(100% - 50px);
    }
  }

  & .user_photo {
    display: block;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50%;
    background: #efefef;
  }

  & .menu_btn_list {
    display: flex;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;

    & li {
      width: 25%;
      max-width: 65px;
      font-size: 11px;
    }

    & .menu_btn_link {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 48px;
      text-align: center;
      font-size: 11px;
      vertical-align: top;

      & svg {
        width: 28px;
        height: 28px;
        margin: 0 auto;
      }
    }
  }
`;
