import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import myAxios from "../../Common/AxiosHelper";
import PublishedList from "./PublishedList/PublishedList";

interface Props {}

const Published = (props: Props) => {
  const [readList, setReadList] = useState([]);
  const [actualList, setActualList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [abandonedList, setAbandonedList] = useState([]);

  useEffect(() => {
    setPublished();
  }, []);

  const getPublished = async () => {
    const responsePublished = await myAxios.get(`/apps/published/published`);
    const dataPublished: any = responsePublished.data;
  };

  const setPublished = async () => {
    const published = await getPublished();

    setReadList([]);
  };

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: "; // + error.message;

  return (
    <div>
      <PublishedList />
    </div>
  );
};

export default Published;
