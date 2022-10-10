import { useSetRecoilState } from "recoil";

import authApi from "pages/api/auth";

import { authState } from "state/auth";

interface AuthResponse {
  data: string;
}

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
