import { useGlobalContext } from "../context/useGlobalContext";
import CreateWishList from "../components/CreateWishList";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
export default function QuickView({ singleBook, width, height }) {
  const {
    setIsCreatingList,
    wishListNames,
    SetSelectWishList,
    selectWishList,
    quickView,
    setQuickView,
  } = useGlobalContext();

  const boxRef = useRef(null);
  const [rect, setRect] = useState({ width: 0, height: 0, top: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const { width, height, top } = boxRef.current.getBoundingClientRect();
        setRect({ width, height, top });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectWishlist = (selectName) => {
    singleBook.map((book) => {
      const { image, _id, name, author, price } = book;

      const wishlist = JSON.parse(localStorage.getItem(selectName) || "[]");

      const wishlistObj = {
        bookImage: image,
        bookId: _id,
        bookName: name,
        bookAuthor: author,
        bookPrice: price,
      };

      const uniqueWishlistSet = new Set([
        ...wishlist.map((item) => JSON.stringify(item)),
        JSON.stringify(wishlistObj),
      ]);
      const uniqueWishlist = Array.from(uniqueWishlistSet).map((item) =>
        JSON.parse(item),
      );
      localStorage.setItem(selectName, JSON.stringify(uniqueWishlist));
    });
    setTimeout(() => {
      SetSelectWishList(!selectWishList);
      setTimeout(() => {
        setQuickView(false);
      }, 250);
    }, 250);
  };

  return (
    <>
      {quickView &&
        singleBook?.map((book) => {
          const {
            name,
            image,
            author,
            publisher,
            price,
            releasedYear,
            description,
            _id,
          } = book;
          // console.log(width);
          // console.log(height);

          return (
            <div
              ref={boxRef}
              className="book-quick-view-container"
              key={_id}
              // style={{ width: `${width}px`, height: `${height}px` }}
              // style={{
              //   width: `${rect.width}px`,
              //   height: `${rect.height + Math.round(rect.top)}px`,
              // }}
            >
              Width: {rect.width}px | Height: {rect.height}px | Distance from
              top: {Math.round(rect.top)}px
              <div className="book-quick-view">
                <span
                  className="cancel-btn"
                  onClick={() => {
                    setQuickView(false);
                    SetSelectWishList(false);
                  }}
                >
                  X
                </span>
                <div className="book-quick-view-details">
                  <div className="book-buy-container">
                    <img src={image} alt={name} className="book-img" />
                    <div className="quantity-quick-container">
                      <button className="decrease-btn">-</button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={1}
                      />
                      <button className="increase-btn">+</button>
                    </div>
                    <div className="btn-container">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      {wishListNames.length ? (
                        <button
                          className="add-to-wishlist-btn"
                          onClick={() => {
                            SetSelectWishList(!selectWishList);
                          }}
                        >
                          Add to Wishlist
                        </button>
                      ) : (
                        <button
                          className="add-to-wishlist-btn"
                          onClick={() => {
                            // have to add it in the globalContext so it uses both in here and CreateWishList.jsx
                            SetSelectWishList(!selectWishList);
                            setIsCreatingList(true);
                          }}
                        >
                          Add to Wishlist
                        </button>
                      )}

                      {console.log(wishListNames)}
                      {console.log(selectWishList)}
                      {selectWishList && wishListNames.length ? (
                        <section className="select-WishList-section">
                          <div className="select-wishlist-header-container">
                            <h3 className="select-wishlist-header-h3">
                              Select your wishlist
                            </h3>
                            <p
                              className="select-wishlist-add"
                              onClick={() => setIsCreatingList(true)}
                            >
                              +
                            </p>
                          </div>
                          <div className="select-wishlist-body-container">
                            {wishListNames.map((list) => {
                              return (
                                <div className="select-wishlist-single-container">
                                  {/* select the wishlist name */}
                                  <h3
                                    className="select-wishlist-body-h3"
                                    onClick={() => handleSelectWishlist(list)}
                                  >
                                    {list}
                                  </h3>
                                </div>
                              );
                            })}
                          </div>
                        </section>
                      ) : null}
                    </div>
                  </div>
                  <div className="book-info-container">
                    <h2 className="book-price-h2">Price : $ {price}</h2>
                    <h2 className="book-name-h2">Title : {name}</h2>
                    <p className="book-info">
                      By: {author} (author) | publisher: {publisher} | Released:{" "}
                      {releasedYear}
                    </p>
                    <p className="book-description">{description}</p>
                    <Link to={`book/${_id}`} className="book-view-link">
                      <button className="book-view-btn">
                        View Product Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <CreateWishList singleBook={singleBook} />
            </div>
          );
        })}
    </>
  );
}
