import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect, ReactElement, ChangeEvent } from "react";
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axios from "axios";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { v1 } from "uuid";

import { tokenSelector } from "hooks/useAuth";
import { formatDate } from "utils/format-date";

import { cafeTitle, IPostItem } from "pages";
import { IPostProps } from "pages/posts/[id]";
import Footer from "components/common/Footer";

export interface IMyComment {
  postId: number;
  comment: string;
  postTitle: string;
}

const commentsState = atomFamily<string[], number>({
  key: `commentsState/${v1()}`,
  default: (postId) => {
    return [];
  },
});

export const myCommentsState = atom<IMyComment[]>({
  key: `myCommentsState/${v1()}`,
  default: [],
});

export const commentCountSelector = selectorFamily<number, number>({
  key: `commentCountSelector/${v1()}`,
  get:
    (postId: number) =>
    ({ get }) => {
      const comments = get(commentsState(postId));

      return comments.length;
    },
});

const Comments = ({ post }: IPostProps) => {
  const [value, setValue] = useState("");
  const [registerBtnClass, setRegisterBtnClass] = useState("btn_disabled");

  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);

  const now = new Date();
  const yyyymmdd = formatDate(now, "YYYY.MM.DD");
  const hhmm = formatDate(now, "hh:mm");

  useEffect(() => {
    value.trim().length > 0 && setRegisterBtnClass("btn_register");
    value.trim().length === 0 && setRegisterBtnClass("btn_disabled");
  }, [value]);

  const [comments, setComments] = useRecoilState<string[]>(
    commentsState(post.id),
  );
  const setMyComments = useSetRecoilState<IMyComment[]>(myCommentsState);
  const commentsLength = useRecoilValue<number>(commentCountSelector(post.id));
  const token = useRecoilValue<string>(tokenSelector);

  const handlePrevBtnClick = () => {
    router.back();
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleCancelBtnClick = () => {
    setValue("");
    ref?.current?.focus();
  };

  const handleRegisterBtnClick = () => {
    if (value.trim().length === 0) return false;

    if (value.trim().length > 0) {
      setComments((comments: string[]) => [value, ...comments]);
      setMyComments((myComments: IMyComment[]) => [
        { postId: post.id, comment: value, postTitle: post.title },
        ...myComments,
      ]);
    }

    setValue("");
  };

  return (
    <Container>
      <CommentHeader>
        <div className="comment_header_wrap">
          <a
            role="button"
            className="search_btn_prev"
            onClick={handlePrevBtnClick}
            aria-label="?????? ???????????? ????????????"
          >
            <MdOutlineKeyboardArrowLeft />
          </a>
          <div className="title_area">
            <h1>?????? {commentsLength}</h1>
            <h2>{cafeTitle}</h2>
          </div>
        </div>
      </CommentHeader>

      <div className="post_link_wrap">
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
          <a className="post_link">
            <h3 className="post_title">{post.title}</h3>
            <MdOutlineKeyboardArrowRight />
          </a>
        </Link>
      </div>

      <div className="comment_content">
        <div className="comment_textarea_wrap">
          <div className="textarea_header">{value.length} / 300</div>
          <textarea
            className="comment_textarea"
            placeholder="????????? ???????????????."
            maxLength={300}
            value={value}
            onChange={handleCommentChange}
            ref={ref}
          />
          <div className="textarea_footer">
            <button
              type="button"
              className="btn_cancel"
              onClick={handleCancelBtnClick}
            >
              ??????
            </button>
            <button
              type="button"
              className={registerBtnClass}
              onClick={handleRegisterBtnClick}
              disabled={registerBtnClass === "btn_disabled" ? true : false}
            >
              ??????
            </button>
          </div>
        </div>

        {comments?.length > 0 ? (
          <CommentItemWrap>
            {comments.map((comment: string) => (
              <CommentItem key={comment}>
                <div className="comment_header">
                  <Link href="#">
                    <a className="user_link">
                      <span className="user_image"></span>
                      <span className="user_nick">
                        {token ? `${token}` : "-"}
                      </span>
                    </a>
                  </Link>
                </div>
                <p className="comment_text">{comment}</p>
                <div className="comment_footer">
                  <span>{yyyymmdd}</span>
                  <span>{hhmm}</span>
                </div>
              </CommentItem>
            ))}
          </CommentItemWrap>
        ) : (
          <NoData>
            <div className="no_comment">
              <FaRegCommentDots />
              <p>????????? ????????? ????????????.</p>
            </div>
          </NoData>
        )}
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const data = res.data;

  const paths = data.map((item: IPostItem) => ({
    params: { id: String(item.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`,
  );
  const data = res.data;

  return { props: { post: data } };
}

export default Comments;

Comments.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & .post_link_wrap {
    border-bottom: 10px solid #eee;
    padding: 0 15px;
  }

  & .post_link {
    display: flex;
    height: 45px;
    line-height: 45px;

    & svg {
      width: 21px;
      height: 21px;
      margin: 12px 0;
    }

    & .post_title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }
  }

  & .comment_content {
    padding: 15px;

    & .textarea_header {
      padding: 5px 10px;
      background-color: #efefef;
      text-align: right;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    & .comment_textarea {
      width: 100%;
      height: 120px;
      padding: 10px;
      background-color: #efefef;
      border: 0;
      outline: 0;
      word-break: break-all;
      line-height: 20px;
    }

    & .textarea_footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      background-color: #efefef;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: ${(props) => props.theme.colors.titleColor};

      & button {
        width: 43px;
        height: 30px;
        margin-left: 12px;
        font-size: 13px;
        font-weight: 700;
        border-radius: 6px;
      }

      & .btn_cancel {
        color: #676767;
        background-color: #e5e7ea;
      }

      & .btn_register {
        color: #009f47;
        background-color: rgba(3, 199, 90, 0.12);
        outline: none;
      }

      & .btn_disabled {
        color: rgba(0, 159, 71, 0.3);
        background-color: rgba(3, 199, 90, 0.06);
      }
    }
  }
`;

const CommentHeader = styled.div`
  width: 100%;
  height: 51px;
  padding: 0 10px;
  background-color: rgb(136, 136, 136);
  z-index: ${(props) => props.theme.zIndices[3]};

  & .comment_header_wrap {
    position: relative;
    height: 100%;
    text-align: center;
  }

  & .search_btn_prev {
    position: absolute;
    left: 0;
    height: 51px;

    & svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: #efefef;
    }
  }

  & .title_area {
    padding: 10px 0;
    color: #fff;

    & h1 {
      font-size: 15px;
      font-weight: bold;
    }

    & h2 {
      margin-top: 5px;
      font-size: 11px;
    }
  }
`;

const NoData = styled.div`
  text-align: center;
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & .no_comment {
    margin: 120px auto;
  }

  & svg {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

const CommentItemWrap = styled.div`
  padding: 20px 0;
`;

const CommentItem = styled.div`
  padding: 15px 0;

  & .comment_header {
    & .user_link {
      display: flex;
      height: 32px;
      line-height: 32px;
    }

    & .user_image {
      width: 32px;
      height: 32px;
      background: #efefef;
      border-radius: 50%;
      margin: 0;
    }

    & .user_nick {
      margin-left: 8px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  & .comment_text {
    padding-left: 38px;
    line-height: 20px;
  }

  & .comment_footer {
    padding-left: 38px;
    margin-top: 5px;

    & span {
      font-size: 13px;
      margin-right: 5px;
    }
  }
`;
