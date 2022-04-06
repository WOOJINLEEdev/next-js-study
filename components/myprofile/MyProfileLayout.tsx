import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Footer from "components/common/Footer";
import { tokenSelector } from "hooks/useAuth";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Tabs = {
  ARTICLES: "",
  COMMENTS: "comments",
};

const TABS = [
  {
    key: Tabs.ARTICLES,
    value: "0",
    name: "작성글",
    path: "/myprofile/articles",
  },
  {
    key: Tabs.COMMENTS,
    value: "1",
    name: "작성댓글",
    path: "/myprofile/comments",
  },
];

interface MyProfileLayoutProps {
  children: React.ReactNode;
}

const MyProfileLayout = ({ children }: MyProfileLayoutProps) => {
  const router = useRouter();
  const token = useRecoilValue<string>(tokenSelector);

  return (
    <>
      <PrevBtnWrap>
        <button
          type="button"
          className="prev_btn"
          onClick={() => router.back()}
        >
          <MdOutlineKeyboardArrowLeft />
          <span className="visually_hidden">이전 페이지로 돌아가기</span>
        </button>
      </PrevBtnWrap>

      {token ? (
        <ProfileHead>
          <div className="user_text">
            <div className="user_id">{token}</div>
            <div className="user_member_grade">New-user</div>
            <div className="user_visit">
              방문 <span>1</span>
            </div>
          </div>

          <div className="user_photo">
            <span className="visually_hidden">사용자 사진</span>
          </div>
        </ProfileHead>
      ) : (
        <>
          <ProfileHead>
            <Link href="/login">
              <a className="user_login_link">로그인 해주세요.</a>
            </Link>

            <div className="user_photo">
              <span className="visually_hidden">사용자 사진</span>
            </div>
          </ProfileHead>
        </>
      )}

      <ProfileContent>
        <TabBox>
          <ul>
            {TABS.map((tab) => (
              <li
                key={tab.key}
                className={router.pathname === tab.path ? "is_active" : ""}
                value={tab.value}
              >
                <Link
                  href={{
                    pathname: tab.path,
                  }}
                >
                  <a className="tab_link">{tab.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </TabBox>

        <MyBoardWrap>{children}</MyBoardWrap>
      </ProfileContent>
      <Footer />
    </>
  );
};

export default MyProfileLayout;

const PrevBtnWrap = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 51px;
  background: ${(props) => props.theme.colors.bgColor};
  z-index: 100;

  & .prev_btn {
    height: 51px;

    & svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: ${(props) => props.theme.colors.titleColor};
    }
  }
`;

const ProfileHead = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  border-bottom: 10px solid #e6e6e6;

  & .user_text {
    width: calc(100% - 80px);
    font-size: 21px;
    font-weight: bold;

    & .user_member_grade,
    .user_visit {
      font-size: 13px;
      font-weight: normal;
      color: #979797;
      padding: 10px 0 0;
    }
  }

  & .user_login_link {
    width: calc(100% - 80px);
    line-height: 80px;
    font-size: 21px;
    font-weight: bold;
  }

  & .user_photo {
    display: block;
    width: 80px;
    height: 80px;
    border: 0;
    border-radius: 50%;
    background: #efefef;
  }
`;

const ProfileContent = styled.div`
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
`;

const TabBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  border-bottom: 1px solid #e6e6e6;
  z-index: 10;

  & ul {
    display: flex;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;

    & li {
      width: 50%;
      margin-left: 10px;

      & .tab_link {
        display: block;
        width: 100%;
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
`;

const MyBoardWrap = styled.div`
  max-width: 960px;
  padding: 0 16px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  min-height: calc(100vh - 362px);

  & .board_header {
    height: 46px;
    line-height: 46px;
  }

  & .no_data_item {
    text-align: center;
    min-height: calc(100vh - 408px);
    line-height: calc(100vh - 408px);
  }
`;
