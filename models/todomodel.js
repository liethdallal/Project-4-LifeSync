const mongoose = require(`../connections/connection`)

const TodoSchema = new mongoose.Schema({
    task: {type: String, required: true},
    due: {type: String, required: true}
  });
  
  const Todo = mongoose.model('Todo', TodoSchema);
  
  module.exports = Todo;
  