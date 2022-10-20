const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album, Comment, Playlist,PlaylistSong } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");

const router = express.Router();

// //getall songs
// router.get("/", async (req, res) => {
//   const Songs = await Song
//     .findAll
//     //add pagination
//     ();

//   return res.json({ Songs });
// });

//? Create a Playlist
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  //console.log(user);
  let { name, imageUrl } = req.body;

  //console.log("+++++++++++++", album);

  const newPlaylist = await Playlist.create({
    userId: user.id,
    name,
    imageUrl,
  });

  return res.json(newPlaylist);
});

//? Add a Song to a Playlist
router.post("/:playlistId/songs", requireAuth, async (req, res) => {
  const { user } = req;
  const {playlistId} = req.params;
  console.log("------------", playlistId);

  const { songId } = req.body;

  const playlist = await Playlist.findOne({
    where: {
        id : playlistId
    }
  })

  const song = await Song.findOne({
    where: {
      id: songId,
    },
  });

  if (!playlist) {
    res.statusCode = 404;
    res.json({
      message: "Playlist couldn't be found",
      statusCode: 404,
    });
  }

  if (!song) {
    res.statusCode = 404;
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }

  const newPlaylistSong = await PlaylistSong.create({
playlistId: playlistId,
songId: songId
  });
  //console.log(checkPlaylist);
  return res.json(newPlaylistSong);
});

// //? Get All Songs By Current User

// router.get("/current", requireAuth, async (req, res) => {
//   const { user } = req;
//   const Songs = await Song.findAll({
//     where: {
//       userId: user.id,
//     },
//   });

//   res.json({ Songs });
// });

// //Get a Song By Id
// router.get("/:songId", requireAuth, async (req, res) => {
//   const { songId } = req.params;
//   //console.log('+++++++++++++++++++++',songId);

//   //!! NEED TO FIND A MODEL.INCLUDES(THING) METHOD

//   const song = await Song.findByPk(songId, {
//     include: [
//       {
//         model: User,
//         as: "Artist",
//         attributes: ["id", "username", "imageUrl"],
//       },
//       {
//         model: Album,
//         attributes: ["id", "title", "imageUrl"],
//       },
//     ],
//   });

//   if (song) {
//     res.json(song);
//   } else {
//     res.statusCode = 404;
//     res.json({
//       message: "Song couldn't be found",
//       statusCode: 404,
//     });
//   }
// });

// //? Edit a Song
// router.put("/:songId", requireAuth, async (req, res) => {
//   const { user } = req;
//   const { songId } = req.params;
//   const { title, description, url, imageUrl } = req.body;

//   const song = await Song.findByPk(songId, {
//     include: {
//       model: Album,
//     },
//   });

//   //! SONG ID DOESNT EXIST
//   if (song) {
//     song.update({
//       userId: user.id,
//       albumId: song.albumId,
//       title,
//       description,
//       url,
//       imageUrl,
//     });

//     res.json(song);
//   } else {
//     res.statusCode = 404;
//     res.json({
//       message: "Song couldn't be found",
//       statusCode: 404,
//     });
//   }
// });

// router.delete("/:songId", requireAuth, async (req, res) => {
//   const { songId } = req.params;
//   const song = await Song.findByPk(songId);

//   if (song) {
//     await song.destroy();

//     res.status = 200;

//     res.json({
//       message: "Successfully deleted",
//       statusCode: 200,
//     });
//   } else {
//     res.statusCode = 404;
//     res.json({
//       message: "Song couldn't be found",
//       statusCode: 404,
//     });
//   }
// });

// //! Create a Comment Based on a Song Id
// router.post("/:songId/comments", requireAuth, async (req, res) => {
//   const { user } = req;
//   const { songId } = req.params;
//   const { body } = req.body;

//   // albumId = this.toString(albumId);

//   const song = await Song.findByPk(songId);

//   if(song) {
//     //logic
//     const newComment = await Comment.create({
//       userId: user.id,
//       songId: songId,
//       body: body
//     });

//     return res.json(newComment);
//   } //?  Error Check Invalid Id
//   else {
//     res.json({
//       message: "Song couldn't be found",
//       statusCode: 404,
//     });
//   }
// });

// //? Get Comments by Song Id
// router.get("/:songId/comments", requireAuth, async (req, res) => {
//   const { user } = req;
//   const { songId } = req.params;
//   const { body } = req.body;

//   // albumId = this.toString(albumId);

//   const song = await Song.findByPk(songId, {
//     // attributes: [],
//     // include: {
//     //   model: Comment,
//     //}
//   });

//   if (song) {
//     //logic
//     const Comments = await Comment.findAll({
//       where: {
//         userId: user.id
//       },
//       include:[{
//         model: User,
//         // as: "Artist",
//         attributes: ['id', 'username']
//       }]
//     })

//     return res.json({Comments});
//   } //?  Error Check Invalid Id
//   else {
//     res.json({
//       message: "Song couldn't be found",
//       statusCode: 404,
//     });
//   }
// });

module.exports = router;
