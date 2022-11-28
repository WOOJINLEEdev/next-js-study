import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { dehydrate, QueryClient } from "react-query";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { Inter } from "@next/font/google";

import { getPostList, getUrl, useGetPostList } from "hooks/api/useGetPostList";
import { formatDate } from "utils/format-date";

import { commentCountsSelector } from "state/comment";
import { ICommentCount, IPostItem } from "types";
import { CAFE_TITLE, TABS } from "constant";
import { useSession } from "next-auth/react";

export const inter = Inter({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

interface IHomeProps {
  activeTab: string;
}

const Home = ({ activeTab }: IHomeProps) => {
  const { data: session } = useSession();
  const { postList } = useGetPostList({ activeTab });

  const now = new Date();
  const yymmdd = formatDate(now, "YY.MM.DD");

  const idList: number[] =
    postList?.map((post: IPostItem) => {
      return post.id;
    }) ?? [];

  const commentCounts = useRecoilValue<ICommentCount[]>(
    commentCountsSelector(idList),
  );

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
            <Link href="/" className="cafe_img" aria-label="cafe 이미지"></Link>
            <div className="info_text">
              <Link href="/" passHref>
                <h1 className={`info_title ${inter.className}`}>
                  {CAFE_TITLE}
                </h1>
              </Link>

              <div className="info_content">
                <span className="info_memeber">
                  멤버수 <em>1</em>
                </span>
                <Link href="/" className="info_link">
                  카페정보 &gt;
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
                  className="tab_link"
                >
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={session ? "/myprofile/articles" : "/login"}
            className="join_btn"
            role="button"
            passHref
          >
            <>
              {session ? <AiOutlineUser /> : <AiOutlineUserAdd />}
              <span>{session ? "마이프로필" : "가입하기"}</span>
            </>
          </Link>
        </TabBox>

        <ListGroup>
          {postList?.map((value: IPostItem) => {
            return (
              <ListItem key={String(value.id)}>
                <Link
                  href="/posts/[id]"
                  as={`/posts/${value.id}`}
                  className={`post_info ${inter.className}`}
                  tabIndex={0}
                  passHref
                >
                  <>
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
                  </>
                </Link>
                <div className="list_img_comment_wrapper">
                  <div className="list_img"></div>
                  <Link
                    href="/posts/[id]/comments"
                    as={`/posts/${value.id}/comments`}
                    className="list_comment"
                    tabIndex={0}
                    passHref
                  >
                    <>
                      <span>
                        {commentCounts.map(
                          (commentCount) =>
                            commentCount.postId === value.id &&
                            commentCount.total,
                        )}
                      </span>
                      <span>댓글</span>
                    </>
                  </Link>
                </div>
              </ListItem>
            );
          })}
        </ListGroup>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const queryClient = new QueryClient();

  const { tab } = query;

  await queryClient.prefetchQuery<IPostItem[], unknown, IPostItem[], string>(
    getUrl(tab),
    getPostList,
  );

  res.setHeader(
    "Cache-Control",

    process.env.NODE_ENV === "production"
      ? "public, s-maxage=604800, stale-while-revalidate=86400"
      : "no-cache, no-store, max-age=0, must-revalidate",
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      activeTab: tab || "",
    },
  };
};

export default Home;

const Container = styled.main`
  width: 100%;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
`;

const Section = styled.section`
  z-index: ${(props) => props.theme.zIndices[0]};
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 188px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
  box-sizing: border-box;
  -webkit-transform: translateZ(0);

  &:before {
    z-index: ${(props) => props.theme.zIndices[0]};
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.14);
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

  .info {
    z-index: ${(props) => props.theme.zIndices[1]};
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    bottom: 14px;
    width: 100%;
    max-width: 960px;
    min-height: 57px;
    padding: 0 15px 0 17px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .cafe_img {
    display: table-cell;
    margin: 0 0 0 -1px;
    vertical-align: bottom;
    width: 56px;
    min-width: 56px;
    height: 56px;
    background: url("/images/wj_56x56.png") no-repeat;
    border-radius: 5px;
  }

  .info_text {
    width: 100%;
    margin-left: 8px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.titleColor};
  }

  .info_title {
    padding-top: 6px;
    font-size: 20px;
    line-height: 24px;
    width: 75%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .info_link {
    margin-left: 10px;
  }

  .info_content {
    padding-top: 4px;
    height: 21.5px;
  }

  .info_popular {
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
  padding: 0 16px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
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
  &:last-child {
    border-bottom: 0;
    padding-bottom: 22px;
  }

  .post_info {
    width: 100%;
    cursor: pointer;
  }

  .list_title {
    width: 100%;
    height: 34px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .list_img {
    display: table-cell;
    margin: 0 0 0 -1px;
    vertical-align: bottom;
    width: 56px;
    height: 56px;
    background: #efefef;
    border-radius: 5px;
  }

  .list_comment {
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

    span {
      font-size: 10px;

      &:first-child {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 3px;
      }
    }
  }

  .list_img_comment_wrapper {
    display: flex;
    justify-content: space-between;
    min-width: 95px;
    max-width: 100px;
  }

  .user_area {
    margin-top: 10px;
    color: #979797;
    font-size: 12px;

    span {
      margin-left: 8px;

      &:first-child {
        margin: 0;
      }
    }
  }
`;

const TabBox = styled.div`
  z-index: ${(props) => props.theme.zIndices[2]};
  position: sticky;
  top: 51px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  max-width: 960px;
  padding: 0 16px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
  border-bottom: 1px solid #e6e6e6;

  ul {
    display: flex;
    width: 70%;
    line-height: 48px;
    text-align: center;

    li {
      margin-left: 10px;

      &:first-child {
        margin: 0;
      }

      a {
        padding: 13px 0;
        color: ${(props) => props.theme.colors.titleColor};
      }
    }

    .is_active {
      color: ${(props) => props.theme.colors.titleColor};
      border-bottom: ${(props) => props.theme.colors.tabBorderColor};
    }
  }

  .join_btn {
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

    svg {
      width: 19px;
      height: 19px;
      margin: 5px 0;
    }
  }
`;
