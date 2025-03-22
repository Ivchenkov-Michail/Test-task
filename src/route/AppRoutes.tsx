import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import NotPage from "../pages/NotPage";
import Loyaut from "../loyaut";
import ProductsPage from "../pages/ProductsPage";
import CardPage from "../pages/CardPage";
import CardCreatePage from "../pages/CardCreatePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Loyaut />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<CardPage />} />
        <Route path="/create-product" element={<CardCreatePage />} />
        <Route path="/*" element={<NotPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
