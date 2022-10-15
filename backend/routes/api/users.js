const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//signup validator middleware
const validateSignup = [
  //access the array of user emails
  //if email.exists(emailsArr)
  //res.json{custom status code and message}
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),

  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),

  check("username").not().isEmail().withMessage("Username cannot be an email."),

  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),

  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  // const errors = validationResult(req);
  // console.log("------------------", errors);
  // const token = await setTokenCookie (req, res)

  const duplicateEmail = await User.findOne({
    where: { email },
  });
  const duplicateUser = await User.findOne({
    where: { username },
  });



  if (duplicateEmail) {
    res.statusCode = 403;
    res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }

  if (duplicateUser) {
    res.statusCode = 403;
    res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        username: "User with that username already exists"
      }
    });
  }


  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
    //token: token
  });

  const token = await setTokenCookie(res, user);
//  user[token] = token;

  return res.json({
    user //token as a key/val pair in user somehow
  });
});

module.exports = router;
