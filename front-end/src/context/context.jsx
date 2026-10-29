import { createContext, useState } from "react";

// The context must be exported for consumers; this module also exports its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listName, setListName] = useState("Shopping List");
  const [hasList, setHasList] = useState(
    JSON.parse(localStorage.getItem("hasList")) || false,
  );
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [wishListNames, setWishlistNames] = useState(
    JSON.parse(localStorage.getItem("wishListNames") || "[]"),
  );
  const [selectWishList, SetSelectWishList] = useState(false);
  const [quickView, setQuickView] = useState(false);
  return (
    <AppContext.Provider
      value={{
        listName,
        setListName,
        hasList,
        setHasList,
        isCreatingList,
        setIsCreatingList,
        wishListNames,
        setWishlistNames,
        selectWishList,
        SetSelectWishList,
        quickView,
        setQuickView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
