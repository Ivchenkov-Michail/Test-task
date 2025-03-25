import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import NotPage from "../pages/NotPage";
import Loyaut from "../loyaut";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import CardPage from "../pages/CardPage/CardPage";
import CardCreatePage from "../pages/CardCreatePage/CardCreatePage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";

type TProducts_id = ":id" | number;

export const RoutesStore = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCTS_ID: (id: TProducts_id) => `/products/${id}`,
  CREATE_PRODUCT: "/create-product",
  EDIT_PRODUCT_ID: (id: TProducts_id) => `/edit-product/${id}`,
  NOTPAGE: "/*",
} as const;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RoutesStore.HOME} element={<Loyaut />}>
        <Route index element={<Home />} />
        <Route path={RoutesStore.PRODUCTS} element={<ProductsPage />} />
        <Route path={RoutesStore.PRODUCTS_ID(":id")} element={<CardPage />} />
        <Route
          path={RoutesStore.EDIT_PRODUCT_ID(":id")}
          element={<EditCardPage />}
        />
        <Route path={RoutesStore.CREATE_PRODUCT} element={<CardCreatePage />} />
        <Route path={RoutesStore.NOTPAGE} element={<NotPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
