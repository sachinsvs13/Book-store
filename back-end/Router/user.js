const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
} = require("../Controller/user.js");

const { auth, authRoles } = require("../middleware/authentication.js");

router.get("/", auth, authRoles("admin"), getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", auth, authRoles("admin"), deleteUser);

module.exports = router;
