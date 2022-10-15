const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//getall Playlists
router.get('/', async (req, res) => {
    //res.send('HELLLLOOOOOO');
    // return Playlist.getAllPlaylists()

    const allPlaylists = await Playlist.findAll()
    //console.log('---------------------',allPlaylists);

    return res.json({
        allPlaylists
    })
})

module.exports = router;
