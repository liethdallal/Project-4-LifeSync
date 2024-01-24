const Videogames = require('../models/videogamemodel')
const Movie = require('../models/moviemodel')
const User = require('../models/usermodel')

async function postVideogame(req,res){
  try {
    const { title, img } = req.body 
    const addedBy = req.user._id
    const newVideogame = new Videogames({ title, img, addedBy })
    const savedGame = await newVideogame.save()
    const user = await User.findById(addedBy)
    user.lists.videoGames.push(savedGame)
    await user.save()
    res.redirect('/videogames-movies/videogames-movies-list')

  } catch (error) {
      res.redirect('/error')
    }
}

async function deleteVideogame(req,res){
  try {
    const titleId = req.params.titleId
    const userGames = req.user.lists.videoGames
    const gameIndex = userGames.findIndex(title => title._id === titleId)
    await Videogames.findByIdAndDelete(titleId)
    userGames.splice(gameIndex, 1)
    await req.user.save()
    res.redirect('/videogames-movies/videogames-movies-list')

  } catch (error) {
    res.redirect('/error')
  }
}

async function getVideogamesAndMoviesPage(req,res){
  try {
    const games = await Videogames.find()
    const movies = await Movie.find()
    const currentUser = req.user
    res.render('gamemovie', { games, movies, currentUser })

  } catch (error) {
    res.redirect('/error')
  }
}

async function updateVideogame(req, res) {
  try {
    const titleId = req.params.titleId
    const { title, img } = req.body
    await Videogames.findByIdAndUpdate(titleId, { title, img })
    res.redirect('/videogames-movies/videogames-movies-list')

  } catch (error) {
    res.redirect('/error')
  }
}

async function displayEditVideogameForm(req, res) {
  try {
    const titleId = req.params.titleId
    console.log('Params:', req.params)
    const game = await Videogames.findById(titleId)
    res.render('editgameform', { titleId, game })

  } catch (error) {
    res.redirect('/error')
  }
}

function getVideoGameForm(req,res){
  res.render('gameform')
}

module.exports = {postVideogame, deleteVideogame,getVideogamesAndMoviesPage, getVideoGameForm, displayEditVideogameForm, updateVideogame}
