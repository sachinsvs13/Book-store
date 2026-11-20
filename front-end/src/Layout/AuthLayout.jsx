import { Outlet } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
export default function AuthLayout() {
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
}
