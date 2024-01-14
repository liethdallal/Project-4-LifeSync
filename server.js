const express = require('express')
const mongoose = require('./connections/connection')
const passport = require('passport')
require('./connections/passport')
const app = express()
require('dotenv').config();
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')
const indexRouter = require('./controllers/indexcontroller')
const userRouter = require('./controllers/usercontroller')
const movieRouter = require('./controllers/moviecontroller')
const PORT = process.env.PORT 


app.use(logger('dev')) 

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use(ejsLayouts)

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use('/', indexRouter)

app.use('/users', userRouter)

app.use('/movie-form', movieRouter )

//Main Routes 

app.get('/', (req, res) => {
    res.render('homepage')
})
app.get('/todo-scheduler', (req, res) => (
  res.render('todo')
))
app.get('/videogames-movies-list', (req, res) => (
  res.render('gamemovie')
))
app.get('/finance-manager', (req, res) => (
  res.render('finance')
))
app.get('/nutrition-manager', (req, res) => (
  res.render('nutrition')
))

//Create A Form Routes 

app.get('/todo-form', (req, res) => (
  res.render('todoform')
))

app.get('/videogame-form', (req, res) => (
  res.render('gameform')
))

app.get('/movie-form', (req, res) => (
  res.render('movieform')
))

app.get('/subscription-form', (req, res) => (
  res.render('subscriptionform')
))

app.get('/onetimepayment-form', (req, res) => (
  res.render('onetimepaymentform')
))

app.get('/nutrition-form', (req, res) => (
  res.render('nutritionform')
))

// Authentication 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())

app.use(passport.session())


app.listen(PORT, () => {
  console.log('Listening!🔥')
})







