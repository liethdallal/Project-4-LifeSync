const mongoose = require(`../connections/connection`)

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    img: {type: String, required: true}
  });
  
  const Movie = mongoose.model('Movie', MovieSchema);
  
  module.exports = Movie;
  