const express = require('express')
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
const indexRouter = require('./routes/indexrouter') 
const userRouter = require('./routes/userrouter')
const todoRouter = require('./routes/todorouter')
const videogameRouter = require('./routes/videogamesrouter')
const movieRouter = require('./routes/movierouter')
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

//Authentication

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

app.use('/todos', todoRouter)

app.use('/videogames-movies', videogameRouter)

app.use('/videogames-movies', movieRouter)







app.listen(PORT, () => {
  console.log('Listening!🔥')
})







