import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleRemoveBtnClick = () => {
    setSearchText("");
    searchRef?.current?.focus();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText.trim().length === 0) {
      return false;
    }

    console.log("searchText:", searchText);
  };

  return (
    <Form className="search_form" onSubmit={handleFormSubmit}>
      <div className="search_icon">
        <GoSearch />
      </div>

      <label htmlFor="searchText" className="visually_hidden">
        검색 입력창
      </label>
      <input
        type="text"
        placeholder="검색어 입력"
        id="searchText"
        value={searchText}
        onChange={handleSearchTextChange}
        ref={searchRef}
      />

      {searchText.trim().length > 0 ? (
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

  & input,
  input::placeholder {
    width: 80%;
    color: #efefef;
  }

  & .search_icon {
    width: 20%;
    max-width: 40px;
    text-align: center;

    & svg {
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

  & svg {
    width: 19px;
    height: 19px;
    color: #efefef;
  }
`;
