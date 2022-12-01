import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";

import Footer from "components/common/Footer";

import { PROFILE_TABS } from "constant";

interface IMyProfileLayoutProps {
  children: ReactNode;
}

const MyProfileLayout = ({ children }: IMyProfileLayoutProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, []);

  const handlePrevBtnClick = () => {
    router.back();
  };

  const handleLogoutBtnClick = () => {
    signOut();
  };

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

        {status === "authenticated" && (
          <button
            type="button"
            className="logout_btn"
            onClick={handleLogoutBtnClick}
          >
            로그아웃
          </button>
        )}
      </BtnWrap>

      {session ? (
        <ProfileHead>
          <div className="user_text">
            <div className="user_id">{session.user.email}</div>
            <div className="user_name">{session.user.name}</div>
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
            <Link href="/login" className="user_login_link">
              로그인 해주세요.
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
            {PROFILE_TABS.map((tab) => (
              <li
                key={tab.key}
                className={router.pathname === tab.path ? "is_active" : ""}
                value={tab.value}
              >
                <div className="tab_link" onClick={() => router.push(tab.path)}>
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

  .prev_btn {
    height: 51px;

    svg {
      width: 41px;
      height: 41px;
      margin: 5px 0;
      color: ${(props) => props.theme.colors.titleColor};
    }
  }

  .logout_btn {
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

  .user_text {
    width: calc(100% - 80px);
    font-size: 21px;
    font-weight: bold;

    .user_id {
      display: inline-block;
      max-width: 90%;
      height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user_name,
    .user_visit {
      font-size: 13px;
      font-weight: normal;
      color: #979797;
      padding: 10px 0 0;
    }
  }

  .user_login_link {
    width: calc(100% - 80px);
    line-height: 80px;
    font-size: 21px;
    font-weight: bold;
  }

  .user_photo {
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

  ul {
    display: flex;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;

    li {
      width: 50%;
      margin-left: 10px;

      .tab_link {
        display: block;
        width: 100%;
        color: ${(props) => props.theme.colors.titleColor};
        cursor: pointer;
      }
    }

    li:first-child {
      margin: 0;
    }

    .is_active {
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

  .board_header {
    height: 46px;
    line-height: 46px;
  }

  .no_data_item {
    text-align: center;
    min-height: calc(100vh - 408px);
    line-height: calc(100vh - 408px);
  }
`;
