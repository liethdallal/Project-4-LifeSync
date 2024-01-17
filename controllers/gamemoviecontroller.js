const express = require('express');
const router = express.Router();
const Videogames = require('../models/videogamemodel');
const Movie = require('../models/moviemodel')
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
  
      res.redirect('/videogames-movies-list');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/movie-form', async (req, res) => {
    try {
      const { title, img } = req.body; 
      const addedBy = req.user._id;
  
      const newMovie = new Movie({ title, img, addedBy });
      const savedMovie = await newMovie.save();
  

      const user = await User.findById(addedBy);
      user.lists.movies.push(savedMovie);
      await user.save();
  
      res.redirect('/videogames-movies-list');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.post('/removegame/:titleId', async (req, res) => {
    try {

  
      const titleId = req.params.titleId;

      const userGames = req.user.lists.videoGames;

      const gameIndex = userGames.findIndex(title => title._id === titleId);

      
  
      await Videogames.findByIdAndDelete(titleId);

      userGames.splice(gameIndex, 1);

      await req.user.save();
  

      res.redirect('/videogames-movies-list');

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/removemovie/:titleId', async (req, res) => {
    try {

  
      const titleId = req.params.titleId;

      const userMovies = req.user.lists.movies;

      const movieIndex = userMovies.findIndex(title => title._id === titleId);

      
  
      await Movie.findByIdAndDelete(titleId);

      userMovies.splice(movieIndex, 1);

      await req.user.save();
  

      res.redirect('/videogames-movies-list');

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





  router.get('/videogame-form', (req, res) => (
    res.render('gameform')
  ))
  router.get('/movie-form', (req,res) => {
    res.render('movieform')
  })


  
  router.get('/videogames-movies-list', async (req, res) => {
    try {
      const games = await Videogames.find();
      const movies = await Movie.find();
      const currentUser = req.user;

      console.log(games);
      console.log(movies);

      res.render('gamemovie', { games, movies, currentUser });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;