import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SearchInput from "components/SearchInput";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();

  const handlePrevBtnClick = () => {
    router.back();
  };

  return (
    <>
      <SearchBar className="search_bar">
        <a
          role="button"
          className="search_btn_prev"
          onClick={handlePrevBtnClick}
        >
          <MdOutlineKeyboardArrowLeft />
          <span className="visually_hidden">이전 페이지로 돌아가기</span>
        </a>

        <SearchInput />
      </SearchBar>

      <SearchKeyWord>
        <p>검색어를 입력하세요</p>
      </SearchKeyWord>
    </>
  );
};

export default Search;

const SearchBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  height: 51px;
  padding: 0 10px;
  background-color: rgb(136, 136, 136);
  z-index: 100;

  & .search_btn_prev {
    & svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: #efefef;
    }
  }
`;

const SearchKeyWord = styled.div`
  text-align: center;
  height: calc(100vh - 191px);
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & p {
    line-height: calc(100vh - 191px);
  }
`;
