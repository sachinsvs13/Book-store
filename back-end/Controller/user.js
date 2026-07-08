const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");
const User = require("../model/user");

const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const loginUser = (req, res) => {
  res.send("All users");
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndDelete({ _id: userId });
  res.status(StatusCodes.OK).json({ msg: "User deleted" });
  if (!user) {
    throw new NotFoundError("not found");
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
};
