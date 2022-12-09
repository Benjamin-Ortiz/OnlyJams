const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album, Comment } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");

const router = express.Router();

//? getall songs, add
router.get("/", async (req, res) => {
  const Songs = await Song.findAll();
  //add pagination



  return res.json({ Songs });
});

//? Create a Song Based on Album Id
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;

  let { title, description, url, imageUrl, albumId } = req.body;
  // albumId = this.toString(albumId);

  let album = await Album.findByPk(albumId);

  // const albumExists = await A

  //?  Create a Song without an Album Id
  if (albumId === null || albumId === undefined) {
    const newSingle = await Song.create({
      userId: user.id,
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
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }
});

//? Get All Songs By Current User

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const Songs = await Song.findAll({
    where: {
      userId: user.id,
    },
  });

  res.json({ Songs });
});

//? Get a Song By Id
router.get("/:songId", async (req, res) => {
  const { songId } = req.params;

	const song = await Song.findOne({
		where: { id: songId },
		include: [
			{ model: Album, attributes: ['id', 'title', 'imageUrl'] },
			{ model: User, attributes: ['id', 'username', 'imageUrl'] },
		],
	});
	if (!song) {
		return res.status(404).json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
	return res.json(song);




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
      message: "Song couldn't be found",
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

//! Create a Comment Based on a Song Id
router.post("/:songId/comments", requireAuth, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { body } = req.body;

  // albumId = this.toString(albumId);

  const song = await Song.findByPk(songId);


  if(song) {
    //logic
    const newComment = await Comment.create({
      userId: user.id,
      songId: songId,
      body: body
    });

    return res.json(newComment);
  } //?  Error Check Invalid Id
  else {
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
});


//? Get Comments by Song Id
router.get("/:songId/comments", requireAuth, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { body } = req.body;

  // albumId = this.toString(albumId);

  const song = await Song.findByPk(songId, {
    // attributes: [],
    // include: {
    //   model: Comment,
    //}
  });


  if (song) {
    //logic
    const Comments = await Comment.findAll({
      where: {
        userId: user.id
      },
      include:[{
        model: User,
        // as: "Artist",
        attributes: ['id', 'username']
      }]
    })


    return res.json({Comments});
  } //?  Error Check Invalid Id
  else {
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
});


module.exports = router;
