import { atom, atomFamily, selectorFamily } from "recoil";
import { v1 } from "uuid";

import { IMyComment } from "types";

export const commentCountsSelector = selectorFamily({
  key: `commentCountsSelector/${v1()}`,
  get:
    (postIdList: number[]) =>
    ({ get }) => {
      return postIdList.map((postId: number) => {
        const commentsLength = get(commentCountSelector(postId));

        return {
          postId,
          total: commentsLength,
        };
      });
    },
});

export const commentsState = atomFamily<string[], number>({
  key: `commentsState/${v1()}`,
  default: (postId) => {
    return [];
  },
});

export const myCommentsState = atom<IMyComment[]>({
  key: `myCommentsState/${v1()}`,
  default: [],
});

export const commentCountSelector = selectorFamily<number, number>({
  key: `commentCountSelector/${v1()}`,
  get:
    (postId) =>
    ({ get }) => {
      const comments = get(commentsState(postId));

      return comments.length;
    },
});
