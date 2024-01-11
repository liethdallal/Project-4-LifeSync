const router = require('express').Router()
const passport = require('passport')

router.get('/', function(req, res) {
  res.redirect('/profile')
})

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
))


// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
))

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) {
        res.redirect('/error')
      } else {
        res.redirect('/')
      }
    })
  })

module.exports = router