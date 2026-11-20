import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Author from "../components/Author";

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
    <main>
      <Author authorData={authorData} />
    </main>
  );
}
