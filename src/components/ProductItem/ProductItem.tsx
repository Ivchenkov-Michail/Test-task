import { FC } from "react";
import { Post } from "../../store/types";
import { useDispatch } from "react-redux";
import { deletePost, toggleLikedPost } from "../../store/postSlice";
import Delete from "../../assets/delete.png";
import Edit from "../../assets/edit-text.png";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { RoutesStore } from "../../route/AppRoutes";
interface IProps extends Post {
  isLiked: boolean;
}

const ProductItem: FC<IProps> = ({ id, title, isLiked }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likedClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(toggleLikedPost(id));
  };

  const deleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deletePost(id));
  };
  const handleClick = () => {
    navigate(RoutesStore.PRODUCTS_ID(id));
  };
  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(RoutesStore.EDIT_PRODUCT_ID(id));
  };
  return (
    <div className={styles.item} onClick={() => handleClick()}>
      <div>
        <div>
          <svg
            onClick={(e) => likedClick(e)}
            viewBox="0 0 24 24"
            fill={isLiked ? "black" : "white"}
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21s-6-4.35-9-7.88C1 10.73 1 7.6 3.05 5.55 4.81 3.79 7.7 4.02 9.35 5.7L12 8.5l2.65-2.8c1.65-1.68 4.54-1.91 6.3-.15C23 7.6 23 10.73 21 13.12c-3 3.53-9 7.88-9 7.88z" />
          </svg>
        </div>
        <div onClick={(e) => handleEdit(e)}>
          <img src={Edit} alt="#" />
        </div>
        <div onClick={(e) => deleteClick(e)}>
          <img src={Delete} alt="#" />
        </div>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default ProductItem;
