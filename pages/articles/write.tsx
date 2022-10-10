import dynamic from "next/dynamic";
import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import styled from "styled-components";

const WysiwigEditor = dynamic(
  () => import("components/articles/WysiwigEditor"),
  { loading: () => <p>The Editor is loading...</p>, ssr: false },
);

const Write: React.FC = () => {
  const [articleTitle, setArticleTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.currentTarget.value);
  }, []);

  const handleEditorChange = useCallback((value: string) => {
    console.log("handleEditorChange value ", value);
  }, []);

  return (
    <Container>
      <div className="article_wrap">
        <div className="article_btn_wrap">
          <button type="button" className="article_btn_register">
            등록
          </button>
        </div>
        <label htmlFor="articleTitle" className="visually_hidden">
          제목
        </label>

        <input
          type="text"
          id="articleTitle"
          className="article_title"
          placeholder="제목"
          value={articleTitle}
          onChange={handleTitleChange}
          ref={inputRef}
        />
        <WysiwigEditor valueType="html" onChange={handleEditorChange} />
      </div>
    </Container>
  );
};

export default Write;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  .article_wrap {
    max-width: 960px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px;
  }

  .article_btn_wrap {
    text-align: right;
  }

  .article_title {
    width: 100%;
    min-height: 20px;
    padding: 10px 15px;
    color: ${(props) => props.theme.colors.editorTitleColor};
    background: ${(props) => props.theme.colors.editorBgColor};
    border: ${(props) => props.theme.colors.borderColor};
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .toastui-editor-contents {
    padding: 18px 20px;
  }

  .article_btn_register {
    padding: 10px 20px;
    font-weight: bold;
    background-color: #efefef;
    color: #008000;
    outline: none;
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;
