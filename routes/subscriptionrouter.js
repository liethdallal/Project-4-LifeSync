const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptioncontroller')

router.post('/subscription-form', subscriptionController.postSubscription)

router.post('/removesub/:subscriptionId', subscriptionController.deleteSubscription)

router.post('/editsubform/:subscriptionId', subscriptionController.updateSubscription)

router.get('/editsub/:subscriptionId', subscriptionController.displayEditSubscriptionForm)

router.get('/subscription-form', subscriptionController.displaySubscriptionForm)

router.get('/finance-manager', subscriptionController.getFinancePage)

module.exports = router