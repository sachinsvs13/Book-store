const express = require("express");
const router = express.Router();

const {
  CartItems,
  createCartItem,
  deleteCartItem,
  updateCartItems,
} = require("../Controller/cart");

const { auth } = require("../middleware/authentication");

router.get("/", auth, CartItems);
router.post("/create", auth, createCartItem);
router.delete("/:id", auth, deleteCartItem);
router.patch("/:id", auth, updateCartItems);

module.exports = router;
