const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");

const router = express.Router();

//getall songs
router.get("/", async (req, res) => {
  //res.send('HELLLLOOOOOO');
  // return Song.getAllsongs()

  const allSongs = await Song.findAll();
  //console.log('---------------------',allSongs);

  return res.json(allSongs);
});

//! Create a Song Based on Album Id (need clarification)
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  //console.log(user);
  let { title, description, url, imageUrl, albumId } = req.body;
  // albumId = this.toString(albumId);

  //todo check if album is in db Model.has(this num)

  let album = await Album.findByPk(albumId);
  //console.log("+++++++++++++", album);
  // const albumExists = await A

  //?  Create a Song without an Album Id
  if (albumId === null) {
    const newSingle = await Song.create({
      userId: user.id,
      albumId: albumId,
      title,
      description,
      url,
      imageUrl,
    });

    return res.json(newSingle);
  }

  if (album) {
    //logic
    const newSingle = await Song.create({
      userId: user.id,
      albumId: albumId,
      title,
      description,
      url,
      imageUrl,
    });

    return res.json(newSingle);
  } //?  Error Check Invalid Id
  else {
    res.json({
      message: "albumId not found/does not exist",
      statusCode: 404,
    });
  }
});

//? Get All Songs By Current User

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const allSongs = await Song.findAll({
    where: {
      userId: user.id,
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

//? Edit a Song
router.put("/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const song = await Song.findByPk(songId, {
    include: {
      model: Album,
    },
  });

  //! SONG ID DOESNT EXIST
  if (song) {
    song.update({
      userId: user.id,
      albumId: song.albumId,
      title,
      description,
      url,
      imageUrl,
    });

    res.json(song);
  } else {
    res.statusCode = 404;
    res.json({
      message: "Song i.d does not exist",
      statusCode: 404,
    });
  }
});

router.delete("/:songId", requireAuth, async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId);

  if (song) {

    await song.destroy();

    res.status = 200;

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.statusCode = 404;
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
});

module.exports = router;
