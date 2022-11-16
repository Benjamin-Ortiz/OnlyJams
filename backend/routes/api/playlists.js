const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Song,
  Album,
  Comment,
  Playlist,
  PlaylistSong,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");
const song = require("../../db/models/song");

const router = express.Router();

//? Create a Playlist
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;

// * proudest find
 //(user.dataValues.id);

  let { name, imageUrl } = req.body;

  const newPlaylist = await Playlist.create({
    userId: user.dataValues.id,
    name,
    imageUrl
  });

  return res.json(newPlaylist);
});

//? Get All playlists By Current User

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const Playlists = await Playlist.findAll({
    where: {
      userId: user.dataValues.id,
    },
  });

  res.json({ Playlists });
});

//? Add a Song to a Playlist
router.post("/:playlistId/songs", requireAuth, async (req, res) => {
  const { user } = req;
  const { playlistId } = req.params;
  const { songId } = req.body;

  const playlist = await Playlist.findOne({
    where: {
      id: playlistId,
    },
  });

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

  await PlaylistSong.create({
    songId: songId,
    playlistId: playlistId
  })

  //find most recent id in playlistSong, return it
  //! 'effective' workaround
  const mostRecentId = await PlaylistSong.findOne({
    where: {
      songId: songId,
    },
    attributes: ["id", "playlistId", "songId"],
    order: [["id", "DESC"]],
  });


  return res.json(mostRecentId);
});

//? Get Details of a Playlist By Id

router.get("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;


  const playlist = await Playlist.findByPk(playlistId, {
    include: [
      {
        model: Song,
        through: {
          attributes:[]
        }
        // attributes: ["id", "username", "imageUrl"],
      },
    ],
  });



  if (playlist) {
    let playlistObj = playlist.toJSON(); //! creates playlist promise aka js obj
    //("++++++++++++++", playlistObj.Songs[0].PlaylistSong);
    // delete playlist.Songs[0].PlaylistSong;
    // for each through each song, delete Playlist song

    res.json(playlist);
  } else {
    res.statusCode = 404;
    res.json({
      message: "Playlist couldn't be found",
      statusCode: 404,
    });
  }
});

//? Edit a playlist
router.put("/:playlistId", requireAuth, async (req, res) => {
  const { user } = req;
  const { playlistId } = req.params;
  const { name, imageUrl } = req.body;

  const playlist = await Playlist.findByPk(playlistId, {
    // include: {
    //   model: Album,
    // },
  });

  //! playlist ID DOESNT EXIST
  if (playlist) {
    playlist.update({
      name,
      imageUrl,
    });

    res.json(playlist);
  } else {
    res.statusCode = 404;
    res.json({
      message: "Playlist couldn't be found",
      statusCode: 404,
    });
  }
});



//? Delete A Song From A Playlist
router.delete("/:playlistId/songs/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const { playlistId, songId } = req.params;
  // ("------------", playlistId);
  // ("++++++++++++", songId);

  // const { songId } = req.body;

  const song = await Song.findOne({
    where:{
      id:songId
    }
  })

  const playlist = await Playlist.findOne({
    where: {
      id: playlistId
    },
  });

  const songOnPlaylist = await PlaylistSong.findOne({
    where: {
      songId: songId,
      playlistId: playlistId
    }
    // include: [{
    //   model: 'PlaylistSongs'
    // }]
  });

  //('+++++++++',songOnPlaylist);

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

  if (songOnPlaylist) {
   await songOnPlaylist.destroy()

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

  //(checkPlaylist);
  // return res.json(songOnPlaylist);
});

//? Delete a playlist
router.delete("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId);

  if (playlist) {
    await playlist.destroy();

    res.status = 200;

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.statusCode = 404;
    res.json({
      message: "Playlist couldn't be found",
      statusCode: 404,
    });
  }
});



module.exports = router;
