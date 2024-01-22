const Subscription = require('../models/subscriptionmodel')
const Onetimepayment = require('../models/todomodel');
const User = require('../models/usermodel');



async function postSubscription(req, res) {
    try {
      const { name, cost } = req.body; 
      const addedBy = req.user._id;
  
      const newSubscription = new Subscription({ name, cost, addedBy });
      const savedSubscription = await newSubscription.save();
  

      const user = await User.findById(addedBy);
      user.lists.subscriptions.push(savedSubscription);
      await user.save();
  
      res.redirect('/finance-costs/finance-manager');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




  async function deleteSubscription(req, res) {
    try {

  
      const subscriptionId = req.params.subscriptionId;

      const userSubscriptions = req.user.lists.subscriptions;

      const subscriptionIndex = userSubscriptions.findIndex(subscription => subscription._id === subscriptionId);

      
  
      await Subscription.findByIdAndDelete(nameId);

      userTasks.splice(subscriptionIndex, 1);

      await req.user.save();
  

      res.redirect('/finance-costs/finance-manager');

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };




  async function getFinancePage(req,res){
    try {
      const subscriptions = await Subscription.find();
      const onetimepayments = await Onetimepayment.find();
      const currentUser = req.user;
  
  
      res.render('finance', { subscriptions, onetimepayments, currentUser });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


function displaySubscriptionForm(req, res){
  res.render('subscriptionform')
}


module.exports = {postSubscription, deleteSubscription, getFinancePage, displaySubscriptionForm};