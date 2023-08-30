const express = require("express");
const { signup, login } = require("../controllers/user.contrllers");

const router = express.Router();

// signup endpoint
router.route("/signup").post(signup);

// login endpoint
router.route("/login").post(login);

module.exports = router;