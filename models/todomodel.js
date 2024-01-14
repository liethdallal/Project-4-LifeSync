const mongoose = require(`../connections/connection`)
const Schema = mongoose.Schema

const TodoSchema = new mongoose.Schema({
    task: {type: String, required: true},
    due: {type: String, required: true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }

  });
  
  const Todo = mongoose.model('Todo', TodoSchema);
  
  module.exports = Todo;
  