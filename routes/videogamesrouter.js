const express = require('express');
const router = express.Router();
const videoGameController = require('../controllers/videogamecontroller')


router.post('/videogame-form', videoGameController.postVideogame);



  router.post('/removegame/:titleId', videoGameController.deleteVideogame);
  





  router.get('/videogame-form', videoGameController.getVideoGameForm)
 

  
  router.get('/videogames-movies-list', videoGameController.getVideogamesAndMoviesPage);

  module.exports = router;