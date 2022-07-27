import { useSetRecoilState, atom, selector } from "recoil";
import { v1 } from "uuid";

import authApi from "pages/api/auth";

interface AuthResponse {
  data: string;
}

export const authState = atom({
  key: `auth/${v1()}`,
  default: {
    token: "",
  },
});

export const isLoginSelector = selector({
  key: `auth/isLogin/${v1()}`,
  get: ({ get }) => {
    const auth = get(authState);

    return Boolean(auth.token);
  },
});

export const tokenSelector = selector({
  key: `auth/token/${v1()}`,
  get: ({ get }) => {
    const auth = get(authState);

    return auth.token;
  },
});

export default function useAuth() {
  const setAuth = useSetRecoilState(authState);

  async function login(userId: string, userPassword: string) {
    const res = await authApi.login(userId, userPassword);
    const token = (res as AuthResponse).data;
    setAuth({
      token: userId,
    });
  }

  async function logout(userId: string) {
    await authApi.logout(userId);
    setAuth({
      token: "",
    });
  }

  async function refreshAccessToken() {
    const res = await authApi.refreshAccessToken();
    const token = (res as AuthResponse).data;
    console.log("refreshAccessToken token ", token);
    setAuth({
      token,
    });
  }

  return {
    login,
    logout,
    refreshAccessToken,
  };
}
