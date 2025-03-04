import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import SingleUser from "./pages/single/SingleUser";
import NewProduct from "./pages/new/NewProduct";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import Customers from "./pages/customers/Customers";
import Order from "./pages/order/Order";
import "./style/dark.scss";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { DarkModeContext } from "./context/darkModeContext";
import SingleOrder from "./pages/single/SingleOrder";
import Category from "./pages/categorys/Category";
import CategoryManager from "./pages/CategoryManager/CategoryManager";
// import { SingleBedTwoTone } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users/:userId",
    element: <SingleUser />,
  },
  // {
  //   path: "/products/:productId",
  //   element: <SingleProduct />,
  // },
  {
    path: "/users",
    element: <Customers />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/orders/:id",
    element: <SingleOrder />,
  },
  {
    path: "/category/:categoryId/new",
    element: <CategoryManager />,
  },
  {
    path: "/products/:productId/new",
    element: <NewProduct title={"Add New Product"} />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
