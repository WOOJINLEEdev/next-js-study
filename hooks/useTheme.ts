import { useCallback, useEffect } from "react";
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
  }, []);

  const handleChangeTheme = useCallback(() => {
    const mode = theme === light ? "dark" : "light";
    window.localStorage.setItem("theme", mode);

    return setTheme(mode === "light" ? light : dark);
  }, [theme]);

  return [theme, handleChangeTheme];
};
