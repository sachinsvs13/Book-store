const Cart = require("../model/cart");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

// Normal access
const CartItems = async (req, res) => {
  const { userId } = req.user;
  const cart = await Cart.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ cart, length: cart.length });
};

const createCartItem = async (req, res) => {
  const { userId } = req.user;
  const cart = await Cart.create({ ...req.body, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ cart });
};

const deleteCartItem = async (req, res) => {
  const { id: cartId } = req.params;
  const { userId } = req.user;
  const cart = await Cart.findOneAndDelete({ _id: cartId, createdBy: userId });
  if (!cart) {
    throw new NotFoundError(`No id found with ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Cart item deleted" });
};

const updateCartItems = async (req, res) => {
  const { id: cartId } = req.params;
  const cart = await Cart.findByIdAndUpdate({ _id: cartId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!cart) {
    throw new NotFoundError(`No id found with ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ cart });
};

// admin access
const allCartItems = async (req, res) => {
  const cart = await Cart.find({});
  res.status(StatusCodes.OK).json({ cart, length: cart.length });
};

const deleteCartItems = async (req, res) => {
  const { id: cartId } = req.params;
  const cart = await Cart.findOneAndDelete({ _id: cartId });
  if (!cart) {
    throw new NotFoundError(`No id found with ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Cart item deleted" });
};

const deleteAllCartItems = async (req, res) => {
  const cart = await Cart.deleteMany();
  res.status(StatusCodes.OK).json({ msg: "All Cart item deleted" });
};

module.exports = {
  allCartItems,
  CartItems,
  createCartItem,
  deleteCartItem,
  deleteAllCartItems,
  deleteCartItems,
  updateCartItems,
};
