import { CiViewList } from "react-icons/ci";
import { BiBarChartSquare } from "react-icons/bi";

import { Outlet } from "react-router-dom";
import "../Styles/wishlist.css";
import { useEffect, useState } from "react";
import { IoIosList } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Wishlist() {
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [listDefaultName, setListDefaultName] = useState("");
  // const [listNames, setListNames] = useState({
  //   defaultName: "Shopping List",
  // });
  const [listName, setListName] = useState("Shopping List");
  const [hasList, setHasList] = useState(
    JSON.parse(localStorage.getItem("hasList")) || false,
  );
  const [wishlistItems, setWishlistItems] = useState([]);

  const wishlist = () => {
    const wishlist = localStorage.getItem("wishlist");
    const wishlistParsed = JSON.parse(wishlist);
    setWishlistItems(wishlistParsed);
  };
  const listNames = JSON.parse(localStorage.getItem("listNames") || "[]");

  const handleCreateList = (e) => {
    e.preventDefault();
    const listNames = JSON.parse(localStorage.getItem("listNames") || "[]");
    listNames.push(listName);
    localStorage.setItem("listNames", JSON.stringify(listNames));
    localStorage.setItem("hasList", true);
    setHasList(JSON.parse(localStorage.getItem("hasList")));
    // setHasList();
  };

  console.log(hasList);

  console.log(listName);

  useEffect(() => {
    wishlist();
  }, []);

  console.log(wishlistItems);

  return (
    <main>
      <Outlet />
      {hasList ? (
        <section className="wishlist">
          <h2 className="your-wishlist-h2">Your Lists</h2>
          <div className="wishlist-container">
            <div className="all-wishlist-container">
              {listNames.map((list) => (
                <div className="single-wishlist-container">
                  <h2 className="wishlist-name">{list}</h2>
                </div>
              ))}
            </div>
            <div className="wishlist-item-container">
              <div className="wishlist-item-header">
                <h2 className="wishlist-item-name">Shopping List</h2>
              </div>
              <div className="wishlist-item">
                <div className="wishlist-filters-container">
                  <div className="wishlist-style-container">
                    <MdGridView className="wishlist-style-icon" />
                    <IoIosList className="wishlist-style-icon" />
                  </div>
                  <div className="wishlist-filters">
                    <input
                      type="search"
                      name=""
                      id=""
                      placeholder="Search this list"
                      className="wishlist-search"
                    />
                    Sort By :{" "}
                    <select name="select" id="select" className="wishlist-sort">
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
                </div>
                <div className="all-item-container">
                  {wishlistItems.map((item) => {
                    const {
                      bookAuthor,
                      bookId,
                      bookImage,
                      bookName,
                      bookPrice,
                    } = item;
                    return (
                      <div className="single-item-container" key={bookId}>
                        <img src={bookImage} alt="" className="item-img" />
                        <div className="item-container">
                          <h2 className="item-name">{bookName}</h2>
                          <span className="item-author-span">
                            By : {bookAuthor}
                          </span>
                          <span className="item-price-span">${bookPrice}</span>
                          {/* <div className="item-quantity-container">
                            <button className="decrease-btn">-</button>
                            <input
                              type="number"
                              className="quantity-input"
                              value={1}
                            ></input>
                            <button className="increase-btn">+</button>
                          </div> */}
                          <div
                            className="btn-container"
                            style={{ marginTop: "1rem" }}
                          >
                            <button className="item-add-cart-btn">
                              Add to cart
                            </button>
                            <button className="item-delete-btn">
                              <FaRegTrashCan className="item-delete-icon" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="wishlist-footer-container">
                <div className="wishlist-footer">
                  <div className="wishlist-btn-container">
                    <button className="wishlist-remove-btn">Remove All</button>
                    <button className="wishlist-add-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                  <div className="value-container">
                    <p className="total-items-p">Total items : 0</p>
                    <p className="total-value-p">Total value : 0</p>
                  </div>
                </div>
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
                    <form
                      className="new-wishlist-form"
                      onSubmit={handleCreateList}
                    >
                      <label htmlFor="new-list" className="new-wishlist-name">
                        List name(required)
                      </label>
                      <input
                        type="text"
                        name="new-list"
                        id="new-list"
                        className="new-wishlist-input"
                        onChange={(e) => setListName(e.target.value)}
                        value={listName}
                      />
                      <div className="new-wishlist-btn-container">
                        <button
                          type="button"
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
