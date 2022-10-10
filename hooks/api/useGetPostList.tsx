import axios from "axios";
import { useQuery } from "react-query";

import { IPostItem } from "types";

export function getUrl(tab?: string | string[]) {
  let url = "https://jsonplaceholder.typicode.com/posts";
  switch (tab) {
    case "popular":
      url += "?userId=10";
      break;
    case "notice":
      url += "?userId=5";
      break;
  }

  return url;
}

export function getPostList({ queryKey }: { queryKey: string[] }) {
  return axios.get<IPostItem[]>(queryKey[0]).then((res) => res.data);
}

export const useGetPostList = ({ activeTab }: { activeTab: string }) => {
  const { data } = useQuery<IPostItem[], unknown, IPostItem[], string>(
    getUrl(activeTab),
    getPostList,
  );

  return {
    postList: data,
  };
};
