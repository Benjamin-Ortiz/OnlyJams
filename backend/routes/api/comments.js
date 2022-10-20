const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// // getall songs
// router.get("/", async (req, res) => {
//     const Songs = await Song
//       .findAll
//       //add pagination
//       ();

//     return res.json({ Songs });
//   });

//   //! Create a Song Based on Album Id (need clarification)
//   router.post("/", requireAuth, async (req, res) => {
//     const { user } = req;
//     //console.log(user);
//     let { title, description, url, imageUrl, albumId } = req.body;
//     // albumId = this.toString(albumId);

//     //todo check if album is in db Model.has(this num)

//     let album = await Album.findByPk(albumId);
//     //console.log("+++++++++++++", album);
//     // const albumExists = await A

//     //?  Create a Song without an Album Id
//     if (albumId === null) {
//       const newSingle = await Song.create({
//         userId: user.id,
//         albumId: albumId,
//         title,
//         description,
//         url,
//         imageUrl,
//       });

//       return res.json(newSingle);
//     }

//     if (album) {
//       //logic
//       const newSingle = await Song.create({
//         userId: user.id,
//         albumId: albumId,
//         title,
//         description,
//         url,
//         imageUrl,
//       });

//       return res.json(newSingle);
//     } //?  Error Check Invalid Id
//     else {
//       res.json({
//         message: "Album couldn't be found",
//         statusCode: 404,
//       });
//     }
//   });

//   //? Get All Songs By Current User

//   router.get("/current", requireAuth, async (req, res) => {
//     const { user } = req;
//     const Songs = await Song.findAll({
//       where: {
//         userId: user.id,
//       },
//     });

//     res.json({Songs});
//   });

//   //Get a Song By Id
//   router.get("/:songId", requireAuth, async (req, res) => {
//     const { songId } = req.params;
//     //console.log('+++++++++++++++++++++',songId);

//     //!! NEED TO FIND A MODEL.INCLUDES(THING) METHOD

//     const song = await Song.findByPk(songId, {
//       include: [
//         {
//           model: User,
//            as: "Artist",
//           attributes: ["id", "username", "imageUrl"],
//         },
//         {
//           model: Album,
//           attributes: ["id", "title", "imageUrl"],
//         },
//       ],
//     });

//     if (song) {
//       res.json(song);
//     } else {
//       res.statusCode = 404;
//       res.json({
//         message: "Song couldn't be found",
//         statusCode: 404,
//       });
//     }
//   });

  //? Edit a comment
  router.put("/:commentId", requireAuth, async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByPk(commentId, {
    //   include: {
    //     model: Album,
    //   },
    });

    //! comment ID DOESNT EXIST
    if (comment) {
      comment.update({
    body: body
      });

      res.json(comment);
    } else {
      res.statusCode = 404;
      res.json({
        message: "Comment couldn't be found",
        statusCode: 404,
      });
    }
  });

  router.delete("/:commentId", requireAuth, async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();

      res.status = 200;

      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      res.statusCode = 404;
      res.json({
        message: "Comment couldn't be found",
        statusCode: 404,
      });
    }
  });

  module.exports = router;

module.exports = router;
