const Movie = require('../models/moviemodel')
const User = require('../models/usermodel')

//posts a movie and Pushes the movie id to both the users list and the colections of movies in database
async function postMovie(req, res) {
  try {
    const { title, img } = req.body 
    const addedBy = req.user._id
    const newMovie = new Movie({ title, img, addedBy })
    const savedMovie = await newMovie.save()
    const user = await User.findById(addedBy)
    user.lists.movies.push(savedMovie)
    await user.save()
    res.redirect('/videogames-movies')

  } catch (error) {
    res.render('error')
  }
}

//deletes the movie from both the users list and collection of movies
async function deleteMovie(req,res) {
  try {
    const titleId = req.params.titleId
    const userMovies = req.user.lists.movies
    const movieIndex = userMovies.findIndex(title => title._id === titleId)
    await Movie.findByIdAndDelete(titleId)
    userMovies.splice(movieIndex, 1)
    await req.user.save()
    res.redirect('/videogames-movies')

  } catch (error) {
    res.render('error')

  }
}

//edits the movie by id in the collection of movies and gives user a chance to changes its properties 
async function updateMovie(req, res) {
  try {
    const titleId = req.params.titleId
    const { title, img } = req.body
    await Movie.findByIdAndUpdate(titleId, { title, img })
    res.redirect('/videogames-movies')

  } catch (error) {
    res.render('error')
  }
}

//Passes the value of the movie id to the inputs of the edit form and renders the edit form
async function displayEditMovieForm(req, res) {
  try {
    const titleId = req.params.titleId
    const game = await Movie.findById(titleId)
    res.render('editmovieform', { titleId, game })

  } catch (error) {
    res.render('error')

  }
}

//displays the post form 
function getMovieform(req,res){
  res.render('movieform')
}

module.exports = {postMovie, deleteMovie, updateMovie, displayEditMovieForm, getMovieform}