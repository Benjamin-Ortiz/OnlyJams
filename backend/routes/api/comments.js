const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//getall songs
router.get('/', async (req, res) => {
    //res.send('HELLLLOOOOOO');
    // return Song.getAllsongs()

    const allComments = await Comment.findAll()
    //console.log('---------------------',allComments);

    return res.json({
        allComments
    })
})

module.exports = router;
