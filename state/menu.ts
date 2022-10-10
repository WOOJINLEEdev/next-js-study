import { atom } from "recoil";
import { v1 } from "uuid";

export const menuClickState = atom({
  key: `menuClickState/${v1()}`,
  default: false,
});
