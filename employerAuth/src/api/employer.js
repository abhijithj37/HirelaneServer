const express = require("express");
const {
  signUp,
  login,
  googleSignIn,
  logout,
  getEmployer,
  sendVerificationEmail,
  getUserDetails,
} = require("../services/employerService");
const {
  validateSignup,
  validateLogin,
} = require("../utils/validations/validateCredentials");
const { validate } = require("../utils/validations/validation");
const { verifyEmployer } = require("../utils/auth");

const router = express.Router();

router.post("/signup", validateSignup, validate, signUp);

router.post("/login", validateLogin, validate, login);

router.post("/googleSignIn", googleSignIn);

router.post("/verify-email", sendVerificationEmail);

router.get("/verifyEmployer", verifyEmployer, getEmployer);

router.get("/logout", logout);

router.get("/user-details/:id", verifyEmployer, getUserDetails);

module.exports = router;
