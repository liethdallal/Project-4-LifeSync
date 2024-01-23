const express = require('express');
const router = express.Router();
const onetimepaymentController = require('../controllers/onetimepaymentcontroller')

router.post('/onetimepayment-form', onetimepaymentController.postOnetimepayment);

router.post('/removeonetime/:onetimepaymentId', onetimepaymentController.deleteOnetimepayment)

router.get('/onetimepayment-form', onetimepaymentController.displayOnetimepaymentForm)


module.exports = router;