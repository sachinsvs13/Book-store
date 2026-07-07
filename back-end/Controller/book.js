const Book = require("../model/book");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const getAllBooks = async (req, res) => {
  const book = await Book.find({});
  res.status(StatusCodes.OK).json({ book, total: book.length });
};

const getBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findOne({ _id: bookId });
  res.status(StatusCodes.OK).json({ book });
  if (!book) {
    throw new NotFoundError(`No id found with ${bookId}`);
  }
};

const deleteBook = (req, res) => {
  res.send("All book");
};

const updateBook = (req, res) => {
  res.send("All book");
};

const createBook = (req, res) => {
  res.send("All book");
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
