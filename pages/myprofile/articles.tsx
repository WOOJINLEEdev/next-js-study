import Link from "next/link";
import styled from "styled-components";
import MyProfileLayout from "components/myprofile/MyProfileLayout";
import { formatDate } from "utils/format-date";
import { ReactElement } from "react";

interface Data {
  postId: number;
  postTitle: string;
}

const MyArticles = () => {
  const datas: Data[] = [];
  const now = new Date();
  const yyyymmdd = formatDate(now, "YYYY.MM.DD");
  const hhmm = formatDate(now, "hh:mm");

  return (
    <MyProfileLayout>
      <div className="board_header">
        <span>{datas.length}개의 글이 있습니다.</span>
      </div>
      <ul>
        {datas.length > 0 ? (
          datas.map((data: Data, i: number) => (
            <ListItem key={String(i)}>
              <div className="post_info" tabIndex={0}>
                <Link href="/posts/[id]" as={`/posts/${data.postId}`} passHref>
                  <strong className="list_title">{data.postTitle}</strong>
                </Link>

                <div className="date">
                  <span>
                    {yyyymmdd} {hhmm}
                  </span>
                </div>
              </div>
            </ListItem>
          ))
        ) : (
          <li className="no_data_item">
            <p className="no_data">작성글이 없습니다.</p>
          </li>
        )}
      </ul>
    </MyProfileLayout>
  );
};

export default MyArticles;

MyArticles.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

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

  &:last-child {
    border-bottom: 0;
    padding-bottom: 25px;
  }

  & .post_info {
    width: 100%;
    cursor: pointer;

    & .post_title {
      display: -webkit-box;
      overflow: hidden;
      padding-top: 7px;
      color: #979797;
      font-size: 13px;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  & .list_title {
    width: 100%;
    height: 20px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  & .date {
    padding-top: 7px;
    font-size: 12px;
    color: #979797;
  }
`;
