const mongoose = require(`../connections/connection`)

const VideogameSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    img: {type: String, required: true}
  });
  
  const Videogames = mongoose.model('Videogames', VideogameSchema);
  
  module.exports = Videogames;
  