const mongoose = require(`../connections/connection`)
const Movie = require('./moviemodel')
const Videogames = require('./videogamemodel')
const Todo = require('./todomodel')
const Onetimepayment = require('./onetimepaymentmodel')
const Nutrition = require('./nutritionmodel')
const Subscription = require('./subscriptionmodel')

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  lists: {
    movies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }],
    toDo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }],
    videoGames: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Videogames'
    }],
    subscriptions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription'
    }],
    oneTimePayments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Onetimepayment'
    }],
    nutrition: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nutrition'
    }],
  }
}, {
  timestamps: true
});


function applyPopulate(next) {
    this.populate('lists.movies')
      .populate('lists.toDo')
      .populate('lists.videoGames')
      .populate('lists.subscriptions')
      .populate('lists.oneTimePayments')
      .populate('lists.nutrition');
    next();
  }
  
  UserSchema.pre('findOne', applyPopulate);
  
  UserSchema.pre('find', applyPopulate);

const User = mongoose.model('User', UserSchema)

module.exports = User

