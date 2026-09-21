import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <header className="login-header">
      <Link to={"/"} className="header-arrow">
        <FaArrowLeft />
      </Link>

      <Link to={"/"} className="header-name">
        <h1>Books</h1>
      </Link>
    </header>
  );
}
