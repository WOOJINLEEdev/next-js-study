import Link from "next/link";
import styled from "styled-components";

import { inter } from "pages";
import { useRecoilValue } from "recoil";

import { formatDate } from "utils/format-date";

import { commentCountsSelector } from "state/comment";
import { ICommentCount, IPostItem } from "types";

interface IListItemProps {
  item: IPostItem;
  list: IPostItem[];
}

const ListItem = ({ item, list }: IListItemProps) => {
  const now = new Date();
  const yymmdd = formatDate(now, "YY.MM.DD");

  const getIdList = (data: IPostItem[]) => {
    return (
      data?.map((post) => {
        return post.id;
      }) ?? []
    );
  };

  const commentCounts = useRecoilValue<ICommentCount[]>(
    commentCountsSelector(getIdList(list)),
  );

  return (
    <ListItemContainer key={`post_item_${item.id}`}>
      <Link
        href="/posts/[id]"
        as={`/posts/${item.id}`}
        className={`post_info ${inter.className}`}
        tabIndex={0}
        passHref
      >
        <>
          <strong className="list_title">{item.title}</strong>

          <div className="user_area">
            <span>{item.id}</span>
            <span>{yymmdd}</span>
            <span>
              조회 <span>{item.id}</span>
            </span>
          </div>
        </>
      </Link>
      <div className="list_img_comment_wrapper">
        <div className="list_img"></div>
        <Link
          href="/posts/[id]/comments"
          as={`/posts/${item.id}/comments`}
          className="list_comment"
          tabIndex={0}
          passHref
        >
          <>
            <span>
              {commentCounts.map(
                (commentCount) =>
                  commentCount.postId === item.id && commentCount.total,
              )}
            </span>
            <span>댓글</span>
          </>
        </Link>
      </div>
    </ListItemContainer>
  );
};

export default ListItem;

const ListItemContainer = styled.li`
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
