import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import { selectorFamily, useRecoilValue } from "recoil";
import { GetServerSideProps } from "next";
import { formatDate } from "utils/format-date";
import { commentCountSelector } from "pages/posts/[id]/comments";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { tokenSelector } from "hooks/useAuth";

interface HomeProps {
  postList: PostItemType[];
  activeTab: string;
}

export interface PostItemType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface ThemeProps {
  theme?: {
    colors?: {
      titleColor?: string;
      bgColor?: string;
      boxColor?: string;
      tabBorderColor?: string;
      dimmedColor?: string;
      editorBgColor?: string;
      editorTitleColor?: string;
    };
  };
}

interface CommentCount {
  postId: number;
  total: number;
}

const Tabs = {
  ALL: "",
  POPULAR: "popular",
  NOTICE: "notice",
};

const TABS = [
  {
    key: Tabs.ALL,
    value: "0",
    name: "전체글",
    path: "/",
  },
  {
    key: Tabs.POPULAR,
    value: "1",
    name: "인기글",
    path: "/",
  },
  {
    key: Tabs.NOTICE,
    value: "2",
    name: "전체공지",
    path: "/",
  },
];

export const commentCountsSelector = selectorFamily({
  key: "commentCountsSelector",
  get:
    (postIdList: number[]) =>
    ({ get }) => {
      return postIdList.map((postId: number) => {
        const commentsLength = get(commentCountSelector(postId));

        return {
          postId,
          total: commentsLength,
        };
      });
    },
});

export const cafeTitle = "WOOJINLEEdev Cafe";

