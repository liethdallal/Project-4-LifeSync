const mongoose = require(`../connections/connection`)

const SubscriptionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true}
  });
  
  const Subscription = mongoose.model('Subscription', SubscriptionSchema);
  
  module.exports = Subscription;
  