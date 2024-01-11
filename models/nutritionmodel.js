const mongoose = require(`../connections/connection`)

const NutritionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    calories: {type: Number, required: true},
    sodium: {type: Number, required: true},
    sugar: {type: Number, required: true},

  });
  
  const Nutrition = mongoose.model('Nutrition', NutritionSchema);
  
  module.exports = Nutrition;
  