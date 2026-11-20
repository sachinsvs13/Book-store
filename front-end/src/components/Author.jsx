import { NavLink } from "react-router-dom";

export default function Author({ authorData }) {
  return (
    <>
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
              <NavLink
                to={`/author/${authorData?._id}`}
                end
                className="author-link"
              >
                Home
              </NavLink>
            </li>
            <li className="author-nav-li">
              <NavLink
                to={`/author/${authorData?._id}/about`}
                className="author-link"
              >
                About
              </NavLink>
            </li>
            <li className="author-nav-li">
              <NavLink
                to={`/author/${authorData?._id}/allBooks`}
                className="author-link"
              >
                All Books
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="author-name-container">
        <h1 className="author-name-h1">{authorData?.name}</h1>
      </div>
    </>
  );
}
