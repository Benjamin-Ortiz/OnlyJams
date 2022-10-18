const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where, Op } = require("sequelize");

const router = express.Router();
router.use(express.json());

//! Get Details of an Artist by Id
router.get("/:userId", requireAuth, async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  console.log("++++++++++++++", userId);


  let songCount = await Song.count({
    where: {
    userId: userId
},
attributes: ['imageUrl']
});
  let albumCount = await Album.count({
    where: {
        userId: userId
    }
  });


  console.log(albumCount);

  const artistFind = await User.findByPk(userId, {
    attributes: ["id", "username", "imageUrl"],
    include: {
        models: Song,
        // attributes: ['imageUrl']
    }
  });

  let artist = artistFind.toJSON();

  artist.totalSongs = songCount
  artist.totalAlbums = albumCount


  res.json(artist);
});

//? Get All Songs of an Artist By Id

router.get("/:userId/songs", requireAuth, async (req, res) => {
  const { userId } = req.params;
  //console.log('++++++++++++++++',userId);

  const allSongs = await Song.findAll({
    where: {
      userId: userId,
    },
  });

  res.json(allSongs);
});

//Get a Song By Id
router.get("/:songId", requireAuth, async (req, res) => {
  const { songId } = req.params;
  //console.log('+++++++++++++++++++++',songId);

  //!! NEED TO FIND A MODEL.INCLUDES(THING) METHOD

  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
        attributes: ["id", "username", "imageUrl"],
      },
      {
        model: Album,
        attributes: ["id", "title", "imageUrl"],
      },
    ],
  });

  res.json(song);
});

module.exports = router;
