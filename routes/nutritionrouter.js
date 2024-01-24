const express = require('express')
const router = express.Router()
const nutritionController = require('../controllers/nutritioncontroller')

router.post('/nutrition-form', nutritionController.postNutrition)

router.post('/remove/:nutritionId', nutritionController.deleteNutrition)

router.post('/edit/:nutritionId', nutritionController.updateNutrition)

router.get('/editform/:nutritionId', nutritionController.displayEditNutritionForm)

router.get('/nutrition-form', nutritionController.displayNutritionForm)

router.get('/', nutritionController.displayNutritionPage)

module.exports = router