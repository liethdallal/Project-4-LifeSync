const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const SubscriptionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  })
  
  const Subscription = mongoose.model('Subscription', SubscriptionSchema)
  
  module.exports = Subscription
  