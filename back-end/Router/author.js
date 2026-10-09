const express = require("express");
const router = express.Router();

const {
  getAllAuthor,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controller/author");

const { auth, authRoles } = require("../middleware/authentication");

router.get("/", getAllAuthor);
router.post("/", auth, authRoles("admin"), createAuthor);
router.delete("/:id", auth, authRoles("admin"), deleteAuthor);
router.get("/:id", getSingleAuthor);
router.patch("/:id", auth, authRoles("admin"), updateAuthor);

module.exports = router;
