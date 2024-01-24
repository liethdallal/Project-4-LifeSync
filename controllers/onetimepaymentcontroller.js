const Onetimepayment = require('../models/onetimepaymentmodel')
const User = require('../models/usermodel')

async function postOnetimepayment(req, res) {
    try {
      const { name, cost } = req.body 
      const addedBy = req.user._id
      const newOnetimepayment = new Onetimepayment({ name, cost, addedBy })
      const savedOnetimepayment = await newOnetimepayment.save()
      const user = await User.findById(addedBy)
      user.lists.oneTimePayments.push(savedOnetimepayment)
      await user.save()
      res.redirect('/finance-costs/finance-manager')

    } catch (error) {
      res.redirect('/error')
    }
  }

  async function deleteOnetimepayment(req, res) {
    try {
      const onetimepaymentId = req.params.onetimepaymentId
      const userOnetimepayments = req.user.lists.oneTimePayments
      const oneTimePaymentIndex = userOnetimepayments.findIndex(onetimepayment =>onetimepayment._id ===onetimepaymentId)
      await Onetimepayment.findByIdAndDelete(onetimepaymentId)
      userOnetimepayments.splice(oneTimePaymentIndex, 1)
      await req.user.save()
      res.redirect('/finance-costs/finance-manager')

    } catch (error) {
      res.redirect('/error')
    }
  }


  async function updateOnetimePayemnt(req, res) {
    try {
      const onetimepaymentId = req.params.onetimepaymentId
      const { name, cost } = req.body
      await Onetimepayment.findByIdAndUpdate(onetimepaymentId, { name, cost })
      res.redirect('/finance-costs/finance-manager')

    } catch (error) {
      res.redirect('/error')
    }
  }
  
  async function displayEditOnetimeForm(req, res) {
    try {
      const onetimepaymentId = req.params.onetimepaymentId
      const onetimepayment = await Onetimepayment.findById(onetimepaymentId)
      res.render('editonetimeform', { onetimepaymentId, onetimepayment })

    } catch (error) {
      res.redirect('/error')
    }
  }

function displayOnetimepaymentForm(req, res){
  res.render('onetimepaymentform')
}


module.exports = {postOnetimepayment, deleteOnetimepayment, displayOnetimepaymentForm, updateOnetimePayemnt, displayEditOnetimeForm}