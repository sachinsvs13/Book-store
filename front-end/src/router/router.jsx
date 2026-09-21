import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginIn from "../pages/LoginIn";
import SignIn from "../pages/SignIn";
import Setting from "../pages/Setting";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Address from "../pages/Address";
import ChangePassword from "../pages/ChangePassword";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart";
import Header from "../components/Header";
import LoginHeader from "../components/LoginHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/login",
    element: <LoginIn />,
    children: [{ index: true, Component: LoginHeader }],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    children: [{ index: true, Component: LoginHeader }],
  },
  {
    path: "/setting",
    element: <Setting />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/orders",
    element: <Orders />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/address",
    element: <Address />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/favorites",
    element: <Favorites />,
    children: [{ index: true, Component: Header }],
  },
  {
    path: "/cart",
    element: <Cart />,
    children: [{ index: true, Component: Header }],
  },
]);

export default router;