function Home({ postList, activeTab }: HomeProps) {
  const now = new Date();
  const yymmdd = formatDate(now, "YY.MM.DD");

  const idList: number[] = postList.map((post: PostItemType) => {
    return post.id;
  });

  const commentCounts = useRecoilValue<CommentCount[]>(
    commentCountsSelector(idList)
  );
  const token = useRecoilValue<string>(tokenSelector);

  return (
    <>
      <Head>
        <meta property="og:title" content="WOOJINLEEdev Cafe" />
        <meta
          property="og:description"
          content="WOOJINLEEdev의 Cafe입니다. Next.js를 활용하여 만든 웹사이트입니다. 모바일 기준으로 만들어졌습니다."
        />
      </Head>
      <Container>
        <Section>
          <div className="info">
            <Link href="/">
              <a className="cafe_img">
                <span className="visually_hidden">cafe 이미지</span>
              </a>
            </Link>
            <div className="info_text">
              <Link href="/" passHref>
                <h1 className="info_title">{cafeTitle}</h1>
              </Link>

              <div className="info_content">
                <span className="info_memeber">
                  멤버수 <em>1</em>
                </span>
                <Link href="/">
                  <a className="info_link">카페정보 &gt;</a>
                </Link>
                <span className="info_popular">대표</span>
              </div>
            </div>
          </div>
        </Section>

        <TabBox>
          <ul>
            {TABS.map((tab) => (
              <li
                key={tab.key}
                className={activeTab === tab.key ? "is_active" : ""}
                value={tab.value}
              >
                <Link
                  href={{
                    pathname: tab.path,
                    query: tab.key && { tab: tab.key },
                  }}
                >
                  <a className="tab_link">{tab.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={token ? "/myprofile/articles" : "/login"}>
            <a className="join_btn">
              {token ? <AiOutlineUser /> : <AiOutlineUserAdd />}
              <span>{token ? "마이프로필" : "가입하기"}</span>
            </a>
          </Link>
        </TabBox>

        <ListGroup>
          {postList?.map((value: PostItemType) => {
            return (
              <ListItem key={String(value.id)}>
                <Link href="/posts/[id]" as={`/posts/${value.id}`} passHref>
                  <a className="post_info" tabIndex={0}>
                    <strong className="list_title" key={String(value.id)}>
                      {value.title}
                    </strong>

                    <div className="user_area">
                      <span>{value.id}</span>
                      <span>{yymmdd}</span>
                      <span>
                        조회 <span>{value.id}</span>
                      </span>
                    </div>
                  </a>
                </Link>
                <div className="list_img_comment_wrapper">
                  <div className="list_img"></div>
                  <Link
                    href="/posts/[id]/comments"
                    as={`/posts/${value.id}/comments`}
                    passHref
                  >
                    <a className="list_comment" tabIndex={0}>
                      <span>
                        {commentCounts.map(
                          (commentCount) =>
                            commentCount.postId === value.id &&
                            commentCount.total
                        )}
                      </span>
                      <span>댓글</span>
                    </a>
                  </Link>
                </div>
              </ListItem>
            );
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { tab } = query;

  let url = "https://jsonplaceholder.typicode.com/posts";
  switch (tab) {
    case Tabs.POPULAR:
      url += "?userId=10";
      break;
    case Tabs.NOTICE:
      url += "?userId=5";
      break;
  }

  const postList = await axios.get(url).then((res) => res.data);

  return {
    props: {
      postList,
      activeTab: tab || "",
    },
  };
};

export default Home;

const Container = styled.main<ThemeProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  top: 0;
  width: 100%;
  height: 188px;
  padding-bottom: 15px;
  box-sizing: border-box;
  -webkit-transform: translateZ(0);
  z-index: -1;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.14);
    z-index: -1;
    top: 0;
    background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.06));
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 340px;
  }

  & .info {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 14px;
    width: 100%;
    max-width: 960px;
    min-height: 57px;
    padding: 0 15px 0 17px;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 1;
  }

  & .cafe_img {
    display: table-cell;
    margin: 0 0 0 -1px;
    vertical-align: bottom;
    width: 56px;
    min-width: 56px;
    height: 56px;
    background: url("/images/wj_56x56.png") no-repeat;
    border-radius: 5px;
  }

  & .info_text {
    width: 100%;
    margin-left: 8px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.titleColor};
  }

  & .info_title {
    padding-top: 6px;
    font-size: 20px;
    line-height: 24px;
    width: 75%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  & .info_link {
    margin-left: 10px;
  }

  & .info_content {
    padding-top: 4px;
    height: 21.5px;
  }

  & .info_popular {
    width: 20px;
    height: 18px;
    padding: 1px 2px;
    color: #fff;
    font-size: 10px;
    background: #03c75a;
    margin: -2px 0 0 4px;
    border-radius: 2px;
  }
`;

const ListGroup = styled.ul`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;
  padding: 11px 0;
  border-bottom: 0.5px solid #e6e6e6;
  word-break: break-word;
  word-wrap: break-word;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 22px;
  }

  & .post_info {
    width: 100%;
    cursor: pointer;
  }

  & .list_title {
    width: 100%;
    height: 34px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  & .list_img {
    display: table-cell;
    margin: 0 0 0 -1px;
    vertical-align: bottom;
    width: 56px;
    height: 56px;
    background: #efefef;
    border-radius: 5px;
  }

  & .list_comment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 36px;
    min-height: 44px;
    border-radius: 6px;
    background-color: #f5f6f8;
    color: #333;
    cursor: pointer;

    & span {
      font-size: 10px;
    }

    & span:first-child {
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 3px;
    }
  }

  & .list_img_comment_wrapper {
    display: flex;
    justify-content: space-between;
    min-width: 95px;
    max-width: 100px;
  }

  & .user_area {
    margin-top: 10px;
    color: #979797;
    font-size: 12px;

    & span {
      margin-left: 8px;
    }

    & span:first-child {
      margin: 0;
    }
  }
`;

const TabBox = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  max-width: 960px;
  top: 51px;
  margin: 0 auto;
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  border-bottom: 1px solid #e6e6e6;
  z-index: 10;

  & ul {
    display: flex;
    width: 70%;
    line-height: 48px;
    text-align: center;

    & li {
      margin-left: 10px;

      & a {
        padding: 13px 0;
        color: ${(props) => props.theme.colors.titleColor};
      }
    }

    & li:first-child {
      margin: 0;
    }

    & .is_active {
      color: ${(props) => props.theme.colors.titleColor};
      border-bottom: ${(props) => props.theme.colors.tabBorderColor};
    }
  }

  & .join_btn {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 29px;
    line-height: 29px;
    margin: 9px 0;
    background: #ebecef;
    color: #333;
    border-radius: 6px;
    font-size: 13px;
    font-weight: bold;
    padding: 0;

    & svg {
      width: 19px;
      height: 19px;
      margin: 5px 0;
    }
  }
`;
