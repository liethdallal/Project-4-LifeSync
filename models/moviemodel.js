const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  const Movie = mongoose.model('Movie', MovieSchema);
  
  module.exports = Movie;
  