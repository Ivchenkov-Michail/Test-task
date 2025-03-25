import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/СustomInput/FormInputText";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { FormValues } from "./types";
import { addPost } from "../../store/postSlice";
import BackButton from "../../ui/BackButton/BackButton";
import { useNavigate } from "react-router";

const CardCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addPost(data));
    reset();
    navigate(-1);
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <BackButton />
      <h2 className={styles.title}>Создать</h2>
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

        <input type="submit" value="Создать" />
      </form>
    </div>
  );
};

export default CardCreatePage;
