import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import FetchAuthor from "../custom hook/FetchAuthor";
import Author from "../components/Author.jsx";
import "../Styles/author.css";

export default function AuthorHome() {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState();

  useEffect(() => {
    FetchAuthor(id, setAuthorData);
  }, [id]);

  console.log(authorData);

  const starArray = Array.from({
    // length: singleBook[0].averageRating > 4 ? 5 : 4,
    // Have to change it to 5 when the average rating is 4.5 or more
    length: Math.ceil(authorData?.mostPopularBook.averageRating),
  });

  return (
    <>
      <main>
        <Author authorData={authorData} />
        <section className="author-section">
          <article className="about-author-article">
            <h2 className="about-author-h2">About the author</h2>
            <div className="about-author-container">
              <p className="about-author-p">
                {authorData?.description &&
                  authorData?.description.substring(0, 240) + "..."}
              </p>
              <Link to={`/author/${authorData?._id}/about`}>Read full bio</Link>
            </div>
          </article>
          <article className="author-popular-book-article">
            <h2 className="author-popular-book-h2">Most Popular</h2>
            <div className="author-popular-book-container">
              <img
                className="author-popular-img"
                src={authorData?.mostPopularBook.bookImage}
                alt={authorData?.mostPopularBook.bookName}
              />
              <div className="author-popular-book-info-container">
                <h3 className="author-popular-book-name-h2">
                  {authorData?.mostPopularBook.bookName}
                </h3>
                <div className="author-popular-rating-container">
                  <span className="author-popular-rating-span">
                    {authorData?.mostPopularBook?.averageRating}
                  </span>
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
                </div>

                <p className="author-popular-book-price-p">
                  $ {authorData?.mostPopularBook.price}
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
