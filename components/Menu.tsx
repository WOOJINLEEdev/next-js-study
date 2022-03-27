import Link from "next/link";
import styled from "styled-components";
import { MdOutlineLocalCafe } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { VscBellDot } from "react-icons/vsc";
import { BsChatDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Menu = ({ show }: any) => {
  return (
    <MenuWrap className={show ? "" : "menu_hidden"}>
      <MenuHeader className="menu_header">
        <div className="user_area">
          <Link href="/login">
            <a className="user_photo">
              <span className="visually_hidden">사용자 사진</span>
            </a>
          </Link>
          <span>로그인 해주세요.</span>
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
              <Link href="/">
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
                  <span>채팅설정</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </MenuHeader>

      <MenuMain className="menu_main">
        <nav aria-labelledby="allBoard">
          <div>
            <h2 className="menu_main_title" id="allBoard">
              <span>전체 게시판</span>
              <button type="button">
                <IoIosArrowDown />
                <span className="visually_hidden">펼치기</span>
              </button>
            </h2>
          </div>

          <ul className="menu_main_list">
            <li>공지사항</li>
            <li>등업게시판</li>
            <li>게시판1</li>
            <li>게시판2</li>
            <li>게시판3</li>
            <li>게시판4</li>
            <li>게시판5</li>
            <li>게시판6</li>
          </ul>
        </nav>
      </MenuMain>
    </MenuWrap>
  );
};

export default Menu;

const MenuWrap = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 275px;
  max-width: 300px;
  height: 100%;
  z-index: 101;
  transition: transform 0.3s ease;
  background-color: #fff;
  margin: 0;
  top: 0;
  right: 0;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
`;

const MenuHeader = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;

  & .user_area {
    display: flex;
    min-width: 100%;
    line-height: 60px;
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
      color: #323232;
      vertical-align: top;

      & svg {
        width: 28px;
        height: 28px;
        margin: 0 auto;
      }
    }
  }
`;

const MenuMain = styled.div`
  padding: 20px;

  & .menu_main_title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  & .menu_main_list {
    & li {
      padding: 10px 0;
    }
  }
`;
