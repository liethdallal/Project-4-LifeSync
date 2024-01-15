const express = require('express');
const router = express.Router();
const Todo = require('../models/todomodel');
const User = require('../models/usermodel')



router.post('/todo-form', async (req, res) => {
    try {
      const { task, due } = req.body;
      
      const addedBy = req.user._id;
  
      const newTodo = new Todo({ task, due, addedBy });
      const savedTodo = await newTodo.save();
  

      const user = await User.findById(addedBy);
      user.lists.toDo.push(savedTodo);
      await user.save();
  
      res.redirect('todo-scheduler');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


//   router.get('/:id', async (req, res) => {
//     try {
//       const todo = await Todo.findById(req.params.id);
//       res.json(todo);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


//   router.delete('/:id', async (req, res) => {
//     try {
//       const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
//       res.json(deletedTodo);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

  router.get('/todo-scheduler', async (req, res) => {
    try {
      const todos = await Todo.find();
      const users = await User.find(); // Assuming you have a User model


      const currentUser = req.user;


    console.log(currentUser);
      res.render('todo', { todos, currentUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/todo-form', (req, res) => (
    res.render('todoform')
  ))

  module.exports = router;