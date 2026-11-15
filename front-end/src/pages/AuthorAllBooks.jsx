import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export default function AuthorAllBooks() {
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
        </section>
      </main>
    </>
  );
}
