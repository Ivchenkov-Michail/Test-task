import { Link, useNavigate } from "react-router";
import styles from "./index.module.scss";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link to="#" onClick={() => navigate(-1)} className={styles.article}>
      Вернуться назад
    </Link>
  );
};

export default BackButton;
