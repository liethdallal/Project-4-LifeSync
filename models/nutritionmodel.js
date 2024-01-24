const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const NutritionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    servingsize: {type: String, required: true},
    calories: {type: String, required: true},
    sodium: {type: String, required: true},
    sugar: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  })
  
  const Nutrition = mongoose.model('Nutrition', NutritionSchema)
  
  module.exports = Nutrition
  