const express = require("express");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//? create album, requireAuth, check is a user is logged in and returns the user obj
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  //   const userId = user.id;


  const { title, description, imageUrl } = req.body;
  // const errors = validationResult(req);


  if (!title) {
    res.statusCode = 400;
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        title: "Album title is required",
      },
    });
  }

  const newAlbum = await Album.create({
    userId: user.id,
    title,
    description,
    imageUrl,
  });
 
   return res.json(newAlbum);
});




//?Get All Albums
router.get("/", requireAuth, async (req, res) => {

    const Albums = await Album.findAll()

          res.json({Albums})
})


//?get all albums by current user id

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const Albums = await Album.findAll({
    where: {
        userId: user.id
    }
  })



  res.json({Albums})

});


//? Get Details of an Album By Id
router.get("/:albumId", requireAuth, async (req, res) => {
    const {albumId} = req.params;


    const album = await Album.findByPk(albumId, {
        include: [{
            model: User,
            // as: "Artist",
            attributes: ['id', 'username', 'imageUrl']
        },
        {
            model: Song
        }
    ]
    })

    if(album) {res.json(album)}
    else {
        res.statusCode = 404;
        res.json({
          message: "Album couldn't be found",
          statusCode: 404,
        });
    }


})




//? edit an album
router.put("/:albumId", requireAuth, async (req, res) => {
    const { user } = req;
    const { albumId } = req.params;
    const { title, description,  imageUrl } = req.body;

    const album = await Album.findByPk(albumId);

    if (album) {
      album.update({
          userId: user.id,
          title,
          description,
          imageUrl,
        });

        res.json(album);
    }
    else
    {
        res.statusCode = 404;
        res.json({
          message: "Album couldn't be found",
          statusCode: 404,

        });
      }

})

//? delete an album

router.delete("/:albumId", requireAuth, async (req, res) => {
    const { albumId } = req.params;
    const album = await Album.findByPk(albumId);

    if (album) {

      await album.destroy();

      res.status = 200;

      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      res.statusCode = 404;
      res.json({
        message: "Album couldn't be found",
        statusCode: 404,
      });
    }
  });




module.exports = router;
