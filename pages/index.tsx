import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { AiOutlineUserAdd } from "react-icons/ai";
import { formatDate } from "utils/format-date";

interface HomeProps {
  articleList: PostItemType[];
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
    };
  };
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home({ articleList }: HomeProps) {
  const [cafeTitle, setCafeTitle] = useState("WOOJINLEEdev Cafe");

  const postUrl = "https://jsonplaceholder.typicode.com/posts";
  const { data } = useSWR(postUrl, fetcher, {
    fallbackData: articleList,
  });

  const now = new Date();
  const yymmdd = formatDate(now, "YY.MM.DD");

  return (
    <Container>
      <Section>
        <div className="info">
          <Link href="/">
            <a className="cafe_img"></a>
          </Link>
          <div className="info_text">
            <Link href="/">
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
          <li>전체글</li>
          <li>인기글</li>
          <li>전체공지</li>
        </ul>
        <button type="button">
          <AiOutlineUserAdd />
          <span>가입하기</span>
        </button>
      </TabBox>

      <ListGroup>
        {data?.map((value: any) => {
          return (
            <ListItem key={String(value.id)}>
              <Link href="/posts/[id]" as={`/posts/${value.id}`}>
                <div className="post_info">
                  <h3 className="list_title" key={String(value.id)}>
                    {value.title}
                  </h3>

                  <div className="user_area">
                    <span>{value.id}</span>
                    <span>{yymmdd}</span>
                    <span>
                      조회 <span>{value.id}</span>
                    </span>
                  </div>
                </div>
              </Link>
              <div className="list_img_comment_wrapper">
                <div className="list_img"></div>
                <Link href="/posts/[id]" as={`/posts/${value.id}`}>
                  <div className="list_comment"></div>
                </Link>
              </div>
            </ListItem>
          );
        })}
      </ListGroup>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const articleList = await fetcher(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return {
    props: {
      articleList,
    },
  };
};

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
  width: 100%;
  min-height: 56px;
  padding: 11px 0;
  justify-content: space-between;
  border-bottom: 0.5px solid #e6e6e6;
  word-break: break-word;
  word-wrap: break-word;

  & .post_info {
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
    width: 36px;
    min-height: 44px;
    padding-top: 12px;
    border-radius: 6px;
    background-color: #f5f6f8;
    cursor: pointer;
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
    }

    & li:first-child {
      margin: 0;
      border-bottom: ${(props) => props.theme.colors.tabBorderColor};
    }
  }

  & button {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 29px;
    line-height: 29px;
    margin: 9px 0;
    background: #ebecef;
    border-radius: 6px;
    font-size: 13px;
    font-weight: bold;

    & svg {
      width: 19px;
      height: 19px;
      margin: 5px 0;
    }
  }
`;