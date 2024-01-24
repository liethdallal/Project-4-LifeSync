const express = require('express')
const router = express.Router()
const videoGameController = require('../controllers/videogamecontroller')

router.post('/videogame-form', videoGameController.postVideogame)

router.post('/removegame/:titleId', videoGameController.deleteVideogame)
  
router.post('/editgame/:titleId', videoGameController.updateVideogame)

router.get('/editformgame/:titleId', videoGameController.displayEditVideogameForm)

router.get('/videogame-form', videoGameController.getVideoGameForm)
 
router.get('/', videoGameController.getVideogamesAndMoviesPage)

module.exports = router