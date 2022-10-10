import { useEffect } from "react";
import { useRecoilState, atom } from "recoil";
import { v1 } from "uuid";

import { dark, light } from "styles/theme";

const isServer = typeof window === "undefined";

export const themeState = atom({
  key: `themeState/${v1()}`,
  default: light,
});

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    if (!isServer) {
      const localTheme = window.localStorage.getItem("theme");

      setTheme(localTheme === "light" ? light : dark);
    }
  }, [setTheme]);

  return theme;
};
