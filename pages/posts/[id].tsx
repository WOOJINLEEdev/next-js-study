import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { ReactElement } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { dehydrate, QueryClient } from "react-query";
import { FaRegCommentDots } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

import useGetPostItem from "hooks/api/useGetPostItem";
import { formatDate } from "utils/format-date";

import Header from "components/common/Header";
import Menu from "components/common/Menu";

import { commentCountSelector } from "state/comment";
import { CAFE_TITLE } from "constant";
import { IPostItem } from "types";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetPostItem(id);
  const post = (data ?? {}) as IPostItem;

  const commentsLength = useRecoilValue<number>(commentCountSelector(post?.id));

  const now = new Date();
  const yyyymmdd = formatDate(now, "YYYY.MM.DD");
  const hhmm = formatDate(now, "hh:mm");

  const handlePrevBtnClick = () => {
    router.push("/");
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <meta name="description" content={`${post.body}`} />
        <meta property="og:title" content={`${post.title}`} />
        <meta property="og:description" content={`${post.body}`} />
        <title>
          {id}.{post.title}
        </title>
      </Head>

      <Container>
        <PostHeader>
          <h2 className="post_title">{post.title}</h2>

          <div className="user_area">
            <Link href="/">
              <a className="user_photo">
                <span className="visually_hidden">사용자 사진</span>
              </a>
            </Link>
            <div className="user_post_info">
              <div className="user_name">{post.id}</div>
              <div className="post_info">
                <span className="post_date">
                  {yyyymmdd} {hhmm}
                </span>
                <span className="post_check_count">조회 {post.id}</span>
              </div>
            </div>
          </div>
        </PostHeader>

        <PostContent>
          <p>{post.body}</p>
        </PostContent>

        <BtnList className="fixed_footer">
          <a
            role="button"
            className="prev_btn"
            onClick={handlePrevBtnClick}
            tabIndex={0}
          >
            <HiMenu />
            <span>목록으로</span>
          </a>

          <Link href="/posts/[id]/comments" as={`/posts/${post.id}/comments`}>
            <a className="comment_btn">
              <FaRegCommentDots />
              {commentsLength > 0 && (
                <span className="comment_new_icon">
                  <span className="visually_hidden">새로운 댓글</span>
                </span>
              )}
              <em>{commentsLength}</em>
              <span className="visually_hidden">댓글</span>
            </a>
          </Link>
        </BtnList>
      </Container>
    </>
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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["post", params?.id], async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params?.id}`,
    );

    return res.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Post;

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header scrollState={false} cafeTitle={CAFE_TITLE} />
      <Menu />
      {page}
    </>
  );
};

const Container = styled.main`
  position: relative;
  height: calc(100vh - 51px);
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
`;

const PostHeader = styled.div`
  width: 90%;
  padding: 20px 0;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  border-bottom: ${(props) => props.theme.colors.borderColor};
  transition: ${(props) => props.theme.transitions[0]};

  .post_title {
    display: -webkit-box;
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 24px;
    margin-bottom: 18px;
  }

  .user_area {
    display: flex;
  }

  .user_photo {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: #efefef;
  }

  .user_post_info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 10px;
  }

  .user_name {
    font-size: 15px;
  }

  .post_info {
    font-size: 13px;

    .post_date {
      margin-right: 7px;
    }
  }
`;

const PostContent = styled.div`
  width: 90%;
  padding: 20px 10px;
  margin: 0 auto;

  p {
    font-size: 16px;
    line-height: 25px;
  }

  @media only screen and (min-width: 960px) {
    padding: 20px;
  }
`;

const BtnList = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 47px;
  line-height: 47px;
  bottom: 0;
  border-top: ${(props) => props.theme.colors.borderColor};

  .prev_btn {
    display: flex;

    svg {
      width: 19px;
      height: 19px;
      margin: 14px 0;
    }
  }

  .comment_btn {
    position: relative;
    display: flex;
    width: 50px;

    .comment_new_icon {
      position: absolute;
      top: 12px;
      right: 20px;
      width: 10px;
      height: 10px;
      margin: 0;
      border-radius: 50%;
      background: #ff0000;
    }

    svg {
      display: inline-block;
      width: 19px;
      height: 19px;
      margin: 14px 7px 14px;
      color: ${(props) => props.theme.colors.titleColor};
    }
  }
`;
