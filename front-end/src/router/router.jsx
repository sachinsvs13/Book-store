import { createBrowserRouter } from "react-router-dom";
import LoginIn from "../pages/LoginIn";
import SignIn from "../pages/SignIn";
import Setting from "../pages/Setting";
import Wishlist from "../pages/Wishlist";
import Address from "../pages/Address";
import ChangePassword from "../pages/ChangePassword";
import Cart from "../pages/Cart";
import Book from "../pages/Book";
import Home from "../pages/Home";
import AuthorHome from "../pages/AuthorHome";
import AuthorAbout from "../pages/AuthorAbout";
import AuthorAllBooks from "../pages/AuthorAllBooks";
import AppLayout from "../Layout/AppLayout";
import AuthLayout from "../Layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "book/:id", element: <Book /> },
      { path: "author/:id", element: <AuthorHome /> },
      { path: "/author/:id/about", element: <AuthorAbout /> },
      { path: "/author/:id/allBooks", element: <AuthorAllBooks /> },
      { path: "/setting", element: <Setting /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/address", element: <Address /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginIn /> },
      { path: "/sign-in", element: <SignIn /> },
    ],
  },
]);

export default router;
