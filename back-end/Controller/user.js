const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json({ msg: "User deleted" });
};

// Later add Forgotten password
// update user for Forgotten password

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
};
