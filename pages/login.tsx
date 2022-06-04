import { useRouter } from "next/router";
import Script from "next/script";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

import useAuth from "hooks/useAuth";

const Login = () => {
  const { naver }: any = typeof window !== "undefined" && window;
  const router = useRouter();

  const [naverIdToken, setNaverIdToken] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idClassName, setIdClassName] = useState<string>("item_area id");
  const [passwordClassName, setPasswordClassName] =
    useState<string>("item_area password");

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const auth = useAuth();

  useEffect(() => {
    initializeNaverLogin();
    location.href.includes("access_token") && getNaverToken();
  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "#008000", type: 3, height: 60 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    const naverToken = window.location.href.split("=")[1].split("&")[0];
    setNaverIdToken(naverToken);
  };

  const handleNaverLoginClick = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  };

  const handleRemoveBtn = (value: string) => {
    value === "id" && setId("");
    value === "password" && setPassword("");
  };

  const handleIdChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    setId(targetValue);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleIdFocus = () => {
    idRef?.current && setIdClassName("id_focus");
  };

  const handleIdBlur = () => {
    idRef?.current && setIdClassName("item_area id");
  };

  const handlePasswordFocus = () => {
    passwordRef?.current && setPasswordClassName("password_focus");
  };

  const handlePasswordBlur = () => {
    passwordRef?.current && setPasswordClassName("item_area password");
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login(e.currentTarget);
  }

  async function login(form: HTMLFormElement | null) {
    if (form === null) {
      return false;
    }

    const formData = new FormData(form);
    const userId = formData.get("userId") as string;
    const userPassword = formData.get("userPassword") as string;

    if (userId === "" || userId.trim().length === 0) {
      alert("아이디를 입력해주세요.");
      idRef?.current?.focus();
      return false;
    }

    if (userPassword === "") {
      alert("비밀번호를 입력해주세요.");
      passwordRef?.current?.focus();
      return false;
    }

    try {
      await auth.login(userId, userPassword);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <h2>* 아이디는 영문 및 숫자만 입력 가능합니다.</h2>
          <LoginForm onSubmit={handleFormSubmit} ref={formRef}>
            <div className={idClassName}>
              <div className="user_id_icon">
                <AiOutlineUser />
              </div>
              <label htmlFor="userId" className="visually_hidden">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                className="user_id"
                value={id}
                onChange={handleIdChnage}
                onFocus={handleIdFocus}
                onBlur={handleIdBlur}
                ref={idRef}
                placeholder="아이디"
                autoComplete="on"
              />
              {id.length > 0 && (
                <RemoveBtn
                  type="button"
                  onClick={() => handleRemoveBtn("id")}
                  aria-label="Id Delete"
                >
                  <IoIosCloseCircle />
                </RemoveBtn>
              )}
            </div>

            <div className={passwordClassName}>
              <div className="password_icon">
                <AiOutlineLock />
              </div>
              <label htmlFor="userPassword" className="visually_hidden">
                비밀번호
              </label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                className="user_password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                ref={passwordRef}
                autoComplete="new-password"
                maxLength={16}
                placeholder="비밀번호"
              />
              {password.length > 0 && (
                <RemoveBtn
                  type="button"
                  onClick={() => handleRemoveBtn("password")}
                  aria-label="Password Delete"
                >
                  <IoIosCloseCircle />
                </RemoveBtn>
              )}
            </div>
            <button type="submit" className="login_btn">
              로그인
            </button>
          </LoginForm>

          <div>
            <NaverLoginBtn onClick={handleNaverLoginClick}>
              <span className="visually_hidden">네이버 아이디로 로그인</span>
            </NaverLoginBtn>
            <div
              id="naverIdLogin"
              onClick={initializeNaverLogin}
              role="button"
            />
          </div>
        </Wrapper>
      </Container>
      <Script
        type="text/javascript"
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"
        strategy="beforeInteractive"
      />
    </>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 190px);
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & h2 {
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

  & #naverIdLogin {
    display: none;
  }
`;

const LoginForm = styled.form`
  position: relative;
  padding: 20px 0;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};

  & .password_icon,
  .user_id_icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
    max-height: 52px;

    & svg {
      min-width: 20px;
      min-height: 20px;
    }
  }

  & .item_area {
    position: relative;
    display: block;
    height: 53px;
    max-height: 53px;
    padding: 15px 35px 15px 50px;
    text-align: left;
    box-sizing: border-box;
    border: 2px solid #e6e6ea;
  }

  & .id,
  .id_focus {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  & .id_focus,
  & .password_focus {
    position: relative;
    display: block;
    height: 53px;
    max-height: 53px;
    padding: 15px 35px 15px 50px;
    border: 2px solid #03c75a;
  }

  & .id_focus {
    border-bottom: 2px solid #e6e6ea;
  }

  & .password,
  .password_focus {
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  & .user_id,
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

  & .login_btn {
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

const NaverLoginBtn = styled.button`
  display: block;
  width: 100%;
  height: 54px;
  border: ${(props) => props.theme.colors.borderColor};
  background: url("/images/naver_id_login.png") no-repeat;
  background-position: center;
  background-size: 200px 54px;
  background-color: #fff;
  border-radius: 6px;
`;

const RemoveBtn = styled.button`
  position: absolute;
  max-height: 52px;
  top: 0;
  right: 0;
  padding: 16px;
  color: ${(props) => props.theme.colors.titleColor};
  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
  }
`;
