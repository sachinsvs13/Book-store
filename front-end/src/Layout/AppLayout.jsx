// import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
