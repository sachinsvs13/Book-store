import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export default function Book() {
  const [singleBook, setSingleBook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const handleSingleBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/books/${id}`);
        const data = res.data.book;
        setSingleBook([data]);
      } catch (error) {
        console.log(error);
      }
    };
    handleSingleBook();
  }, []);

  console.log(singleBook);

  return (
    <main>
      <Outlet />
    </main>
  );
}
