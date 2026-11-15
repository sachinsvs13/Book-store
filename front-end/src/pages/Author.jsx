import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Author() {
  const [authorData, setAuthorData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/authors/${id}`,
        );
        const data = await res.data.author;
        setAuthorData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthor();
  }, [id]);

  console.log(authorData);

  const starArray = Array.from({
    // length: singleBook[0].averageRating > 4 ? 5 : 4,
    // Have to change it to 5 when the average rating is 4.5 or more
    length: Math.ceil(authorData?.mostPopularBook.averageRating),
  });

  return (
    <>
      <Outlet />
      <main>
        <header className="author-header">
          <img
            src={authorData?.image}
            alt={authorData?.name}
            className="author-img"
          />
          <div className="follow-container">
            <strong className="author-name-strong">{authorData?.name}</strong>
            <button className="author-follow-btn">+ Follow</button>
          </div>
          <nav className="author-nav">
            <ul className="author-nav-ul">
              <li className="author-nav-li">
                <Link to={`/author/${authorData?._id}`}>Home</Link>
              </li>
              <li className="author-nav-li">
                <Link to={`/author/${authorData?._id}/about`}>About</Link>
              </li>
              <li className="author-nav-li">
                <Link to={`/author/${authorData?._id}/allBooks`}>
                  All Books
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <section className="author-section">
          <h1 className="author-name-h1">{authorData?.name}</h1>
          <article className="about-author-article">
            <h2 className="about-author-h2">About the author</h2>
            <div className="about-author-container">
              <p className="about-author-p">
                {authorData?.description &&
                  authorData?.description.substring(0, 240)}
              </p>
              <Link to={`/author/${authorData?._id}/about`}>Read full bio</Link>
            </div>
          </article>
          <article className="author-popular-book-article">
            <h2 className="author-popular-book-h2">Most Popular</h2>
            <div className="author-popular-book-container">
              <img
                src={authorData?.mostPopularBook.image}
                alt={authorData?.mostPopularBook.bookName}
              />
              <div className="author-popular-book-info-container">
                <h2 className="author-popular-book-name-h2">
                  {authorData?.mostPopularBook.bookName}
                </h2>
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
                <p className="author-popular-book-price-p">
                  {authorData?.mostPopularBook.price}
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
