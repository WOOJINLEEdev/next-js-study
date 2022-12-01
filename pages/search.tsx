import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import SearchForm, { searchResultState } from "components/search/SearchForm";
import Footer from "components/common/Footer";
import List from "components/posts/List";
import ListItem from "components/posts/ListItem";

import { IPostItem } from "types";

const Search = () => {
  const router = useRouter();
  const searchResult = useRecoilValue(searchResultState);

  const handlePrevBtnClick = () => {
    router.back();
  };

  return (
    <>
      <SearchBar className="search_bar">
        <button
          type="button"
          className="search_btn_prev"
          onClick={handlePrevBtnClick}
          aria-label="이전 페이지로 돌아가기"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>

        <SearchForm />
      </SearchBar>

      {searchResult.length > 0 && (
        <SearchResultTitle>
          검색 결과 총
          <span className="search_result_length">{searchResult.length}</span>개
        </SearchResultTitle>
      )}

      <List>
        {searchResult.length > 0 ? (
          searchResult?.map((item: IPostItem) => {
            return (
              <ListItem
                key={`search_result_${item.id}`}
                item={item}
                list={searchResult}
              />
            );
          })
        ) : (
          <NoSearchResult>
            <p>검색 결과가 없습니다.</p>
          </NoSearchResult>
        )}
      </List>
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
    padding: 0;

    svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: #efefef;
    }
  }
`;

const NoSearchResult = styled.div`
  height: calc(100vh - 191px);
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  text-align: center;

  p {
    line-height: calc(100vh - 191px);
  }
`;

const SearchResultTitle = styled.p`
  max-width: 960px;
  padding: 0 12px;
  margin: 20px auto;
  font-size: 16px;

  .search_result_length {
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
  }
`;

const ListGroup = styled.ul`
  max-width: 960px;
  min-height: calc(100vh - 191px);
  padding: 0 16px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
`;
