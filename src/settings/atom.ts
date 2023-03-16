import { atom } from "recoil";

const chapterState = atom({
  key: "chapterState",
  default: Array.from({ length: 40 }, () => false),
});

export { chapterState };
