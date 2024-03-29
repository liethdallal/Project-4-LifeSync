const Subscription = require('../models/subscriptionmodel')
const Onetimepayment = require('../models/onetimepaymentmodel')
const User = require('../models/usermodel')


//creates a new subscription and psuhed it to users list and collection of subscriptions 
async function postSubscription(req, res) {
    try {
      const { name, cost } = req.body 
      const addedBy = req.user._id
      const newSubscription = new Subscription({ name, cost, addedBy })
      const savedSubscription = await newSubscription.save()
      const user = await User.findById(addedBy)
      user.lists.subscriptions.push(savedSubscription)
      await user.save()
      res.redirect('/finances')

    }   catch (error) {
      res.render('error')
    }
  }

  //deletes a specific subscription by its id from both the users list and the collection 
  async function deleteSubscription(req, res) {
    try {  
      const subscriptionId = req.params.subscriptionId
      const userSubscriptions = req.user.lists.subscriptions
      const subscriptionIndex = userSubscriptions.findIndex(subscription => subscription._id === subscriptionId)
      await Subscription.findByIdAndDelete(subscriptionId)
      userSubscriptions.splice(subscriptionIndex, 1)
      await req.user.save()
      res.redirect('/finances')

    }  catch (error) {
      res.render('error')
    }
  }

  //updates a subscription by passing the values and updating it for the id of the subscription 
  async function updateSubscription(req, res) {
    try {
      const subscriptionId = req.params.subscriptionId
      const { name, cost } = req.body
      await Subscription.findByIdAndUpdate(subscriptionId, { name, cost })
      res.redirect('/finances')

    }  catch (error) {
      res.render('error')
    }
  }
  
  //Displays the form that holds the values of the specific subscription 
  async function displayEditSubscriptionForm(req, res) {
    try {
      const subscriptionId = req.params.subscriptionId
      const subscription = await Subscription.findById(subscriptionId)
      res.render('editsubform', { subscriptionId, subscription })

    }  catch (error) {
      res.render('error')
    }
  }

  //displays the entire finance page and pases along both the onetime payments and the subscriptions to the page 
  async function getFinancePage(req,res){
    try {
      const subscriptions = await Subscription.find()
      const onetimepayments = await Onetimepayment.find()
      const currentUser = req.user
      res.render('finance', { subscriptions, onetimepayments, currentUser })
  
    }   catch (error) {
      res.render('error')
    }
  }

//displays the form the user will use to post 
function displaySubscriptionForm(req, res){
  res.render('subscriptionform')
}


module.exports = {postSubscription, deleteSubscription, getFinancePage, updateSubscription, displayEditSubscriptionForm, displaySubscriptionForm}