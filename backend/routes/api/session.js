//This file will hold the resources for the route paths beginning with
// /api/session. Create and export an Express router from this file.
const express = require('express');
const {setTokenCookie, restoreUser} = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      res.statusCode = 401;
      res.json({
        message: "Invalid credentials",
        statusCode: 401
      })
        // const err = new Error('Login failed');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        // return next(err);
    }
//? log in test
    // fetch('/api/session', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    //   },
    //   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
    // }).then(res => res.json()).then(data => console.log(data));


     await setTokenCookie(res, user);
    //  const token = res.cookie
    //  user[token] = token,

     //console.log(token);
     res.json({
        user
    });
}
);


// Log out
router.delete('/',(_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);


// Restore session user
router.get('/', restoreUser, (req, res) => {
      const { user } = req;

      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );




module.exports = router;
