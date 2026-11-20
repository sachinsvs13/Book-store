import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import FetchAuthor from "../custom hook/FetchAuthor";
import Author from "../components/Author";

export default function AuthorAbout() {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState();

  useEffect(() => {
    FetchAuthor(id, setAuthorData);
  }, [id]);
  return (
    <main>
      <Author authorData={authorData} />
      <section className="author-about-section">
        <div className="author-about-img-container">
          <img
            src={authorData?.image}
            alt={authorData?.name}
            className="author-about-img"
          />
        </div>
        <article className="author-about-article">
          <h2 className="author-about-h2">About the author</h2>
          <p className="author-about-description-p">
            {authorData?.description}
          </p>
        </article>
      </section>
    </main>
  );
}
