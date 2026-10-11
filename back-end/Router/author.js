const express = require("express");
const router = express.Router();

const { getAllAuthor, getSingleAuthor } = require("../Controller/author");

router.get("/", getAllAuthor);

router.get("/:id", getSingleAuthor);

module.exports = router;
