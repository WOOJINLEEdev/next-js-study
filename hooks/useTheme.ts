import { useEffect } from "react";
import { useRecoilState, atom } from "recoil";

import { dark, light } from "styles/theme";

const isServer = typeof window === "undefined";

export const themeStatus = atom({
  key: "themeStatus",
  default: light,
});

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeStatus);

  useEffect(() => {
    if (!isServer) {
      const localTheme = window.localStorage.getItem("theme");

      setTheme(localTheme === "light" ? light : dark);
    }
  }, [setTheme]);

  return theme;
};
