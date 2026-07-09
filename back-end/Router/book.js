const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/book");

const { auth, authRoles } = require("../middleware/authentication");

router.get("/", getAllBooks);
router.post("/", auth, authRoles("admin"), createBook);
router.delete("/:id", auth, authRoles("admin"), deleteBook);
router.get("/:id", getBook);
router.patch("/:id", auth, authRoles("admin"), updateBook);

module.exports = router;
