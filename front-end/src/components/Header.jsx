import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiBookmarklet } from "react-icons/gi";

export default function Header() {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"} className="logo">
          <GiBookmarklet />
        </Link>
        <h3 className="slogan">
          Where stories <span className="people-slogan">find their people</span>
        </h3>
      </div>
      <input
        type="search"
        name=""
        id=""
        className="books-search"
        placeholder="Search By title, Author, Publisher or ISBN"
      />
      <div className="btns-container">
        <div className="profile-container">
          <Link to={"/login"} className="icons">
            <FaUser />
          </Link>
          <section className="login-info">
            <Link className="login-container" to={"/login"}>
              <button className="login-btn">Login in</button>
            </Link>
            <Link className="profile-sign-in" to={"/sign-in"}>
              <p className="sign-in-container">
                New to Books? <span className="sign-in">Sign in</span>
              </p>
            </Link>
            <div className="setting-options-container">
              <ul className="settings-options">
                <Link to={"/setting"}>
                  <li className="options">Personal setting</li>
                </Link>
                <Link to={"/orders"}>
                  <li className="options">Your orders</li>
                </Link>
                <Link to={"/wishlist"}>
                  <li className="options">Your wishlist</li>
                </Link>
                <Link to={"/address"}>
                  <li className="options">your address</li>
                </Link>
                <Link to={"/Change-password"}>
                  <li className="options">Change password</li>
                </Link>
              </ul>
            </div>
          </section>
        </div>

        <Link to={"/favorites"} className="icons">
          <span className="favorites-amount">0</span>
          <FaRegHeart />
        </Link>
        <Link to={"/cart"} className="icons">
          <span className="cart-amount">0</span>
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </header>
  );
}
