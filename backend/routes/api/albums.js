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

//create album, requireAuth, check is a user is logged in and returns the user obj
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  //   const userId = user.id;
  //console.log("------------", user.id);

  const { title, description, imageUrl } = req.body;
  // const errors = validationResult(req);
  // console.log("------------------", errors);

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

  // if (!id) {
  //     res.statusCode = 404;
  //     res.json({
  //       message: "Album couldn't be found",
  //       statusCode: 404,
  //     });
  //   }


  const newAlbum = await Album.create({
    userId: user.id,
    title,
    description,
    imageUrl,
  });

//   const checkAlbum = await Album.findAll({
//     where: {
//         title: title
//     }
//   })

  //console.log(checkAlbum);
   return res.json(newAlbum);
});




//?Get All Albums
router.get("/", requireAuth, async (req, res) => {

    const allAlbums = await Album.findAll()

          res.json(allAlbums)
})


//?get all albums by current user id

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const allAlbums = await Album.findAll({
    where: {
        userId: user.id
    }
  })

  res.json(allAlbums)

});


//? Get Details of an Album By Id
router.get("/:albumId", requireAuth, async (req, res) => {
    const {albumId} = req.params;


    const album = await Album.findByPk(albumId, {
        include: [{
            model: User,
            attributes: ['id', 'username', 'imageUrl']
        },
        {
            model: Song
        }
    ]
    })

    res.json(album)
})




//? edit an album
router.put("/:albumId", requireAuth, async (req, res) => {
    const { user } = req;
    const { albumId } = req.params;
    const { title, description,  imageUrl } = req.body;

    const album = await Album.findByPk(albumId, {
    //   include: {
    //     model: Album,
    //   },
    });

    // //! have to update not create
    if (album) {
      album.set({
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
          message: "Album i.d does not exist",
          statusCode: 404,

        });
      }

})


module.exports = router;
