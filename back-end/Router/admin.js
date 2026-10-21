const express = require("express");
const router = express.Router();

const {
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controller/author");

const { createBook, updateBook, deleteBook } = require("../Controller/book");

const {
  allCartItems,
  deleteAllCartItems,
  deleteCartItems,
} = require("../Controller/cart");

const { auth, authRoles } = require("../middleware/authentication");
const { getAllUsers, deleteUser } = require("../Controller/user.js");

// Books
router.post("/books", auth, authRoles("admin"), createBook);
router.delete("/books/:id", auth, authRoles("admin"), deleteBook);
router.patch("/books/:id", auth, authRoles("admin"), updateBook);

// Users
router.get("/users", auth, authRoles("admin"), getAllUsers);
router.delete("/users/:id", auth, authRoles("admin"), deleteUser);

// Authors
router.post("/authors", auth, authRoles("admin"), createAuthor);
router.delete("/authors/:id", auth, authRoles("admin"), deleteAuthor);
router.patch("/authors/:id", auth, authRoles("admin"), updateAuthor);



// Cart Items
router.get("/carts", auth, authRoles("admin"), allCartItems);
router.delete("/carts/:id", auth, authRoles("admin"), deleteCartItems);
router.delete("/carts/", auth, authRoles("admin"), deleteAllCartItems);

module.exports = router;
