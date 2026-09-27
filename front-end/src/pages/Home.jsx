import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

import { Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [bookData, setBookData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    trending: true,
    bestSeller: true,
    newArrivals: true,
    awardWinning: true,
  });
  const [pageNumber, setPageNumber] = useState({
    trending: 1,
    bestSeller: 1,
    newArrivals: 1,
    awardWinning: 1,
  });

  const [categories, setCategories] = useState([
    {
      name: "trending",
      params: "trending=true",
      page: pageNumber.trending,
      trending: [],
    },
    {
      name: "bestSeller",
      params: "bestSeller=true",
      page: pageNumber.bestSeller,
      bestSeller: [],
    },
    {
      name: "newArrivals",
      params: "newArrivals=true",
      page: pageNumber.newArrivals,
      newArrivals: [],
    },
    {
      name: "awardWinning",
      params: "awardWinning=true",
      page: pageNumber.awardWinning,
      awardWinning: [],
    },
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      await Promise.all(
        categories.map(async ({ name, params, page }) => {
          try {
            const res = await axios.get(
              `http://localhost:3000/api/v1/books?${params}&limit=7&page=${page}`,
            );
            const data = await res.data.book;
            setLoading((prev) => ({ ...prev, [name]: false }));
            setCategories((prev) => ({ ...prev, [name]: data }));
          } catch (error) {
            setError({ ...error });
            setLoading({ ...loading, trending: false });
          }
        }),
      );
    };
    fetchBooks();
  }, [pageNumber]);

  // console.log(bookData.filter((book) => book.trending === true));

  // const bestSeller = bookData.filter((book) => book.bestSeller === true);
  // console.log(bestSeller.filter((book) => book.bestSeller === "true"));

  console.log(categories);
  console.log(pageNumber);

  return (
    <main>
      <Outlet />
      {/* <section className="books-section">
        <div className="books-header-container">
          <h1 className="books-section-h1">Now Trending</h1>
          <div className="page-turn-container">
            <button
              className={`${pageNumber.trending > 1 ? "start-page-btn" : "hidden"}`}
              onClick={() =>
                setPageNumber({
                  ...pageNumber,
                  trending: 1,
                })
              }
            >
              Start over
            </button>
            <p className="page-p">Page {pageNumber.trending} of 8</p>
            {pageNumber.trending === 1 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowLeft
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowLeft
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            )}

            {pageNumber.trending === 8 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowRight
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowRight
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            )}

            <button className="see-all-btn">See All</button>
          </div>
        </div>
        <div className="all-book-container">
          {bookData.trending.map((item) => {
            const { author, name, _id, images, price, averageRating } = item;
            return (
              <div key={_id} className="book-container">
                <img src={images[1]} alt={name} className="book-img" />
                <div className="book-details">
                  <h2 className="book-name-h2">
                    {name.length <= 20 ? name : `${name.substring(0, 15)}...`}
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
      <section className="books-section">
        <div className="books-header-container">
          <h1 className="books-section-h1">Now Trending</h1>
          <div className="page-turn-container">
            <button
              className={`${pageNumber.trending > 1 ? "start-page-btn" : "hidden"}`}
              onClick={() =>
                setPageNumber({
                  ...pageNumber,
                  trending: 1,
                })
              }
            >
              Start over
            </button>
            <p className="page-p">Page {pageNumber.trending} of 8</p>
            {pageNumber.trending === 1 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowLeft
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowLeft
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            )}

            {pageNumber.trending === 8 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowRight
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowRight
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            )}

            <button className="see-all-btn">See All</button>
          </div>
        </div>
        <div className="all-book-container">
          {bookData.trending.map((item) => {
            const { author, name, _id, images, price, averageRating } = item;
            return (
              <div key={_id} className="book-container">
                <img src={images[1]} alt={name} className="book-img" />
                <div className="book-details">
                  <h2 className="book-name-h2">
                    {name.length <= 20 ? name : `${name.substring(0, 15)}...`}
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
      <section className="books-section">
        <div className="books-header-container">
          <h1 className="books-section-h1">Now Trending</h1>
          <div className="page-turn-container">
            <button
              className={`${pageNumber.trending > 1 ? "start-page-btn" : "hidden"}`}
              onClick={() =>
                setPageNumber({
                  ...pageNumber,
                  trending: 1,
                })
              }
            >
              Start over
            </button>
            <p className="page-p">Page {pageNumber.trending} of 8</p>
            {pageNumber.trending === 1 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowLeft
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowLeft
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            )}

            {pageNumber.trending === 8 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowRight
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowRight
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            )}

            <button className="see-all-btn">See All</button>
          </div>
        </div>
        <div className="all-book-container">
          {bookData.trending.map((item) => {
            const { author, name, _id, images, price, averageRating } = item;
            return (
              <div key={_id} className="book-container">
                <img src={images[1]} alt={name} className="book-img" />
                <div className="book-details">
                  <h2 className="book-name-h2">
                    {name.length <= 20 ? name : `${name.substring(0, 15)}...`}
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
      <section className="books-section">
        <div className="books-header-container">
          <h1 className="books-section-h1">Now Trending</h1>
          <div className="page-turn-container">
            <button
              className={`${pageNumber.trending > 1 ? "start-page-btn" : "hidden"}`}
              onClick={() =>
                setPageNumber({
                  ...pageNumber,
                  trending: 1,
                })
              }
            >
              Start over
            </button>
            <p className="page-p">Page {pageNumber.trending} of 8</p>
            {pageNumber.trending === 1 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowLeft
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowLeft
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending - 1,
                    })
                  }
                />
              </button>
            )}

            {pageNumber.trending === 8 ? (
              <button className="arrow-icon-btn" disabled>
                <FaArrowRight
                  className={"arrow-icon-disable"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            ) : (
              <button className="arrow-icon-btn">
                <FaArrowRight
                  className={"arrow-icon"}
                  onClick={() =>
                    setPageNumber({
                      ...pageNumber,
                      trending: pageNumber.trending + 1,
                    })
                  }
                />
              </button>
            )}

            <button className="see-all-btn">See All</button>
          </div>
        </div>
        <div className="all-book-container">
          {bookData.trending.map((item) => {
            const { author, name, _id, images, price, averageRating } = item;
            return (
              <div key={_id} className="book-container">
                <img src={images[1]} alt={name} className="book-img" />
                <div className="book-details">
                  <h2 className="book-name-h2">
                    {name.length <= 20 ? name : `${name.substring(0, 15)}...`}
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
      </section> */}
    </main>
  );
}
