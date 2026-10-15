import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

import "../Styles/book.css";
export default function Book() {
  const [singleBook, setSingleBook] = useState([]);
  const [singleBookObj, setSingleBookObj] = useState({});
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [authorData, setAuthorData] = useState();
  const { id } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    trending: true,
    bestSeller: true,
    newArrivals: true,
    awardWinning: true,
  });
  const [metaDataIndex, setMetaDataIndex] = useState([0, 1, 2, 3, 4]);
  const [indexNumber, setIndexNumber] = useState(0);

  const [quickView, setQuickView] = useState(false);
  const [bookCategories, setBookCategories] = useState([
    {
      name: "Products related to this product",
      params: `genre=${singleBook.genre}`,
      page: 1,
      bookData: [],
    },
  ]);

  useEffect(() => {
    const fetchBooks = () => {
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
      });
    };
    fetchBooks();
  }, [bookCategories.map((category) => category.page).join(",")]);

  console.log(bookCategories);

  useEffect(() => {
    const handleSingleBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/books/${id}`);
        const data = res.data.book;
        setSingleBook([data]);
        console.log("hello world");
      } catch (error) {
        console.log(error);
      }
    };
    handleSingleBook();
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/api/v1/authors/`, {
          name: singleBookObj.author,
        });
        const data = await res.data.author;
        console.log("hello world");
        // console.log(singleBookObj);
        console.log("hello world");

        setAuthorData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthor();
  }, [singleBookObj]);
  console.log(authorData);

  // useEffect(() => {
  //   if (quickView) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => (document.body.style.overflow = "auto");
  // }, [quickView]);

  // const handleSingleBook = async (id) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/api/v1/books/${id}`);
  //     const data = res.data.book;
  //     setSingleBook([data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <main>
      <Outlet />
      {singleBook.map((book) => {
        const {
          author,
          averageRating,
          binding,
          description,
          dimensions,
          genre,
          images,
          isbn10,
          isbn13,
          language,
          name,
          pages,
          price,
          publisher,
          publisherImprint,
          releasedYear,
          returnable,
          reviews,
          _id,
        } = book;
        setSingleBookObj({
          author,
          averageRating,
          binding,
          description,
          dimensions,
          genre,
          images,
          isbn10,
          isbn13,
          language,
          name,
          pages,
          price,
          publisher,
          publisherImprint,
          releasedYear,
          returnable,
          reviews,
          _id,
        });

        const starArray = Array.from({
          // length: singleBook[0].averageRating > 4 ? 5 : 4,
          // Have to change it to 5 when the average rating is 4.5 or more
          length: Math.ceil(averageRating),
        });

        const dataItem = [
          {
            name: "ISBN-10",
            icon: <FaStar className="book-meta-icon" />,
            info: isbn10,
          },
          {
            name: "ISBN-13",
            icon: <FaStar className="book-meta-icon" />,
            info: isbn13,
          },

          {
            name: "Page Number",
            icon: <FaStar className="book-meta-icon" />,
            info: pages,
          },
          {
            name: "Language",
            icon: <FaStar className="book-meta-icon" />,
            info: language,
          },
          {
            name: "Binding",
            icon: <FaStar className="book-meta-icon" />,
            info: binding,
          },
          {
            name: "Imprint",
            icon: <FaStar className="book-meta-icon" />,
            info: publisherImprint,
          },
          {
            name: "Dimensions",
            icon: <FaStar className="book-meta-icon" />,
            info: dimensions,
          },
          {
            icon: <FaStar className="book-meta-icon" />,
            info: "See all details",
          },
        ];
        const handleLeftAdd = () => {
          setMetaDataIndex((prev) => prev.map((item) => item - 1));
          if (metaDataIndex.map((data, index) => index === indexNumber)) {
            // console.log(index)
            setMetaDataIndex((prev) =>
              prev.map((data, index) => {
                if (index === indexNumber) {
                  return dataItem.length - 1;
                } else {
                  return data;
                }
              }),
            );
            console.log(indexNumber);
            setIndexNumber((prev) => prev + 1);
            if (indexNumber === 7) {
              setIndexNumber(0);
            }
          }
        };
        const handleRightAdd = () => {
          setMetaDataIndex((prev) => prev.map((item) => item + 1));
          if (metaDataIndex.map((data) => data === 7)) {
            setMetaDataIndex((prev) =>
              prev.map((data, index) => {
                if (index === dataItem.length - 1) {
                  return index + 1;
                } else {
                  return data;
                }
              }),
            );
          }
          // if (metaData === data.length - 1) {
          //   setMetaData(0);
          // }
        };

        return (
          <section className="book-section" key={_id}>
            <section className="book-info-section">
              <div className="book-img-container">
                <img src={images[0]} alt="" className="book-single-img" />
                <h2 className="author-h2">Authors</h2>
                <div className="author-container">
                  <img src={images[1]} alt="" className="author-img" />
                  <Link>{author}</Link>
                </div>
              </div>
              <div className="book-details-container">
                <h2 className="book-single-name-h2">
                  {name}
                  <span className="book-binding-span"> ({binding}) </span>
                  <span className="book-released-year-span">
                    | Released year : {releasedYear}
                  </span>
                </h2>
                <p className="book-info-p">
                  By: <Link>{author}</Link> (author) | publisher:{" "}
                  <Link>{publisher}</Link> | Publisher Imprint:{" "}
                  {publisherImprint}
                </p>
                <h4 className="book-average-rating-h4">
                  {averageRating}{" "}
                  {starArray.map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        {index === starArray.length - 1 ? (
                          <FaStarHalfAlt className="star-icon" />
                        ) : (
                          <FaStar className="star-icon" />
                        )}
                      </React.Fragment>
                    );
                  })}
                  | {reviews.length} review
                </h4>
                <span className="book-price-span">$ {price}</span>
                <span className="book-available-span">Available</span>
                <span className="book-ship-within-span">
                  Ships in 1-2 Business days
                </span>
                <div className="book-about-container">
                  <h3 className="book-about-h3">About the Book</h3>
                  <p
                    className={`${showMoreDescription ? "book-more-description-p" : "book-description-p"}`}
                  >
                    {showMoreDescription
                      ? description
                      : description.substring(0, 240)}
                  </p>
                  <button
                    className="show-btn"
                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                  >
                    {`${showMoreDescription ? "Read less" : "Read more"}`}
                  </button>
                </div>
                <div className="book-meta-details-container">
                  <FaArrowLeft onClick={handleLeftAdd} />
                  {dataItem.map((data, index) => {
                    const { name, icon, info } = data;

                    if (metaDataIndex.includes(index)) {
                      return (
                        <div className="book-meta-details" key={index}>
                          <h4 className="book-meta-name">{name}</h4>
                          {icon}
                          <h4 className="book-meta-info">{info}</h4>
                        </div>
                      );
                    }
                  })}
                  <FaArrowRight onClick={handleRightAdd} />
                </div>
              </div>
              <div className="quantity-main-container">
                <div className="quantity-container">
                  <span className="quantity-span">
                    Quantity :
                    <select name="" id="" className="quantity-select">
                      <option
                        value="1"
                        className="quantity-option"
                        defaultValue={1}
                      >
                        1
                      </option>
                      <option value="2" className="quantity-option">
                        2
                      </option>
                      <option value="3" className="quantity-option">
                        3
                      </option>
                      <option value="4" className="quantity-option">
                        4
                      </option>
                      <option value="5" className="quantity-option">
                        5
                      </option>
                      <option value="6" className="quantity-option">
                        6
                      </option>
                      <option value="7" className="quantity-option">
                        7
                      </option>
                      <option value="8" className="quantity-option">
                        8
                      </option>
                      <option value="9" className="quantity-option">
                        9
                      </option>
                      <option value="10" className="quantity-option">
                        10
                      </option>
                    </select>
                  </span>
                  <button
                    className="add-to-cart-btn"
                    style={{ backgroundColor: "#ff2e62" }}
                  >
                    Add to Cart
                  </button>
                  <button className="Buy-now-btn">Buy now</button>
                  <button className="add-to-wishlist-btn">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </section>

            {bookCategories.map((item, index) => {
              const { name, page, bookData } = item;
              return (
                <section className="books-section" key={index}>
                  <div
                    className="books-header-container"
                    style={{ marginLeft: "0px" }}
                  >
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
                      const {
                        author,
                        name,
                        _id,
                        images,
                        price,
                        averageRating,
                      } = item;
                      return (
                        <div key={_id} className="book-container">
                          <img
                            src={images[1]}
                            alt={name}
                            className="book-img"
                          />
                          <button
                            className="quick-view-btn"
                            onClick={() =>
                              // handleSingleBook(_id),
                              setQuickView(true)
                            }
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
                          <img
                            src={images[1]}
                            alt={name}
                            className="book-img"
                          />
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
                            <button className="add-to-cart-btn">
                              Add to Cart
                            </button>
                            <button className="add-to-wishlist-btn">
                              Add to Wishlist
                            </button>
                          </div>
                        </div>
                        <div className="book-info-container">
                          <h2 className="book-price-h2">Price : $ {price}</h2>
                          <h2 className="book-name-h2">Title : {name}</h2>
                          <p className="book-info">
                            By: {author} (author) | publisher: {publisher} |
                            Released: {releasedYear}
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
                  </div>
                );
              })}
            <div className="book-product-details-container">
              <h3 className="book-product-h3">Product Details</h3>
              <span className="book-product-detail-span">
                ISBN-10: {singleBook.ISBN10}
              </span>
            </div>
            <div className="book-about-author-container">
              <img src="" alt="" className="book-author-img" />
              <div className="book-author-info">
                <h2 className="book-author-name-h2">{singleBook.author}</h2>
                <p className="book-author-description-p">
                  {singleBook.description}
                </p>
                <Link>See more on author's page</Link>
              </div>
            </div>
            <div className="shopping-experience-container">
              <h3 className="rating-experience-h3">
                How would you rate your experience shopping
              </h3>
              <input
                type="radio"
                name="very-poor"
                id="very-poor"
                className="rating"
              />
              <label htmlFor="very-poor">Very poor</label>
              <input type="radio" name="poor" id="poor" className="rating" />
              <label htmlFor="poor">poor</label>
              <input
                type="radio"
                name="Neutral"
                id="Neutral"
                className="rating"
              />
              <label htmlFor="Neutral">Neutral</label>
              <input type="radio" name="good" id="good" className="rating" />
              <label htmlFor="good">Good</label>
              <input
                type="radio"
                name="very-good"
                id="very-good"
                className="rating"
              />
              <label htmlFor="very-good">Very Good</label>
            </div>
            <div className="reviews-container">
              <h1 className="review-h1">Customer Reviews</h1>
              <div className="average-review-container">
                <h4 className="book-average-rating-h4">
                  {singleBook.averageRating} <FaStar />|{singleBook.reviews}
                  review
                </h4>
              </div>
            </div>
            <div className="rating-container">
              <h1 className="top-reviews-h1">Top Reviews</h1>
              <button className="write-review-btn">Write a Review</button>
            </div>
            <div className="rating-container">
              <div className="snapshot-container">
                <h1 className="rating-h1">Rating Snapshot</h1>
                <p className="filter-p">Select a Row below to filter reviews</p>
                {/* Have to make new component for this p.s see layout ex */}
                <div className="snapshot-rating-container">
                  <span>5</span>
                  <FaStar />
                  <span className="snapshot-rating-number-span"></span>
                  <span className="review-number-span">1</span>
                </div>
              </div>
              <div className="average-rating-container">
                <h1 className="average-rating-h1">Average Customer Rating</h1>
                <h4 className="book-average-rating-h4">
                  {singleBook.averageRating} <FaStar />|{singleBook.reviews}
                  review
                </h4>
              </div>
            </div>
            <div className="review-sort-container">
              <h1 className="reviews-h1">1-4 of 8 Reviews</h1>
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
            </div>
            <div className="view-review-container"></div>
          </section>
        );
      })}
    </main>
  );
}
