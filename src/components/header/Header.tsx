import { NavLink } from "react-router";
import styles from "./index.module.scss";
import { RoutesStore } from "../../route/AppRoutes";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.menu}>
          <NavLink to={RoutesStore.HOME}>Главная</NavLink>
          <NavLink to={RoutesStore.PRODUCTS}>Продукты</NavLink>
          <NavLink to={RoutesStore.CREATE_PRODUCT}>
            Создать новый продукт
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
