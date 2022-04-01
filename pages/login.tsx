import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { GetStaticProps } from "next";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import useAuth from "hooks/useAuth";

const Login = () => {
  const { naver }: any = typeof window !== "undefined" && window;
  const router = useRouter();
  const [naverIdToken, setNaverIdToken] = useState<string>("");

  const [idInput, setIdInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [idClassName, setIdClassName] = useState<string>("item_area id");
  const [passwordClassName, setPasswordClassName] =
    useState<string>("item_area password");

  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
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
      loginButton: { color: "green", type: 3, height: 60 },
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
    value === "id" && setIdInput("");
    value === "password" && setPasswordInput("");
  };

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleIdInputClick = () => {
    idInputRef?.current && setIdClassName("id_focus");
  };

  const handleIdInputBlur = () => {
    idInputRef?.current && setIdClassName("item_area id");
  };

  const handlePasswordInputClick = () => {
    passwordInputRef?.current && setPasswordClassName("password_focus");
  };

  const handlePasswordInputBlur = () => {
    passwordInputRef?.current && setPasswordClassName("item_area password");
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    try {
      await auth.login(userId, userPassword);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login(formRef?.current);
    }
  };

  return (
    <Container>
      <Wrapper>
        <LoginWrap onSubmit={onSubmit} ref={formRef}>
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
              value={idInput}
              onChange={handleIdInput}
              onClick={handleIdInputClick}
              onBlur={handleIdInputBlur}
              ref={idInputRef}
              placeholder="아이디"
            />
            {idInput.length > 0 && (
              <RemoveBtn role="button" onClick={() => handleRemoveBtn("id")}>
                <IoIosCloseCircle />
                <span className="visually_hidden">검색 입력 삭제</span>
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
              value={passwordInput}
              onChange={handlePasswordInput}
              onClick={handlePasswordInputClick}
              onBlur={handlePasswordInputBlur}
              ref={passwordInputRef}
              autoComplete="new-password"
              maxLength={16}
              placeholder="비밀번호"
              onKeyPress={onKeyPress}
            />
            {passwordInput.length > 0 && (
              <RemoveBtn
                role="button"
                onClick={() => handleRemoveBtn("password")}
              >
                <IoIosCloseCircle />
                <span className="visually_hidden">검색 입력 삭제</span>
              </RemoveBtn>
            )}
          </div>
          <button type="submit" className="login_btn">
            로그인
          </button>
        </LoginWrap>

        <div>
          <NaverLoginBtn onClick={handleNaverLoginClick}>
            <span className="visually_hidden">네이버 아이디로 로그인</span>
          </NaverLoginBtn>
          <div id="naverIdLogin" onClick={initializeNaverLogin} role="button" />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios(`https://shopping-mall-api-lab.click/v1/products`);
  const data = res.data;

  return { props: { item: data } };
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 190px);
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
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

const LoginWrap = styled.form`
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
