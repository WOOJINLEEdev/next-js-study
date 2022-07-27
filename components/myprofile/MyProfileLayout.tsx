import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import useAuth, { isLoginSelector, tokenSelector } from "hooks/useAuth";
import Footer from "components/common/Footer";

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

interface IMyProfileLayoutProps {
  children: ReactNode;
}

const MyProfileLayout = ({ children }: IMyProfileLayoutProps) => {
  const router = useRouter();
  const auth = useAuth();
  const token = useRecoilValue<string>(tokenSelector);
  const isLogin = useRecoilValue<boolean>(isLoginSelector);

  function handlePrevBtnClick() {
    router.back();
  }

  function handleLogoutBtnClick() {
    auth.logout(token);
  }

  return (
    <>
      <BtnWrap>
        <button
          type="button"
          className="prev_btn"
          onClick={handlePrevBtnClick}
          aria-label="이전 페이지로 돌아가기"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>

        {isLogin && (
          <button
            type="button"
            className="logout_btn"
            onClick={handleLogoutBtnClick}
          >
            로그아웃
          </button>
        )}
      </BtnWrap>

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
                <div
                  className="tab_link"
                  onClick={() => router.replace(tab.path)}
                >
                  {tab.name}
                </div>
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

const BtnWrap = styled.div`
  z-index: ${(props) => props.theme.zIndices[3]};
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};

  & .prev_btn {
    height: 51px;

    & svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: ${(props) => props.theme.colors.titleColor};
    }
  }

  & .logout_btn {
    width: 80px;
    background: ${(props) => props.theme.colors.bgColor};
    color: ${(props) => props.theme.colors.titleColor};
    margin-right: 16px;
  }
`;

const ProfileHead = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  border-bottom: 10px solid #e6e6e6;
  transition: ${(props) => props.theme.transitions[0]};

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
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
`;

const TabBox = styled.div`
  z-index: ${(props) => props.theme.zIndices[2]};
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  min-height: 48px;
  padding: 0 16px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background-color: ${(props) => props.theme.colors.bgColor};
  border-bottom: 1px solid #e6e6e6;
  transition: ${(props) => props.theme.transitions[0]};

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
        cursor: pointer;
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
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
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
