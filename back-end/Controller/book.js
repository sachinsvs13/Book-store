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
  if (!book) {
    throw new NotFoundError(`No id found with ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  const book = await Book.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findByIdAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw new NotFoundError(`No id found with ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findByIdAndDelete({ _id: bookId });
  if (!book) {
    throw new NotFoundError(`No id found with ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Book deleted successfully!!!" });
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
