import { useGlobalContext } from "../context/useGlobalContext";
export default function CreateWishList({ singleBook }) {
  const {
    listName,
    setHasList,
    setIsCreatingList,
    isCreatingList,
    setListName,
    setWishlistNames,
    SetSelectWishList,
  } = useGlobalContext();

  //   const navigate = useNavigate();
  const handleCreateList = (e) => {
    e.preventDefault();
    const wishListNames = JSON.parse(
      localStorage.getItem("wishListNames") || "[]",
    );
    const uniqueSet = new Set([...wishListNames, listName]);
    localStorage.setItem(
      "wishListNames",
      JSON.stringify(Array.from(uniqueSet)),
    );
    localStorage.setItem("hasList", true);
    setHasList(JSON.parse(localStorage.getItem("hasList")));
    setIsCreatingList(false);
    setWishlistNames(Array.from(uniqueSet));
    setListName("");
    singleBook.map((book) => {
      const { image, _id, name, author, price } = book;

      const wishlist = JSON.parse(localStorage.getItem(listName) || "[]");

      const wishlistObj = {
        bookImage: image,
        bookId: _id,
        bookName: name,
        bookAuthor: author,
        bookPrice: price,
      };

      const uniqueWishlistSet = new Set([
        ...wishlist.map((item) => JSON.stringify(item)),
        JSON.stringify(wishlistObj),
      ]);
      const uniqueWishlist = Array.from(uniqueWishlistSet).map((item) =>
        JSON.parse(item),
      );
      localStorage.setItem(listName, JSON.stringify(uniqueWishlist));
    });
    SetSelectWishList(false);

    //   navigate("/wishlist");
    // setHasList();
  };
  //   useEffect(() => {
  //     handleCreateList;
  //   }, []);

  // const addToWishlist = (e) => {
  //   e.preventDefault();
  //   singleBook.map((book) => {
  //     const { image, _id, name, author, price } = book;

  //     const wishlist = JSON.parse(localStorage.getItem(listName) || "[]");

  //     const wishlistObj = {
  //       bookImage: image,
  //       bookId: _id,
  //       bookName: name,
  //       bookAuthor: author,
  //       bookPrice: price,
  //     };

  //     wishlist.push(wishlistObj);

  //     localStorage.setItem(listName, JSON.stringify(wishlist));
  //   });
  // };
  return (
    <>
      {isCreatingList && (
        <div
          className="new-wishlist-container"
          // onClick={() => setIsCreatingList(false)}
        >
          <div className="new-wishlist">
            <div className="new-wishlist-header">
              <h3 className="new-wishlist-h3">Create a new list</h3>
              <p
                className="new-wishlist-close-p"
                onClick={() => setIsCreatingList(false)}
              >
                X
              </p>
            </div>
            <form className="new-wishlist-form" onSubmit={handleCreateList}>
              <label htmlFor="new-list" className="new-wishlist-name">
                List name(required)
              </label>
              <input
                type="text"
                name="new-list"
                id="new-list"
                className="new-wishlist-input"
                onChange={(e) => setListName(e.target.value)}
                value={listName}
              />
              <div className="new-wishlist-btn-container">
                <button
                  type="button"
                  className="new-wishlist-cancel-btn"
                  onClick={() => setIsCreatingList(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="new-wishlist-create-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
