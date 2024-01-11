const mongoose = require(`../connections/connection`)

const OnetimepaymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true}
  });
  
  const Onetimepayment = mongoose.model('Onetimepayment', OnetimepaymentSchema);
  
  module.exports = Onetimepayment;
  