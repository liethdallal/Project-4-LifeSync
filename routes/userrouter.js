const express = require('express')
const router = express.Router()
const User = require('../controllers/usercontroller')

router.get('/', User.index)


module.exports = router