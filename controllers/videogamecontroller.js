const Videogames = require('../models/videogamemodel')
const Movie = require('../models/moviemodel')
const User = require('../models/usermodel')

//creates a new videogame with an Id that gets psuhed to an array in the users object
async function postVideogame(req,res){
  try {
    const { title, img } = req.body 
    const addedBy = req.user._id
    const newVideogame = new Videogames({ title, img, addedBy })
    const savedGame = await newVideogame.save()
    const user = await User.findById(addedBy)
    user.lists.videoGames.push(savedGame)
    await user.save()
    res.redirect('/videogames-movies')

  } catch (error) {
      res.render('error')
    }
}

//deletes a videogame from both the collection of games and users list
async function deleteVideogame(req,res){
  try {
    const titleId = req.params.titleId
    const userGames = req.user.lists.videoGames
    const gameIndex = userGames.findIndex(title => title._id === titleId)
    await Videogames.findByIdAndDelete(titleId)
    userGames.splice(gameIndex, 1)
    await req.user.save()
    res.redirect('/videogames-movies')

  } catch (error) {
    res.render('error')
  }
}

//passes variables to to both the games and movie page since they are rendered on one screen it is only in this controller 
async function getVideogamesAndMoviesPage(req,res){
  try {
    const games = await Videogames.find()
    const movies = await Movie.find()
    const currentUser = req.user
    res.render('gamemovie', { games, movies, currentUser })

  } catch (error) {
    res.render('error')
  }
}

//Updates the vieogame by grabbinmg the value of a specific game id and acessing its properties 
async function updateVideogame(req, res) {
  try {
    const titleId = req.params.titleId
    const { title, img } = req.body
    await Videogames.findByIdAndUpdate(titleId, { title, img })
    res.redirect('/videogames-movies')

  } catch (error) {
    res.render('error')
  }
}

//displays the videogame edit form and grabbing the value of the game id 
async function displayEditVideogameForm(req, res) {
  try {
    const titleId = req.params.titleId
    console.log('Params:', req.params)
    const game = await Videogames.findById(titleId)
    res.render('editgameform', { titleId, game })

  } catch (error) {
    res.render('error')
  }
}

//displays the form used for posting a videogame 
function getVideoGameForm(req,res){
  res.render('gameform')
}

module.exports = {postVideogame, deleteVideogame,getVideogamesAndMoviesPage, getVideoGameForm, displayEditVideogameForm, updateVideogame}
