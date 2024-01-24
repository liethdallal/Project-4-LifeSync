const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const OnetimepaymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  })
  
  const Onetimepayment = mongoose.model('Onetimepayment', OnetimepaymentSchema)
  
  module.exports = Onetimepayment
  