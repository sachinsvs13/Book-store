import { CiViewList } from "react-icons/ci";
import { BiBarChartSquare } from "react-icons/bi";

import { Outlet } from "react-router-dom";
import "../Styles/wishlist.css";
import { useState } from "react";
export default function Wishlist() {
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [listDefaultName, setListDefaultName] = useState("Shopping List");
  const [hasList, setHasList] = useState(true);
  return (
    <main>
      <Outlet />
      {hasList ? (
        <section className="wishlist">
          <h2 className="your-wishlist-h2">Your Lists</h2>
          <div className="wishlist-container">
            <div className="wishlist-name-container">
              <h2 className="wishlist-name">Shopping List</h2>
            </div>
            <div className="wishlist-item-container">
              <div className="wishlist-item-header">
                <h2 className="wishlist-item-name">Shopping List</h2>
              </div>
              <div className="wishlist-item">
                <div className="wishlist-filters-container">
                  icon icon
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search this list"
                    className="wishlist-search"
                  />
                  Sort By:
                  <select name="" id="" className="wishlist-sort">
                    <option
                      value="Most recently added"
                      selected
                      className="wishlist-sort-options"
                    >
                      Most recently added
                    </option>
                    <option
                      value="Priority (high to low)"
                      className="wishlist-sort-options"
                    >
                      Priority (high to low)
                    </option>
                    <option
                      value="Price (low to high)"
                      className="wishlist-sort-options"
                    >
                      Price (low to high)
                    </option>
                    <option
                      value="Price (hight to low)"
                      className="wishlist-sort-options"
                    >
                      Price (hight to low)
                    </option>
                  </select>
                </div>
                <div className="all-item-container">
                  <img src="" alt="" />
                  <div className="item-container">
                    <h2 className="item-name">Goodbye Eri</h2>
                    <span className="item-author-span">Tatsuki</span>
                    <span className="item-publisher-span">Tatsuki</span>
                    <span className="item-price-span">$20.33</span>
                    <div className="item-quantity-container">
                      <button className="item-quantity-add-btn">+</button>
                      <input
                        type="number"
                        className="item-quantity-number-input"
                        value={1}
                      ></input>
                      <button className="item-quantity-add-btn">-</button>
                    </div>
                    <button className="item-add-cart">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="wishlist-footer">
              <div className="wishlist-remove-container">
                <input
                  type="checkbox"
                  name="select-all"
                  id="select-all"
                  className="items-select-all-input"
                />
                <label htmlFor="select-all" className="select-all-label">
                  Select All
                </label>
                <button className="wishlist-remove-btn">Remove</button>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
              <div className="value-container">
                <p className="total-items-p">Total items : 0</p>
                <p className="total-value-p">Total value : 0</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="empty-wishlist-section">
          <h2 className="your-wishlist-h2">Your Lists</h2>
          <div className="empty-wishlist-container">
            <div className="empty-wishlist">
              <h2 className="wishlists-h2">Lists</h2>
              <h3 className="wishlists-h3">Where books and people meet</h3>
              <button
                className="create-wishlist-btn"
                onClick={() => setIsCreatingList(true)}
              >
                Create a List
              </button>
              {isCreatingList && (
                <div
                  className="new-wishlist-container"
                  // onClick={() => setIsCreatingList(false)}
                >
                  <div className="new-wishlist">
                    <div className="new-wishlist-header">
                      <h3 className="new-wishlist-h3">Create a new list</h3>
                      <p
                        className="new-wishlist-close-p"
                        onClick={() => setIsCreatingList(false)}
                      >
                        X
                      </p>
                    </div>
                    <form className="new-wishlist-form">
                      <label htmlFor="new-list" className="new-wishlist-name">
                        List name(required)
                      </label>
                      <input
                        type="text"
                        name="new-list"
                        id="new-list"
                        className="new-wishlist-input"
                        value={listDefaultName}
                      />
                      <div className="new-wishlist-btn-container">
                        <button
                          className="new-wishlist-cancel-btn"
                          onClick={() => setIsCreatingList(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="new-wishlist-create-btn"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <hr className="create-wishlist-line" />
              <section className="wishlist-uses-container">
                <div className="wishlist-uses">
                  <CiViewList className="wishlist-logo" />
                  <div className="wishlist-use-container">
                    <h3 className="wishlist-uses-h3">Save time</h3>
                    <p className="wishlist-uses-p">
                      Add your items and ideas in one location
                    </p>
                  </div>
                </div>
                <div className="wishlist-uses">
                  <BiBarChartSquare className="wishlist-logo" />
                  <div className="wishlist-use-container">
                    <h3 className="wishlist-uses-h3">Check price</h3>
                    <p className="wishlist-uses-p">
                      Check price change in one location
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
