import axios from "axios";
const FetchAuthor = async (id, dataStore) => {
  // see custom hook in SWD/react
  try {
    const res = await axios.post(`http://localhost:3000/api/v1/authors/${id}`);
    const data = await res.data.author;
    dataStore(data);
  } catch (error) {
    console.error(error);
  }
};

export default FetchAuthor;
