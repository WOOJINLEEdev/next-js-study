import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const OAUTH = ["google", "naver", "kakao", "github", "facebook"];

const Login = () => {
  const { data: session, status } = useSession();

  function capitalizeFirstLetter(string: string) {
    switch (string) {
      case "google":
        return "구글";
      case "naver":
        return "네이버";
      case "kakao":
        return "카카오";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Container>
        <Wrapper>
          {session?.user?.email ? (
            ""
          ) : (
            <ul>
              {OAUTH.map((item) => {
                return (
                  <li key={`oauth_item_${item}`} className="oauth_item">
                    <button
                      type="button"
                      className={`oauth_btn ${item}`}
                      onClick={() => signIn(item)}
                      value={`${item} 로그인`}
                    >
                      <span className="oauth_btn_text">
                        {capitalizeFirstLetter(item)} 로그인
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {session?.user?.email && (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 190px);
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};

  h2 {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    font-size: 12px;
    line-height: 20px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 500px;
  min-height: calc(100vh - 190px);
  padding: 20px;
  margin: 0 auto;

  #naverIdLogin {
    display: none;
  }

  .oauth_item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }

  .oauth_btn {
    position: relative;
    align-items: center;
    width: 200px;
    height: 50px;
    padding: 10px;
    color: #000000;
    font-size: 15px;
    font-weight: bold;
    border-radius: 12px;
    box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px,
      rgb(0 0 0 / 24%) 0px 0px 1px 0px;

    .oauth_btn_text {
      position: absolute;
      display: inline-block;
      top: 15px;
      left: 60px;
      width: 120px;
      height: 20px;
      text-align: left;
    }

    &.google {
      background: url("/images/google-logo.png") no-repeat left;
      background-size: 20px 20px;
      background-color: #ffffff;
      background-position: 10px;
    }

    &.naver {
      background: url("/images/naver-icon1.png") no-repeat left;
      background-size: 20px 20px;
      background-color: #03c75a;
      background-position: 10px;
      color: #ffffff;
    }

    &.kakao {
      background: url("/images/kakao-symbol.png") no-repeat left;
      background-size: 20px 20px;
      background-color: #fee500;
      background-position: 10px;
      color: rgba(0, 0, 0, 0.85);
    }

    &.github {
      background: url("/images/GitHub-Mark-Light-32px.png") no-repeat left;
      background-color: #000000;
      background-size: 20px 20px;
      background-position: 10px;
      color: #ffffff;
    }

    &.facebook {
      background: url("/images/facebook-dark.svg") no-repeat left;
      background-color: #3578e5;
      background-size: 20px 20px;
      background-position: 10px;
      color: #ffffff;
    }
  }
`;

const Form = styled.form`
  position: relative;
  padding: 20px 0;

  .password_icon,
  .user_id_icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
    max-height: 52px;

    svg {
      min-width: 20px;
      min-height: 20px;
    }
  }

  .item_area {
    position: relative;
    display: block;
    height: 53px;
    max-height: 53px;
    padding: 15px 35px 15px 50px;
    text-align: left;
    box-sizing: border-box;
    border: 2px solid #e6e6ea;
  }

  .id,
  .id_focus {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .id_focus,
  .password_focus {
    position: relative;
    display: block;
    height: 53px;
    max-height: 53px;
    padding: 15px 35px 15px 50px;
    border: 2px solid #03c75a;
  }

  .id_focus {
    border-bottom: 2px solid #e6e6ea;
  }

  .password,
  .password_focus {
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .user_id,
  .user_password {
    position: relative;
    display: block;
    width: 100%;
    height: 21px;
    font-size: 16px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.titleColor};
    user-select: none;
  }

  .login_btn {
    display: block;
    width: 100%;
    margin-top: 14px;
    padding: 14px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0, 0, 0, 0.05);
    background-color: #03c75a;
    font-size: 18px;
    line-height: 25px;
    font-weight: 700;
    color: #fff;
    user-select: none;
  }
`;
