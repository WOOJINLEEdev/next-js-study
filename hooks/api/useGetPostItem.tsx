import axios from "axios";
import { useQuery } from "react-query";

import { IPostItem } from "types";

const useGetPostItem = (id: string | string[] | undefined) => {
  const { data, isLoading } = useQuery(
    ["post", id],
    () => {
      return axios
        .get<IPostItem>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.data);
    },
    {
      enabled: Boolean(id),
    },
  );

  return {
    data,
    isLoading,
  };
};

export default useGetPostItem;
