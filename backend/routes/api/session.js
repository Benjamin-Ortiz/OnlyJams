//This file will hold the resources for the route paths beginning with
// /api/session. Create and export an Express router from this file.
const express = require('express');
const {setTokenCookie, restoreUser} = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const userFilter = (userObj) => {
  let userAnswer = {};

  for (let k in userObj) {

    if (k === 'id') {
      userAnswer.id = userObj[k]
    }
    if (k === 'firstName') {
      userAnswer.firstName = userObj[k]
    }
    if (k === 'lastName') {
      userAnswer.lastName = userObj[k]
    }
    if (k === 'email') {
      userAnswer.email = userObj[k]
    }
    if (k === 'token') {
      userAnswer.token = userObj[k]
    }
  }

  return userAnswer;
}


//Validating Login Request Body middleware
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
//! RENDER TO FRONT END
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;


    let user = await User.login({ credential, password });

    if (!user) {
      res.statusCode = 401;
      res.json({
        message: "Invalid credentials",
        statusCode: 401
      })
    }


    let userObj = user.toJSON(); //! creates user promise aka js obj

    token = await setTokenCookie(res, user);
    userObj.token = token

    userFilter(userObj)

      res.json(
        userObj
    );
}
);


//? Log out
router.delete('/',(_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);


//? Restore session user/ get current user
router.get('/', restoreUser, async (req, res) => {
      const { user } = req;


      if (user) {
        let userObj = user.toJSON(); //! creates user promise aka js obj

        token = await setTokenCookie(res, user);
        userObj.token = token

        userFilter(userObj)

          res.json(
            userObj
        );
      } else return res.json(null);
    }
  );




module.exports = router;
