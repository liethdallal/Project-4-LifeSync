const express = require('express')
const router = express.Router()
const movieController = require('../controllers/moviecontroller')

router.post('/movie-form', movieController.postMovie)

router.post('/removemovie/:titleId', movieController.deleteMovie)

router.post('/editmovie/:titleId', movieController.updateMovie)

router.get('/editformmovie/:titleId', movieController.displayEditMovieForm)

router.get('/movie-form', movieController.getMovieform)

module.exports = router