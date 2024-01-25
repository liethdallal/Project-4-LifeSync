const router = require('express').Router()
const indexController = require('../controllers/indexcontroller')

router.get('/auth/google', indexController.login)
  
  
  // Google OAuth callback route
  router.get('/oauth2callback', indexController.callBack)
  
  // OAuth logout route
  router.get('/logout', indexController.logout)

  router.get('/', indexController.homepage)

  router.get('/error', indexController.errorPage)

  module.exports = router