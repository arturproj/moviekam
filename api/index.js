const express = require('express')
const router = express.Router()

const TheMovieController = require('./TheMovieController')
router.use('/movie', TheMovieController)

const YouTubeController = require('./YouTubeController')
router.use('/ytube', YouTubeController)

module.exports = router