const passport = require('passport')

// Redirect to Google for authentication
function login(req, res) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res)
}

// Callback after Google has authenticated the user
function callBack(req, res) {
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/error'
  })(req, res)
}

// OAuth logout route
function logout(req, res) {req.logout((err) => {
  if (err) {
    return res.redirect('/error') 
  }
  
  res.redirect('/')
})
}

// Render homepage
function homepage(req, res) {
  res.render('homepage')
}

function errorPage(req,res) {
  res.render('error')
}
module.exports = { login, callBack, logout, homepage,errorPage }
