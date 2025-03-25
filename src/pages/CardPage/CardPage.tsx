import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../store/store";
import styles from "./index.module.scss";
import classNames from "classnames";
import BackButton from "../../ui/BackButton/BackButton";
import { deletePost } from "../../store/postSlice";
import { RoutesStore } from "../../route/AppRoutes";
import Delete from "../../assets/delete.png";
import Edit from "../../assets/edit-text.png";

const CardPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = useSelector((state: RootState) =>
    state.posts.posts.filter((item) => item.id == Number(id))
  );

  const handleDelete = () => {
    dispatch(deletePost(Number(id)));
    navigate(RoutesStore.PRODUCTS);
  };

  const handleEdit = () => {
    navigate(RoutesStore.EDIT_PRODUCT_ID(Number(id)));
  };

  if (!post) return <div>This post don't exists!</div>;
  return (
    <div className={classNames(styles.cardPage, "container")}>
      <div>
        <BackButton />
        <div>
          <div onClick={() => handleEdit()}>
            <img src={Edit} alt="#" />
          </div>
          <div onClick={() => handleDelete()}>
            <img src={Delete} alt="#" />
          </div>
        </div>
      </div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default CardPage;
