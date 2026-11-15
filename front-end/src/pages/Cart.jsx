import { Link, Outlet } from "react-router-dom";
import { MdOutlineShield } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";

import "../Styles/cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleCartItems = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/api/v1/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.data;
        setCartItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleCartItems();
  }, []);

  console.log(cartItems);

  return (
    <>
      <Outlet />
      <main className="cart">
        {cartItems.length === 0 ? (
          <>
            <h2 className="my-cart-h2">My Shopping Cart</h2>
            <section className="empty-cart-section">
              <div className="empty-cart">
                <div className="empty-cart-reason">
                  <h1 className="empty-cart-name">Your Cart is empty</h1>
                  <Link to={"/sign-in"}>
                    <button className="sign-in-cart">
                      Sign in to see your cart
                    </button>
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
                <h2 className="recommendation">
                  See Personalized recommendations
                </h2>
                <Link to={"/login"}>
                  <button className="sign-in-btn">Sign in</button>
                </Link>
                <p className="new-customer">
                  New customer?<Link to={"/sign-in"}>Start here</Link>
                </p>
                <hr />
              </div>
            </section>
          </>
        ) : (
          <>
            <h2 className="my-cart-h2">My Shopping Cart</h2>
            <section className="all-cart-section">
              <h3 className="cart-price-h3">Price</h3>
              <div className="all-cartItem-container">
                {cartItems.cart.map((cart, index) => {
                  const { _id, name, author, price, quantity, image } = cart;
                  return (
                    <div key={index} className="single-cartItem-container">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="cartItem-select-input"
                      />
                      {/* Have to add bookId to the backend */}
                      <Link to={`/${_id}`}>
                        <img src={image} alt={name} className="cartItem-img" />
                      </Link>
                      <div className="cartItem-info-container">
                        <h2 className="cartItem-name-h2">{name}</h2>
                        <p className="cartItem-author-p">{author}</p>
                        <div className="cartItem-options-container">
                          <div className="cartItem-quantity-container">
                            <button className="cartItem-decrease-btn">-</button>
                            <span className="cartItem-quantity-span">
                              {quantity}
                            </span>
                            <button className="cartItem-increase-btn">+</button>
                          </div>
                          <hr className="line-hr" />
                          <button className="cartItem-delete-btn">
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="cartItem-price-p">$ {price}</p>
                    </div>
                  );
                })}
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
                <h2 className="recommendation">
                  See Personalized recommendations
                </h2>
                <Link to={"/login"}>
                  <button className="sign-in-btn">Sign in</button>
                </Link>
                <p className="new-customer">
                  New customer?<Link to={"/sign-in"}>Start here</Link>
                </p>
                <hr />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
