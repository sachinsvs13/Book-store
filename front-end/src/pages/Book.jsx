import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

import "../Styles/book.css";
export default function Book() {
  const [singleBook, setSingleBook] = useState([]);
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
  const navigate = useNavigate();
  const [metaDataIndex, setMetaDataIndex] = useState([0, 1, 2, 3, 4]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [quickView, setQuickView] = useState(false);
  const [bookCategories, setBookCategories] = useState([
    {
      name: "Products related to this product",
      // Have to change later
      params: `genre=${singleBook.map((item) => item.genre)}`,
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
        const data1 = res.data.book;

        setSingleBook([data1]);
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
          name: singleBook.map((item) => item.author),
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
  }, [singleBook]);

  const createCartItems = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        singleBook.map(async (book) => {
          const { name, price, image, author } = book;
          const res = await axios.post(
            "http://localhost:3000/api/v1/cart/create",
            {
              name: name,
              price: price,
              image: image,
              author: author,
              quantity: cartQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        });
        navigate("/cart");
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleQuantityChange = (e) => {
    const number = Number(e.target.value);
    setCartQuantity(number);
  };

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

  console.log(singleBook);

  return (
    <main>
      <Outlet id="top" />

      {singleBook.map((book) => {
        const {
          author,
          averageRating,
          binding,
          description,
          dimensions,
          genre,
          image,
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

        const productDetails = [
          {
            name: "ISBN-10",
            info: isbn10,
          },
          {
            name: "ISBN-13",
            info: isbn13,
          },

          {
            name: "Pages",
            info: pages,
          },
          {
            name: "Language",
            info: language,
          },
          {
            name: "Binding",
            info: binding,
          },
          {
            name: "Imprint",
            info: publisherImprint,
          },
          {
            name: "Dimensions",
            info: dimensions,
          },
          {
            name: "Publisher",
            info: publisher,
          },
          {
            name: "Released Year",
            info: releasedYear,
          },
          {
            name: "returnable",
            info: returnable,
          },
          {
            name: "Genre",
            info: genre,
          },
          {
            name: "price",
            info: price,
          },
        ];
        const ratingSnapShot = [
          {
            starNumber: 5,
            icon: <FaStar />,
            reviewNumber: 0,
            reviewCount: 0,
            reviewSingle: reviews
              .filter((review) => review.rating === 5)
              .map((review) => review.rating),
          },
          {
            starNumber: 4,
            icon: <FaStar />,
            reviewNumber: 0,
            reviewCount: 0,
            reviewSingle: reviews
              .filter((review) => review.rating === 4)
              .map((review) => review.rating),
          },
          {
            starNumber: 3,
            icon: <FaStar />,
            reviewNumber: 0,
            reviewCount: 0,
            reviewSingle: reviews
              .filter((review) => review.rating === 3)
              .map((review) => review.rating),
          },
          {
            starNumber: 2,
            icon: <FaStar />,
            reviewNumber: 0,
            reviewCount: 0,
            reviewSingle: reviews
              .filter((review) => review.rating === 2)
              .map((review) => review.rating),
          },
          {
            starNumber: 1,
            icon: <FaStar />,
            reviewNumber: 0,
            reviewCount: 0,
            reviewSingle: reviews
              .filter((review) => review.rating === 1)
              .map((review) => review.rating),
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
          <>
            <section className="book-section" key={_id}>
              <section className="book-info-section">
                <div className="book-img-container">
                  <img src={image} alt="" className="book-single-img" />
                  <h2 className="author-h2">Author</h2>
                  <div className="author-container">
                    <img
                      src={authorData?.image}
                      alt=""
                      className="author-img"
                    />
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
                      onClick={() =>
                        setShowMoreDescription(!showMoreDescription)
                      }
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
                      Quantity :{" "}
                      <select
                        name="quantity"
                        id="quantity"
                        className="quantity-select"
                        onChange={handleQuantityChange}
                        value={cartQuantity}
                      >
                        <option
                          value="1"
                          className="quantity-option"
                          defaultValue="1"
                          name="quantity"
                        >
                          1
                        </option>
                        <option
                          value="2"
                          className="quantity-option"
                          name="quantity"
                        >
                          2
                        </option>
                        <option
                          value="3"
                          className="quantity-option"
                          name="quantity"
                        >
                          3
                        </option>
                        <option
                          value="4"
                          className="quantity-option"
                          name="quantity"
                        >
                          4
                        </option>
                        <option
                          value="5"
                          className="quantity-option"
                          name="quantity"
                        >
                          5
                        </option>
                        <option
                          value="6"
                          className="quantity-option"
                          name="quantity"
                        >
                          6
                        </option>
                        <option
                          value="7"
                          className="quantity-option"
                          name="quantity"
                        >
                          7
                        </option>
                        <option
                          value="8"
                          className="quantity-option"
                          name="quantity"
                        >
                          8
                        </option>
                        <option
                          value="9"
                          className="quantity-option"
                          name="quantity"
                        >
                          9
                        </option>
                        <option
                          value="10"
                          className="quantity-option"
                          name="quantity"
                        >
                          10
                        </option>
                      </select>
                    </span>
                    <button
                      className="add-to-cart-btn"
                      style={{ backgroundColor: "#ff2e62" }}
                      onClick={createCartItems}
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
                                index === i
                                  ? { ...category, page: 1 }
                                  : category,
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
                          image,
                          price,
                          averageRating,
                        } = item;
                        return (
                          <div key={_id} className="book-container">
                            <img src={image} alt={name} className="book-img" />
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
                              <div className="average-rating-book-container">
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
                    image,
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
                            <img src={image} alt={name} className="book-img" />
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
                <h2 className="book-product-h2">Product Details</h2>
                <div className="book-product-container">
                  {Array.from(
                    { length: Math.ceil(productDetails.length / 7) },
                    (_, groupIndex) => (
                      <div
                        className="book-product-span-container"
                        key={groupIndex}
                      >
                        {productDetails
                          .slice(groupIndex * 7, groupIndex * 7 + 7)
                          .map((details, index) => {
                            return (
                              <span
                                className="book-product-detail-span"
                                key={index}
                              >
                                <h4 style={{ display: "inline" }}>
                                  {details.name} :
                                </h4>{" "}
                                {details.info}
                              </span>
                            );
                          })}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="book-about-author-container">
                <h2 className="book-about-author-h2">About the author</h2>
                <div className="book-author-info-container">
                  {/* <div className="author-container">
                  <img src={authorData?.image} alt="" className="author-img" />
                  <Link>{author}</Link>
                </div> */}
                  <img
                    src={authorData?.image}
                    alt="Author image"
                    className="book-author-img"
                  />
                  <div className="book-author-info">
                    <h2 className="book-author-name-h2">{authorData?.name}</h2>
                    <p className="book-author-description-p">
                      {authorData?.description}
                    </p>
                    <Link>See more on author's page</Link>
                  </div>
                </div>
              </div>
              <div className="shopping-experience-container">
                <h1 className="rating-experience-h1">
                  How would you rate your experience shopping
                </h1>
                <div className="rating-selection-container">
                  <input
                    type="radio"
                    name="rating"
                    id="very-poor"
                    className="rating"
                  />
                  <label htmlFor="very-poor">Very poor</label>
                  <input
                    type="radio"
                    name="rating"
                    id="poor"
                    className="rating"
                  />
                  <label htmlFor="poor">Poor</label>
                  <input
                    type="radio"
                    name="rating"
                    id="Neutral"
                    className="rating"
                  />
                  <label htmlFor="Neutral">Neutral</label>
                  <input
                    type="radio"
                    name="rating"
                    id="good"
                    className="rating"
                  />
                  <label htmlFor="good">Good</label>
                  <input
                    type="radio"
                    name="rating"
                    id="very-good"
                    className="rating"
                  />
                  <label htmlFor="very-good">Very Good</label>
                </div>
              </div>
              <div className="reviews-container">
                <h2 className="review-h2">Customer Reviews</h2>
                <div className="average-review-container">
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
                    | {reviews.length} review review
                  </h4>
                </div>
              </div>
              <div className="rating-container">
                <h3 className="top-reviews-h3">Top Reviews</h3>
                <button className="write-review-btn">Write a Review</button>
              </div>
              <div className="rating-container">
                <div className="snapshot-container">
                  <h2 className="rating-h2">Rating Snapshot</h2>
                  <p className="filter-p">
                    Select a Row below to filter reviews
                  </p>
                  {/* Have to make new component for this p.s see layout ex */}
                  {console.log(ratingSnapShot)}
                  {ratingSnapShot.map((rating, index) => {
                    const { starNumber, reviewSingle } = rating;

                    return (
                      <div className="snapshot-rating-container" key={index}>
                        <span>{starNumber}</span>
                        {/* <span>{review.rating}</span> */}
                        <FaStar className="star-icon" />
                        <div className="snapshot-rating-number-span-container">
                          <span
                            className="snapshot-rating-number-span"
                            style={{
                              flex: ` 0 1 calc(100% * ${reviewSingle.length / reviews.length})`,
                            }}
                          ></span>
                        </div>
                        <span className="review-number-span">
                          {reviewSingle.length}
                        </span>
                      </div>
                    );
                  })}

                  {/* <div className="snapshot-rating-container">
                  <span>4</span>
                  <FaStar className="star-icon" />
                  <div className="snapshot-rating-number-span-container">
                    <span className="snapshot-rating-number-span"></span>
                  </div>
                  <span className="review-number-span">1</span>
                </div>
                <div className="snapshot-rating-container">
                  <span>3</span>
                  <FaStar className="star-icon" />
                  <div className="snapshot-rating-number-span-container">
                    <span className="snapshot-rating-number-span"></span>
                  </div>
                  <span className="review-number-span">1</span>
                </div>
                <div className="snapshot-rating-container">
                  <span>2</span>
                  <FaStar className="star-icon" />
                  <div className="snapshot-rating-number-span-container">
                    <span className="snapshot-rating-number-span"></span>
                  </div>
                  <span className="review-number-span">1</span>
                </div>
                <div className="snapshot-rating-container">
                  <span>1</span>
                  <FaStar className="star-icon" />
                  <div className="snapshot-rating-number-span-container">
                    <span className="snapshot-rating-number-span"></span>
                  </div>
                  <span className="review-number-span">1</span>
                </div> */}
                </div>
                <div className="average-rating-container">
                  <h2 className="average-rating-h2">Average Customer Rating</h2>
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
                    | {reviews.length} review review
                  </h4>
                </div>
              </div>
              <div className="review-sort-container">
                <h2 className="reviews-h2">0-0 of 0 Reviews</h2>
                <div className="wishlist-filters-container">
                  Sort By:
                  <select name="" id="" className="wishlist-sort">
                    <option
                      value="Most recently added"
                      defaultValue={"Most recently added"}
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
              {reviews.map((review) => {
                const { name, title, rating, recommend, description } = review;
                const starReviewArray = Array.from({
                  length: Math.ceil(rating),
                });
                const starReviewArray1 = Array.from({
                  length: 5,
                });
                return (
                  <section className="review-container">
                    <div className="review-profile-container">
                      <img src="" alt="" className="review-profile-img" />
                      <h2 className="review-name">{name}</h2>
                    </div>

                    <div className="review-details-container">
                      <div className="review-star-container">
                        {starReviewArray1.map((_, index) => {
                          return (
                            <React.Fragment key={index}>
                              {index < rating ? (
                                <FaStar className="star-icon" />
                              ) : (
                                <FaStar color="#adadad" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <h3 className="review-title-h3">{title}</h3>
                      <p className="review-description-p">{description}</p>
                      <div className="btn-container">
                        <button className="review-helpful-btn">Helpful</button>
                        <p className="border-line"></p>
                        <button className="review-report-btn">Report</button>
                      </div>
                    </div>
                  </section>
                );
              })}
              <div className="review-sort-container">
                <h2 className="reviews-h2">0-0 of 0 Reviews</h2>
                <div className="wishlist-filters-container"></div>
                {/* Have to add review btn later */}
                {/* {page === 1 ? (
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
              )} */}
              </div>
              <div className="browsing-history-container">
                {/* Have to add browsing history from local storage by adding items OnClick of every item with id and image */}
              </div>
            </section>
            <a href="#top" className="bac-to-top-btn">
              <div className="back-to-top-container">Back to top</div>
            </a>
          </>
        );
      })}
    </main>
  );
}
