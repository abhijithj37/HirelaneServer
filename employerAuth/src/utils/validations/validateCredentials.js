// validationMiddleware.js

const { body } = require("express-validator");


const validateSignup = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets"),
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required")
    .isAlpha()
    .withMessage("Company name should contain only alphabets"),
  body("companySize")
    .notEmpty()
    .withMessage("Company size is required")
    .isNumeric()
    .withMessage("Company size should contain only numbers"),
  body("phone")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Enter a valid Mobile Number"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should contain at least 8 characters"),
];


const validateLogin=[

  body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email address"),
   body("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 8 })
  .withMessage("Password should contain at least 8 characters")

]

 

module.exports = { validateSignup,validateLogin };
