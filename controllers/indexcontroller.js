const passport = require('passport');

// Redirect to Google for authentication
function login(req, res) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
}

// Callback after Google has authenticated the user
function callBack(req, res) {
  passport.authenticate('google', {
    successRedirect: '/homepage',
    failureRedirect: '/error'
  })(req, res);
}

// OAuth logout route
function logout(req, res) {req.logout((err) => {
  if (err) {
    console.error(err);
    return res.redirect('/error'); // Redirect to an error page
  }
  
  res.redirect('/homepage');
});
}

// Render homepage
function homepage(req, res) {
  res.render('homepage');
}

module.exports = { login, callBack, logout, homepage };
