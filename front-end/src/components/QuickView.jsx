import { useGlobalContext } from "../context/useGlobalContext";
import CreateWishList from "../components/CreateWishList";
import { Link } from "react-router-dom";
export default function QuickView({ singleBook }) {
  const {
    setIsCreatingList,
    wishListNames,
    SetSelectWishList,
    selectWishList,
    quickView,
    setQuickView,
  } = useGlobalContext();
  return (
    <>
      {quickView &&
        singleBook.map((book) => {
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

          return (
            <div className="book-quick-view-container" key={_id}>
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
                                  <h3 className="select-wishlist-body-h3">
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
                    <Link to={`/${_id}`} className="book-view-link">
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
