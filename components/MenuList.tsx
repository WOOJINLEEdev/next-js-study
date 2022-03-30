import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MenuList = () => {
  const [listClassName, setListClassName] = useState("menu_main_list");

  const handleClick = () => {
    setListClassName("hide");

    listClassName === "hide" && setListClassName("menu_main_list");
  };

  return (
    <MenuMain className="menu_main">
      <nav aria-labelledby="allBoard">
        <div>
          <h2 className="menu_main_title" id="allBoard" onClick={handleClick}>
            <span>전체 게시판</span>
            <button type="button">
              {listClassName === "menu_main_list" ? (
                <>
                  <IoIosArrowUp />
                  <span className="visually_hidden">펼치기</span>
                </>
              ) : (
                <>
                  <IoIosArrowDown />
                  <span className="visually_hidden">펼치기</span>
                </>
              )}
            </button>
          </h2>
        </div>

        <ul className={listClassName}>
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
  );
};

export default MenuList;

const MenuMain = styled.div`
  padding: 20px;
  color: ${(props) => props.theme.colors.titleColor};

  & .menu_main_title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    & svg {
      color: ${(props) => props.theme.colors.titleColor};
    }
  }

  & .menu_main_list {
    max-height: 288px;
    overflow: hidden;
    transition: max-height 0.2s ease-in-out;

    & li {
      padding: 10px 0;
    }
  }

  & .hide {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in-out;

    & li {
      padding: 10px 0;
    }
  }
`;
