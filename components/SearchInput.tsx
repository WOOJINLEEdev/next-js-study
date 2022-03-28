import { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";

const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("search:", searchInput);
    }
  };

  const handleRemoveBtn = () => {
    setSearchInput("");
    searchInputRef?.current?.focus();
  };

  return (
    <SearchWrap className="search_input_wrap">
      <div className="search_icon">
        <GoSearch />
      </div>

      <label htmlFor="searchInputText" className="visually_hidden">
        검색 입력창
      </label>
      <input
        type="text"
        placeholder="검색어 입력"
        id="searchInputText"
        value={searchInput}
        onChange={handleChange}
        onKeyPress={onSearchEnter}
        ref={searchInputRef}
      />
      {searchInput.trim().length > 0 ? (
        <RemoveBtn role="button" onClick={handleRemoveBtn}>
          <IoIosCloseCircle />
          <span className="visually_hidden">검색 입력 삭제</span>
        </RemoveBtn>
      ) : (
        ""
      )}
    </SearchWrap>
  );
};

export default SearchInput;

const SearchWrap = styled.div`
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
  display: absolute;
  right: 0;
  padding: 10px;
  cursor: pointer;

  & svg {
    width: 19px;
    height: 19px;
    color: #efefef;
  }
`;
