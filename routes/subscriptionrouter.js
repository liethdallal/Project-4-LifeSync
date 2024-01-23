const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptioncontroller')

router.post('/subscription-form', subscriptionController.postSubscription);

router.post('/removesub/:subscriptionId', subscriptionController.deleteSubscription)


router.get('/finance-manager', subscriptionController.getFinancePage)

router.get('/subscription-form', subscriptionController.displaySubscriptionForm)


module.exports = router;