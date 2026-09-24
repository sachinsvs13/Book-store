import { Link, Outlet } from "react-router-dom";
import { MdOutlineShield } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";

import "../Styles/cart.css";
export default function Cart() {
  return (
    <main className="cart">
      <Outlet />
      <h1 className="my-cart">My Shopping Cart</h1>
      <section className="empty-cart-container">
        <div className="empty-cart">
          <div className="empty-cart-reason">
            <h1 className="empty-cart-name">Your Cart is empty</h1>
            <Link to={"/sign-in"}>
              <button className="sign-in-cart">Sign in to see your cart</button>
            </Link>
            <Link to={"/login"}>
              <button className="login">Login</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="shop-container">
        <div className="shop">
          <div className="security-measures">
            <div className="security-logo-container">
              <MdOutlineShield className="security-logo" />
              <span className="security">Piracy Free</span>
            </div>
            <div className="security-logo-container">
              <CiLock className="security-logo" />
              <span className="security">Secure Payments</span>
            </div>
            <div className="security-logo-container">
              <CiDeliveryTruck className="security-logo" />
              <span className="security">Express Delivery</span>
            </div>
          </div>
          <Link to={"/"}>
            <button className="shop-now">Shop Now</button>
          </Link>
        </div>
      </section>
      <section className="recommendation-section">
        <div className="recommendation-container">
          <hr className="line" />
          <h2 className="recommendation">See Personalized recommendations</h2>
          <Link to={"/login"}>
            <button className="sign-in-btn">Sign in</button>
          </Link>
          <p className="new-customer">
            New customer?<Link to={"/sign-in"}>Start here</Link>
          </p>
          <hr />
        </div>
      </section>
    </main>
  );
}
