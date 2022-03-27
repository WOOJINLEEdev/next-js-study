import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import { formatDate } from "utils/format-date";
import { HiMenu } from "react-icons/hi";
import { IoMdHeartEmpty } from "react-icons/io";
import { PostItemType } from "pages";

interface PostProps {
  article: PostItemType;
}

const Post = ({ article }: PostProps) => {
  const router = useRouter();
  const { id } = router.query;

  const now = new Date();

  const yyyymmdd = formatDate(now, "YYYY.MM.DD");
  const hhmm = formatDate(now, "hh:mm");

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`WOOJINLEEdev Cafe의 게시글입니다. 제목은 ${article.title} 입니다.`}
        />
        <title>
          {id}.{article.title}
        </title>
      </Head>
      <Container>
        <PostHeader>
          <h2 className="post_title">{article.title}</h2>

          <div className="user_area">
            <Link href="/">
              <a className="user_photo">
                <span className="visually_hidden">사용자 사진</span>
              </a>
            </Link>
            <div className="user_post_info">
              <div className="user_name">{article.id}</div>
              <div className="post_info">
                <span className="post_date">
                  {yyyymmdd} {hhmm}
                </span>
                <span className="post_check_count">조회 {article.id}</span>
              </div>
            </div>
          </div>
        </PostHeader>

        <PostContent>
          <p>{article.body}</p>
        </PostContent>

        <BtnList className="fixed_footer">
          <Link href="/">
            <a className="back_btn">
              <HiMenu />
              <span>목록으로</span>
            </a>
          </Link>

          <button type="button" className="like_btn">
            <IoMdHeartEmpty />
            <span className="visually_hidden">찜</span>
          </button>
        </BtnList>
      </Container>
    </>
  );
};

export async function getStaticPaths() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const data = res.data;

  const paths = data.map((item: any) => ({
    params: { id: String(item.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const data = res.data;

  return { props: { article: data } };
}

export default Post;

const Container = styled.main`
  position: relative;
  height: calc(100vh - 51px);
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
`;

const PostHeader = styled.div`
  width: 90%;
  padding: 20px 0;
  margin: 0 auto;
  border-bottom: ${(props) => props.theme.colors.borderColor};

  & .post_title {
    display: -webkit-box;
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 24px;
    margin-bottom: 18px;
  }

  & .user_area {
    display: flex;
  }

  & .user_photo {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: #efefef;
  }

  & .user_post_info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 10px;
  }

  & .user_name {
    font-size: 15px;
  }

  & .post_info {
    font-size: 13px;

    & .post_date {
      margin-right: 7px;
    }
  }
`;

const PostContent = styled.div`
  width: 90%;
  padding: 20px 10px;
  margin: 0 auto;

  & p {
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
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & .back_btn {
    display: flex;

    & svg {
      width: 19px;
      height: 19px;
      margin: 14px 0;
    }
  }

  & .like_btn > svg {
    width: 19px;
    height: 19px;
    margin: 14px;
    color: ${(props) => props.theme.colors.titleColor};
  }
`;
