import Header from "./components/header/Header";
import { Outlet } from "react-router";

const Loyaut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Loyaut;
