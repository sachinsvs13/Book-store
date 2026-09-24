import { CiViewList } from "react-icons/ci";
import { BiBarChartSquare } from "react-icons/bi";

import { Outlet } from "react-router-dom";
import "../Styles/wishlist.css";
import { useState } from "react";
export default function Wishlist() {
  const [isCreatingList, setIsCreatingList] = useState(false);
  return (
    <main>
      <Outlet />
      <section className="empty-wishlist-section">
        <h2 className="your-list">Your Lists</h2>
        <div className="empty-wishlist-container">
          <div className="empty-wishlist">
            <h2 className="lists-h2">Lists</h2>
            <h3 className="lists-h3">Where books and people meet</h3>
            <button
              className="create-list-btn"
              onClick={() => setIsCreatingList(true)}
            >
              Create a List
            </button>
            {isCreatingList && (
              <div className="new-list-container">
                <div className="new-list">
                  <div className="new-list-header">
                    <h3 className="new-list-h3">Create a new list</h3>
                    <p
                      className="new-list-close-p"
                      onClick={() => setIsCreatingList(false)}
                    >
                      X
                    </p>
                  </div>
                  <form className="new-list-form">
                    <label htmlFor="" new-list className="new-list-name">
                      List name(required)
                    </label>
                    <input
                      type="text"
                      name="new-list"
                      id="new-list"
                      className="new-list-input"
                    />
                    <button
                      className="new-list-cancel-btn"
                      onClick={() => setIsCreatingList(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="new-list-create-btn">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            )}
            <section className="list-uses-container">
              <div className="list-uses">
                <CiViewList className="list-logo" />
                <div className="list-use-container">
                  <h3 className="list-uses-h3">Save time</h3>
                  <p className="list-uses-p">
                    Add your items and ideas in one location
                  </p>
                </div>
              </div>
              <div className="list-uses">
                <BiBarChartSquare className="list-logo" />
                <div className="list-use-container">
                  <h3 className="list-uses-h3">Save time</h3>
                  <p className="list-uses-p">
                    Add your items and ideas in one location
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
