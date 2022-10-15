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

module.exports = router;
