import { atom, selector } from "recoil";
import { v1 } from "uuid";

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
