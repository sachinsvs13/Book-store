const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/book");

router.get("/", getAllBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.get("/:id", getBook);
router.patch("/:id", updateBook);

module.exports = router;
