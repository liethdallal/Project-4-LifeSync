const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const VideogameSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }

  });
  
  const Videogames = mongoose.model('Videogames', VideogameSchema);
  
  module.exports = Videogames;
  