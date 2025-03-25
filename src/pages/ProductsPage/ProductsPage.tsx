import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { fetchPosts } from "../../store/postSlice";

import useFilterPost from "../../hooks/useFilterPost";
import { ESort, setFavorite, setSortBy, View } from "../../store/filterSlice";

const ProductsPage = () => {
  const { list } = useFilterPost();
  const { view, sortBy } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, likes } = useSelector(
    (state: RootState) => state.posts
  );
  useEffect(() => {
    if (!sessionStorage.getItem("products")) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className={styles.filters}>
        <select
          className={styles.select}
          name="liked"
          id="liked"
          onChange={(e) => dispatch(setFavorite(e.target.value as View))}
          value={view}
        >
          <option value={View.ALL}>Всё</option>
          <option value={View.Favorite}>Избранное</option>
        </select>

        <select
          name="sortBy"
          id="sortBy"
          onChange={(e) => dispatch(setSortBy(e.target.value as ESort))}
          className={styles.select}
          value={sortBy}
        >
          <option value={ESort.NONE}>По Умолчанию</option>
          <option value={ESort.ID}>По ID</option>
          <option value={ESort.TITLE}>По заголовку</option>
        </select>
      </div>

      <div className={styles.items}>
        {list.map((item) => (
          <ProductItem
            key={item.id}
            {...item}
            isLiked={likes.find((like) => like == item.id) ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
