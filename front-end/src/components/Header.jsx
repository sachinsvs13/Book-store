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
        <Link to={"/login"} className="btn">
          <FaUser />
        </Link>
        <section className="login-info">
          <Link className="login-container">
            <button className="login-btn">Login in</button>
          </Link>
          <Link>
            <p className="sign-in-container">
              New to Books? <span className="sign-in">Sign in</span>
            </p>
          </Link>
          <ul>
            <Link>
              <li className="options">Personal setting</li>
            </Link>
            <Link>
              <li className="options">Your orders</li>
            </Link>
            <Link>
              <li className="options">Your wishlist</li>
            </Link>
            <Link>
              <li className="options">your address</li>
            </Link>
            <Link>
              <li className="options">Change password</li>
            </Link>
          </ul>
        </section>
        <Link to={"favorites"} className="btn">
          <span className="favorites-amount">0</span>
          <FaRegHeart />
        </Link>
        <Link to={"cart"} className="btn">
          <span className="cart-amount">0</span>
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </header>
  );
}
