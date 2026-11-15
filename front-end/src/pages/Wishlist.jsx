import { CiViewList } from "react-icons/ci";
import { BiBarChartSquare } from "react-icons/bi";

import { Outlet } from "react-router-dom";
import "../Styles/wishlist.css";
import { useEffect, useState } from "react";
import { IoIosList } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import CreateWishList from "../components/CreateWishList";
import { useGlobalContext } from "../context/useGlobalContext";

export default function Wishlist() {
  // const [isCreatingList, setIsCreatingList] = useState(false);
  // const [listDefaultName, setListDefaultName] = useState("");
  // const [listNames, setListNames] = useState({
  //   defaultName: "Shopping List",
  // });
  const { hasList, wishListNames, setIsCreatingList } = useGlobalContext();
  const [isList, setIsList] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistNamesIndex, setWishlistNamesIndex] = useState(0);
  const [items, setItems] = useState(() => {
    const wishlist = localStorage.getItem(wishListNames[wishlistNamesIndex]);
    return wishlist ? JSON.parse(wishlist) : [];
  });

  const handleDeleteWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishListNames"));

    const wishlistIndex = wishlist[wishlistNamesIndex];

    const wishlistItems = JSON.parse(localStorage.getItem(wishlistIndex));

    const specificWishlist = wishlistItems.filter((i) => i.bookId !== id);

    localStorage.setItem(wishlistIndex, JSON.stringify(specificWishlist));

    const wishlistItemsUpdate = JSON.parse(localStorage.getItem(wishlistIndex));

    setWishlistItems(wishlistItemsUpdate);
  };

  const price = wishlistItems
    .map((item) => item.bookPrice)
    .reduce((acc, price) => acc + price, 0);

  // useEffect(() => {
  //   if (items?.length === 0) {
  //     localStorage.removeItem(wishListNames[wishlistNamesIndex]);
  //     const wishlist = JSON.parse(localStorage.getItem("wishListNames"));
  //     const wishlistIndex = wishlist[wishlistNamesIndex];
  //     const specificWishlist = wishlist.filter((i) => i !== wishlistIndex);
  //     localStorage.setItem("wishListNames", JSON.stringify(specificWishlist));
  //   } else {
  //     localStorage.setItem(
  //       wishListNames[wishlistNamesIndex],
  //       JSON.stringify(items),
  //     );
  //   }
  // }, [items]);
  const wishlist = () => {
    const wishlist = localStorage.getItem(wishListNames[wishlistNamesIndex]);
    const wishlistParsed = JSON.parse(wishlist);
    setWishlistItems(wishlistParsed);
  };

  useEffect(() => {
    wishlist();
  }, [wishlistNamesIndex]);

  return (
    <>
      <Outlet />
      <main>
        {hasList ? (
          <section className="wishlist">
            <h2 className="your-wishlist-h2">Your Lists</h2>
            <div className="wishlist-container">
              <div className="all-wishlist-container">
                {wishListNames.map((list, index) => (
                  <div
                    className={
                      wishlistNamesIndex === index
                        ? "single-wishlist-container active"
                        : "single-wishlist-container"
                    }
                    key={index}
                  >
                    <h2
                      className="wishlist-name"
                      onClick={() => setWishlistNamesIndex(index)}
                    >
                      {list}
                    </h2>
                  </div>
                ))}
              </div>
              <div className="wishlist-item-container">
                <div className="wishlist-item-header">
                  <h2 className="wishlist-item-name">Shopping List</h2>
                  <button
                    className={"wishlist-item-create-btn"}
                    onClick={() => setIsCreatingList(true)}
                  >
                    Create a List
                  </button>
                  <CreateWishList />
                </div>
                <div className="wishlist-item">
                  <div className="wishlist-filters-container">
                    <div className="wishlist-style-container">
                      <MdGridView
                        className={`${isList ? "wishlist-style-icon" : "wishlist-style-icon active-borderBottom"}`}
                        onClick={() => setIsList(false)}
                      />
                      <IoIosList
                        className={`${isList ? "wishlist-style-icon active-borderBottom" : "wishlist-style-icon"}`}
                        onClick={() => setIsList(true)}
                      />
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
                      <select
                        name="select"
                        id="select"
                        className="wishlist-sort"
                      >
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
                  {isList ? (
                    <div className="all-item-list-container">
                      {wishlistItems?.map((item) => {
                        const {
                          bookAuthor,
                          bookId,
                          bookImage,
                          bookName,
                          bookPrice,
                        } = item;
                        return (
                          <div
                            className="single-item-list-container"
                            key={bookId}
                          >
                            <img
                              src={bookImage}
                              alt=""
                              className="item-list-img"
                            />
                            <div className="item-list-container">
                              <h2 className="item-list-name">{bookName}</h2>
                              <span className="item-list-author-span">
                                By : {bookAuthor}
                              </span>
                              <span className="item-list-price-span">
                                ${bookPrice}
                              </span>
                              <div
                                className="single-item-list-btn-container"
                                style={{ marginTop: "1rem" }}
                              >
                                <button className="item-list-add-cart-btn">
                                  Add to cart
                                </button>
                                <button
                                  className="item-list-delete-btn"
                                  onClick={() => handleDeleteWishlist(bookId)}
                                >
                                  <FaRegTrashCan className="item-list-delete-icon" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="all-item-grid-container">
                      {wishlistItems?.map((item) => {
                        const {
                          bookAuthor,
                          bookId,
                          bookImage,
                          bookName,
                          bookPrice,
                        } = item;
                        return (
                          <div
                            className="single-item-grid-container"
                            key={bookId}
                          >
                            <img
                              src={bookImage}
                              alt=""
                              className="item-grid-img"
                            />
                            <div className="item-grid-container">
                              <h2 className="item-grid-name">{bookName}</h2>
                              <span className="item-grid-author-span">
                                By : {bookAuthor}
                              </span>
                              <span className="item-grid-price-span">
                                ${bookPrice}
                              </span>
                              <div
                                className="single-item-grid-btn-container"
                                style={{ marginTop: "1rem" }}
                              >
                                <button className="item-grid-add-cart-btn">
                                  Add to cart
                                </button>
                                <button
                                  className="item-grid-delete-btn"
                                  onClick={() => handleDeleteWishlist(bookId)}
                                >
                                  <FaRegTrashCan className="item-grid-delete-icon" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="wishlist-footer-container">
                  <div className="wishlist-footer">
                    <div className="wishlist-btn-container">
                      <button className="wishlist-remove-btn">
                        Remove All
                      </button>
                      <button className="wishlist-add-cart-btn">
                        Add to Cart
                      </button>
                    </div>
                    <div className="value-container">
                      <p className="total-items-p">
                        Total items :{" "}
                        <span className="bold">{wishlistItems.length}</span>
                      </p>
                      <p className="total-value-p">
                        Total value : <span className="bold">$ {price}</span>
                      </p>
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
                {/* <button
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
              )} */}
                <button
                  className={"create-wishlist-btn"}
                  onClick={() => setIsCreatingList(true)}
                >
                  Create a List
                </button>
                <CreateWishList />
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
    </>
  );
}
