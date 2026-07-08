const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
} = require("../Controller/user.js");

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;
