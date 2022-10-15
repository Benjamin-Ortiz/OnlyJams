const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


 //create album
 router.post("/", async (req, res) => {
    const userId = User.id
    console.log('------------',userId);

    const {title, description,imageUrl } = req.body;
    // const errors = validationResult(req);
    // console.log("------------------", errors);

    if (!title) {
      res.statusCode = 400;
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          title:  "Album title is required"
        }
      });
    }

    // if (!id) {
    //     res.statusCode = 404;
    //     res.json({
    //       message: "Album couldn't be found",
    //       statusCode: 404,
    //     });
    //   }

      const newAlbum = await Album.create({
     userId,title, description,imageUrl
    })

    return res.json({newAlbum})
})

//? // create album beta
// router.post("/", async (req, res) => {
//     const { userId, title, description,imageUrl } = req.body;
//     // const errors = validationResult(req);
//     // console.log("------------------", errors);

//     if (!title) {
//       res.statusCode = 400;
//       res.json({
//         message: "Validation Error",
//         statusCode: 400,
//         errors: {
//           title:  "Album title is required"
//         },
//       });
//     } else {
//         const newAblum = await Album.create({
//             userId, title, description,imageUrl
//         })
//         return res.json({newAblum})
//     }

// }),



module.exports = router;
