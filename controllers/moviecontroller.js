const Videogames = require('../models/videogamemodel');
const Movie = require('../models/moviemodel')
const User = require('../models/usermodel');

async function postMovie(req, res) {
  try {
    const { title, img } = req.body; 
    const addedBy = req.user._id;

    const newMovie = new Movie({ title, img, addedBy });
    const savedMovie = await newMovie.save();


    const user = await User.findById(addedBy);
    user.lists.movies.push(savedMovie);
    await user.save();

    res.redirect('/videogames-movies/videogames-movies-list');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMovie(req,res) {
  try {
    const titleId = req.params.titleId;

    const userMovies = req.user.lists.movies;

    const movieIndex = userMovies.findIndex(title => title._id === titleId);

    

    await Movie.findByIdAndDelete(titleId);

    userMovies.splice(movieIndex, 1);

    await req.user.save();


    res.redirect('/videogames-movies/videogames-movies-list');

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function getMovieform(req,res){
  res.render('movieform')
}

module.exports = {postMovie, deleteMovie, getMovieform}