import { useRouter } from "next/router";
import { ReactElement } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import SearchForm from "components/search/SearchForm";
import Footer from "components/common/Footer";

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

        <SearchForm />
      </SearchBar>

      <SearchKeyWord>
        <p>검색어를 입력하세요</p>
      </SearchKeyWord>
    </>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

const SearchBar = styled.div`
  z-index: ${(props) => props.theme.zIndices[3]};
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  padding: 0 10px;
  background-color: rgb(136, 136, 136);

  .search_btn_prev {
    svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: #efefef;
    }
  }
`;

const SearchKeyWord = styled.div`
  height: calc(100vh - 191px);
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  text-align: center;

  p {
    line-height: calc(100vh - 191px);
  }
`;
