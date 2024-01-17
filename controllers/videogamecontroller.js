const express = require('express');
const router = express.Router();
const Videogames = require('../models/videogamemodel');
const User = require('../models/usermodel');



router.post('/videogame-form', async (req, res) => {
    try {
      const { title, img } = req.body;
      
      const addedBy = req.user._id;
  
      const newVideogame = new Videogames({ title, img, addedBy });
      const savedGame = await newVideogame.save();
  

      const user = await User.findById(addedBy);
      user.lists.videoGames.push(savedGame);
      await user.save();
  
      res.redirect('/videogame-movies-list');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });





  router.get('/videogame-form', (req, res) => (
    res.render('gameform')
  ))

  router.get('/videogame-movies-list', (req, res) => (
    res.render('gamemovie')
  ))

  module.exports = router;