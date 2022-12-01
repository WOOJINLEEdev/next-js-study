import { ChangeEvent, FormEvent, useRef } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { v1 } from "uuid";

import { IPostItem } from "types";

export const searchResultState = atom<IPostItem[]>({
  key: `searchResultState/${v1()}`,
  default: [],
});

export const searchKeywordState = atom({
  key: `searchKeywordState/${v1()}`,
  default: "",
});

const SearchForm = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  const setSearchResult = useSetRecoilState(searchResultState);

  const handleSearchKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value.toLowerCase());
  };

  const handleRemoveBtnClick = () => {
    setSearchKeyword("");
    searchRef?.current?.focus();
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchKeyword.trim().length === 0) {
      return false;
    }

    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setSearchResult(
        res.data.filter((data: IPostItem) =>
          data.title.includes(searchKeyword),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="search_form" onSubmit={handleFormSubmit}>
      <div className="search_icon">
        <GoSearch />
      </div>

      <label htmlFor="searchKeyword" className="visually_hidden">
        검색 입력창
      </label>
      <input
        type="text"
        placeholder="검색어 입력"
        id="searchKeyword"
        value={searchKeyword}
        onChange={handleSearchKeywordChange}
        ref={searchRef}
      />

      {searchKeyword.trim().length > 0 ? (
        <RemoveBtn
          type="button"
          onClick={handleRemoveBtnClick}
          aria-label="검색어 삭제"
        >
          <IoIosCloseCircle />
        </RemoveBtn>
      ) : (
        ""
      )}
    </Form>
  );
};

export default SearchForm;

const Form = styled.form`
  display: flex;
  width: calc(100% - 21px);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 6px 0;

  input,
  input::placeholder {
    width: 80%;
    color: #efefef;
  }

  .search_icon {
    width: 20%;
    max-width: 40px;
    text-align: center;

    svg {
      width: 17px;
      height: 17px;
      margin: 11px 0;
      color: #efefef;
    }
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  right: 15px;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 19px;
    height: 19px;
    color: #efefef;
  }
`;
