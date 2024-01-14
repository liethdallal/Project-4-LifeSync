const express = require('express')
const router = express.Router()
const User = require('../controllers/usercontroller')
const passport = require('../connections/passport') 
const Movie = require('../models/moviemodel')

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {}
  let sortKey = req.query.sort || 'name'
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err)
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    })
  })
}

router.get('/users', index)




module.exports = router