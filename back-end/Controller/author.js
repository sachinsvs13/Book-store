const Author = require("../model/author");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const getAllAuthor = async (req, res) => {
  const { name } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = name;
  }

  const author = await Author.find(queryObject);
  res.status(StatusCodes.OK).json({ author, total: author.length });
};

const getSingleAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const author = await Author.findById({ _id: authorId });
  if (!author) {
    throw new NotFoundError(`No id found with ${authorId}`);
  }
  res.status(StatusCodes.OK).json({ author });
};

const createAuthor = async (req, res) => {
  const author = await Author.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ author });
};

const updateAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const author = await Author.findByIdAndUpdate({ _id: authorId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!author) {
    throw new NotFoundError(`No id found with ${authorId}`);
  }
  res.status(StatusCodes.OK).json({ author });
};

const deleteAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const author = await Author.findByIdAndDelete({ _id: authorId });
  if (!author) {
    throw new NotFoundError(`No id found with ${authorId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Author deleted successfully!!!" });
};

module.exports = {
  getAllAuthor,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
