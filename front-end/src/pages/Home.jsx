import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

import { Link, Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    trending: true,
    bestSeller: true,
    newArrivals: true,
    awardWinning: true,
  });
  const [singleBook, setSingleBook] = useState([]);
  const [quickView, setQuickView] = useState(false);

  const [bookCategories, setBookCategories] = useState([
    {
      name: "Now trending",
      params: "trending=true",
      page: 1,
      bookData: [],
    },
    {
      name: "Best Seller",
      params: "bestSeller=true",
      page: 1,
      bookData: [],
    },
    {
      name: "New Arrivals",
      params: "newArrivals=true",
      page: 1,
      bookData: [],
    },
    {
      name: "Award Winning",
      params: "awardWinning=true",
      page: 1,
      bookData: [],
    },
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      await Promise.all(
        bookCategories.map(async ({ name, params, page }) => {
          try {
            const res = await axios.get(
              `http://localhost:3000/api/v1/books?${params}&limit=7&page=${page}`,
            );
            const data = await res.data.book;
            setLoading((prev) => ({ ...prev, [name]: false }));
            setBookCategories((prev) =>
              prev.map((category) =>
                category.name === name
                  ? { ...category, bookData: data }
                  : category,
              ),
            );
          } catch (error) {
            setError({ ...error });
            setLoading({ ...loading, trending: false });
          }
        }),
      );
    };
    fetchBooks();
  }, [bookCategories.map((category) => category.page).join(",")]);

  useEffect(() => {
    if (quickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [quickView]);

  const handleSingleBook = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/books/${id}`);
      const data = res.data.book;
      setSingleBook([data]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(singleBook);

  return (
    <main>
      <Outlet />
      {bookCategories.map((item, index) => {
        const { name, page, bookData } = item;
        return (
          <section className="books-section" key={index}>
            <div className="books-header-container">
              <h1 className="books-section-h1">{name}</h1>
              <div className="page-turn-container">
                <button
                  className={`${page > 1 ? "start-page-btn" : "hidden"}`}
                  onClick={() =>
                    setBookCategories((prev) =>
                      prev.map((category, i) =>
                        index === i ? { ...category, page: 1 } : category,
                      ),
                    )
                  }
                >
                  Start over
                </button>
                <p className="page-p">Page {page} of 8</p>
                {page === 1 ? (
                  <button className="arrow-icon-btn" disabled>
                    <FaArrowLeft className={"arrow-icon-disable"} />
                  </button>
                ) : (
                  <button className="arrow-icon-btn">
                    <FaArrowLeft
                      className={"arrow-icon"}
                      onClick={() =>
                        setBookCategories((prev) =>
                          prev.map((category, i) =>
                            index === i
                              ? { ...category, page: category.page - 1 }
                              : category,
                          ),
                        )
                      }
                    />
                  </button>
                )}

                {page === 8 ? (
                  <button className="arrow-icon-btn" disabled>
                    <FaArrowRight className={"arrow-icon-disable"} />
                  </button>
                ) : (
                  <button className="arrow-icon-btn">
                    <FaArrowRight
                      className={"arrow-icon"}
                      onClick={() =>
                        setBookCategories((prev) =>
                          prev.map((category, i) =>
                            index === i
                              ? { ...category, page: category.page + 1 }
                              : category,
                          ),
                        )
                      }
                    />
                  </button>
                )}

                <button className="see-all-btn">See All</button>
              </div>
            </div>
            <div className="all-book-container">
              {bookData?.map((item) => {
                const { author, name, _id, images, price, averageRating } =
                  item;
                return (
                  <div key={_id} className="book-container">
                    <img src={images[1]} alt={name} className="book-img" />
                    <button
                      className="quick-view-btn"
                      onClick={() => (
                        handleSingleBook(_id),
                        setQuickView(true)
                      )}
                    >
                      QUICK VIEW
                    </button>
                    <div className="book-details">
                      <h2 className="book-name-h2">
                        {name.length <= 20
                          ? name
                          : `${name.substring(0, 15)}...`}
                      </h2>
                      <span className="book-author-span">{author}</span>
                      <div className="average-rating-container">
                        <FaStar className="average-rating-icon" />
                        <span className="book-average-rating-span">
                          {averageRating}
                        </span>
                      </div>
                      <span className="book-price-span">${price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
      {quickView &&
        singleBook.map((book) => {
          const {
            name,
            images,
            author,
            publisher,
            price,
            releasedYear,
            description,
            _id,
          } = book;
          return (
            <div className="book-quick-view-container">
              <div className="book-quick-view">
                <span
                  className="cancel-btn"
                  onClick={() => setQuickView(false)}
                >
                  X
                </span>
                <div className="book-quick-view-details">
                  <div className="book-buy-container">
                    <img src={images[1]} alt={name} className="book-img" />
                    <div className="quantity-container">
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
                      <button className="add-to-wishlist-btn">
                        Add to Wishlist
                      </button>
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
                    <Link to={`/${_id}`}>
                      <button className="book-view-btn">
                        View Product Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </main>
  );
}
