const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album, Playlist, Comments, PlaylistSong } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where, Op } = require("sequelize");

const router = express.Router();
router.use(express.json());

//? Get Details of an Artist by Id
router.get("/:userId", requireAuth, async (req, res) => {
  const { user } = req;
  const { userId } = req.params;


  let songCount = await Song.count({
    where: {
      userId: userId,
    },
    // attributes: ["imageUrl"],
  });
  let albumCount = await Album.count({
    where: {
      userId: userId,
    },
  });

  const artistFind = await User.findByPk(userId, {
    attributes: ["id", "username", "imageUrl"],
    include: [
      {
        model: Song,
        attributes: ["imageUrl"]
      },
    ],
  });

  if (artistFind) {
    let artist = artistFind.toJSON();

    artist.totalSongs = songCount;
    artist.totalAlbums = albumCount;

    //! res.status = 200;

    res.json(artist);
  } else {
    res.statusCode = 404;
    res.json({
      message: "Artist does not exist with provided id",
      statusCode: 404,
    });
  }
});

//? Get All Songs of an Artist By Id

router.get("/:userId/songs", requireAuth, async (req, res) => {
  const { userId } = req.params;

  let artist = await User.findByPk(userId);

  if (artist) {
    const Songs = await Song.findAll({
      where: {
        userId: userId,
      },
    });

    res.json({ Songs });
  } else {
    //todo Get All Songs of an Artist By Id - Error Check Invalid Id
    res.statusCode = 404;
    res.json({
      message: "Artist does not exist with provided id",
      statusCode: 404,
    });
  }
});

//? Get All Albums of an Artist By Id

router.get("/:userId/albums", requireAuth, async (req, res) => {
  const { userId } = req.params;
  
  let artist = await User.findByPk(userId);

  if (artist) {
    const allAlbums = await Album.findAll({
      where: {
        userId: userId,
      },
    });

    res.json(allAlbums);
  } else {
    //todo Get All Albums of an Artist By Id - Error Check Invalid Id
    res.status = 404;
    res.json({
      message: "Artist does not exist with provided id",
      statusCode: 404,
    });
  }
});

//? Get a Song By Id
router.get("/:songId", requireAuth, async (req, res) => {
  const { songId } = req.params;




  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
        attributes: ["id", "username", "imageUrl"]
      },
      {
        model: Album,
        attributes: ["id", "title", "imageUrl"]
      },
    ],
  });

  res.json(song);
});

//? Get All Playlists By Artist Id

router.get("/:userId/playlists", requireAuth, async (req, res) => {
  const { userId } = req.params;

  let artist = await User.findByPk(userId);

  if (artist) {
    const Playlists = await Playlist.findAll({
      where: {
        userId: userId,
        // include: [{
        //     model: PlaylistSong
        //   }],
      },
    });

    res.json({Playlists});
  } else {
    //todo Get All Playlists By Artist Id - Error Check Invalid Id
    res.status = 404;
    res.json({
      message: "Artist does not exist with provided id",
      statusCode: 404,
    });
  }
});

module.exports = router;
