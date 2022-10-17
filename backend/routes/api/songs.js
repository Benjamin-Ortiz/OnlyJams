const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//getall songs
router.get('/', async (req, res) => {
    //res.send('HELLLLOOOOOO');
    // return Song.getAllsongs()

    const allSongs = await Song.findAll()
    //console.log('---------------------',allSongs);

    return res.json({
        allSongs
    })
})

//! Create a Song Based on Album Id (need clarification)
//? AND Create a Song without an Album Id
router.post("/", requireAuth, async (req, res) => {
    const { user } = req;
    console.log(user);
    let { title, description, url, imageUrl, albumId } = req.body;


    //todo check if album is in system Model.has(this num)

    if (albumId === null) {
      const newSingle = await Song.create({
        userId: user.id,
        title,
        description,
        url,
        imageUrl,
      });



    if (!albumId) {
        res.statusCode = 404;
        res.json({
          message: "albumId not found/does not exist",
          statusCode: 404,

        //   errors: {
        //     title: "Album title is required",
        //   },
        });
    }

      return res.json(newSingle);
    //   get album, nope, songs are issued by id
    //   create Song
    //   add song to album, nope, songs are issued by id
    }
    //  let album = await Album.findByPk(albumId)
    //  console.log('++++++++++++++++++++',album);



    let newSong = await Song.create({
      userId: user.id,
      albumId:albumId,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl
    });

    //console.log("--------------", newSong);

    // console.log('==================', albumSongs);
    // await Album.addSong(song1);
    //await album.add(newSong);


    return res.json(newSong);

})


//? Get All Songs By Current User

router.get('/current', async, (req, res)=> {

})



module.exports = router;
