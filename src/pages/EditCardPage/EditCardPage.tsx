import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { updatePost, deletePost } from "../../store/postSlice";
import CustomInput from "../../components/СustomInput/FormInputText";
import styles from "./index.module.scss";
import { RootState } from "../../store/store";
import { EditFormValues } from "./types";
import BackButton from "../../ui/BackButton/BackButton";
import { RoutesStore } from "../../route/AppRoutes";
import Delete from "../../assets/delete.png";
const EditCardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post] = useSelector((state: RootState) =>
    state.posts.posts.filter((item) => item.id == Number(id))
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>({
    defaultValues: {
      id: post.id,
      title: post.title,
      body: post.body,
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<EditFormValues> = (data) => {
    dispatch(updatePost(data));
    navigate(-1);
    reset();
  };

  const handleDelete = () => {
    dispatch(deletePost(Number(id)));
    navigate(RoutesStore.PRODUCTS);
    reset();
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className={styles.navigate}>
        <BackButton />
        <div onClick={() => handleDelete()}>
          <img src={Delete} alt="#" />
        </div>
      </div>
      <h2 className={styles.title}>Редактировать</h2>
      <form
        className={styles.subscribe}
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          placeholder="Title"
          className={styles.inputName}
          {...register("title", {
            required: "title is required",
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <CustomInput
          className={styles.inputName}
          {...register("body", {
            required: "body is required",
            maxLength: {
              value: 20,
              message: "Превышен максимум в 20 символов",
            },
          })}
          placeholder="Body"
        />
        {errors.body && <p>{errors.body.message}</p>}

        <input type="submit" value="Редактировать" />
      </form>
    </div>
  );
};

export default EditCardPage;
