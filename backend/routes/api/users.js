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

  check("firstName")
  .exists({ checkFalsy: true })
  .isAlpha('en-US')
  .withMessage("Please provide a first name using only letters.")
  .isLength({ min: 2 })
  .withMessage("Please provide a first name with at least 2 characters."),


  check("lastName")
    .exists({ checkFalsy: true })
    .isAlpha('en-US')
    .withMessage("Please provide a last name using only letters.")
    .isLength({ min: 2 })
    .withMessage("Please provide a last name with at least 2 characters."),


  check("email")
    .exists({ checkFalsy: true })
    //.withMessage("That email already exists.")
    .isEmail()
    // .exists()
    .withMessage("Please provide a valid email."),


  check("username")
    .exists({checkFalsy: true})
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
  });

  // console.log(user, 'BEFORE PARSE');

  //let userObj = user.toJSON(); //! creates user promise aka js obj


 const token = await setTokenCookie(res, user);

  //userObj.token = token;
 // console.log(userObj, 'USEEER');

 const newUser = await User.findByPk(user.id);

 newUser.dataValues['token'] = token;

 let info = JSON.parse(JSON.stringify(newUser,
   ["id","firstName","lastName","email","username",
   "token"]));
 return res.json(
   info
 );

});


// router.post('/signup', validateSignup, async (req, res) => {
//   const { firstName, lastName, email, username, password } = req.body;
//   const check = await User.findOne({ where: { email } });

//   if (check) {
//       let err = new Error("Email must be unique");
//       err.status = 403;
//       err.errors = ["Email must be unique"];
//       throw err;
//   }

  // const user = await User.signUp({ firstName, lastName, email, username, password });

  // // const token = await setTokenCookie(res, user);

  // return res.json({ ...user.toSafeObject() });
// })

module.exports = router;
