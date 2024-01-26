const express = require('express')
const passport = require('passport')
require('./connections/passport')
const app = express()
require('dotenv').config()
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
const subscriptionsRouter = require('./routes/subscriptionrouter')
const oneTimePaymentRouter = require('./routes/onetimepaymentrouter')
const nutritionRouter = require('./routes/nutritionrouter')
const PORT = process.env.PORT 

// Middleware setup
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


// Route setup
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)
app.use('/videogames-movies', videogameRouter)
app.use('/videogames-movies', movieRouter)
app.use('/finances', subscriptionsRouter)
app.use('/finances', oneTimePaymentRouter)
app.use('/nutrition', nutritionRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  res.render('error');
})

app.listen(PORT, () => {
  console.log('Listening!🔥')
})







