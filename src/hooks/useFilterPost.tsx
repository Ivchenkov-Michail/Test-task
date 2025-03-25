import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ESort, View } from "../store/filterSlice";
import { Post } from "../store/types";

export interface IFilterResult {
  list: Post[];
}

const useFilterPost = (): IFilterResult => {
  const { posts: searchedPosts, likes } = useSelector(
    (state: RootState) => state.posts
  );
  const { sortBy, view } = useSelector((state: RootState) => state.filter);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Мемоизация сортировки
  const sortedPosts = useMemo(() => {
    if (sortBy === ESort.TITLE) {
      return [...searchedPosts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === ESort.ID) {
      return [...searchedPosts].sort((a, b) => a.id - b.id);
    }
    return [...searchedPosts];
  }, [searchedPosts, sortBy]);

  // Мемоизация фильтрации по лайкам
  const filteredAndSortedPosts = useMemo(() => {
    if (view === View.Favorite) {
      const likedFilter = new Set(likes);
      return sortedPosts.filter((item) => likedFilter.has(item.id));
    }
    return sortedPosts;
  }, [sortedPosts, view, likes]);

  // Обновляем состояние только при изменении отфильтрованного списка
  useEffect(() => {
    setFilteredPosts(filteredAndSortedPosts);
  }, [filteredAndSortedPosts]);

  return { list: filteredPosts };
};

export default useFilterPost;
