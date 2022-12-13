const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const AuthController = require("../controllers/auth");

router.post("/signup", checkAuth, AuthController.signUp);
router.post("/login", checkAuth, AuthController.login);

module.exports = router;
