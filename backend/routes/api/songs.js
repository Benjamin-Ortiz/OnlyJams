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

  return res.json({
    allSongs,
  });
});

//! Create a Song Based on Album Id (need clarification)
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  //console.log(user);
  let { title, description, url, imageUrl, albumId } = req.body;
 // albumId = this.toString(albumId);

  //todo check if album is in system Model.has(this num)

  let album = await Album.findByPk(albumId);
  console.log("+++++++++++++", album);
  // const albumExists = await A

  //?  Create a Song without an Album Id
  if (albumId === "null") {
    const newSingle = await Song.create({
      userId: user.id,
      title,
      description,
      url,
      imageUrl,
    });

    //?  Error Check Invalid Id
    // if (!album.HasSong()) {
    //     res.statusCode = 404;
    //     res.json({
    //       message: "albumId not found/does not exist",
    //       statusCode: 404,

    //     //   errors: {
    //     //     title: "Album title is required",
    //     //   },
    //     });
    // }

    return res.json(newSingle);
    //   get album, nope, songs are issued by id
    //   create Song
    //   add song to album, nope, songs are issued by id
  }
  //  let album = await Album.findByPk(albumId)
  //  console.log('++++++++++++++++++++',album);

  let newSong = await Song.create({
    userId: user.id,
    albumId: albumId,
    title: title,
    description: description,
    url: url,
    imageUrl: imageUrl,
  });

  //console.log("--------------", newSong);

  // console.log('==================', albumSongs);
  // await Album.addSong(song1);
  //await album.add(newSong);

  return res.json(newSong);
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

router.get("/:songId", requireAuth, async (req, res) => {
  const { songId } = req.params;
  //console.log('+++++++++++++++++++++',songId);

//!! NEED TO FIND A MODEL.INCLUDES(THING) METHOD

  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
        // as: 'Artist',
        // through: {
        //      attributes:
        //       ['id']
        //     },
        },
      {
        model: Album,
        // through: { attributes: ['id'] },
      },
    ],
  });

  res.json(song);
});


//? Edit a Song
router.put("/:songId", requireAuth, async (req, res) => {
    const {user} = req;
    const { songId } = req.params;
    const {title, description, url, imageUrl} = req.body;

    const song = await Song.findByPk(songId, {
        include: {
            model: Album
        }
    })

    //! SONG ID DOESNT EXIST
    // if () {
    //     res.statusCode = 404;
    //     res.json({
    //       message: "Validation Error",
    //       statusCode: 404,

    //     });
    //   }

    //! find albumId and add to response



    const editedSong = await Song.create({
        userId: user.id,
        albumId: song.albumId,
        title, description, url, imageUrl
    })

    res.json(editedSong)

    //res.json()
})

module.exports = router;
